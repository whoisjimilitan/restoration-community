# Restoration Community Platform - Gap Analysis
## Comparing Current Implementation Against PRD Specifications

**Generated:** 2026-07-21
**Purpose:** Identify missing features and misalignments before proceeding with Phase B

---

## PHASE A REVIEW (Foundation - Already Implemented)

### PRD 04.01 - Identity & Authentication

**IMPLEMENTED:**
- ✅ Auth.js with Credentials provider (ADR-001)
- ✅ User model with email, password fields
- ✅ Secure password hashing via Auth.js
- ✅ Session management via Auth.js
- ✅ Registration endpoint (/api/auth/register)
- ✅ Sign-in flow

**GAPS - MISSING REQUIREMENTS:**
- ❌ **Email verification** (REQ-AUTH-003): Must verify ownership of email before activating account
  - *Current:* Account is active immediately after registration
  - *Required:* Email verification workflow with verification token
  
- ❌ **Password reset flow** (REQ-AUTH-009, REQ-AUTH-010): Secure password reset via verified identity
  - *Current:* Not implemented
  - *Required:* Password reset endpoint with time-limited tokens

- ❌ **MFA support** (REQ-AUTH-011, REQ-AUTH-012): Multi-factor authentication for privileged roles
  - *Current:* Not implemented (listed as optional)
  - *Required:* Framework to support MFA, at least optional for participants

- ❌ **Account lifecycle management** (REQ-AUTH-019 to REQ-AUTH-022): Suspend, deactivate accounts
  - *Current:* Not implemented
  - *Required:* Account suspension and deactivation endpoints

- ❌ **Security protections** (REQ-AUTH-023 to REQ-AUTH-025): Rate limiting, account lockout, brute force protection
  - *Current:* Not implemented
  - *Required:* Rate limiting on auth endpoints, account lockout after failed attempts

- ❌ **Authentication audit logging** (REQ-AUTH-026, REQ-AUTH-027): Immutable records of auth events
  - *Current:* console.log only, no audit trail
  - *Required:* Database audit records with timestamp, account ID, event type, outcome

**SEVERITY:** Medium-High. Email verification is critical for security; audit logging required for compliance.

---

### PRD 04.02 - Onboarding

**IMPLEMENTED:**
- ✅ Welcome page with introduction
- ✅ Covenant acceptance checkbox
- ✅ Profile information collection (displayName, preferredName, etc.)
- ✅ Form validation
- ✅ Redirect to dashboard on completion

**GAPS - MISSING REQUIREMENTS:**
- ❌ **Community introduction** (REQ-ONB-003, REQ-ONB-004): Must introduce Restoration Community purpose and mission clearly
  - *Current:* "Welcome to the Community. Let's get to know you." - minimal intro
  - *Required:* Section explaining: who we are, why we exist, what restoration means, Christ-centeredness

- ❌ **Structured covenant flow** (REQ-ONB-005, REQ-ONB-006): Record covenant acceptance with timestamp
  - *Current:* Checkbox accepted, timestamp stored in Profile model's covenantAcceptedAt, but no explicit recording requirement
  - *Required:* Ensure acceptance is explicitly logged (may already work)

- ❌ **Initial orientation** (REQ-ONB-010, REQ-ONB-011): Orientation explaining Restoration Journey and available opportunities
  - *Current:* Not implemented
  - *Required:* Guidance on restoration stages, how to access mentoring, learning resources, community

- ❌ **Accessibility compliance** (REQ-ONB-012 to REQ-ONB-014): Keyboard navigation, assistive tech, clear language
  - *Current:* Components built but not explicitly tested for accessibility
  - *Required:* WCAG 2.1 AA compliance verification, focus management, semantic HTML

- ❌ **Progress resumability** (REQ-ONB-018, REQ-ONB-019): Store onboarding progress, allow resumption
  - *Current:* Form resets on page reload; no progress saved
  - *Required:* Persisted onboarding state, resumable flow

- ❌ **Next step guidance** (REQ-ONB-017): Direct participant to next recommended step after onboarding
  - *Current:* Redirects to /dashboard
  - *Required:* Should guide to Journey page or first restoration stage view

**SEVERITY:** High. Onboarding is Journey 2 (critical entry point); missing community introduction and orientation significantly weaken the experience.

---

### PRD 04.03 - Participant Profiles

**IMPLEMENTED:**
- ✅ Profile model with core fields (displayName, preferredName, countryRegion, timeZone, bio)
- ✅ Profile creation during onboarding
- ✅ Profile updates via PUT endpoint
- ✅ Privacy: covenantAccepted tracking

**GAPS - MISSING REQUIREMENTS:**
- ❌ **Profile visibility controls** (REQ-PROF-009, REQ-PROF-010): Define visibility (public/community/restricted)
  - *Current:* No visibility settings in model or endpoints
  - *Required:* Visibility enum in Profile, filtering in GET endpoints based on visibility + user role

- ❌ **Profile photograph support** (REQ-PROF-006 to REQ-PROF-008): Optional photo with upload and removal
  - *Current:* Not implemented
  - *Required:* profilePhotoUrl field (model exists), upload endpoint, content validation

- ❌ **Audit history of profile changes** (REQ-PROF-014): Track who changed what when
  - *Current:* Not implemented
  - *Required:* Immutable audit records for significant profile changes

- ❌ **Privacy information display** (REQ-PROF-012): Inform participants how their profile info is used
  - *Current:* No privacy notice in onboarding or profile edit
  - *Required:* Privacy statement during onboarding

**SEVERITY:** Medium. Core profile functionality works, but visibility controls and audit trails are missing. Photos are nice-to-have.

---

### PRD 04.04 - Restoration Journey

**IMPLEMENTED:**
- ✅ 7 RestorationStage model (immutable, sequence enforced)
- ✅ StageContent with description, Scripture, guidance (versionable)
- ✅ UserRestoration tracks currentStageId
- ✅ StageTransition immutable history of progressions
- ✅ StageReflection for user reflections per stage
- ✅ 28 resources seeded (Scripture, Teaching, Reflection, Prayer per stage)
- ✅ Journey API endpoints (/api/restoration/journey)
- ✅ Advance endpoint enforces sequence (can't skip, can't exceed 7)
- ✅ Reflection API endpoint
- ✅ Dashboard shows progress %

**GAPS - MISSING REQUIREMENTS:**
- ❌ **Reflection privacy enforcement** (REQ-RJ-008): Personal reflections remain private unless explicitly shared
  - *Current:* Reflections stored; no visibility controls
  - *Required:* isPrivate flag on StageReflection, only owner + authorized roles can see

- ❌ **Journey history preservation** (REQ-RJ-003): History preserved throughout account lifecycle even if suspended/deactivated
  - *Current:* Foreign key cascade; suspending account might delete journey
  - *Required:* Soft deletes or archive on account deactivation

- ❌ **Milestone support** (REQ-RJ-009, REQ-RJ-010): Optional milestones representing participation (not achievement)
  - *Current:* Not implemented
  - *Required:* Milestone model linking to stages, recording completion dates

- ❌ **Encouragement/guidance system** (REQ-RJ-012 to REQ-RJ-014): Contextual guidance for current stage
  - *Current:* Stage content displayed but no personalized encouragement
  - *Required:* Dynamic guidance based on stage + user's progress

- ❌ **Anti-gamification enforcement** (REQ-RJ-016 to REQ-RJ-018): Ensure no ranking, scoring, levels
  - *Current:* Dashboard shows progress % (acceptable per spec, shows participation not achievement)
  - *Required:* Audit: ensure no hidden scoring, leaderboards, or competitive mechanics

**SEVERITY:** Medium. Core journey progression works; privacy controls and milestone tracking are missing but not blocking. Anti-gamification verified (progress % is acceptable).

---

## PHASE B REQUIREMENTS (Not Yet Implemented)

### PRD 04.05 - Mentoring (REQUIRED FOR LAUNCH)
- ❌ Entire module not implemented
- **Critical requirements:** Mentor eligibility, assignment, communication support, safeguarding
- **Estimate:** 15-20 API endpoints, mentor dashboard, pairing logic

### PRD 04.06 - Community (REQUIRED FOR LAUNCH)
- ❌ Entire module not implemented
- **Critical requirements:** Community groups, membership, communication, moderation
- **Estimate:** 12-15 API endpoints, group management, messaging

### PRD 04.07 - Learning Resources (REQUIRED FOR LAUNCH)
- ⚠️ **Partially implemented:** Resources exist (seeded), but endpoints incomplete
- **Missing:** Catalog discovery, resource recommendations, progress tracking on resources
- **Estimate:** 5-8 additional endpoints

### PRD 04.08 - Service Opportunities (OPTIONAL FOR MVP)
- ❌ Entire module not implemented
- **Requirements:** Service catalogue, volunteer signup, coordination
- **Estimate:** 10-12 API endpoints

### PRD 04.09 - Honest Work & Living (OPTIONAL FOR MVP)
- ❌ Entire module not implemented
- **Requirements:** Work opportunities, skills development, goal planning
- **Estimate:** 8-10 API endpoints

### PRD 04.10 - Notifications & Communications (REQUIRED FOR LAUNCH)
- ❌ Entire module not implemented
- **Critical requirements:** Notification system, communication preferences, no engagement manipulation
- **Estimate:** 8-10 API endpoints + background job for notifications

### PRD 04.11 - Events & Gatherings (OPTIONAL FOR MVP)
- ❌ Entire module not implemented
- **Requirements:** Event management, registration, attendance
- **Estimate:** 8-10 API endpoints

### PRD 04.12 - Safeguarding & Incident Management (REQUIRED FOR LAUNCH)
- ❌ Entire module not implemented
- **Critical requirements:** Case management, escalation workflows, confidentiality, immutable audit
- **Estimate:** 15-20 API endpoints + special access controls

### PRD 04.13 - Roles, Permissions & Authority (REQUIRED FOR LAUNCH)
- ⚠️ **Partially implemented:** Role enum exists (VISITOR, PARTICIPANT, MENTOR, COMMUNITY_LEADER, ADMIN)
- **Missing:** Permission enforcement, delegation, role management endpoints, separation of duties
- **Estimate:** 8-10 API endpoints + middleware/decorators

### PRD 04.14 - Reporting & Analytics (OPTIONAL FOR MVP)
- ❌ Entire module not implemented
- **Requirements:** Ministry dashboards, reporting, analytics
- **Estimate:** 10-15 endpoints/dashboard components

### PRD 04.15 - Audit, Compliance & Records (REQUIRED FOR LAUNCH)
- ⚠️ **Partially implemented:** Schema supports audit, but no audit logging infrastructure
- **Missing:** Centralized audit logging, record retention, legal holds
- **Estimate:** 5-8 endpoints + audit middleware

---

## SUMMARY

### Phase A Status (Foundation)
| Module | Status | Severity |
|--------|--------|----------|
| 04.01 Auth | 70% complete | Medium-High gaps (email verification, audit logging) |
| 04.02 Onboarding | 50% complete | High gaps (community intro, orientation, accessibility) |
| 04.03 Profiles | 75% complete | Medium gaps (visibility, audit history) |
| 04.04 Journey | 85% complete | Low-Medium gaps (reflection privacy, milestones) |

### Phase B Status (Core Features)
| Module | Priority | Status |
|--------|----------|--------|
| 04.05 Mentoring | REQUIRED | 0% |
| 04.06 Community | REQUIRED | 0% |
| 04.07 Learning Resources | REQUIRED | ~20% |
| 04.10 Notifications | REQUIRED | 0% |
| 04.12 Safeguarding | REQUIRED | 0% |
| 04.13 Roles & Permissions | REQUIRED | ~30% |
| 04.15 Audit & Compliance | REQUIRED | ~20% |
| 04.08 Service Opportunities | OPTIONAL | 0% |
| 04.09 Honest Work & Living | OPTIONAL | 0% |
| 04.11 Events & Gatherings | OPTIONAL | 0% |
| 04.14 Reporting & Analytics | OPTIONAL | 0% |

---

## RECOMMENDED ACTION PLAN

### IMMEDIATE (Phase A Completion)
1. **Authentication:** Add email verification workflow + audit logging
2. **Onboarding:** Expand with community intro + orientation + accessibility compliance
3. **Profiles:** Add visibility controls + audit history
4. **Journey:** Add reflection privacy + milestone support

### PHASE B (Required for Launch)
1. **Mentoring** (highest complexity)
2. **Community** (high complexity)
3. **Roles & Permissions** (enable other modules)
4. **Safeguarding** (critical for trust)
5. **Audit & Compliance** (recording infrastructure)
6. **Learning Resources** (complete implementation)
7. **Notifications** (user engagement)

---

## FIDELITY ASSESSMENT

**Current alignment with PRDs:** 60-65%
**Critical gaps:** Email verification, audit logging, community orientation, visibility controls, role enforcement, safeguarding
**Non-blocking gaps:** Photos, milestones, analytics, optional modules

**Next step:** Fix Phase A gaps first, then begin Phase B (Mentoring → Community → Roles → Safeguarding).
