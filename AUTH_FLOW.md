# Authentication Flow — AUTH-002 Verified User Sign In

This document describes the complete authentication flow for the Restoration Community platform.

---

## **Complete User Journey**

```
1. VISITOR ARRIVES
   ↓
2. REGISTRATION (AUTH-001)
   - Visitor creates account with email, password, name
   - Account created with email unverified
   - Verification token generated (24-hour expiry)
   - Verification email sent
   ↓
3. EMAIL VERIFICATION (AUTH-001 + INFRA-002)
   - Visitor clicks link in email
   - Token validated
   - Email marked verified
   ↓
4. SIGN IN (AUTH-002) ← You are here
   - Visitor signs in with email and password
   - Credentials validated
   - Session created
   ↓
5. AUTHENTICATED ACCESS
   - Verified user accesses dashboard
   - Session persists
   ↓
6. ONBOARDING (Future: ONBOARD-001)
   - Complete profile
   - Accept covenant
   - Begin restoration journey
```

---

## **Sign-In Flow Detailed**

### **1. Visitor Accesses Sign-In Page**

```
GET /auth/signin
```

**Page displays:**
- Email input field
- Password input field
- "Sign In" button (disabled until form valid)
- "Forgot password?" link
- "Create an account" link

**Form validation (client-side):**
- Email required and valid format
- Password required (non-empty)
- Button disabled until both fields valid

---

### **2. Visitor Submits Credentials**

```
POST via NextAuth /api/auth/callback/credentials
{
  email: "user@example.com",
  password: "SecurePassword123!",
  redirect: false
}
```

**Handled by:** Auth.js with Credentials provider

---

### **3. Credentials Validated**

**In:** `/lib/auth.ts` (Credentials provider authorize callback)

**Steps:**
1. Email must be provided
2. Password must be provided
3. Find user by email in database
4. Compare provided password with hashed password using bcrypt
5. Verify email is marked verified (emailVerified is not null)

**If any step fails, return null (authentication fails)**

---

### **4. Response to Client**

**Success (`user.emailVerified != null`):**
```json
{
  "ok": true,
  "error": null,
  "status": 200,
  "url": null
}
```

Client redirects to `/dashboard`

**Failure:**
```json
{
  "ok": false,
  "error": "Reason...",
  "status": 401,
  "url": "/auth/signin"
}
```

Error message displayed to user.

---

### **5. Session Created**

**Session strategy:** JWT

**Session contains:**
- User ID
- Email
- Session token
- Expiry time

**Stored in:**
- Database: `sessions` table
- Client: Secure HTTP-only cookie

---

### **6. User Redirected to Dashboard**

```
GET /dashboard
```

**Dashboard server-side:**
1. Get server session (validates JWT)
2. Redirect to signin if no session
3. Fetch user from database
4. Redirect to onboarding if not onboarded
5. Display dashboard (if onboarded)

---

## **Error Scenarios**

### **Scenario 1: Email Not Found**

**User enters:** email@unknown.com  
**System:** Queries database, no user found  
**Response:** `null` from authorize callback  
**Error shown:** "No account found with this email address."  
**Action:** Suggest creating an account

### **Scenario 2: Wrong Password**

**User enters:** correct@email.com + wrong_password  
**System:** User found, password comparison fails  
**Response:** `null` from authorize callback  
**Error shown:** "Incorrect email or password."  
**Note:** Generic error prevents email enumeration

### **Scenario 3: Email Not Verified**

**User enters:** verified email + correct password  
**System:** User found, password correct, BUT emailVerified is null  
**Response:** `null` from authorize callback  
**Error shown:** "Your email has not been verified yet..."  
**Action:** Offer to resend verification email

### **Scenario 4: Valid Credentials**

**User enters:** verified@email.com + correct password  
**System:** All checks pass  
**Response:** `{ ok: true }`  
**Action:** Create session, redirect to /dashboard

---

## **Session Management**

### **Session Created**

```typescript
// In Auth.js JWT callback
token.id = user.id;

// In Auth.js session callback
session.user.id = token.id;
```

**Session persists:**
- Database: `sessions` table stores sessionToken
- Client: HTTP-only cookie with encrypted token

### **Session Validation**

**On each request to protected pages:**
1. Retrieve session cookie
2. Validate JWT signature
3. Check session hasn't expired
4. Return user context to page/API

**If invalid:**
- Redirect to /auth/signin

### **Session Cleanup**

**Automatic:**
- Expiry time set on session creation
- Expired sessions cleaned up by Auth.js

**Manual:**
- User signs out (calls `signOut()`)
- Session deleted from database
- Cookie cleared from client

---

## **Protected Routes**

### **Server-Side Protected**

Pages that require authentication:

```typescript
const session = await getServerSession(authOptions);
if (!session) redirect('/auth/signin');
```

**Examples:**
- `/dashboard` — Requires verified user
- `/onboarding` — Requires verified user
- `/journey` — Requires verified user
- `/profile` — Requires verified user

### **Client-Side Protected**

To protect client-side navigation:

```typescript
import { useSession } from 'next-auth/react';

export function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return <p>Please sign in</p>;
  }

  return <p>Welcome, {session?.user?.email}</p>;
}
```

### **API Route Protected**

To protect API routes:

```typescript
const session = await getServerSession(authOptions);

if (!session) {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}

// Handle authenticated request
```

---

## **Sign Out**

### **Client-Side Sign Out**

```typescript
import { signOut } from 'next-auth/react';

function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/auth/signin' })}>
      Sign Out
    </button>
  );
}
```

**Process:**
1. Call `signOut()`
2. Auth.js clears session
3. Redirect to `/auth/signin`
4. Cookie deleted from client

### **Session Expires**

When session JWT expires:
- User must sign in again
- Automatic on next request to protected route
- User redirected to signin

---

## **Security Properties**

### **Password Hashing**

- Algorithm: bcryptjs
- Cost factor: 12 (strong)
- Passwords never stored in plaintext
- Passwords never logged

### **Email Verification**

- Required before sign-in
- Prevents account takeover via fake emails
- Token must be validated before account activation

### **Session Security**

- JWT signed with NEXTAUTH_SECRET
- HTTP-only cookies (not accessible to JavaScript)
- CSRF protection built into Auth.js
- Sessions stored in database for validity checks

### **Timing Attacks**

- Password comparison: Safe (bcryptjs handles)
- Error messages: Generic ("Incorrect email or password")
- Response time: Consistent (no information leakage)

---

## **Configuration Files**

### **Auth Configuration**

**File:** `/lib/auth.ts`

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Email/password provider
      // Validates credentials and checks emailVerified
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Sign-in page URL
  },
  session: {
    strategy: 'jwt',  // Use JWT for sessions
  },
  secret: process.env.NEXTAUTH_SECRET,  // Session secret
};
```

### **Environment Variables**

**Required for production:**

```bash
NEXTAUTH_SECRET="generate-random-secret"  # For JWT signing
NEXTAUTH_URL="https://yourdomain.com"     # For cookie domain
```

**Optional (defaults work locally):**

```bash
NEXTAUTH_DEBUG="false"  # Enable debug logging
```

---

## **Testing Sign-In**

### **Test Case 1: Successful Sign-In**

**Setup:**
1. Register account with verified email
2. Wait for verification email
3. Click verification link
4. Email is verified

**Test:**
1. Visit `/auth/signin`
2. Enter email and password
3. Click "Sign In"
4. Redirected to `/dashboard`
5. Session cookie present

**Verify:**
- Dashboard displays authenticated content
- User information correct

### **Test Case 2: Invalid Email**

**Test:**
1. Visit `/auth/signin`
2. Enter fake@example.com + any password
3. Click "Sign In"
4. Error: "No account found with this email address."
5. Remain on signin page

### **Test Case 3: Wrong Password**

**Test:**
1. Visit `/auth/signin`
2. Enter valid email + wrong password
3. Click "Sign In"
4. Error: "Incorrect email or password."
5. Remain on signin page

### **Test Case 4: Unverified Email**

**Test:**
1. Register new account (don't verify email)
2. Visit `/auth/signin`
3. Enter email + password
4. Click "Sign In"
5. Error: "Your email has not been verified yet..."
6. Offer to resend verification

### **Test Case 5: Empty Fields**

**Test:**
1. Visit `/auth/signin`
2. Leave email empty
3. Button is disabled
4. Button text shows "Sign In" (not loading)

**Test:**
1. Enter email only (leave password empty)
2. Button is disabled

**Test:**
1. Enter both fields
2. Button is enabled
3. Can click to submit

---

## **Future Extensions**

### **Password Reset (AUTH-003)**

- Use same signin page
- "Forgot password?" link navigates to recovery
- Recovery sends password reset email
- User clicks link in email
- Sets new password
- Signs in with new password

### **Multi-Factor Authentication (AUTH-004)**

- After password validation succeeds
- Request second factor (TOTP, SMS, email)
- Validate factor
- Create session

### **OAuth Providers (AUTH-005)**

- Add Google/GitHub providers to Auth.js
- User can sign in with OAuth
- OAuth account linked to existing email or new account

### **Account Recovery (AUTH-006)**

- Locked accounts
- Suspended accounts
- Account deletion

---

## **Debugging**

### **Enable Debug Logging**

```bash
# In .env.local
NEXTAUTH_DEBUG=true
DEBUG=next-auth:*
```

**Logs show:**
- Provider callbacks
- Session creation
- JWT encoding/decoding
- Cookie operations

### **Inspect Session**

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const session = await getServerSession(authOptions);
console.log('Current session:', session);
```

### **Check Database**

```bash
# View sessions table
SELECT * FROM sessions WHERE "userId" = 'user_id';

# View users (check emailVerified)
SELECT email, "emailVerified", role FROM users WHERE email = 'user@example.com';
```

---

## **References**

- NextAuth.js Docs: https://next-auth.js.org
- NextAuth.js Credentials: https://next-auth.js.org/providers/credentials
- JWT Security: https://tools.ietf.org/html/rfc7519
- OWASP Authentication: https://owasp.org/www-project-authentication-cheat-sheet/

---

**Last Updated:** 2026-07-25  
**Status:** Active  
**Related Executables:** AUTH-001, AUTH-002, INFRA-002
