import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { StageProgressionEmail } from '@/lib/email-templates';

/**
 * POST /api/email/send-stage-progression
 *
 * Sends a stage progression congratulations email to a single participant.
 * Called internally when a participant advances to a new stage.
 *
 * Body: { userEmail, firstName, stageName, stageNum }
 * Returns: { success: true }
 */
export async function POST(request: NextRequest) {
  console.log('[STAGE_PROGRESSION_EMAIL] POST request received');

  try {
    const body = await request.json();
    const { userEmail, firstName, stageName, stageNum } = body;

    // --- Validate required fields ---
    if (!userEmail || !firstName || !stageName || stageNum === undefined) {
      console.log('[STAGE_PROGRESSION_EMAIL] Missing required fields:', {
        userEmail: !!userEmail,
        firstName: !!firstName,
        stageName: !!stageName,
        stageNum: stageNum !== undefined,
      });
      return NextResponse.json(
        { error: 'Missing required fields: userEmail, firstName, stageName, stageNum' },
        { status: 400 }
      );
    }

    console.log(`[STAGE_PROGRESSION_EMAIL] Sending to ${userEmail} — Stage ${stageNum}: ${stageName}`);

    const html = StageProgressionEmail({
      firstName,
      newStageName: stageName,
      newStageNum: Number(stageNum),
    });

    const result = await sendEmail({
      to: userEmail,
      subject: `You Have Advanced — Stage ${stageNum}: ${stageName}`,
      html,
    });

    if (!result.success) {
      console.error('[STAGE_PROGRESSION_EMAIL] Failed to send email:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email', detail: result.error },
        { status: 500 }
      );
    }

    console.log(`[STAGE_PROGRESSION_EMAIL] Done. Email sent to ${userEmail}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[STAGE_PROGRESSION_EMAIL] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
