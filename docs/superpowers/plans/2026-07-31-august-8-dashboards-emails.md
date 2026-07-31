# August 8 Launch: Dashboards & Email Sequences

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build participant dashboard, admin dashboard, and email notification system for August 8 Cohort 1 launch (15 participants, weekly Friday 3pm gatherings at SCOAN Accra).

**Architecture:** 
- Participant dashboard renders real-time stage progression with reflection form, mentor display, and next gathering card
- Admin dashboard displays cohort metrics (participants by stage), prayer queue, attendance tracking, and real-time statistics
- Email system uses Resend (already configured) to send 24hr gathering reminders, weekly reflection prompts, and stage progression alerts
- All new routes protected with NextAuth session validation
- Database queries optimized with Prisma includes for performance

**Tech Stack:** 
- Next.js 15 (App Router), TypeScript, Prisma ORM, NextAuth, Resend email, Tailwind CSS, Framer Motion animations

## Global Constraints

- All protected routes require valid NextAuth session (role-based: PARTICIPANT, ADMIN, COMMUNITY_LEADER)
- Dashboard reflects live database state; no caching except standard HTTP caching
- Email templates use Resend's React email components (resend/components)
- Timestamps always stored in UTC (Prisma @db.DateTime)
- Database queries include all required relations to avoid N+1 problems
- No mock data in production; all UI binds to real Prisma queries
- Styling uses existing Tailwind config (rc-accent, rc-text, rc-bg, rc-border tokens)
- Animations use Framer Motion (already in dependencies)
- All code comments explain the WHY, not the WHAT (code is self-documenting)
- Console.log at start and end of every API route for observability

---

## File Structure

```
/app/dashboard/
  /page.tsx                          → Participant dashboard (redirects based on role)
  /participant/
    /page.tsx                        → Participant dashboard main page
    /components/
      StageProgressionCard.tsx       → Display current stage with visual progress
      ReflectionForm.tsx             → Submit weekly reflection
      MentorCard.tsx                 → Display assigned mentor info
      GatheringCard.tsx              → Show next Friday gathering details
  /admin/
    /page.tsx                        → Admin dashboard main page
    /components/
      CohortMetricsPanel.tsx         → Display participant counts per stage
      AttendanceTrackerPanel.tsx     → Track attendance per meeting
      PrayerQueuePanel.tsx           → Display unaddressed prayer requests
      RealTimeStatsPanel.tsx         → Metrics: delivered, in-restoration, etc.

/api/dashboard/
  /reflection/route.ts               → POST reflection for current stage
  /attendance/checkin/route.ts       → POST attendance record for meeting
  /gathering/next/route.ts           → GET next gathering for user

/api/email/
  /send-gathering-reminder.ts        → POST (triggered by webhook/cron at 24h before)
  /send-reflection-prompt.ts         → POST (triggered by webhook/cron each Friday 2pm)
  /send-stage-progression.ts         → POST (triggered when user advances stage)

/lib/
  email-templates.ts                 → Resend email component templates
  cohort-service.ts                  → Cohort/participant queries & helpers
  attendance-service.ts              → Attendance queries & helpers
  gathering-service.ts               → Meeting/gathering queries & helpers
```

---

## Task 1: Participant Dashboard — Stage Progression Card

**Files:**
- Create: `/app/dashboard/participant/components/StageProgressionCard.tsx`
- Create: `/lib/gathering-service.ts` (supporting helper)
- Modify: `/app/dashboard/participant/page.tsx` (import and display)

**Interfaces:**
- Consumes: Prisma User, UserRestoration, RestorationStage models (all loaded in dashboard page)
- Produces: StageProgressionCard component (props: `userRestoration: UserRestoration & { currentStage: RestorationStage }`, returns JSX)

**Steps:**

- [ ] **Step 1:** Create `/lib/gathering-service.ts` with helper to get next meeting

```typescript
import { prisma } from './prisma';

export async function getNextMeetingForCohort(cohortId: string) {
  console.log('[GATHERING_SERVICE] Getting next meeting for cohort:', cohortId);
  
  const nextMeeting = await prisma.meeting.findFirst({
    where: {
      cohortId,
      scheduledDate: { gte: new Date() }
    },
    include: { stage: true },
    orderBy: { scheduledDate: 'asc' }
  });

  console.log('[GATHERING_SERVICE] Next meeting:', nextMeeting?.id || 'none');
  return nextMeeting;
}
```

- [ ] **Step 2:** Create `/app/dashboard/participant/components/StageProgressionCard.tsx`

```typescript
'use client';

import { UserRestoration, RestorationStage } from '@prisma/client';
import { motion } from 'framer-motion';

interface StageProgressionCardProps {
  userRestoration: UserRestoration & { currentStage: RestorationStage };
}

export function StageProgressionCard({ userRestoration }: StageProgressionCardProps) {
  const stages = [
    { num: 1, name: 'Truth' },
    { num: 2, name: 'Confession' },
    { num: 3, name: 'Repentance' },
    { num: 4, name: 'Forgiveness' },
    { num: 5, name: 'Reconciliation' },
    { num: 6, name: 'Honest Work' },
    { num: 7, name: 'Service' }
  ];

  const currentStageNum = userRestoration.currentStage.sequence;
  const progressPercent = (currentStageNum / 7) * 100;

  return (
    <motion.div
      className="rounded-lg border border-rc-border bg-rc-bg p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-rc-text">Your Journey</h2>
        <p className="text-rc-text/70">Stage {currentStageNum} of 7: {userRestoration.currentStage.name}</p>
      </div>

      {/* Progress bar */}
      <div className="space-y-3">
        <div className="h-2 bg-rc-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-rc-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Stage timeline */}
      <div className="grid grid-cols-7 gap-2">
        {stages.map(stage => (
          <div
            key={stage.num}
            className={`
              aspect-square rounded-lg flex items-center justify-center font-bold text-sm
              transition-all duration-300
              ${currentStageNum >= stage.num
                ? 'bg-rc-accent text-white'
                : 'bg-rc-border/30 text-rc-text/50'
              }
            `}
          >
            {stage.num}
          </div>
        ))}
      </div>

      {/* Current stage description */}
      <div className="pt-4 border-t border-rc-border">
        <p className="text-sm text-rc-text/70">
          You&apos;re currently walking through <strong>{userRestoration.currentStage.name}</strong>.
          Keep pressing forward in faith.
        </p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3:** Update `/app/dashboard/participant/page.tsx` to import and display StageProgressionCard

Add after current imports:
```typescript
import { StageProgressionCard } from './components/StageProgressionCard';
```

Add inside JSX after session check:
```typescript
<StageProgressionCard userRestoration={user.userRestoration} />
```

- [ ] **Step 4:** Run build and verify no TypeScript errors

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run build 2>&1 | grep -i error
```

Expected: No errors

- [ ] **Step 5:** Commit

```bash
cd /Users/jimilitan/Projects/restoration-community && git add apps/web/src/app/dashboard/participant/components/StageProgressionCard.tsx apps/web/src/lib/gathering-service.ts && git commit -m "feat: add stage progression card to participant dashboard"
```

---

## Task 2: Participant Dashboard — Reflection Form

**Files:**
- Create: `/app/dashboard/participant/components/ReflectionForm.tsx`
- Modify: `/app/dashboard/participant/page.tsx` (import and display)

**Interfaces:**
- Consumes: Current stage info (passed as prop), user session
- Produces: ReflectionForm component (handles POST to `/api/dashboard/reflection`, props: `currentStageId: number`, returns JSX)

**Steps:**

- [ ] **Step 1:** Create `/app/dashboard/participant/components/ReflectionForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ReflectionFormProps {
  currentStageId: number;
  currentStageName: string;
}

export function ReflectionForm({ currentStageId, currentStageName }: ReflectionFormProps) {
  const [reflection, setReflection] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim()) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('[REFLECTION_FORM] Submitting reflection for stage:', currentStageId);
      
      const res = await fetch('/api/dashboard/reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stageId: currentStageId, reflection })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('[REFLECTION_FORM] Error:', data.error);
        setError(data.error || 'Failed to save reflection');
        return;
      }

      console.log('[REFLECTION_FORM] Reflection saved successfully');
      setSuccess(true);
      setReflection('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      console.error('[REFLECTION_FORM] Exception:', msg);
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="rounded-lg border border-rc-border bg-rc-bg p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-rc-text">Weekly Reflection</h3>
        <p className="text-sm text-rc-text/70">
          Share your thoughts on {currentStageName}. What has the Lord shown you this week?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your reflection here..."
          rows={5}
          disabled={submitting}
          className="w-full p-3 rounded-lg border border-rc-border bg-white text-rc-text placeholder-rc-text/50 focus:outline-none focus:border-rc-accent focus:ring-2 focus:ring-rc-accent/10 disabled:opacity-50"
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            Reflection saved successfully. Thank you for sharing.
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !reflection.trim()}
          className="w-full py-2 px-4 rounded-lg bg-rc-accent text-white font-medium hover:bg-rc-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {submitting ? 'Saving...' : 'Save Reflection'}
        </button>
      </form>
    </motion.div>
  );
}
```

- [ ] **Step 2:** Update `/app/dashboard/participant/page.tsx` to import and display ReflectionForm

Add to imports:
```typescript
import { ReflectionForm } from './components/ReflectionForm';
```

Add to JSX:
```typescript
<ReflectionForm 
  currentStageId={user.userRestoration.currentStageId}
  currentStageName={user.userRestoration.currentStage.name}
/>
```

- [ ] **Step 3:** Create `/api/dashboard/reflection/route.ts` to persist reflection

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('[REFLECTION_API] POST /api/dashboard/reflection');
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    console.log('[REFLECTION_API] Unauthorized');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { stageId, reflection } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { userRestoration: true }
    });

    if (!user?.userRestoration) {
      console.log('[REFLECTION_API] User has no restoration record');
      return NextResponse.json(
        { error: 'User has no active restoration record' },
        { status: 400 }
      );
    }

    console.log('[REFLECTION_API] Saving reflection for user:', user.id, 'stage:', stageId);

    const stageReflection = await prisma.stageReflection.create({
      data: {
        userRestorationId: user.userRestoration.id,
        stageId,
        reflection
      }
    });

    console.log('[REFLECTION_API] Reflection saved:', stageReflection.id);
    return NextResponse.json({ success: true, id: stageReflection.id });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[REFLECTION_API] Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

- [ ] **Step 4:** Run build

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run build 2>&1 | tail -3
```

Expected: Build successful

- [ ] **Step 5:** Commit

```bash
cd /Users/jimilitan/Projects/restoration-community && git add apps/web/src/app/dashboard/participant/components/ReflectionForm.tsx apps/web/src/app/api/dashboard/reflection/route.ts && git commit -m "feat: add weekly reflection form to participant dashboard"
```

---

## Task 3: Participant Dashboard — Mentor & Gathering Cards

**Files:**
- Create: `/app/dashboard/participant/components/MentorCard.tsx`
- Create: `/app/dashboard/participant/components/GatheringCard.tsx`
- Modify: `/app/dashboard/participant/page.tsx` (import and fetch next meeting)

**Interfaces:**
- Consumes: User's mentor assignment, next meeting
- Produces: MentorCard & GatheringCard components (display-only JSX)

**Steps:**

- [ ] **Step 1:** Create `/app/dashboard/participant/components/MentorCard.tsx`

```typescript
'use client';

import { User } from '@prisma/client';
import { motion } from 'framer-motion';

interface MentorCardProps {
  mentor: User | null;
}

export function MentorCard({ mentor }: MentorCardProps) {
  if (!mentor) {
    return (
      <motion.div
        className="rounded-lg border border-rc-border bg-rc-bg p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-rc-text/70">
          A mentor will be assigned soon. Pray while you wait.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-lg border border-rc-border bg-rc-bg p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-rc-text">Your Mentor</h3>
        <p className="text-sm text-rc-text/70">
          Walking this journey with you
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="font-medium text-rc-text">{mentor.firstName || mentor.name || 'Mentor'}</p>
          <p className="text-sm text-rc-text/60">{mentor.email}</p>
        </div>

        <div className="pt-3 border-t border-rc-border">
          <p className="text-sm text-rc-text/70 leading-relaxed">
            Your mentor has walked this journey and knows the victory that awaits.
            Don&apos;t hesitate to reach out.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2:** Create `/app/dashboard/participant/components/GatheringCard.tsx`

```typescript
'use client';

import { Meeting } from '@prisma/client';
import { motion } from 'framer-motion';

interface GatheringCardProps {
  nextMeeting: (Meeting & { stage: { name: string } }) | null;
  cohortName: string;
}

export function GatheringCard({ nextMeeting, cohortName }: GatheringCardProps) {
  if (!nextMeeting) {
    return (
      <motion.div
        className="rounded-lg border border-rc-accent bg-rc-accent/5 p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-rc-text/70">No upcoming gatherings scheduled.</p>
      </motion.div>
    );
  }

  const dateObj = new Date(nextMeeting.scheduledDate);
  const formatted = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <motion.div
      className="rounded-lg border border-rc-accent bg-gradient-to-br from-rc-accent/10 to-transparent p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-rc-text">Next Gathering</h3>
        <p className="text-sm text-rc-text/70">
          {cohortName} • Stage {nextMeeting.weekNumber}: {nextMeeting.stage.name}
        </p>
      </div>

      <div className="space-y-3 border-t border-rc-border pt-4">
        <div>
          <p className="text-sm text-rc-text/60 uppercase tracking-wide">Date & Time</p>
          <p className="font-medium text-rc-text">{formatted}</p>
        </div>

        <div>
          <p className="text-sm text-rc-text/60 uppercase tracking-wide">Location</p>
          <p className="font-medium text-rc-text">{nextMeeting.location}</p>
        </div>

        <div className="pt-3">
          <p className="text-sm text-rc-text/70 leading-relaxed">
            Be there with an open heart. This gathering is where we move forward together in truth.
          </p>
        </div>
      </div>

      <motion.button
        className="w-full mt-4 py-2 px-4 rounded-lg bg-rc-accent text-white font-medium hover:bg-rc-accent/90 transition-all"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        I&apos;m Attending
      </motion.button>
    </motion.div>
  );
}
```

- [ ] **Step 3:** Update `/app/dashboard/participant/page.tsx` to fetch next meeting and mentor

Update the server component query after fetching user:

```typescript
// Add to the user query include:
include: {
  profile: true,
  userRestoration: {
    include: { 
      currentStage: true,
      cohort: true
    }
  },
  mentoringAssignments: { // This is inverse lookup
    include: { mentor: true }
  }
}

// After user fetch, get next meeting:
const nextMeeting = user.userRestoration?.cohort
  ? await getNextMeetingForCohort(user.userRestoration.cohort.id)
  : null;

// Get assigned mentor:
const mentorAssignment = await prisma.mentorAssignment.findFirst({
  where: {
    menteeUserRestorationId: user.userRestoration?.id
  },
  include: { mentor: true }
});
```

- [ ] **Step 4:** Update participant page JSX to display cards

Add imports:
```typescript
import { MentorCard } from './components/MentorCard';
import { GatheringCard } from './components/GatheringCard';
```

Add to JSX in appropriate grid/layout:
```typescript
<MentorCard mentor={mentorAssignment?.mentor || null} />
<GatheringCard 
  nextMeeting={nextMeeting}
  cohortName={user.userRestoration?.cohort?.name || 'Cohort'}
/>
```

- [ ] **Step 5:** Run build

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run build 2>&1 | tail -3
```

- [ ] **Step 6:** Commit

```bash
cd /Users/jimilitan/Projects/restoration-community && git add apps/web/src/app/dashboard/participant/components/MentorCard.tsx apps/web/src/app/dashboard/participant/components/GatheringCard.tsx && git commit -m "feat: add mentor and gathering cards to participant dashboard"
```

---

## Task 4: Admin Dashboard — Layout & Metrics Panel

**Files:**
- Create: `/app/dashboard/admin/page.tsx`
- Create: `/app/dashboard/admin/components/RealTimeStatsPanel.tsx`
- Create: `/lib/cohort-service.ts` (cohort queries)

**Interfaces:**
- Consumes: Cohort, UserRestoration, StageTransition queries
- Produces: Admin dashboard page (role-protected), RealTimeStatsPanel component

**Steps:**

- [ ] **Step 1:** Create `/lib/cohort-service.ts`

```typescript
import { prisma } from './prisma';

export async function getCohortStats(cohortId: string) {
  console.log('[COHORT_SERVICE] Getting stats for cohort:', cohortId);

  const participants = await prisma.userRestoration.findMany({
    where: { cohortId },
    include: { currentStage: true, user: true }
  });

  const byStage = participants.reduce((acc, p) => {
    const stageName = p.currentStage.name;
    acc[stageName] = (acc[stageName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = {
    totalParticipants: participants.length,
    byStage,
    participants
  };

  console.log('[COHORT_SERVICE] Stats:', { total: stats.totalParticipants, stages: stats.byStage });
  return stats;
}

export async function getActiveCohort() {
  console.log('[COHORT_SERVICE] Getting active cohort');
  
  const cohort = await prisma.cohort.findFirst({
    where: { status: 'active' },
    orderBy: { startDate: 'desc' }
  });

  console.log('[COHORT_SERVICE] Active cohort:', cohort?.id || 'none');
  return cohort;
}
```

- [ ] **Step 2:** Create `/app/dashboard/admin/components/RealTimeStatsPanel.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
}

function StatsCard({ label, value, description }: StatsCardProps) {
  return (
    <motion.div
      className="rounded-lg border border-rc-border bg-rc-bg p-6 space-y-2"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="text-sm text-rc-text/60 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-rc-accent">{value}</p>
      {description && <p className="text-xs text-rc-text/50">{description}</p>}
    </motion.div>
  );
}

interface RealTimeStatsPanelProps {
  totalParticipants: number;
  byStage: Record<string, number>;
}

export function RealTimeStatsPanel({ totalParticipants, byStage }: RealTimeStatsPanelProps) {
  const stages = ['Truth', 'Confession', 'Repentance', 'Forgiveness', 'Reconciliation', 'Honest Work', 'Service'];

  return (
    <motion.div
      className="rounded-lg border border-rc-border bg-rc-bg p-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-rc-text">Cohort Metrics</h2>
        <p className="text-rc-text/70">Real-time participant progression</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsCard
          label="Total Participants"
          value={totalParticipants}
          description="Currently enrolled"
        />
        <StatsCard
          label="Average Stage"
          value={(
            Object.entries(byStage).reduce((sum, [_, count], idx) => {
              const stageNum = stages.indexOf(Object.keys(byStage)[idx]) + 1 || 1;
              return sum + (stageNum * count);
            }, 0) / totalParticipants
          ).toFixed(1)}
          description="Weighted by participants"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-rc-text">Breakdown by Stage</h3>
        <div className="space-y-3">
          {stages.map(stage => {
            const count = byStage[stage] || 0;
            const percent = totalParticipants > 0 ? (count / totalParticipants) * 100 : 0;
            return (
              <div key={stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-rc-text">{stage}</span>
                  <span className="font-medium text-rc-accent">{count} ({percent.toFixed(0)}%)</span>
                </div>
                <div className="h-2 bg-rc-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-rc-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3:** Create `/app/dashboard/admin/page.tsx`

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCohortStats, getActiveCohort } from '@/lib/cohort-service';
import { RealTimeStatsPanel } from './components/RealTimeStatsPanel';

export default async function AdminDashboard() {
  console.log('[ADMIN_DASHBOARD] Page loaded');
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    console.log('[ADMIN_DASHBOARD] Unauthorized: no session');
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user || !['ADMIN', 'COMMUNITY_LEADER'].includes(user.role)) {
    console.log('[ADMIN_DASHBOARD] Unauthorized: insufficient role');
    redirect('/');
  }

  console.log('[ADMIN_DASHBOARD] Admin user:', user.id, 'role:', user.role);

  const cohort = await getActiveCohort();
  if (!cohort) {
    console.log('[ADMIN_DASHBOARD] No active cohort');
    return (
      <div className="min-h-screen bg-rc-bg p-8">
        <h1 className="text-3xl font-bold text-rc-text mb-4">Admin Dashboard</h1>
        <p className="text-rc-text/70">No active cohort. Create one to begin.</p>
      </div>
    );
  }

  const stats = await getCohortStats(cohort.id);

  console.log('[ADMIN_DASHBOARD] Cohort:', cohort.id, 'stats:', stats);

  return (
    <div className="min-h-screen bg-rc-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-rc-text">Admin Dashboard</h1>
          <p className="text-lg text-rc-text/70">{cohort.name}</p>
        </div>

        <RealTimeStatsPanel
          totalParticipants={stats.totalParticipants}
          byStage={stats.byStage}
        />

        {/* More panels will be added in next tasks */}
      </div>
    </div>
  );
}
```

- [ ] **Step 4:** Run build

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run build 2>&1 | tail -3
```

- [ ] **Step 5:** Commit

```bash
cd /Users/jimilitan/Projects/restoration-community && git add apps/web/src/app/dashboard/admin/page.tsx apps/web/src/app/dashboard/admin/components/RealTimeStatsPanel.tsx apps/web/src/lib/cohort-service.ts && git commit -m "feat: add admin dashboard with cohort metrics panel"
```

---

## Task 5: Admin Dashboard — Attendance & Prayer Queue Panels

**Files:**
- Create: `/app/dashboard/admin/components/AttendanceTrackerPanel.tsx`
- Create: `/app/dashboard/admin/components/PrayerQueuePanel.tsx`
- Create: `/lib/attendance-service.ts` (attendance queries)
- Modify: `/app/dashboard/admin/page.tsx` (add panels and fetch data)

**Interfaces:**
- Consumes: Meeting, Attendance, PrayerRequest queries
- Produces: AttendanceTrackerPanel, PrayerQueuePanel components

**Steps:**

- [ ] **Step 1:** Create `/lib/attendance-service.ts`

```typescript
import { prisma } from './prisma';

export async function getUpcomingMeetings(cohortId: string, limit = 5) {
  console.log('[ATTENDANCE_SERVICE] Getting upcoming meetings for cohort:', cohortId);

  const meetings = await prisma.meeting.findMany({
    where: {
      cohortId,
      scheduledDate: { gte: new Date() }
    },
    include: {
      stage: true,
      attendances: { include: { userRestoration: { include: { user: true } } } }
    },
    orderBy: { scheduledDate: 'asc' },
    take: limit
  });

  console.log('[ATTENDANCE_SERVICE] Found', meetings.length, 'upcoming meetings');
  return meetings;
}

export async function getAttendanceStatsForMeeting(meetingId: string) {
  console.log('[ATTENDANCE_SERVICE] Getting stats for meeting:', meetingId);

  const attendances = await prisma.attendance.findMany({
    where: { meetingId }
  });

  const attended = attendances.filter(a => a.attended).length;
  const absent = attendances.filter(a => a.status === 'absent').length;
  const pending = attendances.filter(a => a.status === 'pending').length;

  return { total: attendances.length, attended, absent, pending };
}
```

- [ ] **Step 2:** Create `/app/dashboard/admin/components/AttendanceTrackerPanel.tsx`

```typescript
'use client';

import { Meeting, Attendance } from '@prisma/client';
import { motion } from 'framer-motion';

interface AttendanceTrackerPanelProps {
  meetings: (Meeting & {
    stage: { name: string };
    attendances: (Attendance & { userRestoration: { user: { firstName: string | null; name: string | null } } })[]
  })[];
}

export function AttendanceTrackerPanel({ meetings }: AttendanceTrackerPanelProps) {
  if (meetings.length === 0) {
    return (
      <motion.div
        className="rounded-lg border border-rc-border bg-rc-bg p-8 text-center text-rc-text/70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        No upcoming meetings scheduled.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-lg border border-rc-border bg-rc-bg p-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-rc-text">Attendance Tracker</h2>
        <p className="text-rc-text/70">Upcoming meetings and check-ins</p>
      </div>

      <div className="space-y-6">
        {meetings.map((meeting) => {
          const attended = meeting.attendances.filter(a => a.attended).length;
          const total = meeting.attendances.length;
          const percent = total > 0 ? (attended / total) * 100 : 0;

          return (
            <motion.div
              key={meeting.id}
              className="border border-rc-border/50 rounded-lg p-4 space-y-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-rc-text">
                    Stage {meeting.weekNumber}: {meeting.stage.name}
                  </p>
                  <p className="text-sm text-rc-text/60">
                    {new Date(meeting.scheduledDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rc-accent">{attended}/{total}</p>
                  <p className="text-sm text-rc-text/60">{percent.toFixed(0)}% attended</p>
                </div>
              </div>

              <div className="h-2 bg-rc-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-rc-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {meeting.attendances.length > 0 && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-rc-text/70 hover:text-rc-text">
                    Show participants ({total})
                  </summary>
                  <div className="mt-3 pl-4 border-l border-rc-border/30 space-y-2">
                    {meeting.attendances.map((a) => (
                      <div key={a.id} className="text-rc-text/70 text-xs">
                        <span className={a.attended ? 'text-green-600 font-medium' : 'text-rc-text/50'}>
                          {a.attended ? '✓' : '○'}
                        </span>
                        {' '}
                        {a.userRestoration.user.firstName || a.userRestoration.user.name}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3:** Create `/app/dashboard/admin/components/PrayerQueuePanel.tsx`

```typescript
'use client';

import { PrayerRequest } from '@prisma/client';
import { motion } from 'framer-motion';

interface PrayerQueuePanelProps {
  prayerRequests: PrayerRequest[];
}

export function PrayerQueuePanel({ prayerRequests }: PrayerQueuePanelProps) {
  const unaddressed = prayerRequests.filter(pr => !pr.addressedAt);

  return (
    <motion.div
      className="rounded-lg border border-rc-border bg-rc-bg p-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-rc-text">Prayer Queue</h2>
        <p className="text-rc-text/70">
          {unaddressed.length} unaddressed {unaddressed.length === 1 ? 'prayer' : 'prayers'}
        </p>
      </div>

      {unaddressed.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-rc-text/70">All prayers have been addressed. Good work, intercessor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {unaddressed.map((pr) => (
            <motion.div
              key={pr.id}
              className="border border-rc-border/50 rounded-lg p-4 space-y-2 hover:border-rc-border transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-rc-text">{pr.title}</p>
                  <p className="text-sm text-rc-text/60 mt-1">{pr.description}</p>
                </div>
                <span className="text-xs text-rc-text/50 whitespace-nowrap ml-4">
                  {new Date(pr.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 4:** Update `/app/dashboard/admin/page.tsx` to import and fetch data

Add to imports:
```typescript
import { getUpcomingMeetings } from '@/lib/attendance-service';
import { AttendanceTrackerPanel } from './components/AttendanceTrackerPanel';
import { PrayerQueuePanel } from './components/PrayerQueuePanel';
```

After `getCohortStats`, add:
```typescript
const meetings = await getUpcomingMeetings(cohort.id);

const prayerRequests = await prisma.prayerRequest.findMany({
  where: { addressedAt: null },
  orderBy: { createdAt: 'desc' },
  take: 10
});

console.log('[ADMIN_DASHBOARD] Prayer requests:', prayerRequests.length);
```

Add to JSX after `RealTimeStatsPanel`:
```typescript
<AttendanceTrackerPanel meetings={meetings} />
<PrayerQueuePanel prayerRequests={prayerRequests} />
```

- [ ] **Step 5:** Run build

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run build 2>&1 | tail -3
```

- [ ] **Step 6:** Commit

```bash
cd /Users/jimilitan/Projects/restoration-community && git add apps/web/src/app/dashboard/admin/components/AttendanceTrackerPanel.tsx apps/web/src/app/dashboard/admin/components/PrayerQueuePanel.tsx apps/web/src/lib/attendance-service.ts && git commit -m "feat: add attendance and prayer queue panels to admin dashboard"
```

---

## Task 6: Email Templates — Gathering Reminder & Reflection Prompt

**Files:**
- Create: `/lib/email-templates.tsx` (Resend React email components)
- Create: `/api/email/send-gathering-reminder/route.ts`
- Create: `/api/email/send-reflection-prompt/route.ts`

**Interfaces:**
- Consumes: Meeting, User, UserRestoration queries; `sendEmail()` helper from `/lib/email.ts`
- Produces: Email template components (React), API routes (POST)

**Steps:**

- [ ] **Step 1:** Create `/lib/email-templates.tsx`

```typescript
import React from 'react';

export function GatheringReminderEmail({
  firstName,
  cohortName,
  stageName,
  dateTime,
  location
}: {
  firstName: string;
  cohortName: string;
  stageName: string;
  dateTime: string;
  location: string;
}) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1.6, color: '#1a1a1a', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Your Gathering is Tomorrow
      </h1>

      <p style={{ marginBottom: '16px' }}>
        Hello {firstName},
      </p>

      <p style={{ marginBottom: '24px' }}>
        This is a reminder that {cohortName} gathers tomorrow to continue our journey through <strong>{stageName}</strong>.
      </p>

      <div style={{
        backgroundColor: '#f5f5f5',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          DATE & TIME
        </p>
        <p style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold' }}>
          {dateTime}
        </p>

        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          LOCATION
        </p>
        <p style={{ margin: 0, fontSize: '16px' }}>
          {location}
        </p>
      </div>

      <p style={{ marginBottom: '24px' }}>
        Come with an open heart. The Lord is walking this journey with you.
      </p>

      <p style={{ marginBottom: 0, color: '#666', fontSize: '14px' }}>
        In Christ,<br />
        Brother Jimi Ministries
      </p>
    </div>
  );
}

export function ReflectionPromptEmail({
  firstName,
  stageName
}: {
  firstName: string;
  stageName: string;
}) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1.6, color: '#1a1a1a', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Weekly Reflection
      </h1>

      <p style={{ marginBottom: '16px' }}>
        Hello {firstName},
      </p>

      <p style={{ marginBottom: '24px' }}>
        We&apos;re in the stage of <strong>{stageName}</strong>. Take a moment to reflect on what the Lord has shown you this week.
      </p>

      <p style={{ marginBottom: '24px' }}>
        You can share your reflection in your dashboard. Your mentor reads these and prays over your journey.
      </p>

      <p style={{
        backgroundColor: '#0F766E',
        borderRadius: '6px',
        padding: '12px 24px',
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <a
          href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/participant`}
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Submit Your Reflection
        </a>
      </p>

      <p style={{ marginBottom: 0, color: '#666', fontSize: '14px' }}>
        In Christ,<br />
        Brother Jimi Ministries
      </p>
    </div>
  );
}

export function StageProgressionEmail({
  firstName,
  newStageName,
  newStageNum
}: {
  firstName: string;
  newStageName: string;
  newStageNum: number;
}) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1.6, color: '#1a1a1a', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0F766E' }}>
        You&apos;ve Advanced! 🎉
      </h1>

      <p style={{ marginBottom: '16px' }}>
        Hello {firstName},
      </p>

      <p style={{ marginBottom: '24px' }}>
        Congratulations! You have advanced to <strong>Stage {newStageNum}: {newStageName}</strong>.
      </p>

      <p style={{ marginBottom: '24px' }}>
        This is not a moment to celebrate yourself—it is a moment to celebrate what Jesus has done in you. Keep moving forward in faith.
      </p>

      <p style={{ marginBottom: '0', color: '#666', fontSize: '14px' }}>
        In Christ,<br />
        Brother Jimi Ministries
      </p>
    </div>
  );
}
```

- [ ] **Step 2:** Create `/api/email/send-gathering-reminder/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { GatheringReminderEmail } from '@/lib/email-templates';

export async function POST(req: NextRequest) {
  console.log('[GATHERING_REMINDER_EMAIL] POST /api/email/send-gathering-reminder');

  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    console.log('[GATHERING_REMINDER_EMAIL] Unauthorized webhook');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all meetings scheduled for tomorrow
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const endOfTomorrow = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);

    const meetings = await prisma.meeting.findMany({
      where: {
        scheduledDate: {
          gte: tomorrow,
          lt: endOfTomorrow
        }
      },
      include: {
        cohort: true,
        stage: true,
        attendances: {
          include: {
            userRestoration: { include: { user: true } }
          }
        }
      }
    });

    console.log('[GATHERING_REMINDER_EMAIL] Found', meetings.length, 'meetings tomorrow');

    let sent = 0;

    for (const meeting of meetings) {
      for (const attendance of meeting.attendances) {
        const user = attendance.userRestoration.user;
        const html = GatheringReminderEmail({
          firstName: user.firstName || user.name || 'Friend',
          cohortName: meeting.cohort.name,
          stageName: meeting.stage.name,
          dateTime: new Date(meeting.scheduledDate).toLocaleString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'Africa/Accra'
          }),
          location: meeting.location
        }).toString();

        await sendEmail({
          to: user.email,
          subject: `Reminder: ${meeting.cohort.name} Gathering Tomorrow`,
          html
        });

        sent++;
      }
    }

    console.log('[GATHERING_REMINDER_EMAIL] Sent', sent, 'reminders');
    return NextResponse.json({ success: true, sent });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[GATHERING_REMINDER_EMAIL] Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

- [ ] **Step 3:** Create `/api/email/send-reflection-prompt/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { ReflectionPromptEmail } from '@/lib/email-templates';

export async function POST(req: NextRequest) {
  console.log('[REFLECTION_PROMPT_EMAIL] POST /api/email/send-reflection-prompt');

  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    console.log('[REFLECTION_PROMPT_EMAIL] Unauthorized webhook');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Send to all active participants
    const participants = await prisma.userRestoration.findMany({
      where: {
        cohort: { status: 'active' }
      },
      include: { user: true, currentStage: true }
    });

    console.log('[REFLECTION_PROMPT_EMAIL] Found', participants.length, 'participants');

    let sent = 0;

    for (const participant of participants) {
      const html = ReflectionPromptEmail({
        firstName: participant.user.firstName || participant.user.name || 'Friend',
        stageName: participant.currentStage.name
      }).toString();

      await sendEmail({
        to: participant.user.email,
        subject: `Weekly Reflection: ${participant.currentStage.name}`,
        html
      });

      sent++;
    }

    console.log('[REFLECTION_PROMPT_EMAIL] Sent', sent, 'prompts');
    return NextResponse.json({ success: true, sent });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[REFLECTION_PROMPT_EMAIL] Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

- [ ] **Step 4:** Create `/api/email/send-stage-progression/route.ts` (triggered when user advances)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { StageProgressionEmail } from '@/lib/email-templates';

export async function POST(req: NextRequest) {
  console.log('[STAGE_PROGRESSION_EMAIL] POST /api/email/send-stage-progression');

  try {
    const { userEmail, firstName, stageName, stageNum } = await req.json();

    const html = StageProgressionEmail({
      firstName: firstName || 'Friend',
      newStageName: stageName,
      newStageNum: stageNum
    }).toString();

    await sendEmail({
      to: userEmail,
      subject: `Congratulations! You&apos;ve Advanced to Stage ${stageNum}`,
      html
    });

    console.log('[STAGE_PROGRESSION_EMAIL] Sent to:', userEmail);
    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[STAGE_PROGRESSION_EMAIL] Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

- [ ] **Step 5:** Run build

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run build 2>&1 | tail -3
```

- [ ] **Step 6:** Commit

```bash
cd /Users/jimilitan/Projects/restoration-community && git add apps/web/src/lib/email-templates.tsx apps/web/src/app/api/email/send-gathering-reminder/route.ts apps/web/src/app/api/email/send-reflection-prompt/route.ts apps/web/src/app/api/email/send-stage-progression/route.ts && git commit -m "feat: add email templates and reminder/prompt email routes"
```

---

## Task 7: Polish & Testing — Dashboard Access & Email Integration

**Files:**
- Modify: `/app/dashboard/page.tsx` (role-based routing)
- Modify: `/app/api/restoration/advance/route.ts` (trigger progression email on stage advance)

**Interfaces:**
- Consumes: User role, session, stage progression endpoint
- Produces: Updated routing and email triggers

**Steps:**

- [ ] **Step 1:** Update `/app/dashboard/page.tsx` to route based on role

```typescript
// After session and user lookup, add role-based redirect:

if (user.role === 'ADMIN' || user.role === 'COMMUNITY_LEADER') {
  redirect('/dashboard/admin');
} else if (user.role === 'PARTICIPANT') {
  redirect('/dashboard/participant');
} else {
  redirect('/auth/signin');
}
```

- [ ] **Step 2:** Check `/app/api/restoration/advance/route.ts` exists and trigger email on progression

Read the file first:
```bash
cat /Users/jimilitan/Projects/restoration-community/apps/web/src/app/api/restoration/advance/route.ts | head -50
```

If it exists, add after the stage transition is created:
```typescript
// Trigger progression email
await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/send-stage-progression`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userEmail: user.email,
    firstName: user.firstName || user.name,
    stageName: toStage.name,
    stageNum: toStage.sequence
  })
});
```

- [ ] **Step 3:** Test participant dashboard locally

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run dev &
# Wait 10 seconds for dev server to start
sleep 10
curl -s http://localhost:3000/dashboard/participant -H "Cookie: next-auth.session-token=test" | grep -q "Your Journey" && echo "✅ Participant dashboard loads" || echo "❌ Dashboard load failed"
```

- [ ] **Step 4:** Test admin dashboard locally

```bash
curl -s http://localhost:3000/dashboard/admin -H "Cookie: next-auth.session-token=test" | grep -q "Admin Dashboard" && echo "✅ Admin dashboard loads" || echo "❌ Admin dashboard load failed"
```

- [ ] **Step 5:** Test email template rendering

```bash
# This tests that email templates don't have syntax errors
cd /Users/jimilitan/Projects/restoration-community && npx tsx -e "
import { GatheringReminderEmail, ReflectionPromptEmail, StageProgressionEmail } from './apps/web/src/lib/email-templates';

const html1 = GatheringReminderEmail({ firstName: 'John', cohortName: 'Cohort 1', stageName: 'Truth', dateTime: '2026-08-15 3:00 PM', location: 'SCOAN Accra' });
const html2 = ReflectionPromptEmail({ firstName: 'John', stageName: 'Truth' });
const html3 = StageProgressionEmail({ firstName: 'John', newStageName: 'Confession', newStageNum: 2 });

console.log('✅ All email templates render successfully');
"
```

- [ ] **Step 6:** Run build

```bash
cd /Users/jimilitan/Projects/restoration-community && npm run build 2>&1 | tail -3
```

- [ ] **Step 7:** Commit

```bash
cd /Users/jimilitan/Projects/restoration-community && git add apps/web/src/app/dashboard/page.tsx && git commit -m "feat: add role-based dashboard routing and email trigger on stage progression"
```

---

## Summary

✅ **Completed work:**
- Participant dashboard: stage progression card, reflection form, mentor display, gathering card
- Admin dashboard: cohort metrics, attendance tracker, prayer queue
- Email system: 3 template types (gathering reminder, reflection prompt, stage progression)
- Protected routes with role-based access control
- Real-time database queries with Prisma includes for performance

**Launch-ready:**
- August 8 participants can view their journey progress
- Mentors assigned can be displayed (populate MentorAssignment table before launch)
- Gatherings created in Meeting table will display automatically
- Email reminders will send 24h before gatherings (configure webhook schedule)
- Admins have full visibility into cohort progress

**Post-launch tasks (not in this plan):**
- Set up scheduled webhooks (e.g., EasyCron, AWS EventBridge) to call email routes
- Populate Cohort 1 record with Aug 8 start date, Sept 19 end date, 15 participants
- Create Meeting records for each Friday 3pm gathering (7 weeks)
- Assign mentors via MentorAssignment table
