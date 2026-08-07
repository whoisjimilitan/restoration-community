'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryCard {
  id: string;
  name: string;
  role: string;
  quote: string;
  story: string;
  heroImage?: { url: string; alt: string };
  videoUrl?: string;
  isFeatured?: boolean;
}

const mockStories: StoryCard[] = [
  {
    id: '0',
    name: 'Samuel Johnson',
    role: 'Delivered from Internet Fraud',
    quote: 'When the man of God touched me, I immediately saw myself facing a judge.',
    story: 'Samuel Johnson was a professional internet fraudster. Demonically inspired to deceive, defraud, and destroy through the most advanced online tactics and methods.\n\nHe was not just a local king of internet scamming. He taught hundreds of youngsters his satanic tricks. Then one encounter changed everything.\n\nThere is much to learn from his journey.',
    heroImage: {
      url: '/images/testimony.png',
      alt: 'Samuel Johnson - The King of Internet Scamming'
    },
    videoUrl: 'https://www.youtube.com/embed/bKJCcWQVuq8',
    isFeatured: true
  },
];

export default function StoriesPage() {
  const [testimonies, setTestimonies] = useState<StoryCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await fetch('/api/testimonies');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const fetched = data.testimonies || [];
        setTestimonies(fetched.length > 0 ? fetched : mockStories);
      } catch (error) {
        console.error('[TESTIMONIES] Error fetching page data:', error);
        setTestimonies(mockStories);
      }
    };

    fetchTestimonies();
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* Hero Section - Echo of Landing Page */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Stories of Deliverance</p>
          </div>

          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '80ms' }}>
            <div className="space-y-3">
              <p className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">Not stories of shame.</p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">Stories of freedom.</p>
            </div>
          </div>

          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '160ms' }}>
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
              Real people. Real stories. Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story - Samuel's Deliverance (Full-Width Dark Cinematic) */}
      {testimonies.length > 0 && testimonies[0].isFeatured && (
        <section className="w-screen -mx-[calc(50vw-50%)] bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
            className="w-full"
          >
            {/* Video Hero */}
            <div className="relative w-full aspect-video md:aspect-auto md:min-h-screen flex items-center justify-center overflow-hidden">
              <img
                src={testimonies[0].heroImage?.url}
                alt={testimonies[0].heroImage?.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Movie Overlay - Left to Right Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

              {/* Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* Play Button */}
              {testimonies[0].videoUrl && (
                <button
                  onClick={() => setSelectedVideo(testimonies[0].videoUrl!)}
                  className="relative z-10 group flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:bg-white">
                    <svg className="w-10 h-10 text-[#0F0F0F] ml-1" fill="currentColor" viewBox="0 0 24 24">
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
                    <p className="text-sm text-white/60 font-light tracking-wide">2015</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
                      {testimonies[0].name}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 font-light">
                      {testimonies[0].role}
                    </p>
                  </div>

                  <blockquote className="border-l-4 border-[#D4A574] pl-8 pt-2">
                    <p className="text-xl md:text-2xl font-rc-serif italic text-white/95 leading-relaxed">
                      &ldquo;{testimonies[0].quote}&rdquo;
                    </p>
                  </blockquote>
                </motion.div>

                {/* The Story */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="space-y-10"
                >
                  <p className="text-xs font-medium text-white/60 uppercase tracking-widest">The Story</p>

                  {/* Timeline: Before */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-white/50 uppercase tracking-wide">Before</p>
                    <p className="text-base md:text-lg text-white/85 leading-relaxed font-light">
                      {testimonies[0].story.split('\n\n')[0]}
                    </p>
                  </div>

                  {/* Timeline: Encounter */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-white/50 uppercase tracking-wide">The Encounter</p>
                    <p className="text-base md:text-lg text-white/85 leading-relaxed font-light">
                      {testimonies[0].story.split('\n\n')[1]}
                    </p>
                  </div>

                  {/* Timeline: Lesson */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-white/50 uppercase tracking-wide">The Lesson</p>
                    <p className="text-base md:text-lg text-white/85 leading-relaxed font-light">
                      {testimonies[0].story.split('\n\n')[2]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/50">41 minutes • Full confession at The SCOAN</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Closing Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
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

            <div className="space-y-6 text-base md:text-lg text-white/90 leading-relaxed font-light border-l-2 border-white/30 pl-6">
              <p>You watched Samuel's story.</p>
              <p>Now see yours begin.</p>
            </div>

            <div className="border-t border-white/20 pt-8">
              <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
                <p>What comes next is the gathering.</p>
                <p className="pt-2">Transformation becomes real through community prayer and presence.</p>
                <p className="pt-2">Then begins your private 7-stage journey of restoration.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/gathering"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
            >
              Attend the Gathering
            </a>

            <a
              href="/journey-preview"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border border-white/60 rounded-lg hover:border-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
            >
              Preview the 7-Stage Journey
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <a
              href="/"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/stories"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/gathering"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Gathering
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/journey"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Journey
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>

          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>

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
                  frameBorder="0"
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
