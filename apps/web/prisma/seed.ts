import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[SEED] Starting database seeding...');

  // Seed RestorationStages (immutable 7-stage journey)
  const stages = [
    { sequence: 1, key: 'truth', name: 'Truth' },
    { sequence: 2, key: 'confession', name: 'Confession' },
    { sequence: 3, key: 'repentance', name: 'Repentance' },
    { sequence: 4, key: 'forgiveness', name: 'Forgiveness' },
    { sequence: 5, key: 'reconciliation', name: 'Reconciliation' },
    { sequence: 6, key: 'honest-work', name: 'Honest Work' },
    { sequence: 7, key: 'service', name: 'Service' },
  ];

  for (const stage of stages) {
    const existing = await prisma.restorationStage.findUnique({
      where: { key: stage.key },
    });

    if (!existing) {
      await prisma.restorationStage.create({
        data: stage,
      });
      console.log(`[SEED] Created stage: ${stage.name}`);
    } else {
      console.log(`[SEED] Stage already exists: ${stage.name}`);
    }
  }

  // Seed Cohort 1 (August 8 - September 19, 2026)
  const cohort1 = await prisma.cohort.findFirst({
    where: { name: 'Cohort 1' },
  });

  if (!cohort1) {
    await prisma.cohort.create({
      data: {
        name: 'Cohort 1',
        description: 'First cohort - August 8 to September 19, 2026',
        startDate: new Date('2026-08-08'),
        endDate: new Date('2026-09-19'),
        targetSize: 15,
        status: 'active',
      },
    });
    console.log('[SEED] Created Cohort 1');
  } else {
    console.log('[SEED] Cohort 1 already exists');
  }

  console.log('[SEED] Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('[SEED] Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
