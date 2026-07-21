import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const RESTORATION_STAGES = [
  {
    key: 'truth',
    name: 'Truth',
    sequence: 1,
    content: {
      description:
        'The person recognizes and accepts the truth about their life, choices, and need for restoration. This is the foundation stage where honest self-awareness begins.',
      scripture:
        'John 8:32 - "Then you will know the truth, and the truth will set you free."',
      guidance:
        'Help the participant face reality honestly. Acknowledge pain, mistakes, and consequences. Use Scripture to show how God values truth and how it leads to freedom.',
      resources: JSON.stringify([
        {
          type: 'reflection',
          title: 'What truths about yourself are hardest to accept?',
        },
        {
          type: 'scripture',
          reference: 'Psalm 51:6, Proverbs 28:13',
        },
      ]),
    },
  },
  {
    key: 'confession',
    name: 'Confession',
    sequence: 2,
    content: {
      description:
        'The person openly acknowledges wrongdoing before God and, where appropriate, before others. Confession moves from internal recognition to spoken accountability.',
      scripture:
        '1 John 1:9 - "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness."',
      guidance:
        'Guide the participant toward honest confession. Explain the power of speaking sin aloud. Emphasize the safety and confidentiality of this space while noting appropriate times to confess to others.',
      resources: JSON.stringify([
        {
          type: 'reflection',
          title:
            'What are you struggling to confess, and why is confession important?',
        },
        {
          type: 'scripture',
          reference: 'James 5:16, 2 Samuel 12:1-13',
        },
      ]),
    },
  },
  {
    key: 'repentance',
    name: 'Repentance',
    sequence: 3,
    content: {
      description:
        'The person turns away from former patterns and commits to a new direction of life. Repentance is the active decision to change course.',
      scripture:
        'Romans 6:9 - "Do you not know that all of us who have been baptized into Christ Jesus were baptized into his death?"',
      guidance:
        'Help the participant understand repentance as both sorrow for sin and commitment to change. Discuss specific behavioral changes, new habits, and structures of accountability.',
      resources: JSON.stringify([
        {
          type: 'reflection',
          title:
            'What specific patterns will you turn away from, and what new directions will you pursue?',
        },
        {
          type: 'scripture',
          reference: 'Acts 3:19, 2 Corinthians 5:17',
        },
      ]),
    },
  },
  {
    key: 'forgiveness',
    name: 'Forgiveness',
    sequence: 4,
    content: {
      description:
        'The person receives God\'s forgiveness and learns to extend forgiveness to others. This stage addresses both receiving grace and offering mercy.',
      scripture:
        'Colossians 3:13 - "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you."',
      guidance:
        'Help the participant fully internalize God\'s forgiveness. Guide them through forgiving others, which is often the harder work. Address resentment, bitterness, and the freedom that forgiveness brings.',
      resources: JSON.stringify([
        {
          type: 'reflection',
          title:
            'How do you experience God\'s forgiveness? Who do you need to forgive?',
        },
        {
          type: 'scripture',
          reference: 'Ephesians 1:7, Matthew 18:21-35',
        },
      ]),
    },
  },
  {
    key: 'reconciliation',
    name: 'Reconciliation',
    sequence: 5,
    content: {
      description:
        'The person pursues restored relationships where appropriate and possible. Reconciliation moves forgiveness into concrete actions of relationship repair.',
      scripture:
        '2 Corinthians 5:18 - "All this is from God, who reconciled us to himself through Christ and gave us the ministry of reconciliation."',
      guidance:
        'Guide the participant in identifying relationships that need repair. Discuss when reconciliation is healthy, when boundaries are necessary, and how to pursue restoration with wisdom and safety.',
      resources: JSON.stringify([
        {
          type: 'reflection',
          title:
            'Which relationships are worth pursuing, and how will you approach reconciliation?',
        },
        {
          type: 'scripture',
          reference: 'Matthew 5:23-24, Romans 12:18',
        },
      ]),
    },
  },
  {
    key: 'honest_work',
    name: 'Honest Work',
    sequence: 6,
    content: {
      description:
        'The person embraces lawful, productive, and dignified work as part of restoration. This stage addresses earning, contribution, and self-sufficiency.',
      scripture:
        '2 Thessalonians 3:10-12 - "The one who is unwilling to work shall not eat... Such people we command and urge in the Lord Jesus Christ to settle down and earn the food they eat."',
      guidance:
        'Help the participant develop or return to meaningful work. Discuss work as both provision and calling. Address obstacles like shame, limited opportunities, or past failures in employment.',
      resources: JSON.stringify([
        {
          type: 'reflection',
          title:
            'What does honest work mean for you? What steps will you take toward employment or new work?',
        },
        {
          type: 'scripture',
          reference: 'Colossians 3:17, Proverbs 14:23',
        },
      ]),
    },
  },
  {
    key: 'serving_others',
    name: 'Serving Others',
    sequence: 7,
    content: {
      description:
        'The restored person begins helping others pursue the same journey. This stage is about spiritual maturity expressed through service and mentoring.',
      scripture:
        '1 Peter 4:10 - "Each of you should use whatever gift you have received to serve others, as faithful stewards of God\'s grace in its various forms."',
      guidance:
        'Help the participant discover how their restoration story can help others. Discuss mentoring, advocacy, and service. Emphasize humility and the ongoing nature of personal restoration.',
      resources: JSON.stringify([
        {
          type: 'reflection',
          title:
            'How has your restoration journey equipped you to serve others? Where might God be calling you to help?',
        },
        {
          type: 'scripture',
          reference: '2 Corinthians 1:3-4, 1 Thessalonians 5:11',
        },
      ]),
    },
  },
];

async function main() {
  console.log('[SEED] Starting restoration journey seed...');

  // Seed stages and content
  for (const stageData of RESTORATION_STAGES) {
    const { content, ...stageInput } = stageData;

    const stage = await prisma.restorationStage.upsert({
      where: { key: stageInput.key },
      update: { name: stageInput.name },
      create: stageInput,
    });

    console.log(`[SEED] Created stage: ${stage.name}`);

    await prisma.stageContent.upsert({
      where: { stageId: stage.id },
      update: content,
      create: {
        stageId: stage.id,
        ...content,
      },
    });

    console.log(`[SEED] Created content for: ${stage.name}`);
  }

  // Seed UserRestoration for all existing users
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  console.log(
    `[SEED] Found ${users.length} existing user(s). Creating restoration records...`
  );

  const stage1 = await prisma.restorationStage.findFirst({
    where: { sequence: 1 },
  });

  if (!stage1) {
    throw new Error('Stage 1 (Truth) not found');
  }

  for (const user of users) {
    const existingRestoration = await prisma.userRestoration.findUnique({
      where: { userId: user.id },
    });

    if (!existingRestoration) {
      await prisma.userRestoration.create({
        data: {
          userId: user.id,
          currentStageId: stage1.id,
        },
      });

      console.log(
        `[SEED] Created UserRestoration for user ${user.id} at stage 1`
      );
    }
  }

  console.log('[SEED] Restoration journey seed complete ✅');
}

main()
  .catch((e) => {
    console.error('[SEED] Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
