---
executable: JOURNEY-002
title: Restoration Journey Stage Progression Implementation
id: JOURNEY-002
phase: Phase 1 — Core Ministry Platform
domain: Restoration Journey
priority: Critical Path
status: ready-for-implementation
date: 2026-07-25
---

# EXECUTABLE: JOURNEY-002
## Restoration Journey Stage Progression Implementation

---

## AUTHORITY CHAIN

**Governing Document (BINDING):**
- `/governance/restoration-journey-progression-principle.md` (GOV-001)

**Ministry Foundation:**
- Book One: Community Manual (Parts Five, Six)
- Book Two: Restoration Journey (Conclusion)
- Book Three: Digital Community Platform (Chapters Two, Three)

**Product Requirements:**
- PRD 04.04 — Restoration Journey
- PRD 04.05 — Mentoring (DRAFT)

**Architecture:**
- `/governance/architecture/high-level-technical-architecture.md`
- Existing models: UserRestoration, StageTransition, StageReflection, RestorationStage

---

## CRITICAL CONSTRAINT

**The implementation steward shall implement the Hybrid Participant-Led Model exactly as defined in GOV-001.**

**No deviation. No optional features. No drift.**

Specifically:
- ✅ Implement: Participant-initiated progression (choice required)
- ✅ Implement: Reflection as only gate
- ❌ Do NOT implement: Mentor approval
- ❌ Do NOT implement: Community approval gates
- ❌ Do NOT implement: Automatic progression
- ❌ Do NOT implement: External blocking conditions

**If ambiguity arises, reference GOV-001. If GOV-001 is silent, stop and report.**

---

## PURPOSE

Enable a participant who has completed reflection on their current Restoration Journey stage to intentionally choose to progress to the next stage.

**Current State:**
- Participant can read stage content
- Participant can submit reflection
- Participant cannot advance to next stage

**After JOURNEY-002:**
- Participant can read stage content ✅
- Participant can submit reflection ✅
- **Participant can choose to continue to next stage ➡️ (NEW)**
- System records progression and preserves history ➡️ (NEW)

---

## SCOPE

### IN SCOPE — Implement These Only

#### 1. Progression Eligibility Check
Validate that participant:
- Has a current stage assignment
- Has completed a reflection for current stage
- Is not on final stage (or handle final stage correctly)

#### 2. Progression Action UI
Add affordance for participant to:
- See that reflection is complete
- Intentionally choose to continue
- Confirm progression decision

#### 3. Progression Logic
When participant chooses to continue:
- Identify next stage (Stage N → Stage N+1)
- Update UserRestoration.currentStageId
- Create StageTransition record with:
  - fromStageId (previous stage)
  - toStageId (new stage)
  - transitionedAt (timestamp)
  - transitionedById (null — participant-initiated)
  - reason ("participant progression")

#### 4. History Preservation
- Previous stage remains in database (not deleted)
- All transitions remain immutable
- Reflections remain associated with stages
- Journey history is queryable and auditable

#### 5. Final Stage Handling
When participant is on Stage 7 (Serving Others):
- Show that no "next stage" exists
- Provide appropriate messaging
- Allow return to any previous stage if desired
- Preserve all transition history

#### 6. Backward Access
- Participant can always return to previous stages
- Previous stages are accessible without approval
- Returning to earlier stage is recorded as new transition
- No loss of prior reflection history

### OUT OF SCOPE — Do NOT Implement

❌ Mentor approval workflows
❌ Mentor confirmation dashboards
❌ Mentor gates on progression
❌ Community approval or gates
❌ Notifications (email, in-app, etc.)
❌ Celebration badges or badges
❌ Gamification (achievements, streaks, leaderboards)
❌ Analytics or metrics
❌ Community feeds or social features
❌ Visual redesign or styling changes
❌ Animated transitions or effects
❌ Changes to existing auth, onboarding, or infrastructure

**Those features belong in later executables.** This executable is progression only.

---

## PRESERVATION REQUIREMENTS

Do not modify:
- Authentication (AUTH-001)
- Email verification (INFRA-002)
- Onboarding flow (ONBOARD-001)
- Journey content (JOURNEY-001)
- Governance covenant (GOV-003)
- Database operations procedures (INFRA-003)
- Existing UI components (unless necessary for progression UI)
- Prisma schema (no migrations)

**Unless a direct dependency requires change.**

---

## IMPLEMENTATION SEARCH ORDER

**Before writing code:**

Step 1: Read this executable completely
Step 2: Read GOV-001 (Restoration Journey Progression Principle)
Step 3: Verify existing code:
  - `/app/journey/page.tsx` — journey display
  - `/app/api/restoration/journey` — journey API
  - `/app/api/restoration/advance` — progression endpoint (may be incomplete)
  - `/prisma/schema.prisma` — UserRestoration, StageTransition, StageReflection models
Step 4: Search repository for:
  - "advance"
  - "progression"
  - "UserRestoration"
  - "StageTransition"
Step 5: Review JOURNEY-001 and ONBOARD-001 for patterns
Step 6: Verify no breaking changes to existing data models
Step 7: Only then implement

---

## REQUIRED IMPLEMENTATION

### API Layer: POST /api/restoration/advance

**Purpose:** Accept participant request to progress to next stage

**Route:** `POST /api/restoration/advance`

**Authentication:** Required (getServerSession)

**Request Body:**
```typescript
{
  reason?: string  // Optional explanation (e.g., "ready to continue")
}
```

**Validation:**
1. User is authenticated
2. User has UserRestoration record
3. User's current stage is not null
4. User has at least one StageReflection for current stage
5. Current stage is not the final stage (or handle final stage)

**Behavior:**
- Identify next stage (currentStage.sequence + 1)
- Update UserRestoration.currentStageId
- Create StageTransition record:
  ```typescript
  await prisma.stageTransition.create({
    data: {
      userRestorationId: userRestoration.id,
      fromStageId: currentStage.id,
      toStageId: nextStage.id,
      transitionedAt: new Date(),
      transitionedById: null,  // Participant-initiated
      reason: "participant progression"
    }
  })
  ```

**Response:**
```typescript
{
  success: true,
  message: "Progression recorded",
  currentStage: {
    id: nextStage.id,
    name: nextStage.name,
    sequence: nextStage.sequence
  },
  progressPercent: ((nextStage.sequence - 1) / 6) * 100
}
```

**Error Cases:**
- 401: Not authenticated
- 404: User not found or no UserRestoration
- 400: No reflection for current stage
- 400: Already on final stage (communicate this respectfully)
- 500: Database error

### UI Layer: Journey Page Progression Control

**Location:** `/app/journey/page.tsx`

**Add Component:** "Continue Journey" Button

**Display Logic:**
```
IF user.currentStage = 1-6 AND reflection exists:
  Show: "Ready to continue to [next stage name]?"
  Button: "Continue Journey"
ELSE IF user.currentStage = 7:
  Show: "You have completed the seven stages of the Restoration Journey"
  Show: "The journey continues as a way of life"
  Button: "Return to earlier stage" (allow revisiting)
ELSE IF no reflection:
  Show: "Complete your reflection to continue"
  Button: Disabled/grayed
```

**Action:**
```typescript
async function handleAdvance() {
  const response = await fetch('/api/restoration/advance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason: 'participant progression' })
  });
  
  if (response.ok) {
    const data = await response.json();
    // Refresh journey data
    await loadJourneyData();
    // Show success message (non-intrusive)
    setSuccess("You've progressed to the next stage");
  } else {
    // Handle error
    const error = await response.json();
    setError(error.message);
  }
}
```

### Data Layer: No Schema Changes

**Existing Models:**
- UserRestoration — only currentStageId updates
- StageTransition — will have new records (not modified)
- StageReflection — unchanged

**No migrations required.**

---

## VERIFICATION SCENARIOS

**Scenario 1: Happy Path — Participant Can Progress**

Given:
- User is on Truth (stage 1)
- User has submitted a reflection
- User has NOT progressed

When:
- User clicks "Continue Journey" button
- System validates reflection exists
- User confirms progression

Then:
- UserRestoration.currentStageId updates to Confession (stage 2)
- StageTransition record created:
  - fromStageId = Truth
  - toStageId = Confession
  - transitionedById = null
  - reason = "participant progression"
- Journey page reloads showing Confession stage
- Previous Truth reflection remains accessible

**Scenario 2: Cannot Progress Without Reflection**

Given:
- User is on Truth (stage 1)
- User has NOT submitted a reflection

When:
- User views journey page
- User looks for "Continue Journey" button

Then:
- Button is disabled or hidden
- Message shows: "Complete your reflection to continue"
- API endpoint returns 400 if called directly

**Scenario 3: Final Stage — No Next Stage**

Given:
- User is on Serving Others (stage 7)
- User has submitted a reflection

When:
- User views journey page

Then:
- No "Continue Journey" button shown
- Message: "You have completed the seven stages. The journey continues as a way of life."
- Option to return to any previous stage remains available
- StageTransition history is complete and immutable

**Scenario 4: Returning to Earlier Stage**

Given:
- User progressed from Truth → Confession → Repentance
- User wants to revisit Confession

When:
- User selects Confession from stage grid or navigation
- System allows reverting currentStageId to Confession

Then:
- New StageTransition created (Repentance → Confession)
- Recorded as participant choice (not failure)
- Previous progression history remains intact
- Reflection history shows multiple entries for Confession

**Scenario 5: Progression Without Mentor**

Given:
- User has no assigned mentor (Phase 1 scenario)
- User has completed reflection on current stage

When:
- User clicks "Continue Journey"

Then:
- Progression succeeds (mentor not required)
- System records transitionedById = null (participant-initiated)
- No mentor notification system is involved
- Progression is not blocked

---

## ACCEPTANCE CRITERIA

JOURNEY-002 is complete when:

✅ Participant can view "Continue Journey" affordance after reflection
✅ Reflection completion is validated before progression allowed
✅ Participant must intentionally choose to progress (not automatic)
✅ UserRestoration.currentStageId updates correctly
✅ StageTransition record created for every progression
✅ transitionedById is null (participant-initiated, not approved)
✅ Previous stage remains accessible in database
✅ Stage 7 (Serving Others) has appropriate messaging (no next stage)
✅ Participant can return to any previous stage
✅ All progression is recorded in history (immutable)
✅ Reflection remains associated with transition
✅ No mentor approval is possible in UI or API
✅ No mentor gates exist on progression
✅ No community gates exist on progression
✅ Existing auth/onboarding/content preserved
✅ TypeScript passes (no type errors)
✅ ESLint passes
✅ Build succeeds
✅ Runtime verification: Test scenarios 1-5 complete
✅ Commit references:
  - JOURNEY-002
  - GOV-001
  - PRD 04.04
  - Hybrid Participant-Led Model

---

## IMPLEMENTATION CONTRACT

The Implementation Steward shall:

✓ Implement GOV-001 exactly as written
✓ Not invent mentor approval mechanisms
✓ Not add community gates
✓ Not implement automatic progression
✓ Preserve all existing functionality
✓ Create immutable progression records
✓ Allow return to previous stages
✓ Handle final stage correctly
✓ Maintain reflection association
✓ Test all scenarios before committing
✓ Verify no breaking changes
✓ Reference GOV-001 in every decision

If ambiguity arises:
STOP and report to Ministry Authority

Do not guess at intent.
Do not "improve" the model.
Do not add optional features.

Implement exactly what GOV-001 defines, nothing more.

---

## COMMIT MESSAGE FORMAT

When implementation is complete:

```
EXECUTABLE: JOURNEY-002 — Stage Progression Implementation

AUTHORITY: GOV-001 (Restoration Journey Progression Principle)
AUTHORITY: Book One, Book Two, Book Three
AUTHORITY: PRD 04.04

IMPLEMENTED:
- Progression eligibility validation (reflection required)
- Participant progression action (intentional choice)
- Stage advancement logic (currentStageId update)
- Transition recording (immutable history)
- Final stage handling (Stage 7 messaging)
- Backward stage access (return to any previous stage)

VERIFIED:
- TypeScript passes
- ESLint passes
- Build passes
- Scenario 1: Happy path progression works
- Scenario 2: Cannot progress without reflection
- Scenario 3: Final stage handled correctly
- Scenario 4: Return to earlier stage works
- Scenario 5: Progression works without mentor

CONSTRAINTS HONORED:
- Hybrid Participant-Led Model implemented exactly as GOV-001
- No mentor approval added
- No community gates added
- No automatic progression added
- All existing systems preserved

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## NEXT STEPS AFTER COMPLETION

When JOURNEY-002 is complete:

1. ✅ JOURNEY-002 committed
2. ➡️ PRAYER-001 (Prayer feature)
3. ➡️ MENTORING-001 (Mentor assignments)
4. ➡️ COMMUNITY-001 (Gatherings/groups)
5. ➡️ RESOURCES-001 (Resource library)
6. ➡️ ADMIN-001 (Admin dashboard)
7. ➡️ EXPERIENCE-001 (Final audit)
8. ➡️ DESIGN-001 (Art direction and polish)

Each builds on the previous.

---

**JOURNEY-002 is ready for implementation.**

**GOV-001 is the binding authority.**

**Implement exactly as defined. No drift.**
