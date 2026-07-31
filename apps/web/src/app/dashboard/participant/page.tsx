import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { PageLayout, PageHeader, Section } from '@/components/ui';
import { MentorCard } from './components/MentorCard';
import { GatheringCard } from './components/GatheringCard';
import { ReflectionForm } from './components/ReflectionForm';

export default async function ParticipantDashboard() {
  console.log('[PARTICIPANT_DASHBOARD] Loading participant dashboard');

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('[PARTICIPANT_DASHBOARD] Unauthorized - no session');
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: true,
      userRestoration: {
        include: {
          currentStage: true,
          cohort: true,
        },
      },
    },
  });

  if (!user) {
    console.log('[PARTICIPANT_DASHBOARD] User not found');
    redirect('/auth/signin');
  }

  if (!user.onboardingCompleted) {
    console.log('[PARTICIPANT_DASHBOARD] User not onboarded, redirecting to onboarding');
    redirect('/onboarding');
  }

  if (!user.userRestoration) {
    console.log('[PARTICIPANT_DASHBOARD] User has no restoration record');
    redirect('/dashboard');
  }

  // Fetch next meeting for this cohort
  let nextMeeting = null;
  if (user.userRestoration.cohortId) {
    nextMeeting = await prisma.meeting.findFirst({
      where: {
        cohortId: user.userRestoration.cohortId,
        scheduledDate: {
          gte: new Date(),
        },
      },
      include: {
        stage: true,
      },
      orderBy: {
        scheduledDate: 'asc',
      },
    });
  }

  // Fetch mentor assignment
  const mentorAssignment = await prisma.mentorAssignment.findFirst({
    where: {
      menteeUserRestorationId: user.userRestoration.id,
      status: 'active',
    },
    include: {
      mentor: true,
    },
  });

  const displayName = user.profile?.displayName || 'Friend';

  console.log('[PARTICIPANT_DASHBOARD] Loaded participant dashboard for', displayName);

  return (
    <PageLayout>
      <PageHeader
        title={`Welcome, ${displayName}`}
        description="Your restoration journey, mentor support, and gathering schedule."
      />

      {/* Mentor and Gathering Cards */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MentorCard mentor={mentorAssignment?.mentor || null} />
          <GatheringCard nextMeeting={nextMeeting} />
        </div>
      </Section>

      {/* Weekly Reflection */}
      <Section>
        <ReflectionForm
          currentStageId={user.userRestoration.currentStage.id}
          currentStageName={user.userRestoration.currentStage.name}
        />
      </Section>
    </PageLayout>
  );
}
