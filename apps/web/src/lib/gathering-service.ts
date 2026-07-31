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
