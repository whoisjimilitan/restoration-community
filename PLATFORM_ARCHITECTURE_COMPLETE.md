# Brother Jimi Platform — Complete Architecture
## TWO MINISTRIES. ONE COMMAND CENTRE.

**Status:** Strategy Document (DRAFT)  
**Date:** July 31, 2026  
**Audience:** Brother Jimi + Development Team

---

## CORE CONCEPT

Brother Jimi operates **TWO DISTINCT MINISTRY STREAMS** that converge in a unified admin command centre:

### **STREAM 1: RESTORATION JOURNEY** ✅ (Launching Aug 8)
Transforms lives from **deception → honesty → service** through 7-stage weekly gatherings.
- **Entry point:** Prayer request (live encounter with Brother Jimi)
- **Outcome:** Stage 6-7 testimonies (transformed lives)
- **Timeline:** 7 weeks, Friday 3pm SCOAN Accra
- **First cohort:** 15 people

### **STREAM 2: PRAYER FOR HEALING** (Building after Aug 8)
Documents medical requests **with before/after proof** to glorify God's healing power.
- **Entry point:** Self-service intake form (medical CRM)
- **Outcome:** Before/after testimonies (healing evidence)
- **Timeline:** Ongoing (no fixed cohort)
- **Scale:** Unlimited participants

---

## THE COMPLETE FLOW

### **VISITOR LANDS ON BROTHERJIMI.COM**

They see two entry points:

```
┌─────────────────────────────────────────────────────────┐
│  BROTHER JIMI — DELIVERANCE THROUGH JESUS CHRIST       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  [GOSPEL MESSAGE + VOICE]                               │
│  Testimonies carousel (Stage 6-7 transformed lives)     │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────┐      ┌──────────────────────────┐  │
│  │  I NEED PRAYER  │      │  I NEED HEALING PRAYER   │  │
│  │  FOR MY LIFE    │      │  FOR MY SICKNESS/DISEASE │  │
│  │                 │      │                          │  │
│  │ (RESTORATION    │      │  (PRAYER FOR HEALING)    │  │
│  │  JOURNEY)       │      │  (MEDICAL CRM)           │  │
│  └─────────────────┘      └──────────────────────────┘  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**TWO CLICK PATHS:**

---

## PATH 1: RESTORATION JOURNEY (Existing — Aug 8 Launch)

```
VISITOR CLICKS: "I NEED PRAYER FOR MY LIFE"
        ↓
DELIVERANCE REQUEST MODAL (5 questions)
  • What is your situation?
  • What are you seeking?
  • Name
  • Contact (email/phone)
  • Country
        ↓
PRAYER REQUEST CREATED IN DATABASE
        ↓
[OUTSIDE PLATFORM - PASTORAL]
Brother Jimi receives notification
Brother Jimi prays + responds (email/WhatsApp/phone)
Encounter happens (virtual or in-person)
Decision: "Walk the 7-week restoration journey?"
        ↓
IF YES:
  Email invitation: "Your journey begins Friday 3pm"
  Account created automatically
  Dashboard access: Stage 1 - Truth
        ↓
PARTICIPANT DASHBOARD
  Week 1: Stage 1 (Truth) - Reflection + Attendance + Mentor
  Week 2: Stage 2 (Confession) - Same
  Week 3-7: Stages 3-7 (same pattern)
        ↓
OUTCOME (Week 6-7):
  Invited to record testimony
  "Share how Jesus restored you"
  Video + bio + transformation story
        ↓
TESTIMONY GOES TO GALLERY
  Public at: brotherjimi.com/testimonies
  Inspiration for others on journey
  Used in landing page carousel
```

**Database tables involved:**
- PrayerRequest
- User
- UserRestoration
- RestorationStage
- Cohort, Meeting, Attendance
- StageReflection, StageTransition
- MentorAssignment
- Testimony

---

## PATH 2: PRAYER FOR HEALING (New — Post-Aug 8)

```
VISITOR CLICKS: "I NEED HEALING PRAYER FOR MY SICKNESS/DISEASE"
        ↓
SELF-SERVICE INTAKE FORM
  • Email
  • Phone number
  • WhatsApp? (checkbox - yes/no)
  • Medical condition (dropdown + text)
  • Proof of condition (photo/file upload)
  • Prayer request message (textarea)
  • Agree to use testimony before/after? (checkbox)
        ↓
HEALING REQUEST CREATED IN DATABASE (CRM)
        ↓
CONFIRMATION EMAIL
  "We've received your prayer request"
  "Brother Jimi will pray for your healing"
  "Track your testimony here: [link]"
        ↓
[BROTHER JIMI PRAYS - ASYNC PROCESS]
Brother Jimi can mark as "Prayed for" in admin
Optional: Add prayer response (message/video)
        ↓
PARTICIPANT CAN UPDATE STATUS ANYTIME
  "I was healed!"
  Upload after-photo/file as proof
  Add testimony: "Here's what God did"
        ↓
ADMIN WORKFLOW
  Brother Jimi sees in dashboard:
  - Incoming healing requests (sortable, searchable)
  - Status: NEW → PRAYED → AWAITING_TESTIMONY → TESTIMONY_RECEIVED
  - Can add notes, mark as "General" or "Special" case
  - View before/after proof side-by-side
  - Export for reports/impact metrics
        ↓
TESTIMONIES GO TO GALLERY
  Public at: brotherjimi.com/testimonies (separate tab/filter)
  Shows healing journey with medical proof
  "Before: [photo] After: [photo]"
  Before/after evidence glorifies God
  Used in landing page + social proof
```

**Database tables involved:**
- HealingRequest (new)
- HealingRequestProof (new - file storage)
- HealingTestimony (new)
- HealingResponse (new - optional prayer response from Brother Jimi)

---

## THE UNIFIED ADMIN COMMAND CENTRE

Brother Jimi logs in ONCE to ONE dashboard that shows BOTH ministries:

```
ADMIN DASHBOARD: brotherjimi.com/dashboard/admin
├─ NAVIGATION
│  ├─ RESTORATION (Stream 1)
│  ├─ PRAYER FOR HEALING (Stream 2)
│  └─ UNIFIED METRICS
│
├─ RESTORATION STREAM
│  ├─ Cohort 1 Progress
│  │  ├─ Stage 1: 15 people | X attended
│  │  ├─ Stage 2: Y people | X attended
│  │  └─ Stage 3-7: ...
│  ├─ Prayer Request Queue
│  │  ├─ NEW (unanswered)
│  │  ├─ PRAYED (responded)
│  │  ├─ ENROLLED (in cohort)
│  │  └─ [Action: Respond, Mark Enrolled]
│  ├─ Upcoming Meetings
│  │  ├─ Friday 3pm Stage X
│  │  ├─ Attendance so far
│  │  └─ [Action: Mark attendance, send reminder]
│  ├─ Testimonies Manager
│  │  ├─ Pending Stage 6-7 videos
│  │  ├─ [Action: Review, approve, publish]
│  │  └─ Published testimonies gallery
│  └─ Participant Reflections
│     ├─ This week's reflections
│     ├─ [Action: Read, respond, encourage]
│
├─ PRAYER FOR HEALING STREAM
│  ├─ Healing Requests (CRM)
│  │  ├─ Filter by: NEW, PRAYED, AWAITING_TESTIMONY, RECEIVED
│  │  ├─ Sort by: Date, Case type (General/Special), Status
│  │  ├─ Search: Name, condition, date range
│  │  └─ [Action: Mark prayed, add note, record response]
│  ├─ Healing Case Details
│  │  ├─ Medical condition + proof (before photo)
│  │  ├─ Prayer message
│  │  ├─ Optional: Prayer response from Brother Jimi
│  │  └─ [Action: Update case notes, add follow-up]
│  ├─ Healing Testimonies
│  │  ├─ AWAITING (submitted healing claim)
│  │  ├─ RECEIVED (after photo + testimony)
│  │  ├─ View before/after side-by-side
│  │  └─ [Action: Verify proof, approve, publish]
│  └─ Healing Impact
│     ├─ Total requests: X
│     ├─ Prayed for: X
│     ├─ Testimonies received: X
│     ├─ General cases: X
│     └─ Special cases: X
│
├─ UNIFIED METRICS
│  ├─ Total souls encountered
│  │  ├─ Via restoration: X
│  │  ├─ Via healing prayer: X
│  ├─ Lives transformed
│  │  ├─ In honest work (Stage 6): X
│  │  ├─ Serving others (Stage 7): X
│  │  ├─ Healings received: X
│  ├─ Content engine
│  │  ├─ Today's 9 outputs (social, email, etc.)
│  │  └─ [Action: Review, publish, schedule]
│  └─ Partnership metrics
│     ├─ Donors reached with impact
│     ├─ Testimonies published this month
│
└─ SETTINGS
   ├─ Mentor management
   ├─ Cohort configuration
   ├─ Email templates
   └─ User roles/permissions
```

---

## DATA RELATIONSHIPS & INTEGRITY

### **How They Connect:**

1. **Healing Testimonies → Restoration Inspiration**
   - Healing stories published on testimonies gallery
   - Restoration participants see: "Jesus heals ALL forms of bondage"
   - Before/after proof strengthens gospel credibility

2. **Restoration Graduates → Healing Prayer Warriors**
   - Stage 7 (Service) participants can join prayer team
   - They pray for healing requests
   - Restoration journey produces "prayer warriors" for healing ministry

3. **Unified Metrics**
   - Total souls reached: restoration + healing
   - Impact story: "Jesus delivered X from deception, healed Y from sickness"
   - Partnership narrative: "One gospel, two expressions of deliverance"

4. **Content Engine Feeds Both**
   - Identity choice framework applies to BOTH
   - "Truth" in restoration = "Truth in my body" (healing)
   - "Honest Work" = living in wholeness post-healing
   - 9 outputs can reference both streams

### **Data Separation:**

| Data | Stream 1 | Stream 2 | Shared? |
|------|----------|----------|---------|
| Prayer requests | ✅ | ✅ | No (different tables) |
| Testimonies | ✅ | ✅ | Yes (same gallery, filtered) |
| User accounts | ✅ | ✅ | No (different roles) |
| Metrics | ✅ | ✅ | Yes (aggregate in dashboard) |
| Mentoring | ✅ | ❌ | No |
| Medical records | ❌ | ✅ | No (privacy) |

---

## TECHNOLOGY ARCHITECTURE

### **Current Stack (Restoration)**
- Next.js App Router
- Prisma ORM + Supabase PostgreSQL
- NextAuth (email/password credentials)
- Tailwind CSS
- Framer Motion
- Vercel deployment

### **Will Extend To (Prayer for Healing)**
- Same Next.js/Prisma/Supabase foundation
- File storage: Vercel Blob or Supabase Storage (proof uploads)
- Additional API endpoints:
  - POST /api/healing/request (submit)
  - GET /api/healing/request/[id] (fetch)
  - PUT /api/healing/request/[id]/update-status (Brother Jimi)
  - PUT /api/healing/request/[id]/submit-testimony (participant)
  - GET /api/admin/healing/caseload (admin view)

### **No Breaking Changes**
- Existing Restoration tables: UNTOUCHED
- New Healing tables: ISOLATED
- Same auth system (no new login)
- Same UI design language (consistent aesthetic)

---

## BUILD PRIORITY & TIMELINE

### **PHASE 1: POLISH RESTORATION (Aug 1-8) ✅ CRITICAL**
**Goal:** Flawless launch Aug 8, 15 people at SCOAN

- [ ] Admin dashboard working (you've confirmed access)
- [ ] Participant dashboard responsive + tested
- [ ] Email reminders sending correctly
- [ ] 15 people registered + mentors assigned
- [ ] Recording setup tested
- [ ] Zero console errors, all tests passing
- [ ] Mobile responsive (iPhone + Android)

**Deliverable:** Working Restoration platform ready to receive first cohort

---

### **PHASE 2: BUILD PRAYER FOR HEALING (Aug 9-31) 🏗️ STRATEGIC**
**Goal:** Launch healing intake + CRM by early Sept

**Week 1 (Aug 9-15):**
- [ ] Design healing intake form
- [ ] Create HealingRequest + HealingTestimony database models
- [ ] Build intake endpoint (POST /api/healing/request)
- [ ] Create healing request form page (brotherjimi.com/prayer-for-healing)

**Week 2 (Aug 16-22):**
- [ ] File upload storage setup (Vercel Blob or Supabase)
- [ ] Healing CRM admin interface (search, filter, case details)
- [ ] Healing case status workflow (NEW → PRAYED → TESTIMONY → APPROVED)
- [ ] Healing metrics display

**Week 3 (Aug 23-31):**
- [ ] Integrate healing testimonies into public gallery
- [ ] Before/after display (side-by-side proof)
- [ ] Unify landing page to show both ministry streams
- [ ] Email confirmations + updates for healing requests

---

### **PHASE 3: UNIFIED COMMAND CENTRE (Sept 1+) 🎯 INTEGRATION**
**Goal:** Single admin dashboard managing both ministries

- [ ] Navigation between streams (Restoration | Healing | Metrics)
- [ ] Combined prayer queue view
- [ ] Unified testimonies manager (filter by stream)
- [ ] Aggregate metrics (total souls, impact story)
- [ ] Content engine integrated (9 outputs for both streams)

---

## THE VISION

**August 8, 2026:**
- 15 people gather at SCOAN
- Brother Jimi teaches Stage 1: Truth
- Recording captured, reflections submitted
- Foundation set for weekly journey

**September 1, 2026:**
- Cohort 1 progressing (Stage 2-3 by then)
- Healing prayer intake live
- First healing testimonies coming in
- Admin command centre unified

**October 2026:**
- Stage 6-7 testimonies (restoration transformed lives)
- Healing before/after proof showing God's power
- Landing page featuring both ministry streams
- Cohort 2 recruitment begins

**Long-term:**
- Cohort 3, 4, 5... scaling
- Prayer for Healing testimonies as social proof
- Partnerships growing (donors see impact: deception healed + sickness healed)
- Content engine producing daily posts from both streams

---

## CRITICAL QUESTIONS FOR BROTHER JIMI

1. **Medical Privacy:** How sensitive is healing data? Should we encrypt medical files? HIPAA-compliant?
2. **Proof Verification:** Who verifies before/after photos? (Brother Jimi? Doctors? Automated?)
3. **Healing Case Categories:** "General" vs "Special" — define the criteria?
4. **Prayer Response:** Should Brother Jimi's prayer response be recorded (text/video) or just marked as "prayed"?
5. **Cohort 2:** When does Cohort 2 start? (Affects healing intake timing)

---

## SUCCESS CRITERIA

✅ **Aug 8:** Restoration platform launches, 15 people gather  
✅ **Aug 15:** First reflections submitted, Stage 2 unlocked  
✅ **Sept 1:** Healing intake live, CRM functional  
✅ **Sept 15:** First healing testimonies coming in  
✅ **Oct 1:** Admin command centre unified, both streams visible  
✅ **Oct 8:** Cohort 2 launches with improved materials  

---

This is the complete picture. Two ministries, one platform, one command centre, exponentially greater impact.

**Ready to lock this in and start building?**
