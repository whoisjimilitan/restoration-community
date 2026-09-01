'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import SiteButton from '@/components/SiteButton';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// The more personal of the two declaration videos carries the trailer
// moment — it names Weje's own definition directly ("the wasteful one"),
// matching this page's identity-specific frame ("Jimi. Weje. Jimi.")
// rather than the more general, societal framing of the other video. The
// second stays reachable, quiet, not equal billing.
const TRAILER = {
  title: 'The Spirit of Waste',
  heroImage: '/images/weje-shadow-portrait.jpg',
  youtubeId: 'A9X9TrMBda0',
};

const SECOND_DECLARATION = {
  title: 'A Spirit Is Moving Around',
  youtubeId: 'fc9g750tqdQ',
};

const EPISODES = [
  { n: 1, title: 'Before the Spirit', youtubeId: null as string | null },
  { n: 2, title: 'Rise Up and Walk', youtubeId: null },
  { n: 3, title: 'Weje', youtubeId: null },
  { n: 4, title: "I'm Taking This Death Because of You", youtubeId: null },
  { n: 5, title: 'A Very Good Idea', youtubeId: null },
  { n: 6, title: 'The Spirit of Waste', youtubeId: null },
  { n: 7, title: 'Partridge Hatching Eggs', youtubeId: null },
  { n: 8, title: 'Heart of Stone', youtubeId: null },
  { n: 9, title: 'Today It Has Turned to Victory', youtubeId: null },
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
    <div className="bg-rc-canvas text-rc-bg relative" data-nav-mode="light">
      <section
        id="hero"
        className="grain-overlay relative w-full min-h-[70svh] flex flex-col justify-center overflow-hidden bg-rc-canvas px-6 sm:px-8 md:px-12 py-24 md:py-32"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium">
            My Testimony
          </motion.p>
          <motion.div variants={fadeInLine} className="w-12 h-px bg-rc-accent-light mx-auto" />
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight">
            Jimi. Weje. Jimi.
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-bg/90 leading-relaxed font-rc-serif font-normal">
            My whole life, beginning to end.
          </motion.p>
        </motion.div>
      </section>

      {/* THE SERIES — one trailer moment, not a grid of nine near-identical
          "coming soon" placeholders. The photo keeps its own natural shape —
          contained, not cropped to fit a shape it was never composed for. */}
      <section className="grain-overlay w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-canvas border-t border-white/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-sm mx-auto text-center"
        >
          <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium mb-8">
            But First, a Declaration
          </motion.p>
          <motion.div variants={fadeInLine} className="relative dark-surface rounded-2xl p-2 mb-5">
            <img
              src={TRAILER.heroImage}
              alt={TRAILER.title}
              className="w-full h-auto rounded-xl"
            />
            <button
              type="button"
              onClick={() => setOpenVideoId(TRAILER.youtubeId)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label={`Watch ${TRAILER.title}`}
            >
              <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-rc-canvas ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </motion.div>
          <motion.button
            variants={fadeInLine}
            type="button"
            onClick={() => setOpenVideoId(SECOND_DECLARATION.youtubeId)}
            className="inline-block text-sm text-rc-bg/50 hover:text-rc-bg hover:underline"
          >
            Also watch: {SECOND_DECLARATION.title} →
          </motion.button>
        </motion.div>
      </section>

      {/* EPISODES — a table of contents, not nine empty cards. */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-canvas border-t border-white/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight mb-2">
            How I Got Here
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-sm text-rc-bg/50 font-light mb-10">
            Nine episodes — the story behind my declaration.
          </motion.p>
          <motion.div variants={staggerContainer} className="space-y-1">
            {EPISODES.map((ep) => {
              const row = (
                <div className="flex items-baseline gap-3 py-2">
                  <span className="text-rc-accent-light font-rc-serif font-bold text-base shrink-0 tabular-nums">
                    {String(ep.n).padStart(2, '0')}
                  </span>
                  <span className="text-base md:text-lg text-rc-bg font-rc-serif shrink-0">{ep.title}</span>
                  <span aria-hidden="true" className="flex-1 border-b border-dotted border-white/15 mb-1" />
                  {ep.youtubeId && (
                    <span className="text-sm text-rc-accent-light font-medium shrink-0">Watch →</span>
                  )}
                </div>
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
                  {row}
                </motion.a>
              ) : (
                <motion.div key={ep.n} variants={fadeInLine} className="opacity-60">
                  {row}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-canvas border-t border-white/10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight">
            Jesus Still Delivers.
          </motion.h2>
          <motion.div variants={fadeInLine} className="pt-4">
            <SiteButton href="/?prayer=1">Ask for Prayer</SiteButton>
          </motion.div>
          <motion.a
            variants={fadeInLine}
            href="/deliverances"
            className="block text-sm text-rc-bg/60 hover:text-rc-bg hover:underline"
          >
            Or watch Him delivering others →
          </motion.a>
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
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-rc-bg/70 hover:text-rc-bg text-3xl leading-none"
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