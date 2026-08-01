# Brother Jimi Platform — Execution Todo List
## Complete Scope Before Build

**Status:** Ready to implement  
**Launch Date:** Aug 8, 2026 (8 days away)  
**Created:** July 31, 2026

---

## PHASE 1: LANDING PAGE UPDATES (Highest Priority)

### Landing Page Core Change
- [ ] Add new section after "The Only Way" section
- [ ] Insert copy:
  ```
  If this message is for you.
  If the Spirit calling you out.

  Now encounter God's deliverance.

  Request a deliverance encounter with me.

  [DELIVERANCE PRAYER]
  ```
- [ ] Button styling matches existing CTAs
- [ ] Test button placement (does it load correctly, is it clickable)
- [ ] Visual check: Does section blend with prophetic tone?
- [ ] Mobile responsive: Test on phone/tablet

### Landing Page QA
- [ ] No console errors
- [ ] Page loads in <2 seconds
- [ ] Button color/contrast accessible
- [ ] Test on Chrome, Safari, Firefox

---

## PHASE 2: PRAYER CALL BOOKING SYSTEM (Highest Priority)

### Prayer Call Booking Page (New Page)
- [ ] Create `/prayer-call/book` or `/request-prayer` page
- [ ] Design minimal form:
  - [ ] Name field
  - [ ] Email field
  - [ ] Phone field
  - [ ] Brief situation/message (textarea)
  - [ ] Consent checkbox: "I agree Brother Jimi may record this encounter"
- [ ] Calendar widget (show Brother Jimi's availability)
- [ ] Time zone handling (Ghana time)
- [ ] Confirmation screen after booking

### Email Sequences
- [ ] Booking confirmation email (includes date/time/Zoom link)
- [ ] 24-hour reminder email (day before prayer call)
- [ ] Post-prayer-call email:
  - [ ] "Your prayer encounter was recorded"
  - [ ] "You're invited to join our 7-day intensive"
  - [ ] Link to program registration

### Recording Infrastructure
- [ ] Zoom integration (or video call platform)
- [ ] Screen recording setup instructions (for Brother Jimi)
- [ ] Consent form storage (record consent decision)
- [ ] Video storage plan (where do recordings live? Supabase? Vercel Blob?)
- [ ] Security: Private storage, no public access

---

## PHASE 3: ADMIN DASHBOARD — PRAYER CALL TRACKING

### Prayer Call Management (Core)
- [ ] Admin view: Upcoming prayer calls (next 7 days)
- [ ] Admin view: Prayer call history (with recording status)
- [ ] Mark as "completed" with notes
- [ ] Store consent decision (yes/no record)
- [ ] Track follow-up: Which people invited to programs?
- [ ] Export: Prayer call list (for reporting)

### Dashboard Pages Needed
- [ ] `/dashboard/admin/prayer-calls` (list + schedule)
- [ ] `/dashboard/admin/prayer-calls/[id]` (details + notes)

---

## PHASE 4: ADMIN DASHBOARD — PROGRAM MANAGEMENT

### Program Formats (Flexible Scheduling)
- [ ] List programs by format:
  - [ ] School programs
  - [ ] Church programs
  - [ ] Away retreats
  - [ ] Workplace programs
- [ ] For each program:
  - [ ] Location
  - [ ] Dates (7-day window)
  - [ ] Participant count (target vs actual)
  - [ ] Facilitators assigned
  - [ ] Co-facilitators helping

### Participant Management
- [ ] Track participants in each program
- [ ] Sponsor assignment (who paid for them)
- [ ] Attendance tracking
- [ ] Mentor assignment
- [ ] Post-program: Co-facilitation readiness

### Facilitator Pipeline
- [ ] List people eligible to co-facilitate (spiritual fruit observed)
- [ ] Track co-facilitations (how many times, which programs)
- [ ] Mentor status (are they mentoring anyone?)

---

## PHASE 5: ADMIN DASHBOARD — PARTNERSHIP & FINANCIAL

### Monthly Partners
- [ ] List active partners (name, email, amount/month)
- [ ] Track recurring giving (recurring donation flag)
- [ ] Monthly impact email tracking (sent yes/no)
- [ ] Total monthly revenue from partners

### Participant Sponsors
- [ ] For each program: list sponsors + payment status
- [ ] Track sponsor payments ($X received, date)
- [ ] Flag unpaid participants
- [ ] Sponsor contact (for follow-up if needed)

### Financial Summary
- [ ] Monthly revenue total (partners + sponsor fees + other)
- [ ] Breakdown by source
- [ ] Export for reporting

---

## PHASE 6: ADMIN DASHBOARD — CONTENT & TESTIMONIES

### Video Recording Tracking
- [ ] Prayer call videos: Before encounters (stored, private)
- [ ] Program sessions: Recording status (which sessions recorded)
- [ ] Participant "after" videos: Status (submitted yes/no)
- [ ] Testimonies: Before/after pairs (ready to edit)

### Testimony Management
- [ ] Upload "before" video (prayer call)
- [ ] Upload "after" video (post-program)
- [ ] Auto-create: "Before + After" pairing
- [ ] Schedule YouTube upload (date/time)
- [ ] Track: YouTube performance (views, likes, shares)

---

## PHASE 7: USER DASHBOARD — PARTICIPANT JOURNEY

### Post-Prayer-Call (User receives)
- [ ] Confirmation: "Your prayer encounter is scheduled"
- [ ] One day before: "Your encounter is tomorrow"
- [ ] After call: "Your transformation begins here"
  - [ ] Link to program registration
  - [ ] Explanation: "Bring a sponsor"

### During Program
- [ ] Daily teachings (if virtual or async)
- [ ] Reflection prompts
- [ ] Mentor introduction + contact
- [ ] Progress tracker ("You're on Day 3 of 7")

### After Program (Week 8+)
- [ ] Mentor connection dashboard
- [ ] Growth check-ins (optional form)
- [ ] "Ready to co-facilitate?" option
- [ ] Share your testimony (upload "after" video)

---

## PHASE 8: WEBSITE PAGES (Content)

### Keep Unchanged
- [ ] Landing page (except new prayer call section ✓)
- [ ] Partnership page (maybe small tweak, keep elegant)
- [ ] Testimonies page (existing structure)

### New/Updated Pages
- [ ] Prayer call booking page (already in Phase 2)
- [ ] Programs page: Show multiple formats (optional, can wait post-Aug-8)
- [ ] How sponsorship works page (optional, can wait)
- [ ] Partner info page (optional, can wait)

---

## PHASE 9: DATABASE SCHEMA

### New Tables Needed
- [ ] PrayerCall (id, brotherJimiId, scheduledTime, status, recordingUrl, consentGiven, createdAt)
- [ ] PrayerCallResponse (id, prayerCallId, notes, followUpProgramId, completedAt)
- [ ] Program (id, format, location, startDate, endDate, targetSize, status, facilitatorId)
- [ ] ProgramParticipant (id, programId, userId, sponsorId, sponsorName, sponsorPaid, mentorId)
- [ ] Facilitator (id, userId, readyToCoFacilitate, coFacilitationsCount, mentorCount)
- [ ] Sponsor (id, name, email, phone, amount, programParticipantId, paidAt)
- [ ] Testimony (id, beforeVideoUrl, afterVideoUrl, participantId, youtubeUrl, publishedAt)

### Existing Tables to Update
- [ ] User (add: facilitatorReadiness status)
- [ ] UserRestoration (add: programId, sponsorId, mentorId)

---

## PHASE 10: EMAIL INFRASTRUCTURE

### Email Templates Needed
- [ ] Prayer call confirmed
- [ ] Prayer call reminder (24hr before)
- [ ] Prayer call completed + next steps
- [ ] Program registration confirmed
- [ ] Program day-by-day (if needed)
- [ ] Post-program: Testimonies invitation
- [ ] Monthly partner impact update

### Email Configuration
- [ ] SendGrid/Resend API set up
- [ ] Test email delivery
- [ ] Unsubscribe handling

---

## PHASE 11: SECURITY & COMPLIANCE

### Privacy/Consent
- [ ] Recording consent form (clear, legal)
- [ ] Video retention policy (how long we keep recordings)
- [ ] Testimony opt-in/opt-out (people can say no to public use)
- [ ] GDPR check (data storage, deletion policy)

### Authentication
- [ ] Prayer call booking: No login required (public)
- [ ] Admin dashboard: Auth required (Brother Jimi only)
- [ ] User dashboard: Auth required (after prayer call scheduled)
- [ ] Partner portal: Auth required (optional, can be view-only email for now)

---

## PHASE 12: TESTING & QA

### Functional Testing
- [ ] Prayer call booking end-to-end (book → email → confirm)
- [ ] Admin dashboard: Create program, add participants, assign mentor
- [ ] User dashboard: See prayer call, register for program, see mentor
- [ ] Email delivery: All sequences (confirmation, reminder, follow-up)

### Browser/Mobile Testing
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + mobile)
- [ ] Firefox (desktop)
- [ ] Button sizes, form inputs accessible on mobile

### Performance
- [ ] Page load times <2 seconds
- [ ] Dashboard loads quickly
- [ ] No console errors

### Smoke Test Checklist
- [ ] No TypeScript errors (`npm run build`)
- [ ] No console errors (F12)
- [ ] All links work
- [ ] Emails send/receive
- [ ] Images load
- [ ] Forms submit

---

## PHASE 13: DEPLOYMENT & GO-LIVE

### Pre-Launch (Aug 7, evening)
- [ ] Deploy to production (Vercel)
- [ ] Verify landing page live + new button works
- [ ] Verify prayer call booking page live
- [ ] Test one prayer call booking end-to-end
- [ ] Check admin dashboard accessible
- [ ] Verify email sending works (test email to Brother Jimi)

### Launch Day (Aug 8)
- [ ] Cohort 1 gathers at location
- [ ] Recording setup verified
- [ ] Email reminders sent
- [ ] Monitor for errors (check logs)

### Post-Aug-8 (Aug 9-15)
- [ ] First prayer calls completed
- [ ] First cohort completes 7 days
- [ ] First testimonies recorded
- [ ] Admin dashboard populated with real data
- [ ] Fix any issues that arose

---

## PHASE 14: CONTENT PRODUCTION (Post-Aug-8)

### Documentation (Not urgent, but needed)
- [ ] How to record prayer calls (guide for Brother Jimi)
- [ ] How to manage programs (admin guide)
- [ ] How to track facilitators (admin guide)
- [ ] How to schedule testimonies on YouTube (guide)

### Video Processing (Post-Aug-8)
- [ ] Set up video editing workflow (if needed)
- [ ] YouTube channel setup (if not already done)
- [ ] Social media scheduling (TikTok, Instagram clips)

---

## OPTIONAL (Post-Aug-8, Lower Priority)

### Nice-to-Have Features
- [ ] Programs page showing multiple formats
- [ ] Sponsor matching system (auto-connect sponsor to participant)
- [ ] SMS reminders (in addition to email)
- [ ] WhatsApp integration for updates
- [ ] Analytics dashboard (detailed reporting)
- [ ] Prayer call calendar (public view of availability)
- [ ] Mentor certification program

---

## BLOCKERS & DEPENDENCIES

### Hard Dependencies (Must resolve before launch)
- [ ] Video call platform chosen (Zoom? Google Meet? Other?)
- [ ] Video storage solution (Supabase Storage? Vercel Blob? AWS?)
- [ ] Email service provider (SendGrid? Resend? Other?)
- [ ] Domain configured (brotherjimi.com, app.brotherjimi.com if needed)

### Information Needed from Brother Jimi
- [ ] Prayer call availability (what times/days can he take calls?)
- [ ] Location for Cohort 1 (confirmed or backup?)
- [ ] Who are the mentors for Cohort 1?
- [ ] What's the sponsor fee/target? (for program registration)
- [ ] Recording consent form text (legal review done?)

---

## TIMELINE

**BY AUG 5:**
- ✅ Phase 1: Landing page updated
- ✅ Phase 2: Prayer call booking live
- ✅ Phase 10: Email templates ready
- ✅ Phase 11: Security checks done
- ✅ Phase 12: QA complete

**BY AUG 7 (Evening):**
- ✅ Phase 13: Deploy to production
- ✅ Everything tested end-to-end

**AUG 8:**
- ✅ Cohort 1 launch (prayer calls ongoing)

**POST-AUG-8:**
- ✅ Phase 3-9: Dashboard refinements
- ✅ Phase 14: Content production

---

## OWNERSHIP

**Claude (Me):**
- Frontend: Landing page, prayer call booking, user dashboard
- Backend: API routes, database schema, email sequences
- DevOps: Deployment, monitoring

**Brother Jimi:**
- Provide info (availability, location, mentors, sponsor fees)
- Record prayer calls + sessions
- Review and approve UI/UX

**Testing:**
- Manual QA of all flows

---

**READY TO START? Which phase should we tackle first?**
