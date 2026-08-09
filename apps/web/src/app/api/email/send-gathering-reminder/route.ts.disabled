import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { GatheringReminderEmail } from '@/lib/email-templates';

/**
 * POST /api/email/send-gathering-reminder
 *
 * Finds all meetings scheduled for tomorrow (within 24-25h from now)
 * and sends a gathering reminder email to every attendee.
 *
 * Auth: Bearer ${WEBHOOK_SECRET} in Authorization header.
 * Returns: { success: true, sent: N }
 */
export async function POST(request: NextRequest) {
  console.log('[GATHERING_REMINDER_EMAIL] POST request received');

  // --- Webhook auth ---
  const authHeader = request.headers.get('authorization');
  const expectedToken = `Bearer ${process.env.WEBHOOK_SECRET}`;
  if (!authHeader || authHeader !== expectedToken) {
    console.log('[GATHERING_REMINDER_EMAIL] Unauthorized — invalid or missing token');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // --- Find meetings scheduled for tomorrow ---
    const now = new Date();
    const from = new Date(now.getTime() + 24 * 60 * 60 * 1000);   // 24h from now
    const to   = new Date(now.getTime() + 25 * 60 * 60 * 1000);   // 25h from now

    console.log(`[GATHERING_REMINDER_EMAIL] Looking for meetings between ${from.toISOString()} and ${to.toISOString()}`);

    const meetings = await prisma.meeting.findMany({
      where: {
        scheduledDate: {
          gte: from,
          lte: to,
        },
      },
      include: {
        cohort: true,
        stage: true,
        attendances: {
          include: {
            userRestoration: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    console.log(`[GATHERING_REMINDER_EMAIL] Found ${meetings.length} meeting(s) scheduled for tomorrow`);

    let sent = 0;

    for (const meeting of meetings) {
      const dateTimeStr = `${meeting.scheduledDate.toDateString()} at ${meeting.time}`;

      for (const attendance of meeting.attendances) {
        const user = attendance.userRestoration?.user;

        if (!user?.email) {
          console.log('[GATHERING_REMINDER_EMAIL] Skipping attendance — no user email');
          continue;
        }

        const firstName = user.firstName || user.name || 'Friend';
        const html = GatheringReminderEmail({
          firstName,
          cohortName: meeting.cohort.name,
          stageName: meeting.stage.name,
          dateTime: dateTimeStr,
          location: meeting.location,
        });

        const result = await sendEmail({
          to: user.email,
          subject: `Reminder: Your Gathering Tomorrow — ${meeting.cohort.name}`,
          html,
        });

        if (result.success) {
          sent++;
          console.log(`[GATHERING_REMINDER_EMAIL] Sent to ${user.email}`);
        } else {
          console.error(`[GATHERING_REMINDER_EMAIL] Failed to send to ${user.email}:`, result.error);
        }
      }
    }

    console.log(`[GATHERING_REMINDER_EMAIL] Done. Emails sent: ${sent}`);
    return NextResponse.json({ success: true, sent });
  } catch (error) {
    console.error('[GATHERING_REMINDER_EMAIL] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
