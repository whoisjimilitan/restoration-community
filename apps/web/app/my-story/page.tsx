'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import SiteButton from '@/components/SiteButton';

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
  { n: 7, title: 'The Spirit of Waste', desc: 'The fraud years. The scam that preys on fear. Tens of thousands per week. No peace.', thumbnail: '/images/episodes/episode-07.png', youtubeId: null },
  { n: 8, title: 'Heart of Stone', desc: 'May 2015. The trance. Two figures from one body. The spirit cast out. A new heart placed in.', thumbnail: '/images/episodes/episode-08.png', youtubeId: null },
  { n: 9, title: 'Today It Has Turned to Victory', desc: 'After deliverance. Ghana. Restoration. New family. The call.', thumbnail: '/images/episodes/episode-09.png', youtubeId: null },
];

export default function MyStoryPage() {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!openVideoId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenVideoId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openVideoId]);

  return (
    <div className="bg-rc-text text-white relative" data-nav-mode="light">
      <section
        id="hero"
        className="relative w-full min-h-[85svh] flex flex-col justify-center overflow-hidden bg-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32"
      >
        <img
          src="/images/my-story-hero-poster.jpg"
          alt="Brother Jimi"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rc-accent/85 to-rc-text/90" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            My Story
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
            Weje ran the affairs of my life until the day <span className="text-rc-accent-light">Jesus Christ cast him out</span>.
          </motion.p>
          <motion.a
            variants={fadeInLine}
            href="#declaration"
            className="inline-block text-sm text-white/70 hover:text-white hover:underline pt-4"
          >
            Begin with the Declaration ↓
          </motion.a>
        </motion.div>
      </section>

      <section id="declaration" className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-white/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-white text-center mb-4">
            The Declaration
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-base text-white/70 leading-relaxed font-light text-center mb-12">
            Before the series, two videos already tell the beginning of it.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {DECLARATIONS.map((d) => (
              <motion.button
                key={d.youtubeId}
                variants={fadeInLine}
                type="button"
                onClick={() => setOpenVideoId(d.youtubeId)}
                className="block group text-left w-full"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={d.thumbnail} alt={d.title} className="w-full h-full object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1" />
                    </div>
                  </div>
                  <span aria-hidden="true" className="absolute bottom-3 left-3 text-white text-xs uppercase tracking-wide font-medium px-3 py-1 rounded-full bg-rc-text/80">
                    Watch Now
                  </span>
                </div>
                <h3 className="text-xl font-rc-serif font-bold text-white leading-tight mt-4 mb-1">{d.title}</h3>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-white/10">
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
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium mt-4 mb-1">Episode {ep.n}</p>
                <h2 className="text-xl font-rc-serif font-bold text-white leading-tight mb-2">{ep.title}</h2>
                {ep.youtubeId && (
                  <p className="text-sm text-white/70 leading-relaxed font-light">{ep.desc}</p>
                )}
                {ep.youtubeId && (
                  <span className="inline-block text-sm text-white/60 hover:text-white font-medium mt-3 group-hover:underline">
                    Watch Now →
                  </span>
                )}
              </>
            );

            // Only the "coming soon" branch is dimmed — a future episode with
            // a real youtubeId should read as available immediately, same as
            // the Declaration cards, with no further code change needed.
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
              <motion.div key={ep.n} variants={fadeInLine} className="opacity-70">
                {card}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-white/10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            Jesus is the way out.
          </motion.h2>
          <motion.div variants={fadeInLine} className="pt-4">
            <SiteButton href="/get-help">I Need Jesus</SiteButton>
          </motion.div>
          <motion.div variants={fadeInLine} className="flex flex-col sm:flex-row gap-6 justify-center pt-10 border-t border-white/10 mt-2">
            <a href="/book" className="text-sm text-white/50 hover:text-white/80 hover:underline transition-colors">
              Preview the book →
            </a>
            <a href="/about" className="text-sm text-white/50 hover:text-white/80 hover:underline transition-colors">
              Who is Brother Jimi? →
            </a>
            <a href="/scriptures" className="text-sm text-white/50 hover:text-white/80 hover:underline transition-colors">
              The scriptures behind this →
            </a>
          </motion.div>
        </motion.div>
      </section>

      <SiteFooter precededByDarkSection />

      {openVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setOpenVideoId(null)}
        >
          <button
            type="button"
            onClick={() => setOpenVideoId(null)}
            aria-label="Close video"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white text-3xl leading-none"
          >
            &times;
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${openVideoId}?autoplay=1`}
              title="Video player"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
