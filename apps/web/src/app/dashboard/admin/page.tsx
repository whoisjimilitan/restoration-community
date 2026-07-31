import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { PageLayout, PageHeader, Section } from '@/components/ui';
import { RealTimeStatsPanel } from './components/RealTimeStatsPanel';
import { AttendanceTrackerPanel } from './components/AttendanceTrackerPanel';
import { PrayerQueuePanel } from './components/PrayerQueuePanel';
import { getActiveCohort, getCohortStats } from '@/lib/cohort-service';
import { getUpcomingMeetings } from '@/lib/attendance-service';

export default async function AdminDashboard() {
  console.log('[ADMIN_DASHBOARD] Page load initiated');

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('[ADMIN_DASHBOARD] No session found, redirecting to signin');
    redirect('/auth/signin');
  }

  console.log('[ADMIN_DASHBOARD] Session user:', session.user.email);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    console.log('[ADMIN_DASHBOARD] User not found in database');
    redirect('/auth/signin');
  }

  console.log('[ADMIN_DASHBOARD] User role:', user.role);

  if (user.role !== 'ADMIN' && user.role !== 'COMMUNITY_LEADER') {
    console.log('[ADMIN_DASHBOARD] User lacks required role, redirecting home');
    redirect('/');
  }

  console.log('[ADMIN_DASHBOARD] Authorization passed, fetching active cohort');

  const activeCohort = await getActiveCohort();

  if (!activeCohort) {
    console.log('[ADMIN_DASHBOARD] No active cohort found');
    return (
      <PageLayout>
        <PageHeader
          title="Admin Dashboard"
          description="Manage cohorts and track participant progress"
        />

        <Section>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-600">
              No active cohort. Create one to begin.
            </p>
          </div>
        </Section>
      </PageLayout>
    );
  }

  console.log('[ADMIN_DASHBOARD] Active cohort found:', activeCohort.id);

  const stats = await getCohortStats(activeCohort.id);

  // Fetch upcoming meetings
  const meetings = await getUpcomingMeetings(activeCohort.id, 5);

  // Fetch unaddressed prayer requests
  const prayerRequests = await prisma.prayerRequest.findMany({
    where: {
      responses: { none: {} }
    },
    include: {
      participant: true
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  console.log('[ADMIN_DASHBOARD] Stats retrieved, rendering page');

  return (
    <PageLayout>
      <PageHeader
        title="Admin Dashboard"
        description="Manage cohorts and track participant progress"
      />

      <Section>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeCohort.name}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {activeCohort.description || 'No description provided'}
          </p>
        </div>
      </Section>

      <Section>
        <RealTimeStatsPanel
          totalParticipants={stats.totalParticipants}
          byStage={stats.byStage}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceTrackerPanel meetings={meetings} />
          <PrayerQueuePanel prayerRequests={prayerRequests} />
        </div>
      </Section>
    </PageLayout>
  );
}
