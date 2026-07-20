# ADR-001: Authentication Strategy

**Status:** Accepted

**Date:** 2026-07-20

**Author:** Engineering Team

---

## Context

The Restoration Community platform requires a foundational authentication and identity system to support user registration, sign-in, session management, and role-based authorization.

Authentication is a foundational architectural decision. Changing authentication systems later is painful and risks security vulnerabilities. This decision must be made carefully and clearly before implementation.

The platform must support:

- Email/password authentication
- Email verification
- Secure password reset
- Reliable session management
- Role-based authorization
- Future extensibility to OAuth providers (Google, Microsoft, etc.)

The decision must align with the High-Level Technical Architecture (Section 6: Technology Stack and Rationale) which specifies:

- Frontend: Next.js 14 (App Router)
- Backend: Node.js with TypeScript
- Database: PostgreSQL with Prisma ORM
- Authentication: Industry-standard authentication provider (OAuth 2.0 compatible)

---

## Decision

**Adopt Auth.js (formerly NextAuth.js) with Prisma PostgreSQL adapter for user authentication and session management.**

Auth.js will handle:
- User registration and email verification
- Email/password authentication
- Secure session management
- Password reset workflows
- Foundation for OAuth provider integration

---

## Rationale

### Why Auth.js?

**Maturity and Stability**

Auth.js is widely used in production applications. It has a large community, extensive documentation, and regular security updates. This reduces the risk of authentication vulnerabilities.

**Next.js Integration**

Auth.js is built specifically for Next.js and integrates seamlessly with Next.js 14's App Router. No friction between framework and authentication.

**Prisma Adapter**

The Prisma adapter allows Auth.js to work directly with our PostgreSQL database through Prisma ORM. No separate database schema or additional tools required.

**Security**

Auth.js handles password hashing, session tokens, email verification, and CSRF protection correctly. Building these ourselves introduces significant security risk.

**Extensibility**

Auth.js supports multiple authentication strategies:
- Email/password credentials (current)
- OAuth providers: Google, GitHub, Microsoft (future)
- Custom JWT providers (future)

We can add OAuth without redesigning the authentication layer.

**Alignment with Architecture**

Auth.js is an industry-standard authentication provider, consistent with the High-Level Technical Architecture's requirement for "industry-standard authentication provider (OAuth 2.0 compatible)."

### Why Not Alternatives?

**Home-Grown Authentication**

❌ Introduces security risk (password hashing, session management are easy to get wrong)  
❌ Requires ongoing maintenance and security updates  
❌ Diverts engineering effort from ministry features  
❌ Does not benefit the Restoration Community's mission  

**Firebase Authentication**

❌ Introduces vendor lock-in  
❌ Requires external service dependency  
❌ More complex than needed for our architecture  
❌ Less control over data and sessions  

**Clerk or Auth0**

❌ Adds external service dependency  
❌ Monthly costs  
❌ Not necessary given our stack  

---

## Implementation Approach

### User and Profile Separation

Authentication concerns will be separated from ministry data from the start:

**User Model (Authentication)**
```
User
  - id
  - email (unique, verified)
  - password (hashed by Auth.js)
  - emailVerified (timestamp or null)
  - role (VISITOR, PARTICIPANT, MENTOR, COMMUNITY_LEADER, ADMIN)
  - createdAt
  - updatedAt
```

**Profile Model (Ministry Data)**
```
Profile
  - id
  - userId (foreign key to User)
  - displayName
  - bio
  - restorationJourneyStarted (optional)
  - createdAt
  - updatedAt
```

This separation ensures:
- Authentication logic remains focused and secure
- Ministry-specific data can evolve without touching authentication
- Role-based authorization can reference User without Profile dependencies
- Future profile extensions won't require authentication layer changes

### Implementation Steps

1. Install Auth.js and Prisma adapter
2. Update Prisma schema with User and Profile models
3. Configure Auth.js with email/password provider
4. Implement registration endpoint with email verification
5. Implement sign-in endpoint
6. Implement password reset flow
7. Add authentication middleware to Next.js
8. Implement sign-out
9. Test end-to-end

### Security Considerations

- Passwords are hashed by Auth.js (bcrypt or similar)
- Sessions are stored securely in the database
- Email verification prevents fake email addresses
- Password reset tokens are time-limited
- CSRF protection is enabled by default

---

## Consequences

### Positive

- **Security** — Authentication is handled by a mature, battle-tested library
- **Speed** — No time spent building authentication from scratch
- **Maintainability** — Auth.js handles security updates and patches
- **Flexibility** — OAuth providers can be added later without redesign
- **Focus** — Engineering effort can focus on restoration features, not security plumbing
- **User Experience** — Auth.js provides well-tested flows (registration, password reset, etc.)

### Negative

- **Dependency** — The platform depends on Auth.js for authentication
- **Learning Curve** — Team must learn Auth.js patterns and APIs
- **Lock-In** — Switching authentication systems later is difficult (but this is true for any choice)

### Mitigation

- Auth.js is actively maintained and has a large community
- Documentation is comprehensive
- The Prisma adapter keeps our data under our control (not vendor lock-in)
- The separation of User and Profile minimizes authentication dependencies elsewhere

---

## Alternatives Considered

### 1. Home-Grown Authentication

Build our own user registration, password hashing, session management, and password reset.

**Rejected because:**
- High risk of security vulnerabilities
- Time spent on authentication is time not spent on restoration features
- Ongoing maintenance burden
- No benefit to the ministry

### 2. Firebase Authentication

Use Google's Firebase for authentication.

**Rejected because:**
- Adds external service dependency
- Less control over user data
- More complex than needed
- Costs money

### 3. Clerk or Auth0

Use third-party authentication services.

**Rejected because:**
- Adds external service dependency
- Monthly costs
- Not necessary given our stack
- Our data remains in our control with Auth.js + Prisma

### 4. NextAuth.js v4 (Legacy)

Use older version of NextAuth.js.

**Rejected because:**
- Auth.js (v5) is the current, maintained version
- Better Next.js 14 App Router support
- Better TypeScript support
- Security improvements

---

## Traceability

**Related Documents:**

- High-Level Technical Architecture, Section 6 (Technology Stack and Rationale)
- Product Requirements Document, PRD 04.01 (Identity & Authentication)
- Engineering Constitution, Article II (Alignment with Mission)

**Implements:**

- PRD 04.01-REQ-AUTH-001 through REQ-AUTH-027 (Identity & Authentication requirements)
- High-Level Technical Architecture authentication requirements

**Superseded By:**

None (this is the initial authentication decision).

---

## Implementation Notes

Auth.js uses environment variables for configuration:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
```

The Prisma adapter requires specific tables in the database; Prisma migrations will handle this automatically.

Email sending will be implemented later; for initial development, email verification can be manual or use a development provider.

---

## Next Steps

1. Record this ADR as ADR-001
2. Implement Auth.js with Prisma adapter
3. Create User and Profile models in Prisma schema
4. Implement registration, email verification, and sign-in flows
5. Test authentication end-to-end
6. Proceed to authorization (role-based access control)
