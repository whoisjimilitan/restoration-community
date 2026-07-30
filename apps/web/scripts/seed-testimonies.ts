import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTestimonies() {
  try {
    console.log('[SEED] Starting testimony database seed...');

    // Clear existing testimonies
    await prisma.testimony.deleteMany({});
    console.log('[SEED] Cleared existing testimonies');

    // Seed testimonies
    const testimonies = [
      {
        name: 'Samuel',
        role: 'Former Scammer',
        stage: 6,
        quote: 'Brother Jimi prayed with me. I met Jesus. Everything changed.',
        story: 'Samuel had money from fraud. Lots of it. A car. Respect. But he was empty inside. His cousin told him about Brother Jimi. Samuel called. During prayer, he felt God. Real. Present. Not like a story. Real. He cried. The next week he left fraud. Now he works a normal job. Makes way less money. But he is free. His mom says she has her son back.',
      },
      {
        name: 'Zainab',
        role: 'Student Turned Helper',
        stage: 7,
        quote: 'Brother Jimi brought me to Jesus. Jesus changed everything.',
        story: 'Zainab was lonely and broke. She scammed people to make money. For three years. She was good at it. Then she broke. Her friend who knows Brother Jimi reached out: Come pray with him. Zainab went. When Brother Jimi prayed, the Holy Spirit came. She felt forgiven. Really forgiven. Not just words. Forgiveness. Now she helps other people leave fraud. She has walked two people out. She does it because Jesus saved her.',
      },
      {
        name: 'James',
        role: 'Former Inmate',
        stage: 6,
        quote: 'I did wrong. Brother Jimi showed me Jesus still loves me.',
        story: 'James was in prison for fraud. Two years. He got out hard. Angry. A chaplain told him about Brother Jimi. James did not care. But he called. Brother Jimi prayed with him. James felt Jesus love him. Not judgment. Love. Something broke open inside. Now James works. Honest work. His daughter asked him if he was proud of his job. He said: Yes. I am proud because it is honest. He never thought he would say that.',
      },
      {
        name: 'Blessing',
        role: 'Teacher',
        stage: 6,
        quote: 'I had money but I was scared all the time. Jesus gave me peace.',
        story: 'Blessing made money from fraud. Lots. Private school for her kids. Nice car. But she could not sleep. She was scared every day. Scared she would get caught. Her sister told her about Brother Jimi Skool. Blessing went. Through the 7 weeks, she met Jesus. She realized: the money is not worth the fear. She left. Now she works teaching. Makes way less money. But she sleeps. Her kids are happy. She is happy. That is worth everything.',
      },
      {
        name: 'David',
        role: 'Business Owner',
        stage: 7,
        quote: 'Deliverance is real. Freedom is real. Jesus is real.',
        story: 'David ran a profitable scheme. Made thousands monthly. Had it all. But nothing satisfied. He felt hollow. A friend mentioned Brother Jimi. David was skeptical. But desperate. He came to a prayer meeting. Something shifted. The Holy Spirit moved. David wept. For the first time in years, he felt clean. He shut down the business. Now he runs an honest shop. Makes half the money. But he sleeps well. His family respects him. God restored his life.',
      },
    ];

    for (const testimony of testimonies) {
      const created = await prisma.testimony.create({
        data: testimony,
      });
      console.log(`[SEED] Created testimony: ${created.name} (ID: ${created.id})`);
    }

    console.log(`[SEED] Successfully seeded ${testimonies.length} testimonies`);
    console.log('[SEED] Seed complete!');
  } catch (error) {
    console.error('[SEED] Error seeding testimonies:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestimonies();
