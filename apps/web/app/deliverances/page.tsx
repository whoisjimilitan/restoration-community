'use client';

import { useState, useEffect } from 'react';
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

const bridgeLines = [
  'You already know my story.',
  'The partridge that became free.',
  'It did not stop with me.',
  'Hear from another.',
];

interface StoryCard {
  id: string;
  name: string;
  role: string;
  quote: string;
  year: string;
  duration: string;
  storyBefore: string[];
  storyEncounter: string[];
  heroImage?: { url: string; alt: string };
  videoUrl?: string;
}

const STORIES: StoryCard[] = [
  {
    id: '1',
    name: 'Samuel Johnson',
    role: 'Delivered from Internet Fraud',
    quote: 'When the man of God touched me, I immediately saw myself facing a judge.',
    year: '',
    duration: '41 minutes • Full confession at The SCOAN',
    storyBefore: [
      'Samuel Johnson was a professional internet fraudster.',
      'Demonically inspired to deceive, defraud, and destroy.',
      'Through the most advanced online tactics and methods.',
    ],
    storyEncounter: [
      'He was not just a local king of internet scamming.',
      'He taught hundreds of youngsters his satanic tricks.',
      'Then one encounter changed everything.',
      'There is much to learn from his journey.',
    ],
    heroImage: {
      url: '/images/testimony.png',
      alt: 'Samuel Johnson - The King of Internet Scamming',
    },
    videoUrl: 'https://www.youtube.com/embed/bKJCcWQVuq8',
  },
];

export default function StoriesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO */}
      <section data-nav-mode="light" className="w-full min-h-[85svh] flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full flex flex-col justify-center space-y-0">
          <div className={`transform transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-base md:text-lg text-white/70 font-rc-serif font-normal leading-relaxed">
              You&rsquo;ve heard mine.
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight mt-2">
              Now hear his.
            </h1>
          </div>
        </div>
      </section>

      {/* NOT JUST ME — the bridge, not a replay. Same black as Samuel's section so darkness carries straight through — the lights dimming before the movie starts. */}
      <section data-nav-mode="light" className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.h2 variants={fadeInLine} className="text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">Not Just Me</motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed font-light">
            {bridgeLines.map((line, i) => (
              <motion.p key={i} variants={fadeInLine}>{line}</motion.p>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* STORIES — Full-Width Dark Cinematic, video presentation untouched */}
      {STORIES.map((story) => (
        <section key={story.id} data-nav-mode="light" className="w-screen -mx-[calc(50vw-50%)] bg-rc-text">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
            className="w-full"
          >
            {/* Video Hero */}
            <div className="relative w-full aspect-video md:aspect-auto md:min-h-[85svh] flex items-center justify-center overflow-hidden">
              <img
                src={story.heroImage?.url}
                alt={story.heroImage?.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Movie Overlay - Left to Right Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

              {/* Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* Play Button */}
              {story.videoUrl && (
                <button
                  onClick={() => setSelectedVideo(story.videoUrl!)}
                  className="relative z-10 group flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:bg-white">
                    <svg className="w-10 h-10 text-rc-text ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>

            {/* Premium Content Section */}
            <div className="relative px-6 sm:px-8 md:px-12 py-24 md:py-32">
              <div className="max-w-2xl mx-auto space-y-16">
                {/* Name & Role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    {story.year && <p className="text-sm text-white/60 font-light tracking-wide">{story.year}</p>}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
                      {story.name}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 font-light">
                      {story.role}
                    </p>
                  </div>

                  <p className="text-lg md:text-xl font-rc-serif font-normal text-white/95 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </motion.div>

                {/* The Story */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="space-y-10"
                >
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-rc-accent-light uppercase tracking-wider">The King of Scamming</p>
                    <div className="space-y-2">
                      {story.storyBefore.map((line, i) => (
                        <p key={i} className="text-base md:text-lg text-white/85 leading-relaxed font-light">{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-rc-accent-light uppercase tracking-wider">Facing the Judge</p>
                    <div className="space-y-2">
                      {story.storyEncounter.map((line, i) => (
                        <p key={i} className="text-base md:text-lg text-white/85 leading-relaxed font-light">{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/50">{story.duration}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      {/* Closing Section — kept in the same dark passage as Samuel's testimony above it, not a hard cut to teal, matching the homepage's own closing-action pattern */}
      <section data-nav-mode="light" className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              You read my own story.
            </h2>

            <div className="space-y-6 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>You watched Samuel's story.</p>
              <p>Now see yours begin.</p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <SiteButton variant="solid-light" href="/?attend=1">
              Attend Gathering
            </SiteButton>

            <SiteButton variant="outline-light" href="/get-help">
              I Need Jesus
            </SiteButton>
          </div>
        </motion.div>
      </section>

      <SiteFooter />

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
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
