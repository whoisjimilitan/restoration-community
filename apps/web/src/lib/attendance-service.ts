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

export async function getUnaddressedPrayerRequests(limit = 10) {
  console.log('[ATTENDANCE_SERVICE] Getting unaddressed prayer requests');

  const prayerRequests = await prisma.prayerRequest.findMany({
    where: {
      // Assuming unaddressed means no response yet or status not COMPLETED
      responses: { none: {} }
    },
    include: {
      participant: { include: { profile: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  });

  console.log('[ATTENDANCE_SERVICE] Found', prayerRequests.length, 'unaddressed prayer requests');
  return prayerRequests;
}
