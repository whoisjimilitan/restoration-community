import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(_request: NextRequest) {
  console.log('[RESTORATION] POST /api/restoration/advance');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[RESTORATION] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }


    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('[RESTORATION] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userRestoration = await prisma.userRestoration.findUnique({
      where: { userId: user.id },
      include: { currentStage: true },
    });

    if (!userRestoration) {
      console.log('[RESTORATION] Journey not found');
      return NextResponse.json(
        { error: 'Journey not found' },
        { status: 404 }
      );
    }

    const currentSequence = userRestoration.currentStage.sequence;

    // Check if user is already at final stage
    if (currentSequence >= 7) {
      console.log('[RESTORATION] Cannot progress - already at final stage (stage 7)');
      return NextResponse.json(
        { error: 'Already at final stage' },
        { status: 400 }
      );
    }

    // CRITICAL: Validate reflection exists for current stage (GOV-001 requirement)
    const existingReflection = await prisma.stageReflection.findFirst({
      where: {
        userRestorationId: userRestoration.id,
        stageId: userRestoration.currentStageId,
      },
    });

    if (!existingReflection) {
      console.log('[RESTORATION] Cannot progress - no reflection for current stage');
      return NextResponse.json(
        { error: 'Reflection required before progression' },
        { status: 400 }
      );
    }

    // Find next stage
    const nextStage = await prisma.restorationStage.findFirst({
      where: { sequence: currentSequence + 1 },
    });

    if (!nextStage) {
      console.log('[RESTORATION] Next stage not found');
      return NextResponse.json(
        { error: 'Next stage not found' },
        { status: 404 }
      );
    }

    // Create transition record (GOV-001: Hybrid Participant-Led Model)
    // transitionedById = null means participant-initiated (not approved)
    const transition = await prisma.stageTransition.create({
      data: {
        userRestorationId: userRestoration.id,
        fromStageId: userRestoration.currentStageId,
        toStageId: nextStage.id,
        transitionedById: null, // Participant-initiated, not approved by mentor
        reason: 'participant progression',
      },
      include: {
        fromStage: true,
        toStage: true,
      },
    });

    // Update user's current stage
    const updated = await prisma.userRestoration.update({
      where: { userId: user.id },
      data: { currentStageId: nextStage.id },
      include: { currentStage: { include: { content: true } } },
    });

    console.log(
      `[RESTORATION] Progression recorded: Stage ${currentSequence} → ${nextStage.sequence} (user: ${user.id}, transitionId: ${transition.id})`
    );

    // Trigger progression email
    console.log(`[RESTORATION] Sending stage progression email to ${user.email}`);
    const firstName = user.firstName || user.name || 'Friend';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Stage ${nextStage.sequence}: ${nextStage.name}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { color: #0d9488; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .content { margin: 20px 0; color: #555; }
            .stage-badge { display: inline-block; background-color: #0d9488; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold; margin: 10px 0; }
            .button { display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Welcome to Stage ${nextStage.sequence}</div>

            <div class="content">
              <p>Hello ${firstName},</p>
              <p>Congratulations on completing Stage ${currentSequence}!</p>
              <p>You have advanced to the next stage of your restoration journey:</p>
            </div>

            <div class="stage-badge">Stage ${nextStage.sequence}: ${nextStage.name}</div>

            <div class="content">
              <p>Your journey continues at SCOAN Accra, Fridays at 3:00 PM.</p>
              <p>Visit your dashboard to see this week's reflection prompt and gather with your community.</p>
            </div>

            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">View Your Dashboard</a>

            <div class="content">
              <p>Thank you for your dedication to restoration. Jesus is with you.</p>
            </div>

            <div class="footer">
              <p>© 2026 Restoration Community. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: `Welcome to Stage ${nextStage.sequence}: ${nextStage.name} — Restoration Community`,
        html: emailHtml,
      });
      console.log(`[RESTORATION] Stage progression email sent to ${user.email}`);
    } catch (emailError) {
      console.error('[RESTORATION] Failed to send progression email:', emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json(
      {
        transitionId: transition.id,
        fromStage: transition.fromStage,
        toStage: transition.toStage,
        currentStage: updated.currentStage,
        transitionedAt: transition.createdAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[RESTORATION] Error advancing stage:', error);
    return NextResponse.json(
      { error: 'Failed to advance stage' },
      { status: 500 }
    );
  }
}
