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

  // Seed test users for prayer calls and programs
  const testUser1 = await prisma.user.findUnique({
    where: { email: 'test.participant1@example.com' },
  });

  let user1Id = testUser1?.id;

  if (!user1Id) {
    const newUser = await prisma.user.create({
      data: {
        email: 'test.participant1@example.com',
        name: 'Test Participant One',
        password: 'hashed_password', // In production, this should be properly hashed
        role: 'PARTICIPANT',
      },
    });
    user1Id = newUser.id;
    console.log('[SEED] Created test user: Test Participant One');
  }

  // Create Brother Jimi test user
  const brotherJimiUser = await prisma.user.findUnique({
    where: { email: 'brother.jimi@example.com' },
  });

  let brotherJimiId = brotherJimiUser?.id;

  if (!brotherJimiId) {
    const newBrotherJimi = await prisma.user.create({
      data: {
        email: 'brother.jimi@example.com',
        name: 'Brother Jimi',
        password: 'hashed_password',
        role: 'ADMIN',
      },
    });
    brotherJimiId = newBrotherJimi.id;
    console.log('[SEED] Created Brother Jimi user');
  }

  // Create facilitator test user
  const facilitatorUser = await prisma.user.findUnique({
    where: { email: 'facilitator.test@example.com' },
  });

  let facilitatorId = facilitatorUser?.id;

  if (!facilitatorId) {
    const newFacilitator = await prisma.user.create({
      data: {
        email: 'facilitator.test@example.com',
        name: 'Test Facilitator',
        password: 'hashed_password',
        role: 'COMMUNITY_LEADER',
      },
    });
    facilitatorId = newFacilitator.id;
    console.log('[SEED] Created facilitator user');
  }

  // Seed PrayerCall
  const existingPrayerCall = await prisma.prayerCall.findFirst({
    where: { userId: user1Id },
  });

  if (!existingPrayerCall) {
    await prisma.prayerCall.create({
      data: {
        brotherJimiId,
        userId: user1Id,
        status: 'scheduled',
        scheduledTime: new Date('2026-08-05T14:00:00Z'),
        consentGiven: true,
        wherebyRoomUrl: 'https://whereby.com/brother-jimi/test-session',
      },
    });
    console.log('[SEED] Created test PrayerCall');
  } else {
    console.log('[SEED] PrayerCall already exists');
  }

  // Seed Sponsor
  const existingSponsor = await prisma.sponsor.findUnique({
    where: { email: 'sponsor@example.com' },
  });

  let sponsorId = existingSponsor?.id;

  if (!sponsorId) {
    const newSponsor = await prisma.sponsor.create({
      data: {
        name: 'Test Sponsor',
        email: 'sponsor@example.com',
        phone: '+233123456789',
        amount: 50000, // GHS
        paymentStatus: 'pending',
      },
    });
    sponsorId = newSponsor.id;
    console.log('[SEED] Created test Sponsor');
  } else {
    console.log('[SEED] Sponsor already exists');
  }

  // Seed Program
  const existingProgram = await prisma.program.findFirst({
    where: { name: 'Test Workplace Program' },
  });

  let programId = existingProgram?.id;

  if (!programId) {
    const newProgram = await prisma.program.create({
      data: {
        name: 'Test Workplace Program',
        format: 'workplace',
        location: 'Accra, Ghana',
        description: 'A test program for workplace restoration workshops',
        startDate: new Date('2026-08-15'),
        endDate: new Date('2026-08-22'),
        targetSize: 20,
        status: 'planning',
        facilitatorId,
      },
    });
    programId = newProgram.id;
    console.log('[SEED] Created test Program');
  } else {
    console.log('[SEED] Program already exists');
  }

  // Seed ProgramParticipant
  const existingParticipant = await prisma.programParticipant.findFirst({
    where: {
      programId,
      userId: user1Id,
    },
  });

  if (!existingParticipant) {
    await prisma.programParticipant.create({
      data: {
        programId,
        userId: user1Id,
        sponsorId,
        mentorId: facilitatorId,
        attendanceStatus: 'registered',
      },
    });
    console.log('[SEED] Created test ProgramParticipant');
  } else {
    console.log('[SEED] ProgramParticipant already exists');
  }

  // Seed Facilitator profile
  const existingFacilitator = await prisma.facilitator.findUnique({
    where: { userId: facilitatorId },
  });

  if (!existingFacilitator) {
    await prisma.facilitator.create({
      data: {
        userId: facilitatorId,
        readyToCoFacilitate: true,
        coFacilitationsCount: 0,
        mentorCount: 1,
      },
    });
    console.log('[SEED] Created test Facilitator profile');
  } else {
    console.log('[SEED] Facilitator profile already exists');
  }

  // Seed TestimonyVideo
  const existingTestimony = await prisma.testimonyVideo.findFirst({
    where: { participantId: user1Id },
  });

  if (!existingTestimony) {
    await prisma.testimonyVideo.create({
      data: {
        participantId: user1Id,
        beforeVideoUrl: 'https://supabase.com/storage/v1/object/public/testimonies/before_001.mp4',
        afterVideoUrl: 'https://supabase.com/storage/v1/object/public/testimonies/after_001.mp4',
        status: 'draft',
      },
    });
    console.log('[SEED] Created test TestimonyVideo');
  } else {
    console.log('[SEED] TestimonyVideo already exists');
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
