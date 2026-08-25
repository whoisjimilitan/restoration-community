'use client';

import { motion, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const DECLARATIONS = [
  { title: 'A Spirit Moving Around', thumbnail: '/images/episodes/declaration-a-spirit-moving-around.png', youtubeId: 'fc9g750tqdQ' },
  { title: 'The Spirit of Waste', thumbnail: '/images/episodes/declaration-the-spirit-of-waste.png', youtubeId: 'A9X9TrMBda0' },
];

const EPISODES = [
  { n: 1, title: 'There Is a Spirit Moving', desc: 'The declaration. Who is Brother Jimi and why does he know this spirit is real. Because it lived in him.', thumbnail: '/images/episodes/episode-01.png', youtubeId: null },
  { n: 2, title: 'Before the Spirit', desc: 'Born in Canada. Christian home. Smart kid. Something already pulling him off track. Dad passes. Mom holds the line.', thumbnail: '/images/episodes/episode-02.png', youtubeId: null },
  { n: 3, title: 'Rise Up and Walk', desc: 'The sickness. The healing. The miracle. And the voices that stole the covering.', thumbnail: '/images/episodes/episode-03.png', youtubeId: null },
  { n: 4, title: 'Weje', desc: 'Leaving the church. Rebellion enters. Occupation, not teenage angst. The spirit gets its name.', thumbnail: '/images/episodes/episode-04.png', youtubeId: null },
  { n: 5, title: "I'm Taking This Death Because of You", desc: 'March 1996. Her last words. The weight that shaped everything after.', thumbnail: '/images/episodes/episode-05.png', youtubeId: null },
  { n: 6, title: 'A Very Good Idea', desc: 'Trafficked. Drug runs. Multiple countries. Promises to God. Broken promises. Running.', thumbnail: '/images/episodes/episode-06.png', youtubeId: null },
  { n: 7, title: 'The Spirit of Waste', desc: 'The fraud years. The scam that preys on fear. Hundreds of thousands per week. No peace.', thumbnail: '/images/episodes/episode-07.png', youtubeId: null },
  { n: 8, title: 'Heart of Stone', desc: 'May 2015. The trance. Two figures from one body. The spirit cast out. A new heart placed in.', thumbnail: '/images/episodes/episode-08.png', youtubeId: null },
  { n: 9, title: 'Today It Has Turned to Victory', desc: 'After deliverance. Ghana. Restoration. New family. The call.', thumbnail: '/images/episodes/episode-09.png', youtubeId: null },
];

export default function MyStoryPage() {
  return (
    <div className="bg-rc-bg text-rc-text relative">
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            My Story
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
            My name is Brother Jimi. When I was a boy, God healed me through Prophet T.B. Joshua. But when the covering of God was removed from my life, a spirit entered and controlled me for twenty years. His name was Weje. This is the story of how he entered, what he did, and how Jesus Christ cast him out.
          </motion.p>
        </motion.div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text text-center mb-4">
            The Declaration
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-base text-rc-text/70 leading-relaxed font-light text-center mb-12">
            Before the series, two videos already tell the beginning of it.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {DECLARATIONS.map((d) => (
              <motion.a
                key={d.youtubeId}
                variants={fadeInLine}
                href={`https://www.youtube.com/watch?v=${d.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={d.thumbnail} alt={d.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-rc-serif font-bold text-rc-text leading-tight mt-4 mb-1">{d.title}</h3>
                <span className="inline-block text-sm text-rc-accent font-medium group-hover:underline">
                  Watch Now →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {EPISODES.map((ep) => {
            const card = (
              <>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={ep.thumbnail} alt={`Episode ${ep.n}: ${ep.title}`} className="w-full h-full object-cover" />
                  {!ep.youtubeId && (
                    <span className="absolute bottom-3 left-3 text-white text-xs uppercase tracking-wide font-medium px-3 py-1 rounded-full bg-rc-text/80">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-xs uppercase tracking-wider text-rc-accent font-medium mt-4 mb-1">Episode {ep.n}</p>
                <h2 className="text-xl font-rc-serif font-bold text-rc-text leading-tight mb-2">{ep.title}</h2>
                <p className="text-sm text-rc-text/70 leading-relaxed font-light">{ep.desc}</p>
                {ep.youtubeId && (
                  <span className="inline-block text-sm text-rc-accent font-medium mt-3 group-hover:underline">
                    Watch Now →
                  </span>
                )}
              </>
            );

            return ep.youtubeId ? (
              <motion.a
                key={ep.n}
                variants={fadeInLine}
                href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                {card}
              </motion.a>
            ) : (
              <motion.div key={ep.n} variants={fadeInLine}>
                {card}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
