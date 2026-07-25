---
type: governance-gap-report
id: GOV-002-PRAYER
title: Prayer Practice Governance — Gap Analysis and Decision Framework
date: 2026-07-25
status: awaiting-ministry-decision
---

# GOV-002 Prayer Governance Gap Report

## Purpose

This report identifies the specific theological and operational decisions required to define prayer practice in the Restoration Community platform.

The authority search (PRAYER-001 report) established that prayer is central to community identity and ministry. This report defines what must be decided before implementation.

**This is not an executable.** This is a decision framework for Ministry Authority.

---

## What We Know (From Authority Search)

**Non-Negotiable Principles:**
- Prayer is community identity, not a feature
- Prayer is central to mentoring relationships
- Prayer reminds that restoration is God's work
- Prayer should be "natural, regular, and sincere"
- Prayer requires confidentiality and wisdom
- Prayer connects people between gatherings
- Mentors pray for and with participants

**What's Undefined:**
- HOW prayer is practiced in the platform
- WHAT mechanics enable prayer
- WHO can request/respond to prayer
- WHERE prayer appears in workflows
- WHEN prayer happens (continuous/scheduled/both)

---

## Decision Framework: Six Core Questions

### Decision 1: Prayer Initiation Model

**What determines when prayer happens?**

#### Option A: On-Demand Prayer Requests
**Model:** Participants/mentors can post prayer requests anytime

**Mechanics:**
- Prayer request form: participant describes need
- Routed to: assigned mentor, prayer partners, or community
- Visible to: requester + prayer recipients
- Duration: until explicitly marked complete

**Alignment:**
- ✅ "Participants care for one another through prayer"
- ✅ Flexible, responsive to crisis
- ⚠️ Requires privacy controls (who sees what?)

**Implementation Impact:**
- Database: PrayerRequest table needed
- API: POST /api/prayer/request
- UI: Prayer request form in dashboard/mentoring

---

#### Option B: Scheduled Prayer Practice
**Model:** Prayer happens at set times (daily, weekly) as spiritual discipline

**Mechanics:**
- Platform sends reminder: "Today's prayer: pray for your mentor/group/journey"
- Participants pray privately (not logged)
- Optional: share brief prayer update
- Rhythm: daily, weekly, or tied to gatherings

**Alignment:**
- ✅ "Natural and regular" prayer rhythms
- ✅ Not crisis-driven; part of spiritual discipline
- ✅ Privacy-first (prayer is private practice)

**Implementation Impact:**
- Database: PrayerReminder table (optional)
- API: Notification system (if reminders sent)
- UI: Prayer prompt on dashboard

---

#### Option C: Hybrid Model
**Model:** Both on-demand requests AND scheduled prayer practice

**Mechanics:**
- Scheduled reminders for regular prayer rhythm
- On-demand requests for specific needs/crisis
- Community member can respond to either

**Alignment:**
- ✅ Addresses both regular spiritual discipline and acute need
- ✅ Flexible, comprehensive
- ⚠️ More complex

**Implementation Impact:**
- Database: Both PrayerRequest and PrayerReminder
- API: Multiple endpoints for requests and responses
- UI: Prayer dashboard showing both scheduled and requested prayer

---

**Ministry Decision Needed:** Which model reflects prayer practice in your community?

---

### Decision 2: Prayer Routing & Access

**Who prays, and who can see the prayer request?**

#### Option A: Private Mentor Prayer
**Scope:** Prayer stays between participant and assigned mentor only

**Access:**
- Participant can request prayer from their mentor
- Mentor receives request privately
- Prayer is private (not logged or shared)
- Only mentor and participant know

**Alignment:**
- ✅ Emphasizes mentor-participant relationship as core
- ✅ Highest confidentiality
- ✅ Mentors are spiritually invested in participants
- ⚠️ What if participant has no mentor (Phase 1)?

**Implementation Impact:**
- Database: PrayerRequest (mentor_id, participant_id)
- API: Prayer requests routed to specific mentor
- UI: Prayer request visible only to mentor and participant

---

#### Option B: Community Prayer
**Scope:** Participant can request prayer from broader community

**Access:**
- Participant posts prayer need to trusted group
- Prayer partners/community members see and respond
- Depending on confidentiality: public or private group

**Alignment:**
- ✅ "Pray for one another" (all community members)
- ✅ Extends prayer beyond single mentor
- ✅ Builds prayer culture community-wide
- ⚠️ Requires clear confidentiality boundaries

**Implementation Impact:**
- Database: PrayerRequest, PrayerPartner relationships
- API: Prayer request posts, prayer responses
- UI: Prayer request feed/group, access controls

---

#### Option C: Mentor-Coordinated Community Prayer
**Scope:** Participants request prayer; mentors coordinate community response

**Access:**
- Participant requests prayer to their mentor
- Mentor can (optionally) escalate to community
- Mentor manages who sees what
- Community prays on request, respecting confidentiality levels

**Alignment:**
- ✅ Honors mentor-participant centerpiece
- ✅ Enables community support when appropriate
- ✅ Mentors provide pastoral discretion
- ✅ Flexible confidentiality

**Implementation Impact:**
- Database: PrayerRequest, community visibility flags
- API: Mentor can share request to community (with participant permission)
- UI: Request visible to mentor; mentor controls escalation

---

**Ministry Decision Needed:** Is prayer primarily private (mentor-participant) or communal?

---

### Decision 3: Prayer Privacy & Confidentiality

**What's the default confidentiality level?**

#### Option A: Private by Default
**Model:** All prayer requests are private unless participant explicitly shares

**Rules:**
- Participant requests prayer
- Only mentor/designated recipient sees request
- Community never sees prayer requests
- Participant can share "I requested prayer" but not details

**Alignment:**
- ✅ "Wisdom, respect, and appropriate confidentiality"
- ✅ "Requests treated with discretion"
- ✅ Highest default privacy

**Implementation Impact:**
- Database: visibility flags (private)
- API: ACL (access control lists)
- UI: No prayer feed; requests private to recipients

---

#### Option B: Confidentiality Levels
**Model:** Participant chooses confidentiality when requesting prayer

**Levels:**
1. "Private" — Only my mentor sees
2. "Prayer partners" — Only pre-approved prayer circle sees
3. "Community" — Whole community can see

**Rules:**
- Participant selects level when requesting
- Platform enforces access control
- Mentor can adjust if inappropriate

**Alignment:**
- ✅ Honors participant agency
- ✅ Appropriate confidentiality" for different needs
- ✅ Some needs are private, some benefit from community knowledge
- ⚠️ Requires thoughtful UI/education

**Implementation Impact:**
- Database: visibility_level field
- API: ACL per visibility level
- UI: Confidentiality selector on prayer request form

---

#### Option C: Transparent with Safeguards
**Model:** Prayer requests visible to community by default, with protections

**Rules:**
- Prayer requests visible to assigned prayer community
- Sensitive details marked "private" and seen only by mentor
- Community sees prayer need; mentor sees full context
- Two-tier: public need + private detail

**Alignment:**
- ✅ "Pray for one another" (community sees needs)
- ✅ Protects sensitive information
- ✅ Enables community support

**Implementation Impact:**
- Database: prayer_summary (public) + prayer_detail (private)
- API: Different endpoints for summary and detail
- UI: Community sees summary; mentor sees full request

---

**Ministry Decision Needed:** What's the default privacy model?

---

### Decision 4: Prayer Logging & Recording

**Should prayers be recorded in the database?**

#### Option A: Private Practice (Not Logged)
**Model:** Prayer requests are made, but actual prayers are not recorded

**Mechanics:**
- Request is logged (for accountability)
- Prayer itself is private (not in database)
- Mentor knows prayer is happening; doesn't log what they pray
- No "prayer record" or "prayer history"

**Alignment:**
- ✅ Prayer is conversation with God, not database record
- ✅ Protects spiritual intimacy
- ✅ Prevents "prayer accountability metrics"
- ✅ Most aligned with "sincere" prayer

**Implementation Impact:**
- Database: PrayerRequest (request logged, not prayer itself)
- API: No prayer response logging endpoint
- UI: Request visible; no "view prayers" or prayer history

---

#### Option B: Mentor Accountability (Mentor Records)
**Model:** Mentors log that they prayed; not the content of prayer

**Mechanics:**
- Participant requests prayer
- Mentor marks "I prayed for this" with timestamp
- Mentor does not log prayer content
- Creates record that prayer happened, not what was prayed

**Alignment:**
- ✅ Mentor accountability (did you pray?)
- ✅ Protects spiritual intimacy (prayer content private)
- ✅ Helps mentor see their own prayer life
- ✅ Verifiable but not invasive

**Implementation Impact:**
- Database: PrayerResponse (mentor_id, prayer_occurred_at, no_content)
- API: POST /api/prayer/responded (no prayer text body)
- UI: Mentor marks "I prayed"; participant sees "Prayer marked answered"

---

#### Option C: Prayer Conversation Log
**Model:** Prayers can be logged if both parties consent (rare)

**Mechanics:**
- Prayer requests are logged
- Participants can optionally share prayer journals/reflections
- Mentors can share prayer updates
- Only shared prayers are logged
- Most prayers remain private

**Alignment:**
- ✅ Allows sharing for accountability (if desired)
- ✅ Default is private; sharing is intentional
- ✅ Respects different comfort levels
- ⚠️ Complex UX/privacy

**Implementation Impact:**
- Database: PrayerJournal (optional sharing)
- API: Optional prayer sharing endpoint
- UI: Share button on prayer request (optional)

---

**Ministry Decision Needed:** Should prayers be recorded? If so, what level of detail?

---

### Decision 5: Prayer Scheduler & Rhythms

**When does prayer happen in the community?**

#### Option A: Always-On Prayer (No Schedule)
**Model:** Prayer can happen anytime; no formal rhythm

**Mechanics:**
- Participants can request prayer anytime
- Mentors pray as needs arise
- No scheduled prayer times
- Community responds when they see requests

**Alignment:**
- ✅ "Natural" prayer (whenever needed)
- ✅ Crisis-responsive
- ⚠️ "Regular" prayer may be passive/inconsistent

**Implementation Impact:**
- Database: Minimal (just requests)
- API: Prayer request form always available
- UI: Prayer request form on dashboard

---

#### Option B: Weekly Prayer Focus
**Model:** Community has structured prayer rhythm (e.g., Monday-Sunday)

**Mechanics:**
- Each day/week has a focus: Monday = family, Tuesday = workplace, etc.
- Platform prompts: "Today, let's pray for honest work"
- Optional: submit prayer request for that focus
- Creates rhythm and structure

**Alignment:**
- ✅ "Regular and natural" prayer rhythm
- ✅ Helps participants remember to pray
- ✅ Gives structure without being rigid
- ✅ Mirrors church/monastery traditions

**Implementation Impact:**
- Database: PrayerFocus (day_of_week, focus_topic)
- API: GET today's prayer focus
- UI: Daily reminder on dashboard

---

#### Option C: Gathering-Centered Prayer
**Model:** Prayer is primarily connected to community gatherings

**Mechanics:**
- In-person or virtual gatherings include prayer time
- Digital platform enables prayer BETWEEN gatherings
- Prayer requests can be brought to gatherings
- Platform reminds: "Our gathering is Thursday; submit prayer requests"

**Alignment:**
- ✅ Prayer centered in community gathering rhythm
- ✅ Digital prayer supports in-person community
- ✅ "Between gatherings" connection
- ⚠️ Requires gathering infrastructure (not ready Phase 1)

**Implementation Impact:**
- Database: PrayerRequest linked to Event/Gathering
- API: Prayer requests routed to gathering planners
- UI: Prayer prompt before/after gatherings

---

**Ministry Decision Needed:** Should prayer have a structured rhythm? If so, what kind?

---

### Decision 6: Prayer Integration with Journey

**How does prayer relate to stages and reflection?**

#### Option A: Independent Practice
**Model:** Prayer is separate from the Restoration Journey stages

**Mechanics:**
- Journey has reflection (existing)
- Prayer is separate community practice
- No connection between stages and prayer topics
- Prayer is community-wide, not stage-specific

**Alignment:**
- ✅ Prayer is community identity (not journey feature)
- ✅ Keeps systems simple
- ✅ Prayer serves all participants regardless of stage
- ⚠️ Misses opportunity to deepen stage engagement

**Implementation Impact:**
- Database: PrayerRequest (no foreign key to stages)
- API: Prayer system separate from journey API
- UI: Prayer on community dashboard; separate from journey page

---

#### Option B: Stage-Aligned Prayer
**Model:** Each stage has associated prayer themes/requests

**Mechanics:**
- Stage 1 (Truth): "Pray for courage to face reality"
- Stage 2 (Confession): "Pray for humility to confess"
- Participants on each stage can request prayer for that stage's focus
- Platform suggests: "You're on Truth stage; here are common prayer needs"

**Alignment:**
- ✅ Deepens engagement with each stage
- ✅ Prayer becomes natural part of journey
- ✅ Community prays specifically for participants' needs
- ⚠️ Tighter integration (more complex)

**Implementation Impact:**
- Database: PrayerTheme linked to RestorationStage
- API: /api/prayer/stage/{stageId}/requests
- UI: Prayer section on journey page

---

#### Option C: Reflection-to-Prayer Bridge
**Model:** Reflection informs prayer; participant can request prayer from their reflection

**Mechanics:**
- Participant reflects on a stage
- Reflection form has: "Would you like prayer for this reflection?"
- Clicking yes creates a prayer request
- Prayer request is tagged to that reflection
- Mentor sees reflection + can pray specifically

**Alignment:**
- ✅ Prayer deepens reflection
- ✅ Mentors understand what participants are wrestling with
- ✅ Natural workflow (reflect → request prayer)
- ✅ Combines prayer + journey without over-integration

**Implementation Impact:**
- Database: PrayerRequest linked to StageReflection
- API: /api/prayer/request (reflection_id optional)
- UI: "Request prayer for this" button on reflection

---

**Ministry Decision Needed:** Is prayer independent or integrated with journey?

---

## Summary: Six Decisions Required

| Decision | Options | Impact |
|----------|---------|--------|
| **1. Initiation** | On-demand / Scheduled / Hybrid | How prayer gets requested |
| **2. Routing** | Private mentor / Community / Mentor-coordinated | Who sees prayer requests |
| **3. Privacy** | Private default / Confidentiality levels / Transparent | How sensitive are requests |
| **4. Logging** | Not logged / Mentor accountability / Optional sharing | Is prayer recorded? |
| **5. Rhythm** | Always-on / Weekly focus / Gathering-centered | When does prayer happen? |
| **6. Integration** | Independent / Stage-aligned / Reflection-bridge | How does prayer relate to journey? |

---

## Recommended Path Forward

**For Ministry to Decide:**

1. **Review each decision** with community leadership
2. **Choose one option** per decision (or propose alternative)
3. **Document chosen model** in GOV-002 executive
4. **Provide rationale** for each choice (ties to ministry identity)
5. **Hand to Claude** with instruction: "Create PRAYER-001 executable based on GOV-002"

**Result:** PRAYER-001 executable will implement exactly what ministry has decided, not what engineering guesses.

---

## What This Prevents

✅ Prevents engineering from guessing theology  
✅ Prevents prayer from becoming a "feature" instead of identity  
✅ Prevents building wrong privacy model  
✅ Prevents scope creep (prayer metrics, gamification, etc.)  
✅ Prevents implementation that conflicts with ministry values  

---

**This report is complete. Ready for Ministry Authority review and decision.**

**Once GOV-002 is decided, PRAYER-001 implementation follows directly.**
