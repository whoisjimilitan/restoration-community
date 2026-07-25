# Email Communication Foundation — INFRA-002

This document describes the email communication system for the Restoration Community platform.

---

## **Overview**

The email foundation provides:
- Email sending capability via Resend
- Verification email integration with AUTH-001
- Development-safe fallback (logs to console when API key missing)
- Reusable email service layer for future features

---

## **Email Provider: Resend**

**Selected Provider:** Resend  
**Rationale:** Built for Next.js, simplest API, excellent TypeScript support, free tier available

**Alternative Providers Evaluated:**
- SendGrid: Industry standard but more complex
- Mailgun: Good but Resend better for Next.js
- AWS SES: Most powerful but premature for foundation

---

## **Setup Instructions**

### **1. Get Resend API Key**

1. Go to https://resend.com
2. Sign up for a free account
3. Navigate to API Keys (https://resend.com/api-keys)
4. Copy your API key (format: `re_...`)

### **2. Configure Environment**

Add to `.env.local` in `apps/web/`:

```bash
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM_ADDRESS="noreply@saintandstory.com"
```

### **3. Test in Development**

Without `RESEND_API_KEY`, emails are logged to console:

```bash
cd apps/web
npm run dev
```

When you register an account, the verification email appears in the server logs:

```
[EMAIL] Sending email: { to: 'user@example.com', subject: '...' }
[EMAIL] No RESEND_API_KEY configured. Email would be sent to: user@example.com
[EMAIL] Subject: Verify Your Email — Restoration Community
[EMAIL] Body (first 200 chars): <!DOCTYPE html>...
```

---

## **Email Service Architecture**

**File:** `src/lib/email.ts`

**Core Functions:**

### `sendEmail(options: EmailOptions)`

Low-level email sending function.

```typescript
const result = await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome',
  html: '<p>Hello</p>',
});

if (result.success) {
  console.log('Email sent:', result.id);
} else {
  console.error('Email failed:', result.error);
}
```

**Returns:**
```typescript
{
  success: boolean;
  id?: string;        // Resend email ID (if successful)
  error?: string;     // Error message (if failed)
}
```

### `sendVerificationEmail(email, token)`

Sends account verification email.

Usage:
```typescript
import { sendVerificationEmail } from '@/lib/email';

await sendVerificationEmail('user@example.com', 'token_xyz');
```

**Email Contains:**
- Verification link: `/auth/verify-email-token?token=...`
- Expires in 24 hours
- Branded template with Restoration Community styling

### `sendPasswordResetEmail(email, token)`

Placeholder for future password recovery. Same interface as verification email.

---

## **Authentication Flow Integration**

### **User Registration**

```
1. User registers at /auth/register
   ↓
2. POST /api/auth/register
   - Create user account
   - Generate verification token (24-hour expiry)
   - Send verification email
   ↓
3. Email delivered (or logged in development)
   ↓
4. User clicks link: /auth/verify-email-token?token=xxx
   ↓
5. Token validated and email marked verified
   ↓
6. Redirect to /auth/verify-email-success
```

### **Verification Resend**

```
1. User at /auth/verify-email clicks "Resend Email"
   ↓
2. POST /api/auth/resend-verification
   - Delete old verification tokens
   - Generate new token (24-hour expiry)
   - Send verification email
   ↓
3. Email delivered
```

### **Email Verification**

```
1. User visits /auth/verify-email-token?token=xxx (from email link)
   ↓
2. GET /auth/verify-email-token handler
   - Find token in database
   - Check expiry (24 hours)
   - Update user.emailVerified
   - Delete token
   ↓
3. Redirect to success or error page
   - Success: /auth/verify-email-success
   - Invalid/Expired: /auth/verify-email-error?reason=...
```

---

## **Environment Variables**

**Required (for production):**

```bash
RESEND_API_KEY="re_..."         # Resend API key from https://resend.com/api-keys
EMAIL_FROM_ADDRESS="..."        # From address for all emails
```

**Optional (defaults shown):**

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Used for email links
```

---

## **Development Workflow**

### **Without Resend API Key (Development)**

Emails are logged to console output.

```bash
cd apps/web
npm run dev
```

Register an account. In terminal output:

```
[EMAIL] Sending email: { to: 'test@example.com', subject: 'Verify Your Email...' }
[EMAIL] No RESEND_API_KEY configured. Email would be sent to: test@example.com
[EMAIL] Subject: Verify Your Email — Restoration Community
[EMAIL] Body (first 200 chars): <!DOCTYPE html>...
```

Manual verification:
1. Copy the verification token from the log
2. Visit: `http://localhost:3000/auth/verify-email-token?token=YOUR_TOKEN`
3. Account is verified

### **With Resend API Key**

Emails are sent to real inboxes.

```bash
# 1. Set environment variable
echo 'RESEND_API_KEY="re_..."' >> apps/web/.env.local

# 2. Start dev server
npm run dev

# 3. Register account
# Verification email delivered to real inbox

# 4. Click link in email
# Account activated automatically
```

---

## **Email Templates**

### **Verification Email**

- **Subject:** Verify Your Email — Restoration Community
- **Contains:**
  - Welcome message
  - Verification button with 24-hour expiry link
  - Copy-paste link as fallback
  - Footer with Restoration Community branding

### **Password Reset Email** (Future)

- **Subject:** Reset Your Password — Restoration Community
- **Contains:**
  - Password reset button with 1-hour expiry link
  - Assurance that password won't change if not reset
  - Footer with branding

---

## **Email Sending Behavior**

### **Success**

When email sends successfully:
- Log: `[EMAIL] Email sent successfully: email_id`
- Return: `{ success: true, id: 'email_id' }`
- No exception thrown
- API call succeeds even if email fails

### **Failure (with API key)**

If Resend API fails:
- Log: `[EMAIL] Resend error: {...}`
- Return: `{ success: false, error: '...' }`
- Registration still succeeds (email can be resent)

### **Development (no API key)**

If `RESEND_API_KEY` not configured:
- Log email details to console
- Return: `{ success: true, id: 'dev-fallback' }`
- No actual email sent

---

## **Testing Email Integration**

### **Test Verification Email Send**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

Expected response:
```json
{
  "id": "user_id",
  "email": "test@example.com",
  "message": "Account created. Check your email to verify."
}
```

Check logs or email inbox for verification email.

### **Test Token Verification**

If using development mode (no API key), copy the token from logs and visit:

```
http://localhost:3000/auth/verify-email-token?token=TOKEN_FROM_LOGS
```

If using real Resend, click the link from the email.

---

## **Future Extensions**

### **Password Reset** (AUTH-003)

Already scaffolded:
- `sendPasswordResetEmail()` function exists
- Email template prepared
- API structure ready
- Just needs to be wired to password reset flow

### **Notifications** (NOTIF-001)

Can extend email service for:
- Prayer request notifications
- Mentor messages
- Community updates
- Stage progression notifications

### **Email Templates**

Current templates are HTML strings. Future improvement:
- React email components (more maintainable)
- Template previews
- A/B testing
- Personalization

### **Webhooks**

Resend supports webhooks for:
- Email delivery confirmation
- Bounce handling
- Complaint tracking

Future: Monitor email health and handle bounces.

---

## **Production Deployment**

### **Vercel Deployment**

1. Set `RESEND_API_KEY` in Vercel environment variables
2. Set `EMAIL_FROM_ADDRESS` (should match Vercel domain or verified Resend domain)
3. Deploy normally
4. Emails send to real inboxes

### **Email Domain Configuration**

By default, emails come from Resend's domain. To use your own domain:

1. Add domain in Resend dashboard
2. Add DNS records (DKIM, SPF, DMARC)
3. Update `EMAIL_FROM_ADDRESS` to use your domain
4. Verify in Resend dashboard

---

## **Troubleshooting**

### **Email not sending**

**Development (no API key):**
- Check console logs for `[EMAIL]` messages
- Logs appear in terminal where `npm run dev` runs

**Production (with API key):**
- Verify `RESEND_API_KEY` is set in Vercel
- Check Resend dashboard for delivery status
- Review Resend logs: https://resend.com/emails

### **Verification link not working**

- Link expires after 24 hours
- Token must be exactly as generated
- Check database: `email_verification_tokens` table
- Use resend endpoint: `/api/auth/resend-verification`

### **Email from wrong address**

- Update `EMAIL_FROM_ADDRESS` in `.env.local`
- Ensure domain is verified in Resend
- For custom domain, add DNS records in Resend

---

## **Security**

**API Key Safety:**
- Never commit `RESEND_API_KEY` to Git
- Use `.env.local` (in `.gitignore`)
- Rotate API key if exposed
- Use environment variables for production

**Email Validation:**
- Emails validated server-side in registration
- Tokens are cryptographically random (32 bytes)
- Tokens expire after 24 hours
- Expired tokens automatically deleted

**User Privacy:**
- Verification emails contain only necessary information
- No unsubscribe links (not required for transactional emails)
- No tracking pixels
- No marketing content

---

## **References**

- Resend Docs: https://resend.com/docs
- Resend API Keys: https://resend.com/api-keys
- Email RFC 5322: https://tools.ietf.org/html/rfc5322
- DKIM/SPF/DMARC: https://resend.com/blog/email-authentication

---

**Last Updated:** 2026-07-25  
**Status:** Active  
**Relevant Executable:** INFRA-002
