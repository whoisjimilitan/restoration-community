import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ResourceType = 'SCRIPTURE' | 'TEACHING' | 'VIDEO' | 'PDF' | 'REFLECTION_QUESTION' | 'PRAYER' | 'ASSIGNMENT' | 'EXTERNAL_LINK';

const resources: Array<{
  title: string;
  slug: string;
  type: ResourceType;
  scriptureReference?: string;
  content: string;
  categoryId: null;
  stageId: number;
  order: number;
  isRequired: boolean;
}> = [
  // Stage 1: Truth
  {
    title: 'John 8:31-32 - Truth Sets You Free',
    slug: 'john-8-31-32-truth-sets-free',
    type: 'SCRIPTURE',
    scriptureReference: 'John 8:31-32',
    content: '',
    categoryId: null,
    stageId: 1,
    order: 1,
    isRequired: true,
  },
  {
    title: 'Understanding Honest Self-Assessment',
    slug: 'honest-self-assessment',
    type: 'TEACHING',
    content:
      'The foundation of restoration is seeing ourselves clearly. Not with condemnation, but with honesty. This teaching explores how to develop the courage to acknowledge reality without shame.',
    categoryId: null,
    stageId: 1,
    order: 2,
    isRequired: true,
  },
  {
    title: 'What truths about yourself are hardest to accept?',
    slug: 'reflection-hardest-truths',
    type: 'REFLECTION_QUESTION',
    content:
      'Take time to journal: What aspects of your life or character do you struggle to acknowledge? What would change if you accepted these truths?',
    categoryId: null,
    stageId: 1,
    order: 3,
    isRequired: true,
  },
  {
    title: 'Prayer: Show Me Truth',
    slug: 'prayer-show-me-truth',
    type: 'PRAYER',
    content:
      'Father, I ask you to show me the truth about myself and my life. Help me see clearly, without shame or denial. Give me courage to face what I\'ve been avoiding. You are light, and you do not condemn. Help me walk in truth today. Amen.',
    categoryId: null,
    stageId: 1,
    order: 4,
    isRequired: false,
  },

  // Stage 2: Confession
  {
    title: '1 John 1:9 - Confession and Forgiveness',
    slug: '1john-1-9-confession',
    type: 'SCRIPTURE',
    scriptureReference: '1 John 1:9',
    content: '',
    categoryId: null,
    stageId: 2,
    order: 1,
    isRequired: true,
  },
  {
    title: 'The Power of Confession',
    slug: 'power-of-confession',
    type: 'TEACHING',
    content:
      'Confession is not weakness—it is freedom. When we speak our struggles aloud, we move from hiding to healing. This teaching explores how confession breaks the power of secrecy and opens us to grace.',
    categoryId: null,
    stageId: 2,
    order: 2,
    isRequired: true,
  },
  {
    title: 'What have you been hiding?',
    slug: 'reflection-what-hiding',
    type: 'REFLECTION_QUESTION',
    content:
      'Journal about the things you\'ve kept secret. Why have you hidden them? What would it feel like to speak them aloud?',
    categoryId: null,
    stageId: 2,
    order: 3,
    isRequired: true,
  },
  {
    title: 'Prayer: Give Me Courage to Speak',
    slug: 'prayer-courage-speak',
    type: 'PRAYER',
    content:
      'Lord, I need courage. I\'ve carried these burdens alone for so long. Give me the strength to speak truth, to confess what I\'ve done, and to receive your grace. Help me find safe people to trust. Amen.',
    categoryId: null,
    stageId: 2,
    order: 4,
    isRequired: false,
  },

  // Stage 3: Repentance
  {
    title: 'Romans 6:9 - Dead to Sin, Alive in Christ',
    slug: 'romans-6-9-repentance',
    type: 'SCRIPTURE',
    scriptureReference: 'Romans 6:9',
    content: '',
    categoryId: null,
    stageId: 3,
    order: 1,
    isRequired: true,
  },
  {
    title: 'Turning Around: Real Change',
    slug: 'turning-around-real-change',
    type: 'TEACHING',
    content:
      'Repentance is not just regret—it is a complete turn in direction. This teaching explores how to build new patterns, break old cycles, and step into a genuinely different life.',
    categoryId: null,
    stageId: 3,
    order: 2,
    isRequired: true,
  },
  {
    title: 'What patterns will you change?',
    slug: 'reflection-patterns-change',
    type: 'REFLECTION_QUESTION',
    content:
      'Identify 3 specific behaviors or patterns you want to change. For each, write down one concrete step you\'ll take this week to begin turning around.',
    categoryId: null,
    stageId: 3,
    order: 3,
    isRequired: true,
  },
  {
    title: 'Prayer: Give Me Strength to Change',
    slug: 'prayer-strength-change',
    type: 'PRAYER',
    content:
      'Holy Spirit, I can\'t do this alone. I want to change, but I need your power. Give me the strength to resist old patterns. Help me build new habits. Walk with me through this. Amen.',
    categoryId: null,
    stageId: 3,
    order: 4,
    isRequired: false,
  },

  // Stage 4: Forgiveness
  {
    title: 'Colossians 3:13 - Forgive As the Lord Forgave You',
    slug: 'colossians-3-13-forgiveness',
    type: 'SCRIPTURE',
    scriptureReference: 'Colossians 3:13',
    content: '',
    categoryId: null,
    stageId: 4,
    order: 1,
    isRequired: true,
  },
  {
    title: 'Receiving and Giving Forgiveness',
    slug: 'receiving-giving-forgiveness',
    type: 'TEACHING',
    content:
      'Forgiveness has two directions: receiving God\'s grace and extending it to others. This teaching explores both dimensions and how they free us from shame and resentment.',
    categoryId: null,
    stageId: 4,
    order: 2,
    isRequired: true,
  },
  {
    title: 'Who do you need to forgive?',
    slug: 'reflection-forgiveness',
    type: 'REFLECTION_QUESTION',
    content:
      'Write about people who have hurt you and people you have hurt. Which resentments are you still carrying? What would forgiveness look like for you?',
    categoryId: null,
    stageId: 4,
    order: 3,
    isRequired: true,
  },
  {
    title: 'Prayer: Teach Me to Forgive',
    slug: 'prayer-teach-forgive',
    type: 'PRAYER',
    content:
      'Father, forgiveness is hard. I feel justified in my anger. But I know unforgiveness is poisoning my soul. Help me release what I\'ve held onto. Teach me to forgive as you have forgiven me. Amen.',
    categoryId: null,
    stageId: 4,
    order: 4,
    isRequired: false,
  },

  // Stage 5: Reconciliation
  {
    title: '2 Corinthians 5:18 - Ministry of Reconciliation',
    slug: '2cor-5-18-reconciliation',
    type: 'SCRIPTURE',
    scriptureReference: '2 Corinthians 5:18',
    content: '',
    categoryId: null,
    stageId: 5,
    order: 1,
    isRequired: true,
  },
  {
    title: 'Rebuilding Broken Relationships',
    slug: 'rebuilding-relationships',
    type: 'TEACHING',
    content:
      'Reconciliation requires humility, honesty, and sometimes difficult conversations. This teaching helps you navigate the path to restored relationships with wisdom and grace.',
    categoryId: null,
    stageId: 5,
    order: 2,
    isRequired: true,
  },
  {
    title: 'Which relationships matter most?',
    slug: 'reflection-relationships-matter',
    type: 'REFLECTION_QUESTION',
    content:
      'List relationships that have been damaged. Which ones are possible to repair? What would it take for healing to happen in each one?',
    categoryId: null,
    stageId: 5,
    order: 3,
    isRequired: true,
  },
  {
    title: 'Prayer: Guide My Steps Toward Healing',
    slug: 'prayer-healing-steps',
    type: 'PRAYER',
    content:
      'Lord, I want to make things right. Show me which relationships I should pursue. Give me wisdom, humility, and courage to have difficult conversations. Help me accept that I cannot control others\' responses, only my own actions. Amen.',
    categoryId: null,
    stageId: 5,
    order: 4,
    isRequired: false,
  },

  // Stage 6: Honest Work
  {
    title: '2 Thessalonians 3:10-12 - Work and Dignity',
    slug: '2thess-3-10-work-dignity',
    type: 'SCRIPTURE',
    scriptureReference: '2 Thessalonians 3:10-12',
    content: '',
    categoryId: null,
    stageId: 6,
    order: 1,
    isRequired: true,
  },
  {
    title: 'Work As Calling, Not Curse',
    slug: 'work-calling-not-curse',
    type: 'TEACHING',
    content:
      'Honest work is about more than income—it\'s about dignity, contribution, and purpose. This teaching explores how to find or return to meaningful work as part of your restoration.',
    categoryId: null,
    stageId: 6,
    order: 2,
    isRequired: true,
  },
  {
    title: 'What does your work mean to you?',
    slug: 'reflection-work-meaning',
    type: 'REFLECTION_QUESTION',
    content:
      'Reflect on your work: What are you doing? Why does it matter? If you\'re unemployed, what work would give you a sense of purpose and dignity?',
    categoryId: null,
    stageId: 6,
    order: 3,
    isRequired: true,
  },
  {
    title: 'Prayer: Guide My Path to Purpose',
    slug: 'prayer-path-purpose',
    type: 'PRAYER',
    content:
      'Father, I want to work with purpose and integrity. Guide me toward employment that uses my gifts. Give me discipline, reliability, and pride in what I do. Help me see my work as service. Amen.',
    categoryId: null,
    stageId: 6,
    order: 4,
    isRequired: false,
  },

  // Stage 7: Serving Others
  {
    title: '1 Peter 4:10 - Stewards of God\'s Grace',
    slug: '1peter-4-10-serving',
    type: 'SCRIPTURE',
    scriptureReference: '1 Peter 4:10',
    content: '',
    categoryId: null,
    stageId: 7,
    order: 1,
    isRequired: true,
  },
  {
    title: 'Your Story, Others\' Healing',
    slug: 'your-story-others-healing',
    type: 'TEACHING',
    content:
      'You are restored not for yourself alone, but to become a guide for others. This teaching explores how your journey—with all its struggles and victories—can become a beacon of hope for those still walking toward restoration.',
    categoryId: null,
    stageId: 7,
    order: 2,
    isRequired: true,
  },
  {
    title: 'How has your journey equipped you?',
    slug: 'reflection-equipped-serve',
    type: 'REFLECTION_QUESTION',
    content:
      'Reflect on how far you\'ve come. What wisdom have you gained? Who could benefit from what you\'ve learned? Where might God be calling you to serve or mentor?',
    categoryId: null,
    stageId: 7,
    order: 3,
    isRequired: true,
  },
  {
    title: 'Prayer: Use Me to Serve Others',
    slug: 'prayer-use-me-serve',
    type: 'PRAYER',
    content:
      'Father, I have been restored. I have been healed. Now use me. Guide me to people who need to hear that restoration is possible. Give me compassion, wisdom, and the courage to share what you\'ve done in my life. Make me a blessing. Amen.',
    categoryId: null,
    stageId: 7,
    order: 4,
    isRequired: false,
  },
];

async function main() {
  console.log('[SEED] Starting resource seeding...');

  for (const resource of resources) {
    const { stageId, order, isRequired, ...resourceData } = resource;

    try {
      await prisma.resource.upsert({
        where: { slug: resourceData.slug },
        update: {
          ...resourceData,
          isPublished: true,
          isDraft: false,
          publishedAt: new Date(),
        },
        create: {
          ...resourceData,
          isPublished: true,
          isDraft: false,
          publishedAt: new Date(),
        },
      });

      // Connect to stage
      const stageResource = await prisma.stageResource.findFirst({
        where: {
          stage: { sequence: stageId },
          resource: { slug: resourceData.slug },
        },
      });

      if (!stageResource) {
        const stage = await prisma.restorationStage.findFirst({
          where: { sequence: stageId },
        });

        const createdResource = await prisma.resource.findUnique({
          where: { slug: resourceData.slug },
        });

        if (stage && createdResource) {
          await prisma.stageResource.create({
            data: {
              stageId: stage.id,
              resourceId: createdResource.id,
              order: order,
              isRequired: isRequired,
            },
          });
        }
      }

      console.log(`[SEED] Created: ${resourceData.slug}`);
    } catch (err) {
      console.error(`[SEED] Error creating ${resourceData.slug}:`, err);
    }
  }

  console.log('[SEED] Resource seeding complete ✅');
}

main()
  .catch((e) => {
    console.error('[SEED] Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
