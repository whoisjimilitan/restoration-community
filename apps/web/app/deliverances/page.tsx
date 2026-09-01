'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import SiteButton from '@/components/SiteButton';

/** Same reveal choreography as the homepage — shared DNA, not a coincidence. */
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

interface StoryCard {
  id: string;
  name: string;
  role: string;
  quote: string;
  duration: string;
  descent: string[];
  encounterLead: string;
  heroImage: { url: string; alt: string };
  videoUrl: string;
}

const STORIES: StoryCard[] = [
  {
    id: '1',
    name: 'Samuel Johnson',
    role: 'Delivered from Internet Fraud',
    quote: 'When the man of God touched me, I immediately saw myself facing a judge.',
    duration: '41 minutes • Full confession at The SCOAN',
    descent: [
      'Demonically inspired to deceive, defraud, and destroy.',
      'Through the most advanced online tactics and methods.',
      'He was not just a local king of internet scamming.',
      'He taught hundreds of youngsters his satanic tricks.',
    ],
    encounterLead: 'Then one encounter changed everything.',
    heroImage: {
      url: '/images/testimony.png',
      alt: 'Samuel Johnson - The King of Internet Scamming',
    },
    videoUrl: 'https://www.youtube.com/embed/bKJCcWQVuq8',
  },
];

export default function StoriesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="bg-black text-white">
      {/* THE SCREENING ROOM — this page goes where the rest of the site
          doesn't: full black. The lights are down. The film is the hero.
          Same mechanic as before: cinematic thumbnail, play button, sound
          in the modal. The title sits over the image like a film title. */}
      {STORIES.map((story) => (
        <section key={story.id} data-nav-mode="light" className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
          <img
            src={story.heroImage.url}
            alt={story.heroImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Movie Overlays — the gradients do the lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          {/* Title block — bottom left, over the gradient, like a film title */}
          <div className="absolute inset-x-0 bottom-0 px-6 sm:px-8 md:px-12 pb-16 md:pb-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium mb-4">
                Deliverance
              </motion.p>
              <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight max-w-[16ch]">
                It didn&rsquo;t stop with me.
              </motion.h1>
              <motion.p variants={fadeInLine} className="mt-4 text-base md:text-lg text-white/70 font-light">
                {story.name}. {story.role}.
              </motion.p>
            </motion.div>
          </div>

          {/* Play Button */}
          <button
            onClick={() => setSelectedVideo(story.videoUrl)}
            aria-label={`Watch ${story.name}'s story`}
            className="absolute inset-0 z-10 flex items-center justify-center group"
          >
            <span className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:bg-white hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </section>
      ))}

      {/* ACT ONE — THE DESCENT. Black, quiet, one line at a time. No labels,
          no blog furniture. The story goes down. */}
      {STORIES.map((story) => (
        <section key={story.id} data-nav-mode="light" className="grain-overlay w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-black border-t border-white/5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium mb-10">
              The Descent
            </motion.p>
            <motion.div variants={staggerContainer} className="space-y-3">
              {story.descent.map((line, i) => (
                <motion.p key={i} variants={fadeInLine} className="text-base md:text-lg text-white/85 leading-relaxed font-light">
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </section>
      ))}

      {/* ACT TWO — THE ENCOUNTER. The only teal on the page lives here, and
          only here: a breathing glow behind the quote. On a black page, one
          moment of light is the moment of deliverance. The color tells the
          story before the words do. */}
      {STORIES.map((story) => (
        <section key={story.id} data-nav-mode="light" className="grain-overlay relative w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-black overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-[jm-breathe_20s_ease-in-out_infinite]"
            style={{
              width: 'min(800px, 100vw)',
              height: 'min(800px, 100vw)',
              background: 'radial-gradient(circle, rgba(27,122,108,0.30) 0%, rgba(20,87,75,0.12) 45%, transparent 70%)',
            }}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="relative max-w-3xl mx-auto flex flex-col gap-12"
          >
            <motion.p variants={fadeInLine} className="font-rc-serif font-bold text-2xl md:text-3xl text-white leading-tight tracking-tight max-w-[22ch]">
              {story.encounterLead}
            </motion.p>
            <motion.div variants={fadeInLine} className="flex flex-col gap-6">
              <p className="font-rc-serif italic text-2xl md:text-3xl text-white leading-snug tracking-tight max-w-[28ch]">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <span className="block w-9 h-px bg-rc-gold/70" />
                <p className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium">{story.duration}</p>
              </div>
            </motion.div>
          </motion.div>
        </section>
      ))}

      {/* THE CLOSER — no presumption about how the visitor arrived. Facts,
          then the turn, then the one door. On black, the solid teal button
          is the only saturated color left: the way out is the light. */}
      <section data-nav-mode="light" className="grain-overlay w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-black border-t border-white/5 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/60 font-light leading-relaxed">
            My story is nine episodes. Samuel&rsquo;s took one encounter.
          </motion.p>
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            Now yours begins.
          </motion.h2>
          <motion.div variants={fadeInLine} className="pt-4">
            <SiteButton variant="solid" href="/?prayer=1">
              Ask for Prayer
            </SiteButton>
          </motion.div>
          <motion.a
            variants={fadeInLine}
            href="/book"
            className="block text-sm text-white/50 hover:text-white hover:underline"
          >
            Prefer reading? My story is also a book. →
          </motion.a>
        </motion.div>
      </section>

      <SiteFooter precededByDarkSection />

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-4xl"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`${selectedVideo}?autoplay=1`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}