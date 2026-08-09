import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { ReflectionPromptEmail } from '@/lib/email-templates';

/**
 * POST /api/email/send-reflection-prompt
 *
 * Finds all active cohort participants and sends each a weekly reflection prompt.
 *
 * Auth: Bearer ${WEBHOOK_SECRET} in Authorization header.
 * Returns: { success: true, sent: N }
 */
export async function POST(request: NextRequest) {
  console.log('[REFLECTION_PROMPT_EMAIL] POST request received');

  // --- Webhook auth ---
  const authHeader = request.headers.get('authorization');
  const expectedToken = `Bearer ${process.env.WEBHOOK_SECRET}`;
  if (!authHeader || authHeader !== expectedToken) {
    console.log('[REFLECTION_PROMPT_EMAIL] Unauthorized — invalid or missing token');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // --- Find all active participants ---
    // A participant is a UserRestoration that belongs to a cohort with status = 'active'
    console.log('[REFLECTION_PROMPT_EMAIL] Querying active cohort participants');

    const participants = await prisma.userRestoration.findMany({
      where: {
        cohort: {
          status: 'active',
        },
      },
      include: {
        user: true,
        currentStage: true,
        cohort: true,
      },
    });

    console.log(`[REFLECTION_PROMPT_EMAIL] Found ${participants.length} active participant(s)`);

    let sent = 0;

    for (const participant of participants) {
      const user = participant.user;

      if (!user?.email) {
        console.log('[REFLECTION_PROMPT_EMAIL] Skipping participant — no user email');
        continue;
      }

      const firstName = user.firstName || user.name || 'Friend';
      const stageName = participant.currentStage?.name || 'Current Stage';

      const html = ReflectionPromptEmail({ firstName, stageName });

      const result = await sendEmail({
        to: user.email,
        subject: `Weekly Reflection — ${stageName}`,
        html,
      });

      if (result.success) {
        sent++;
        console.log(`[REFLECTION_PROMPT_EMAIL] Sent to ${user.email}`);
      } else {
        console.error(`[REFLECTION_PROMPT_EMAIL] Failed to send to ${user.email}:`, result.error);
      }
    }

    console.log(`[REFLECTION_PROMPT_EMAIL] Done. Emails sent: ${sent}`);
    return NextResponse.json({ success: true, sent });
  } catch (error) {
    console.error('[REFLECTION_PROMPT_EMAIL] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
