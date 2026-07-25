import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
