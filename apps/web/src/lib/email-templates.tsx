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
