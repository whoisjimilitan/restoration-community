/**
 * Email templates for Brother Jimi Ministries — Restoration Community
 *
 * All templates return HTML strings (via renderToStaticMarkup or direct string building).
 * These are plain HTML div-based emails — no Tailwind, no external CSS frameworks.
 *
 * Templates:
 *   - GatheringReminderEmail  — sent 24h before a cohort gathering
 *   - ReflectionPromptEmail   — weekly prompt to submit a stage reflection
 *   - StageProgressionEmail   — congratulates participant on stage advancement
 */

const BASE_STYLES = `
  body { font-family: Georgia, 'Times New Roman', serif; line-height: 1.7; color: #1a1a1a; margin: 0; padding: 0; background: #f9f7f4; }
  .container { max-width: 580px; margin: 0 auto; padding: 40px 24px; }
  .header { font-family: Georgia, serif; font-size: 22px; font-weight: bold; color: #1a1a1a; margin-bottom: 32px; letter-spacing: 0.5px; }
  .body-text { font-size: 16px; color: #3a3a3a; margin-bottom: 16px; }
  .detail-box { background: #fff; border: 1px solid #e0dbd4; border-radius: 6px; padding: 20px 24px; margin: 24px 0; }
  .detail-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
  .detail-value { font-size: 16px; color: #1a1a1a; font-weight: 500; }
  .detail-row { margin-bottom: 16px; }
  .detail-row:last-child { margin-bottom: 0; }
  .button { display: inline-block; background-color: #1a1a1a; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-size: 15px; font-family: Georgia, serif; margin: 24px 0; letter-spacing: 0.3px; }
  .divider { border: none; border-top: 1px solid #e0dbd4; margin: 32px 0; }
  .footer { font-size: 13px; color: #888; font-style: italic; }
  .stage-badge { display: inline-block; background: #f0ede8; border: 1px solid #d4cfc7; border-radius: 4px; padding: 6px 14px; font-size: 13px; color: #555; margin-bottom: 24px; letter-spacing: 0.5px; }
`;

// ---------------------------------------------------------------------------
// GatheringReminderEmail
// ---------------------------------------------------------------------------

export interface GatheringReminderEmailProps {
  firstName: string;
  cohortName: string;
  stageName: string;
  dateTime: string;
  location: string;
}

export function GatheringReminderEmail({
  firstName,
  cohortName,
  stageName,
  dateTime,
  location,
}: GatheringReminderEmailProps): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Gathering is Tomorrow</title>
  <style>${BASE_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">Your Gathering is Tomorrow</div>

    <p class="body-text">Dear ${firstName},</p>

    <p class="body-text">
      This is a reminder that your gathering for <strong>${cohortName}</strong> takes place tomorrow.
      Come ready to be present — not just in body, but in heart.
    </p>

    <div class="detail-box">
      <div class="detail-row">
        <div class="detail-label">Cohort</div>
        <div class="detail-value">${cohortName}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Stage</div>
        <div class="detail-value">${stageName}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Date &amp; Time</div>
        <div class="detail-value">${dateTime}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Location</div>
        <div class="detail-value">${location}</div>
      </div>
    </div>

    <p class="body-text">
      If you have any questions before tomorrow, reply to this email.
    </p>

    <hr class="divider" />

    <div class="footer">In Christ, Brother Jimi Ministries</div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// ReflectionPromptEmail
// ---------------------------------------------------------------------------

export interface ReflectionPromptEmailProps {
  firstName: string;
  stageName: string;
}

export function ReflectionPromptEmail({
  firstName,
  stageName,
}: ReflectionPromptEmailProps): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const dashboardUrl = `${appUrl}/dashboard/participant`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weekly Reflection</title>
  <style>${BASE_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">Weekly Reflection</div>

    <p class="body-text">Dear ${firstName},</p>

    <div class="stage-badge">${stageName}</div>

    <p class="body-text">
      This week, take a moment to reflect on what God has been doing in you through this stage.
      Your reflection is not a performance — it is a record of what Jesus has done.
    </p>

    <p class="body-text">
      What has shifted in you? What have you surrendered? What are you still holding on to?
      Write honestly. No one is grading you.
    </p>

    <a href="${dashboardUrl}" class="button">Submit Your Reflection</a>

    <p class="body-text" style="color: #888; font-size: 14px;">
      Or copy this link into your browser:<br />
      <span style="font-family: monospace; font-size: 13px; color: #555;">${dashboardUrl}</span>
    </p>

    <hr class="divider" />

    <div class="footer">In Christ, Brother Jimi Ministries</div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// StageProgressionEmail
// ---------------------------------------------------------------------------

export interface StageProgressionEmailProps {
  firstName: string;
  newStageName: string;
  newStageNum: number;
}

export function StageProgressionEmail({
  firstName,
  newStageName,
  newStageNum,
}: StageProgressionEmailProps): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You Have Advanced</title>
  <style>${BASE_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">You Have Advanced</div>

    <p class="body-text">Dear ${firstName},</p>

    <p class="body-text">
      You have moved into a new stage of your restoration journey.
    </p>

    <div class="detail-box">
      <div class="detail-row">
        <div class="detail-label">Your New Stage</div>
        <div class="detail-value">Stage ${newStageNum}: ${newStageName}</div>
      </div>
    </div>

    <p class="body-text">
      This is not a moment to celebrate yourself — it is a moment to celebrate what Jesus has done in you.
    </p>

    <p class="body-text">
      Carry what you have learned into this next stage. Stay humble. Stay present.
      The work continues, and God is faithful to complete it.
    </p>

    <hr class="divider" />

    <div class="footer">In Christ, Brother Jimi Ministries</div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Prayer Booking Confirmation Email
// ---------------------------------------------------------------------------

export interface BookingEmailData {
  name: string;
  email: string;
  bookingId: string;
  bookedSlot: string;
  wherebyRoomUrl: string;
  localTime: string;
}

export function getConfirmationEmailHTML(data: BookingEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 30px; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; color: #1a1a1a; }
    .header p { margin: 10px 0 0 0; font-size: 14px; color: #666; }
    .content { margin-bottom: 30px; }
    .content h2 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-top: 0; }
    .content p { margin: 12px 0; font-size: 14px; line-height: 1.8; }
    .details-box { background-color: #f9f9f9; border-left: 4px solid #4f46e5; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .details-box p { margin: 8px 0; font-size: 14px; }
    .details-box strong { display: inline-block; width: 120px; font-weight: 600; color: #1a1a1a; }
    .button { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
    .button:hover { background-color: #4338ca; }
    .footer { border-top: 1px solid #f0f0f0; padding-top: 20px; text-align: center; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Prayer Call Confirmed</h1>
      <p>Your deliverance encounter with Brother Jimi is scheduled</p>
    </div>

    <div class="content">
      <h2>Hello ${data.name},</h2>

      <p>Thank you for scheduling your prayer call encounter with Brother Jimi. We're honored to pray with you during this sacred time.</p>

      <div class="details-box">
        <p><strong>Booking ID:</strong> ${data.bookingId}</p>
        <p><strong>Date & Time:</strong> ${data.localTime}</p>
        <p><strong>Duration:</strong> 30 minutes</p>
        <p><strong>Location:</strong> Online (Whereby)</p>
      </div>

      <h2>How to Join</h2>
      <p>Your prayer call will take place in a private Whereby video conference room.</p>

      <a href="${data.wherebyRoomUrl}" class="button">Join Prayer Call</a>

      <h2>Before Your Call</h2>
      <ul style="font-size: 14px; line-height: 1.8;">
        <li>Find a quiet, private space where you can be present without interruptions</li>
        <li>Test your camera and microphone beforehand</li>
        <li>Join 5 minutes early to ensure everything is working</li>
        <li>Come with an open heart—this is a space for vulnerability and healing</li>
      </ul>

      <p style="background-color: #f0f7ff; padding: 16px; border-radius: 6px; font-size: 14px; border-left: 4px solid #3b82f6;">
        <strong>Note:</strong> Your encounter will be recorded (with your consent) so you have a record of this moment of deliverance.
      </p>

      <div style="margin-top: 30px; font-size: 14px; line-height: 1.8;">
        <p>In Christ,</p>
        <p><strong>Brother Jimi & The Restoration Ministry</strong></p>
      </div>
    </div>

    <div class="footer">
      <p>© 2026 Brother Jimi Restoration Ministry. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Prayer Booking Reminder Email
// ---------------------------------------------------------------------------

export interface ReminderEmailData {
  name: string;
  email: string;
  bookingId: string;
  bookedSlot: string;
  wherebyRoomUrl: string;
  localTime: string;
  hoursUntilCall: number;
}

export function getReminderEmailHTML(data: ReminderEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 30px; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 600; color: #1a1a1a; }
    .content { margin-bottom: 30px; }
    .content h2 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-top: 0; }
    .content p { margin: 12px 0; font-size: 14px; line-height: 1.8; }
    .alert-box { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px; }
    .details-box { background-color: #f9f9f9; padding: 16px; margin: 20px 0; border-radius: 4px; border: 1px solid #e0e0e0; }
    .details-box p { margin: 8px 0; font-size: 14px; }
    .button { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 16px 0; }
    .footer { border-top: 1px solid #f0f0f0; padding-top: 20px; text-align: center; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Prayer Call is Coming</h1>
      <p>In ${data.hoursUntilCall} hour${data.hoursUntilCall !== 1 ? 's' : ''}</p>
    </div>

    <div class="content">
      <h2>Hello ${data.name},</h2>

      <p>Your prayer encounter with Brother Jimi starts in just ${data.hoursUntilCall} hour${data.hoursUntilCall !== 1 ? 's' : ''}. We look forward to praying with you.</p>

      <div class="alert-box">
        <p><strong>🕐 Reminder:</strong> Join the video call at the scheduled time. Be ready 5 minutes early.</p>
      </div>

      <div class="details-box">
        <p><strong>Time:</strong> ${data.localTime}</p>
        <p><strong>Booking ID:</strong> ${data.bookingId}</p>
        <p><strong>Duration:</strong> 30 minutes</p>
      </div>

      <a href="${data.wherebyRoomUrl}" class="button">Join Now</a>

      <p style="font-size: 14px; color: #666; margin-top: 20px;">
        If you need to reschedule, please let us know as soon as possible by replying to this email.
      </p>
    </div>

    <div class="footer">
      <p>© 2026 Brother Jimi Restoration Ministry. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

export function getSubjectLine(eventType: 'confirmation' | 'reminder', name: string): string {
  if (eventType === 'confirmation') {
    return `Prayer Call Scheduled - ${name}`;
  }
  return `Prayer Call Reminder - Starting Soon`;
}
