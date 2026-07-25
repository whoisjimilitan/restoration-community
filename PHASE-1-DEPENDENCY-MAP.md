---
type: planning-document
id: PHASE-1-DEPENDENCY-MAP
title: Phase 1 PRD Dependency Map
status: active
version: 1.0
date: 2026-07-25
---

# Phase 1 PRD Dependency Map

## Overview

This document maps all Phase 1 requirements against completed executables and identifies the next executable based on **platform dependencies**, not feature excitement.

**Sequencing principle:** Ministry dependency → Product requirement dependency → Architecture dependency → Executable order

---

## Phase 1 Completed Executables

### ✅ AUTH-001: Identity System
**Date:** Prior to audit  
**Authority:** PRD 04.01 (User Identity & Authentication)  
**Implements:**
- User registration via email
- Email verification
- Session management (NextAuth)
- Password hashing
- User model in database

**Completion Marker:** Build passes, user can register and sign in

---

### ✅ ONBOARD-001: First Journey Entry
**Date:** 09c1c31 (2026-07-25)  
**Authority:** PRD 04.02 (Onboarding Process)  
**Implements:**
- Onboarding flow (`/onboarding` page)
- Profile creation (displayName, timeZone, etc.)
- Covenant acceptance and versioning
- Redirect to dashboard upon completion
- UserRestoration initialization at stage 1

**Completion Marker:** User onboards → directed to dashboard

---

### ✅ JOURNEY-001: Canonical Restoration Journey
**Date:** 3b865ae (2026-07-25)  
**Authority:** PRD 04.04 (Restoration Journey System) + Book Two Chapters 1-7  
**Implements:**
- 7 restoration stages with canonical content
- StageContent populated with Book Two text (description, scripture, guidance)
- Dashboard displays current stage
- Journey page shows full stage view with reflection form
- API endpoints: `/api/restoration/journey`, `/api/restoration/stages`

**Completion Marker:** User sees canonical stage content on journey page

---

### ✅ GOV-003: Community Covenant as Authority
**Date:** 093ae37 (2026-07-25)  
**Authority:** PRD 02.02 (Community Covenant) + Book One  
**Implements:**
- Covenant document in governance folder
- Onboarding links to covenant
- User must accept covenant to proceed
- Covenant versioning mechanism

**Completion Marker:** Covenant appears in onboarding, can be versioned

---

### ✅ INFRA-003: Production Database Operations
**Date:** 4ebda3f (2026-07-25)  
**Authority:** PRD 01.04 (Reliability & Operations)  
**Implements:**
- Migration procedures (schema changes)
- Seed procedures (data population)
- Environment configuration
- Deployment checklist
- Troubleshooting guide

**Completion Marker:** Operations document committed, procedures documented

---

## Phase 1 Requirements Matrix

| PRD # | Requirement | Executable | Status | Notes |
|-------|-------------|-----------|--------|-------|
| 04.01 | User registration & auth | AUTH-001 | ✅ Complete | Email verification working |
| 04.02 | Onboarding flow | ONBOARD-001 | ✅ Complete | Profile + covenant + journey init |
| 04.03 | Participant profiles | ONBOARD-001 | ✅ Complete | Profile model, display name, timezone |
| 04.04 | Restoration journey | JOURNEY-001 | ✅ Complete | 7 stages + canonical content |
| 04.05 | Reflection & feedback | JOURNEY-001 | ⏳ Partial | Form exists; data persistence complete |
| 04.06 | Stage progression | ⏳ Pending | Not yet implemented | Requires stage advancement logic |
| 04.07 | Journey history | ⏳ Pending | Not yet implemented | Requires StageTransition queries |
| 04.08 | Performance metrics | ⏳ Pending | Not yet implemented | Requires analytics schema |
| 04.09 | Accessibility (WCAG) | ⏳ Partial | Not audited | Components built but not tested |
| 04.10 | Email notifications | ⏳ Pending | Not yet implemented | Requires Resend integration |
| 04.11 | Mobile responsiveness | ⏳ Partial | Not audited | Tailwind used but not tested |
| 04.12 | Safeguarding policy | ⏳ Pending | Not yet implemented | Authority exists in PRD; ministry doc needed |
| 04.13 | Error handling | ⏳ Partial | Implemented | Basic 404/500; not comprehensive |
| 04.14 | Rate limiting | ⏳ Pending | Not yet implemented | API routes not rate-limited |
| 04.15 | Logging & monitoring | ⏳ Partial | Implemented | Console.log in place; no persistent logging |

---

## Dependency Analysis

### Ministry Dependencies

```
Community Identity (GOV-003: Covenant)
    ↓
Personal Identity (AUTH-001: User registration)
    ↓
Restoration Participation (ONBOARD-001: Profile acceptance)
    ↓
Restoration Journey Foundation (JOURNEY-001: 7 stages with teaching)
    ↓
Restoration Action (NEXT: Stage progression + reflection)
    ↓
Restoration Accountability (LATER: Reflection review, mentor oversight)
    ↓
Restoration Community (LATER: Group gatherings, peer mentoring)
```

### Product Requirement Dependencies

```
04.01 (User Identity) ✅
    ↓
04.02 (Onboarding) ✅ — requires user identity
    ↓
04.03 (Profiles) ✅ — created during onboarding
    ↓
04.04 (Restoration Journey) ✅ — requires user + profile + onboarding complete
    ↓
04.05 (Reflection & Feedback) ✅ — requires journey to exist
    ↓
04.06 (Stage Progression) ⏳ — requires journey + reflection data
    ↓
04.07 (Journey History) ⏳ — requires progression to exist
    ↓
04.08 (Performance Metrics) ⏳ — requires history + progression
```

### Architecture Dependencies

```
Database Schema (Prisma models) ✅
    ↓
API Routes (journey, stages, reflection) ✅
    ↓
Page Components (dashboard, journey, reflection) ✅
    ↓
Stage Advancement Logic ⏳ (next)
    ↓
Reflection Processing ⏳
    ↓
History Queries ⏳
```

---

## Current Platform State

### Foundation Complete ✅
- User can register and sign in
- User can complete onboarding
- User can see canonical restoration stages
- User can view stage description + scripture + guidance
- User can submit reflection
- Database operations are documented

### Gap: User Cannot Progress

**Problem:** User is on stage 1, but there's no way to advance to stage 2.

**Current flow:**
1. User signs up → registers
2. User onboards → accepts covenant, creates profile
3. User arrives at dashboard → sees "Stage 1 of 7"
4. User goes to journey page → sees Truth stage content + reflection form
5. User submits reflection → ✅ Data saved
6. User looks for "Next stage" button → ❌ Doesn't exist

**Why this matters:**
- Reflection form exists but has no outcome
- Journey progression is stuck at stage 1
- Transition history table is empty (no data)
- User has no way to advance through restoration

**Architectural impact:**
- `StageTransition` model exists but is never populated
- `/api/restoration/advance` endpoint exists but logic is incomplete
- Frontend has no "Advance" button or logic

---

## Recommended Next Executable: JOURNEY-002

### JOURNEY-002: Stage Progression Logic

**Purpose:** Enable users to advance through the 7 stages

**Scope:**
- Create `/api/restoration/advance` logic (complete)
- Add "Ready to advance" / "Next stage" UI on journey page
- Validate user has completed reflection (minimum)
- Create StageTransition record (immutable history)
- Update UserRestoration.currentStageId
- Prevent advancement beyond stage 7

**Authority:**
- PRD 04.06 (Stage Progression) — user moves through stages
- CLAUDE_PROJECT_GUIDE.md, Section 3 (Slug Lookup) — pattern for user validation
- Book Two Conclusion (lines 1211-1287) — restoration is ongoing, not event-based

**Why now:**
1. **Ministry dependency:** User cannot experience the restoration journey without progression
2. **Product requirement:** 04.06 is next logical requirement after 04.05 (reflection)
3. **Architecture:** Requires UserRestoration update + StageTransition creation (tables already exist)
4. **User flow:** User reaches stage 1 → needs to be able to advance after reflection

**Not yet:**
- 04.07 (Journey history) — depends on progression data existing first
- 04.08 (Metrics) — depends on complete progression history
- 04.10 (Email notifications) — depends on events to notify about

**Not because excitement:** Because the platform has a gap. Reflection exists but progression doesn't.

---

## Phase 1 Sequencing Summary

| Sequence | Executable | Status | Completion Date | PRD Authority |
|----------|-----------|--------|-----------------|---------------|
| 1 | AUTH-001 | ✅ Complete | Pre-audit | 04.01 |
| 2 | GOV-003 | ✅ Complete | 093ae37 | 02.02 |
| 3 | ONBOARD-001 | ✅ Complete | 09c1c31 | 04.02, 04.03 |
| 4 | JOURNEY-001 | ✅ Complete | 3b865ae | 04.04 |
| 5 | INFRA-003 | ✅ Complete | 4ebda3f | 01.04 |
| **6** | **JOURNEY-002** | **⏳ Recommended** | **TBD** | **04.06** |
| 7 | JOURNEY-003 | Pending | TBD | 04.05 (reflection review) |
| 8 | JOURNEY-004 | Pending | TBD | 04.07 (history) |
| 9 | METRICS-001 | Pending | TBD | 04.08 (analytics) |
| 10 | EMAIL-001 | Pending | TBD | 04.10 (notifications) |

---

## Why This Sequencing Beats Feature-Driven

### ❌ Feature-Driven Approach (Abandoned)
```
"Let's improve the hero section"
→ Hours on colors and typography
→ Hero still feels disconnected from actual product
→ No foundation for why the design matters
```

### ✅ Dependency-Driven Approach (Current)
```
Ministry says: "User should see restoration journey"
PRD says: "7 stages with teaching + progression"
Architecture says: "Tables + APIs exist"
Result: Platform has stage content, progression, history
When we later design the website, we'll know:
  - What the user journey is
  - What state they're in
  - What they can do next
  - Why the design matters
```

**Outcome:** Better foundation = better design decisions later

---

## Open Questions for Ministry Authority

Before implementing JOURNEY-002, clarify:

1. **Reflection requirement:** Must user complete reflection to advance, or can they skip it?
2. **Time requirement:** Should there be a minimum time on stage 1 before advancing to stage 2?
3. **Validation:** What makes a "valid" reflection? Word count? Comprehensiveness?
4. **Advancement pace:** Can user advance multiple stages at once, or one stage at a time?
5. **Rollback:** Can user return to previous stage if needed?

These answers should go into PRD 04.06 before JOURNEY-002 implementation begins.

---

## Related Documents

- `CLAUDE.md` — Project instructions
- `SAINT_AND_STORY_PROSPECT_BRIEF_V4.md` — Not Phase 1; separate prospect system
- `PRD.md` (04.01-04.15) — All Phase 1 requirements
- `governance/ministry/` — Authority documents
- `CLAUDE_PROJECT_GUIDE.md` — Implementation standards
- `INFRA-003-PRODUCTION-DATABASE-OPERATIONS.md` — Database operations procedures

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-25 | Initial Phase 1 dependency map; JOURNEY-002 recommended as next |

