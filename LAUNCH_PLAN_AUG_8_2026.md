# LAUNCH PLAN: AUGUST 8, 2026
## CANONICAL | PERMANENT | ONLY SOURCE OF TRUTH

**Status:** ACTIVE LAUNCH PLAN  
**Start Date:** July 29, 2026  
**Launch Date:** August 8, 2026  
**Duration:** 10 days  
**Location:** SCOAN Accra, Ghana | Friday 3pm  
**First Cohort Size:** 15 people  

---

## CORE MISSION

Get 15 people (first cohort) to SCOAN on Friday, August 8th at 3pm for:
- Brother Jimi teaches Stage 1: Truth (30 minutes)
- Discussion + prayer (30 minutes)
- Recording captured (phone camera, Option B)
- Reflection assignment (submitted via platform)
- Progression to Stage 2 the following Friday

---

## COMPLETE PLATFORM ARCHITECTURE

### PUBLIC PAGES (No login required)

**Landing Page (brotherjimi.com)**
- Hero with Brother Jimi's voice
- Gospel healing message (fraud wounds → Christ)
- Testimonies carousel (Stage 6-7 transformations)
- Impact metrics (X delivered, X in restoration, X in honest work, X serving)
- Next gathering info (Friday 3pm SCOAN Accra)
- Partnership/sponsorship CTA

**Public Testimonies Gallery (brotherjimi.com/testimonies)**
- Stage 6: Honest Work (video + bio + transformation story)
- Stage 7: Service (video + bio + story)
- Filterable by stage
- Social sharing (WhatsApp, Facebook, Twitter, LinkedIn)
- Call-to-action: "Help us reach more | Partner with us"
- No login required

**Impact Page (brotherjimi.com/impact)**
- Metrics dashboard (real numbers updated daily)
  - X people prayed with
  - X in restoration journey (Stages 1-7)
  - X in honest work (Stage 6)
  - X serving others (Stage 7)
- How sponsorship/partnership works
- Partner logos (empty now, will populate as sponsors join)
- Donation/partnership form

---

### GATED PAGES (Login required)

**Participant Dashboard (app.brotherjimi.com/dashboard)**

Each stage shows:
```
STAGE [#]: [NAME]

[Stage-specific introduction]

━━━━━━━━━━━━━━━━━━

GATHERING
Friday 3pm
📍 SCOAN Accra, Ghana
[Get directions]

[I'm attending]

━━━━━━━━━━━━━━━━━━

This week's reflection:
"[Stage-specific prompt]"

[Text area]
[Submit reflection]

Your mentor: [Name] [Message]
Your progress: Stage 1 of 7
```

Features:
- Current stage card (prominent, full width)
- Gathering info (with directions link)
- Attendance button (tracks who's coming)
- Reflection form (simple textarea + submit)
- Mentor display (assigned mentor name + contact option)
- Progress indicator (X of 7 stages complete)
- View testimonies (if Stage 6-7 people are ahead, can see their stories for inspiration)
- Email reminders (24hr before gathering, reflection prompt after)

**Stage Progression:**
1. Reflection submitted → Success message appears
2. Next Friday → Email: "Stage 2 prompt is ready"
3. Dashboard updates to Stage 2
4. Repeat Stages 2-7 weekly

---

### ADMIN PAGES (Brother Jimi + Admins only)

**Admin Dashboard (app.brotherjimi.com/admin)**

Four sections:

**1. Prayer Request Queue**
- Incoming prayer requests (from modal)
- Status: NEW → PRAYED → RESPONDED → AWAITING_DECISION → ENROLLED
- Filter by status
- Mark as responded (email Brother Jimi's reply link)
- Move to enrolled (person gets dashboard access + Stage 1)

**2. Attendance Tracker**
- Cohort 1 (Stages 1-7)
  - Week 1: Truth (Stage 1) - [list of people + attended yes/no]
  - Week 2: Confession (Stage 2) - [list + attended]
  - Etc.
- See who's showing up, who's missing
- Download attendance report

**3. Testimonies Manager**
- Upload form (video + bio + transformation story)
- Stage (6 or 7)
- Name + permission checkbox
- Approval workflow (review before public)
- Publish/unpublish toggle
- See what's live on testimonies gallery

**4. Metrics Dashboard**
- Real-time counts
  - Total prayed with (cumulative)
  - In restoration (current participants)
  - Stages breakdown (Stage 1: 15, Stage 2: 12, etc.)
  - In honest work (Stage 6 count)
  - Serving others (Stage 7 count)
- Charts (optional: growth over time)
- Export data (for donors/reports)

---

## 10-DAY BUILD TIMELINE

### PHASE 1: CORE PLATFORM (Days 1-3: Jul 30 - Aug 1)

**Developer builds:**
- [ ] Dashboard redesign (inherit homepage aesthetic: teal, spacing, typography)
- [ ] Gathering info card (SCOAN Accra | Friday 3pm | directions | attendance button)
- [ ] Reflection form (textarea + submit + success state)
- [ ] Stage progression logic (unlock next stage after reflection submitted)
- [ ] Mentor display (name + contact option)
- [ ] Email sequences (account ready, 24hr gathering reminder, reflection prompt, stage progression alert)
- [ ] Mobile optimization (responsive design, all pages tested)
- [ ] Database schema updates (cohort tracking, attendance, testimonies)

**Brother Jimi prepares:**
- [ ] Stage 1: Truth teaching outline (1 page, key points only)
- [ ] List of 15 people to invite (first cohort)
- [ ] Mentor assignment strategy (who mentors whom, selection criteria)

**Deliverable by Aug 1:**
- ✅ Dashboard fully functional (desktop + mobile)
- ✅ Email sequences configured and tested
- ✅ Platform on staging server (ready for testing)

---

### PHASE 2: NICE-TO-HAVES (Days 4-5: Aug 2-3)

**Developer builds:**
- [ ] Public testimonies gallery (video embeds, bios, transformation stories)
- [ ] Impact page (metrics dashboard, sponsorship info)
- [ ] Testimonies management system (admin upload form, approval workflow)
- [ ] Landing page updates (testimonies carousel, impact section, gathering info)
- [ ] Cohort tracking system (admin view of cohort 1 progress by stage)
- [ ] Social sharing (WhatsApp, Facebook, Twitter buttons on testimonies)
- [ ] Partnership/sponsorship info page (how to support)

**Brother Jimi:**
- [ ] Finalize Stage 1 outline
- [ ] Prepare list of 15 + mentors
- [ ] Gather first round of testimonies (if any existing participants to feature)

**Deliverable by Aug 3:**
- ✅ All public pages live and responsive
- ✅ Testimonies gallery structure in place (no videos yet)
- ✅ Admin dashboard fully functional
- ✅ Landing page updated with all sections

---

### PHASE 3: TESTING & POLISH (Days 6-8: Aug 4-6)

**Developer tests:**
- [ ] End-to-end flow (prayer request → account creation → dashboard → reflection → progression)
- [ ] Mobile responsiveness (all pages, iPhone + Android)
- [ ] Email delivery (all sequences, correct timing)
- [ ] Public pages (no login required, videos play, sharing works)
- [ ] Admin dashboard (upload testimonies, manage queue, view metrics)
- [ ] Security audit (auth flow, data privacy, no vulnerabilities)
- [ ] Performance audit (page load times, database queries optimized)
- [ ] Console errors (zero errors, warnings fixed)

**Brother Jimi:**
- [ ] Test recording setup at SCOAN (phone camera + audio quality with 15 people)
- [ ] Send invites to 15 people (with registration link + gathering details)
- [ ] Confirm mentor assignments in platform
- [ ] Spiritual preparation (prayer, fasting if called)

**Deliverable by Aug 6:**
- ✅ Platform production-ready (all bugs fixed, all tests passing)
- ✅ No console errors
- ✅ All emails working (test with real addresses)
- ✅ Recording tested and ready
- ✅ 15 people registered + mentors assigned
- ✅ Mentors notified and ready

---

### PHASE 4: FINAL PREP & LAUNCH (Days 9-10: Aug 7-8)

**Aug 7 (Thursday):**
- [ ] Deploy to production (live at brotherjimi.com + app.brotherjimi.com)
- [ ] Final checklist (backups configured, monitoring enabled, SSL working, CDN live)
- [ ] Brother Jimi confirms: 15 people registered, reminders sent, mentors ready
- [ ] Brother Jimi final prep: prayer, teaching outline locked, recording device charged

**Aug 8 (Friday 3pm):**
- 🚀 **LAUNCH**: First cohort gathers at SCOAN Accra
  - [ ] 15 people present
  - [ ] Recording device ready (phone camera)
  - [ ] Audio levels tested
  - [ ] Prayer opening
  - [ ] Stage 1: Truth teaching (30 min, by outline)
  - [ ] Q&A + discussion (20 min)
  - [ ] Closing prayer + reflection assignment (10 min)
  - [ ] Recording captured throughout

**Aug 8 (Friday evening):**
- [ ] Upload recording to platform
- [ ] Email sent: "Your reflection prompt is live"
- [ ] Track attendance in admin dashboard
- [ ] Note any feedback/questions for next week

**Aug 9-10 (Weekend):**
- [ ] Participants submit reflections
- [ ] Brother Jimi/mentors review reflections (encouragement + affirmation)
- [ ] Prepare Stage 2: Confession for following Friday

---

## EACH ROLE'S VIEW

### VISITOR (No login)
**Experience:**
- Lands on brotherjimi.com
- Sees Brother Jimi's voice, gospel healing message, 7-stage overview
- Watches testimonies of people transformed (Stage 6-7)
- Sees impact metrics (X delivered, X serving)
- Sees: "Gathering Friday 3pm at SCOAN Accra"
- Clicks: "Request Deliverance" or "Learn more"

**Feeling:**
"This is real. Jesus heals fraud wounds. This is authentic."

---

### PRAYER SEEKER (Unauthenticated)
**Experience:**
- Clicks "Request Deliverance"
- Answers 5 questions (situation, seeking, name, contact, country)
- Submits
- Email: "Your prayer request is received. Brother Jimi will respond personally."

**Outside platform (pastoral):**
- Brother Jimi receives request notification
- Prays
- Responds personally (email/WhatsApp/phone)
- Encounter happens (virtual or in-person)
- Decision: "Will you walk the restoration journey?"

**If YES:**
- Email invitation: "Sign in to your account. Your journey begins with Stage 1."
- Creates account access

---

### PARTICIPANT - STAGE 1-5 (Logged in)
**Experience:**
- Dashboard shows: "Stage [X]: [Name]"
- Sees gathering info: "Friday 3pm SCOAN Accra [Get directions]"
- Sees reflection prompt for this week
- Submits reflection
- Email reminder: "Gathering is tomorrow at 3pm"
- Attends gathering in person
- Sees mentor info: "Your mentor: [Name] [Message]"
- Can message mentor if questions
- After reflection + attendance: "Ready for Stage 2?" button

**Feeling:**
"I'm held. I'm not alone. People understand. Jesus is restoring me."

---

### PARTICIPANT - STAGE 6 (Logged in)
**Experience:**
- Dashboard shows: "Stage 6: Honest Work"
- Reflection: "What honest work are you learning? How does this honor God?"
- Sees testimonies from Stage 7 people (inspiration ahead)
- After Stage 6 complete, invited: "Share your testimony"
- Records video or writes story of transformation
- Shares: name, how they were transformed, what's different now

**Feeling:**
"I can help others. My story matters. Jesus did this."

---

### PARTICIPANT - STAGE 7 (Logged in)
**Experience:**
- Dashboard shows: "Stage 7: Service"
- Reflection: "How will your restored life serve others?"
- Options to serve:
  - Mentor someone in Stage 1-5
  - Join prayer team
  - Facilitate a gathering
  - Share testimony publicly
- Shares testimony (video + bio + story)
- Appears on public testimonies gallery
- Sees their impact: people being inspired by their transformation

**Feeling:**
"I'm whole. I can help others come home. Testimony is my calling."

---

### DONOR/SPONSOR (Public, no login)
**Experience:**
- Lands on brotherjimi.com/impact
- Sees real metrics:
  - 15 people prayed with (Cohort 1 starts Aug 8)
  - 15 in restoration journey (Cohort 1)
  - As weeks pass: X completing each stage
  - X moving to honest work (Stage 6)
  - X serving others (Stage 7)
- Watches testimonies (Stage 6-7 people transformed)
- Reads: "This work is free. Funded by partners who believe."
- Sees partner logos
- Can donate or partner (form on page)

**Feeling:**
"This is legitimate. Money funds real transformation. This is where my partnership belongs."

---

### BROTHER JIMI (Admin)
**Experience:**
- Logs in: app.brotherjimi.com/admin
- Sees prayer request queue (filter by status)
- Can respond directly (email link)
- Sees Cohort 1 attendance tracker
  - Week 1 (Aug 8): Stage 1, 15 people attending
  - Week 2 (Aug 15): Stage 2, X people attending (who missed?)
  - Etc. through Week 7 (Sept 19)
- Manages testimonies (upload Stage 6-7 videos)
- Views metrics (real-time, updates as people progress)
- Tracks: cohort progress, who's completing, who needs support

**Power:**
"I see the full scope. I can track spiritual progress. I can celebrate wins. I can identify who needs prayer."

---

## CRITICAL DEPENDENCIES & BLOCKERS

### RESOLVED ✅
- [ ] SCOAN letter approval — **DONE**
- [ ] Recording method (Option B: phone camera) — **LOCKED**
- [ ] First cohort size (15 people) — **LOCKED**

### MUST BE READY BY AUG 6
- [ ] Brother Jimi's Stage 1 outline (sent to dev for dashboard embedding)
- [ ] List of 15 people + mentor assignments (dev needs for testing)
- [ ] Recording setup tested (audio + video quality confirmed)
- [ ] All 15 people registered + confirmed attending

### MUST BE TRUE BY AUG 8
- [ ] Platform live and tested (zero bugs)
- [ ] 15 people at SCOAN 3pm
- [ ] Recording device ready
- [ ] Mentors prepared and ready

---

## BUILD PRIORITIES (If timeline slips)

**MUST HAVE (Aug 8 launch):**
1. Dashboard + reflection + progression
2. Email sequences
3. Mobile responsive
4. Admin prayer queue
5. Attendance tracking

**SHOULD HAVE (by Aug 5):**
6. Public testimonies gallery
7. Impact page
8. Testimonies upload system
9. Landing page updates

**NICE TO HAVE (if time allows):**
10. Advanced analytics
11. Social sharing polish
12. Partnership form advanced features

---

## SUCCESS METRICS (August 8)

### PLATFORM
✅ Zero console errors  
✅ All emails sending correctly (tested with real addresses)  
✅ Mobile responsive (tested iPhone + Android)  
✅ Public pages live (landing, testimonies, impact)  
✅ Admin dashboard functional (prayer queue, attendance, testimonies)  
✅ Database secure (auth working, data encrypted)  
✅ Downtime: 0 minutes (monitoring enabled)  

### PEOPLE
✅ 15 people registered in platform  
✅ 15 people confirmed attending Friday 3pm  
✅ Mentors assigned + notified  
✅ Stage 1 teaching outline finalized  
✅ Recording setup tested  

### OUTCOME
✅ 15 people gather at SCOAN Friday 3pm  
✅ Brother Jimi teaches Stage 1: Truth (30 min)  
✅ Discussion + prayer (30 min)  
✅ Recording captured (phone camera)  
✅ Reflection prompts submitted (weekend)  
✅ Stage 2 launched next Friday  

---

## POST-LAUNCH (Aug 9+)

**Immediate (Aug 9-10):**
- Participants submit reflections
- Brother Jimi/mentors review + respond
- Prepare Stage 2 outline + content

**Weekly cycle (continuing):**
- Friday 3pm: Gather at SCOAN, teach next stage
- Record gathering
- Send reflection prompt
- Weekend: participants reflect + submit
- Week: mentors engage, prayer support

**Ongoing (as people progress):**
- Week 6 (Stage 6): Collect testimonies (video recording starts)
- Week 7 (Stage 7): More testimonies
- Week 8: Launch Cohort 2 (new 15 people, same 7-week cycle)
- As testimonies ready: upload to gallery + go public

---

## PERMANENT STATUS

This plan is:
- ✅ **CANONICAL** — Only source of truth
- ✅ **PERMANENT** — Supersedes all previous planning documents
- ✅ **ACTIVE** — Governing all decisions until August 8
- ✅ **REFERENCE** — Future Claude sessions read this FIRST

All previous planning documents (CLAUDE_PROJECT_GUIDE, PHASE_1_DEPENDENCY_MAP, etc.) are archived for historical reference only.

**This plan is the north star.**

---

## DOCUMENT METADATA

**Created:** July 29, 2026  
**Author:** Claude Code + Brother Jimi  
**Status:** ACTIVE LAUNCH PLAN  
**Next Review:** August 1, 2026 (mid-build check-in)  
**Launch Date:** August 8, 2026  
**Visibility:** Git repository (permanent reference)  

---

**BUILD STARTS NOW.**
