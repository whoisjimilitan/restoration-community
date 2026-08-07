import { Resend } from 'resend';

const FROM_EMAIL = process.env.EMAIL_FROM_ADDRESS || 'noreply@saintandstory.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email via Resend
 * Development-safe: logs to console if RESEND_API_KEY not configured
 */
export async function sendEmail({ to, subject, html }: EmailOptions) {
  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  console.log('[EMAIL] Sending email:', { to, subject });

  // Development fallback: log instead of sending if API key missing
  if (!resend || !process.env.RESEND_API_KEY) {
    console.log('[EMAIL] No RESEND_API_KEY configured. Email would be sent to:', to);
    console.log('[EMAIL] Subject:', subject);
    console.log('[EMAIL] Body (first 200 chars):', html.substring(0, 200) + '...');
    return { success: true, id: 'dev-fallback' };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (result.error) {
      console.error('[EMAIL] Resend error:', result.error);
      return { success: false, error: result.error };
    }

    console.log('[EMAIL] Email sent successfully:', result.data?.id);
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('[EMAIL] Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send email verification token
 */
export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verificationUrl = `${APP_URL}/auth/verify-email-token?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Verify Your Email</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #0d9488; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
          .content { margin: 20px 0; color: #555; }
          .button { display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Restore Your Account</div>

          <div class="content">
            <p>Welcome to the Restoration Community.</p>
            <p>Click the button below to verify your email address and begin your restoration journey.</p>
          </div>

          <a href="${verificationUrl}" class="button">Verify Email Address</a>

          <div class="content">
            <p>Or copy this link:</p>
            <p><code style="background: #f3f4f6; padding: 2px 4px; font-size: 12px;">${verificationUrl}</code></p>
          </div>

          <div class="content">
            <p>This link expires in 24 hours.</p>
            <p>If you did not create this account, you can safely ignore this email.</p>
          </div>

          <div class="footer">
            <p>© 2026 Restoration Community. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Verify Your Email — Restoration Community',
    html,
  });
}

/**
 * Send password reset email (placeholder for future implementation)
 */
export async function sendPasswordResetEmail(
  email: string,
  token: string
) {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #0d9488; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
          .content { margin: 20px 0; color: #555; }
          .button { display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Reset Your Password</div>

          <div class="content">
            <p>We received a request to reset your password.</p>
            <p>Click the button below to create a new password.</p>
          </div>

          <a href="${resetUrl}" class="button">Reset Password</a>

          <div class="content">
            <p>Or copy this link:</p>
            <p><code style="background: #f3f4f6; padding: 2px 4px; font-size: 12px;">${resetUrl}</code></p>
          </div>

          <div class="content">
            <p>This link expires in 1 hour.</p>
            <p>If you did not request this, you can safely ignore this email. Your password will not change.</p>
          </div>

          <div class="footer">
            <p>© 2026 Restoration Community. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Your Password — Restoration Community',
    html,
  });
}
