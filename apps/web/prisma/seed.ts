import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const RESTORATION_STAGES = [
  {
    key: 'truth',
    name: 'Truth',
    sequence: 1,
    content: {
      description:
        'Many people become trapped in deception long before they become trapped in destructive behaviour. Sometimes we deceive others. Sometimes we deceive ourselves. We convince ourselves that dishonesty is necessary. That everyone else is doing the same. That no one is being harmed. That there is no other way to live. Over time, these beliefs begin to shape the way we see the world. The first step toward restoration is allowing God\'s truth to replace those false beliefs. Truth helps us see reality clearly. It helps us recognise both the consequences of our choices and the hope that God offers through Jesus Christ. Truth does not exist to condemn us. Truth exists to lead us toward freedom.',
      scripture: 'John 8:32 - "Then you will know the truth, and the truth will set you free."',
      guidance:
        'Living in truth begins with honesty. Honesty before God. Honesty with ourselves. Honesty with others. This does not mean exposing every detail of our lives to everyone. It means refusing to build our lives upon deception. Living in truth also means allowing God\'s Word—not our feelings, circumstances, or past—to define reality. As we walk in truth, we begin leaving behind the patterns that once controlled us. Little by little, our lives become marked by honesty rather than deception. Truth becomes a way of living.',
    },
  },
  {
    key: 'confession',
    name: 'Confession',
    sequence: 2,
    content: {
      description:
        'Truth invites us into the light. Confession is our response to that invitation. Once we begin to see our lives as they truly are, we face a choice. We can continue hiding. Or we can bring what is hidden into the light. Confession is not about humiliation. It is about honesty. It is the moment we stop pretending and begin living truthfully before God and others. Confession is agreeing with God about the truth. It is acknowledging our sin without excuses. It is refusing to blame other people, our circumstances, or our past. Confession begins with God because every sin is ultimately against Him. It also has a place within Christian community. There are times when confession brings healing to relationships, restores trust, and allows others to walk with us in prayer and encouragement. Confession is not about exposing ourselves unnecessarily. It is about embracing honesty where honesty is needed. Honesty is the soil where restoration grows.',
      scripture: '1 John 1:9 - "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness."',
      guidance:
        'Living a life of confession means refusing to return to hiddenness. When the Holy Spirit convicts us, we respond rather than resist. When we fail, we confess rather than conceal. When we have wronged someone, we acknowledge it honestly. Confession becomes a way of living because humility becomes a way of living. As we continue confessing our sins and failures to God, we discover that His grace is greater than our shame. The light becomes a place of freedom rather than fear.',
    },
  },
  {
    key: 'repentance',
    name: 'Repentance',
    sequence: 3,
    content: {
      description:
        'Every journey requires a decision. It is not enough to recognise the wrong path. It is not enough to admit we have taken it. There comes a moment when we must choose a different direction. This is repentance. Repentance is more than regret. It is more than feeling guilty. It is the decision to turn away from sin and turn toward God. Repentance begins in the heart. It is a change of mind that leads to a change of direction. It is not simply promising to do better. It is allowing God to reshape our desires, our priorities, and the way we live. True repentance does not ask, "How close can I remain to my old life?" It asks, "How faithfully can I follow Christ?" Repentance is not driven by fear alone. It is motivated by love for God and gratitude for His mercy. As our hearts are changed, our lives begin to change as well.',
      scripture: 'Acts 3:19 - "Repent, then, and turn to God, so that your sins may be wiped out, that times of refreshing may come from the Lord."',
      guidance:
        'Living in repentance means making daily choices that reflect a new direction. Sometimes that means leaving behind unhealthy habits. Sometimes it means ending relationships that continually draw us back into sin. Sometimes it means developing new disciplines that help us grow in faithfulness. Repentance is not a single moment. It is a daily posture of turning toward God. Each day presents another opportunity to choose the path of truth, honesty, and faithful obedience. As we continue walking with Christ, He strengthens us to remain on that path.',
    },
  },
  {
    key: 'forgiveness',
    name: 'Forgiveness',
    sequence: 4,
    content: {
      description:
        'There are few burdens heavier than guilt. When we carry the weight of our past, it can seem impossible to imagine a different future. Some people believe they have gone too far. Some believe they have done too much. Some believe they are beyond God\'s mercy. The gospel tells a different story. In Jesus Christ, forgiveness is possible. Forgiveness does not deny that wrong has been done. It declares that God\'s grace is greater than our sin. Forgiveness begins with God. Before we learn to forgive others, we first receive His forgiveness. This forgiveness is not earned. It is a gift of grace through Jesus Christ. When God forgives, He does not treat us according to our past. He welcomes us as His children in Christ. That new identity changes the way we see ourselves. We are no longer defined by our worst decisions. We are defined by God\'s grace. Receiving God\'s forgiveness also changes the way we view others. Those who have received mercy learn to extend mercy. Those who have been forgiven begin to forgive.',
      scripture: '1 John 1:9 - "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness."',
      guidance:
        'Living in forgiveness means choosing to believe God\'s promises more than our feelings. There may be days when memories return. There may be moments when shame tries to speak again. In those moments, we remember that God\'s Word is true. In Christ, we are forgiven. Living in forgiveness also means refusing to allow bitterness to take root in our hearts. As God teaches us to forgive others, He continues His work of healing within us. Forgiveness does not always remove pain immediately. But it opens the door for peace to grow.',
    },
  },
  {
    key: 'reconciliation',
    name: 'Reconciliation',
    sequence: 5,
    content: {
      description:
        'Sin does more than separate us from God. It also damages our relationships with other people. Words spoken in anger. Promises broken. Trust lost. People hurt. One of the beautiful works of God\'s restoration is that He not only restores our relationship with Himself, but also teaches us to pursue peace with others. Reconciliation restores relationships. It is one of the clearest signs that God\'s grace is at work in our lives. Reconciliation begins with the work God has already done in us. Because we have been reconciled to Him through Jesus Christ, we are called to pursue reconciliation with others. Sometimes this means asking for forgiveness. Sometimes it means making amends where possible. Sometimes it means rebuilding trust over time. Sometimes it means accepting that healing will take patience. Reconciliation is not pretending that nothing happened. It is choosing to move toward peace with truth, humility, and grace. Even when full reconciliation is not possible, we can still live free from bitterness and committed to doing what is right.',
      scripture: 'Romans 12:18 - "If it is possible, as far as it depends on you, live at peace with everyone."',
      guidance:
        'Living as a person of reconciliation means becoming someone who seeks peace rather than conflict. It means taking responsibility for our actions. It means speaking truth with kindness. It means keeping our promises. It means rebuilding trust through consistent faithfulness. Reconciliation is rarely accomplished through one conversation. It is often built through many faithful choices over time. As we grow in Christ, we become people who help restore relationships rather than damage them.',
    },
  },
  {
    key: 'honest_work',
    name: 'Honest Work',
    sequence: 6,
    content: {
      description:
        'Every person longs to live a life of purpose and dignity. When our lives have been shaped by deception, it can be difficult to imagine building a future through honest work. Yet this is God\'s invitation. He calls us to leave behind dishonest gain and discover the joy of faithful labour. Honest work is more than earning an income. It is a way of honouring God, serving others, and rebuilding a life founded on truth. From the beginning, God created human beings to work. Work is not a punishment. It is part of His good design. Through honest work we develop character. We learn responsibility. We grow in faithfulness. We become dependable. For many people leaving cybercrime or other forms of dishonesty, work may feel unfamiliar, difficult, or even discouraging at first. The rewards may seem smaller. The progress may seem slower. But honest work offers something dishonest gain never can. It gives us the dignity of knowing that our lives are being built upon truth. Every honest day\'s work becomes another step in the journey of restoration.',
      scripture: 'Ephesians 4:28 - "Let the thief no longer steal, but rather let him labor, doing honest work with his own hands, so that he may have something to share with anyone in need."',
      guidance:
        'Living this stage means choosing integrity in every area of our work. Whether we are employed, self-employed, studying, learning a trade, or serving in our homes and communities, we work faithfully. We keep our word. We refuse shortcuts that require dishonesty. We honour our commitments. We treat people fairly. We pursue excellence because our work reflects our character. Honest work is not measured only by income. It is measured by integrity. As we faithfully work with our hands, our minds, and our gifts, God continues shaping us into people who honour Him in everyday life.',
    },
  },
  {
    key: 'serving_others',
    name: 'Serving Others',
    sequence: 7,
    content: {
      description:
        'Restoration is never meant to end with us. God restores our lives so that we may become a blessing to others. As we grow in truth, honesty, forgiveness, reconciliation, and faithful work, we begin to discover a new purpose. We are no longer living only for ourselves. We become people who encourage. People who serve. People who give. People who help others continue their own journey of restoration. Serving others begins with ordinary acts of faithfulness. A listening ear. A word of encouragement. A prayer. An act of generosity. A helping hand. As we continue growing, God may entrust us with greater opportunities to serve. Some may become mentors. Some may facilitate gatherings. Some may quietly support others behind the scenes. Whatever our role, our purpose remains the same. We serve because Christ first served us. Our joy is not found in recognition. Our joy is found in faithfully loving others.',
      scripture: 'Mark 10:45 - "For even the Son of Man came not to be served but to serve, and to give his life as a ransom for many."',
      guidance:
        'Serving others begins with ordinary acts of faithfulness. A listening ear. A word of encouragement. A prayer. An act of generosity. A helping hand. As we continue growing, God may entrust us with greater opportunities to serve. Some may become mentors. Some may facilitate gatherings. Some may quietly support others behind the scenes. Whatever our role, our purpose remains the same. We serve because Christ first served us. Our joy is not found in recognition. Our joy is found in faithfully loving others.',
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
