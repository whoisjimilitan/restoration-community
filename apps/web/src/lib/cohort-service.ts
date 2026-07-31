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
