'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

interface ProofItem {
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

interface StoryCard {
  id: string;
  name: string;
  role: string;
  quote: string;
  story: string;
  heroImage?: { url: string; alt: string };
  videoUrl?: string;
  isFeatured?: boolean;
  proof?: ProofItem[];
}

const mockStories: StoryCard[] = [
  {
    id: '0',
    name: 'Samuel Johnson',
    role: 'Delivered from Internet Fraud',
    quote: 'When the man of God touched me, I immediately saw myself facing a judge.',
    story: 'Samuel Johnson was a professional internet fraudster. Known in Nigeria as Yahoo and in Ghana as Sakawa. Demonically inspired to deceive, defraud, and destroy through the most advanced online tactics and methods.\n\nHe was not just a local king of internet scamming. He taught hundreds of youngsters his satanic tricks.\n\nThen he encountered Jesus Christ through prayer at The SCOAN.\n\nHis deliverance is complete. There are many valuable lessons in his testimony—not just for those in fraud, but for anyone bound by spiritual deception.\n\nWatch his full 41-minute confession to see what Jesus does.',
    heroImage: {
      url: '/images/testimony.png',
      alt: 'Samuel Johnson - The King of Internet Scamming'
    },
    videoUrl: 'https://www.youtube.com/embed/bKJCcWQVuq8',
    isFeatured: true
  },
];

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<StoryCard[]>([]);
  const [loading, setLoading] = useState(true);
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
        // If we have real testimonies, use them; otherwise use mocks
        setTestimonies(fetched.length > 0 ? fetched : mockStories);
      } catch (error) {
        console.error('[TESTIMONIES] Error fetching page data:', error);
        // Fall back to mocks on error
        setTestimonies(mockStories);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  }, []);

  const StoryCard = ({ story, onPlayVideo }: { story: StoryCard; onPlayVideo: (url: string) => void }) => (
    <div className="w-full space-y-12 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Content - Left */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              {story.name}
            </h2>
            <p className="text-base text-rc-text/70 font-medium">{story.role}</p>
          </div>

          <blockquote className="border-l-4 border-rc-accent pl-6">
            <p className="text-lg md:text-xl font-rc-serif italic text-rc-text leading-relaxed">
              &ldquo;{story.quote}&rdquo;
            </p>
          </blockquote>

          <div className="text-base text-rc-text/80 leading-relaxed font-light space-y-4">
            {story.story.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Proof Gallery - Right */}
        {story.proof && story.proof.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-rc-text uppercase tracking-wide">Proof & Evidence</p>
            <div className="grid grid-cols-2 gap-3">
              {story.proof.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => item.type === 'video' && onPlayVideo(item.url)}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-rc-text/5 border border-rc-border/20 hover:shadow-lg transition-all duration-300"
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.caption || 'Proof'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      <div className="w-full h-full bg-gradient-to-br from-rc-text/20 to-rc-text/5 flex items-center justify-center">
                        <svg className="w-8 h-8 text-rc-text/50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <svg className="w-5 h-5 text-rc-text ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                      <p className="text-xs text-white truncate">{item.caption}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const StoryItem = ({ story, idx, onPlayVideo }: { story: StoryCard; idx: number; onPlayVideo: (url: string) => void }) => {
    const { ref, controls, initial } = useScrollReveal(0.2);

    return (
      <motion.div
        key={story.id}
        ref={ref}
        initial={initial}
        animate={controls}
        className="pt-12 md:pt-16"
      >
        <StoryCard story={story} onPlayVideo={onPlayVideo} />
        {idx < testimonies.length - 1 && (
          <div className="mt-12 md:mt-16 border-t border-rc-border/20" />
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* Hero Section - Brother Jimi Focus */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Stories of Deliverance</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Not stories of shame.
              <br />
              Stories of freedom.
            </h1>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }}>
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
              Real people. Real deliverance. Real transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story - Proof Moment */}
      {testimonies.length > 0 && testimonies[0].isFeatured && (
        <>
          {/* Video Hero - Proof Moment with Text Overlay */}
          <section className="w-screen -mx-[calc(50vw-50%)] bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
              className="w-full relative aspect-video md:aspect-auto md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={testimonies[0].heroImage?.url}
                alt={testimonies[0].heroImage?.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay - Stronger for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>

              {/* Text Overlay - The Proof Statement */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 px-6 max-w-2xl mx-auto">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-base md:text-lg text-white/90 font-light">
                      Jesus also delivered Samuel from fraud
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight">
                      through Prophet TB Joshua
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-white/80 font-light pt-2">
                    41 minutes • Full confession • Real transformation
                  </p>
                </div>
              </div>

              {/* Play Button - Centered */}
              {testimonies[0].videoUrl && (
                <button
                  onClick={() => setSelectedVideo(testimonies[0].videoUrl!)}
                  className="relative z-20 group flex items-center justify-center mt-8 hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:shadow-xl hover:bg-white/95">
                    <svg className="w-10 h-10 text-[#0F0F0F] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </motion.div>
          </section>

          {/* Story Content - Premium Layout on Warm Gray */}
          <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                {/* Story Content - Left */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
                      {testimonies[0].name}
                    </h2>
                    <p className="text-base md:text-lg text-rc-text/70 font-medium">
                      {testimonies[0].role}
                    </p>
                  </div>

                  <blockquote className="border-l-4 border-rc-accent pl-6">
                    <p className="text-lg md:text-xl font-rc-serif italic text-rc-text leading-relaxed">
                      &ldquo;{testimonies[0].quote}&rdquo;
                    </p>
                  </blockquote>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-medium text-rc-text/60 uppercase tracking-wide mb-4">The Story</p>
                      <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                        {testimonies[0].story.split('\n\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-rc-border">
                      <p className="text-sm text-rc-text/60">41 minutes • Full confession at The SCOAN</p>
                    </div>
                  </div>
                </div>

                {/* Proof Gallery - Right */}
                {testimonies[0].proof && testimonies[0].proof.length > 0 && (
                  <div className="space-y-6">
                    <p className="text-sm font-medium text-rc-text/70 uppercase tracking-wide">Proof & Evidence</p>
                    <div className="grid grid-cols-2 gap-4">
                      {testimonies[0].proof.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => item.type === 'video' && setSelectedVideo(item.url)}
                          className="group relative aspect-square rounded-lg overflow-hidden bg-rc-text/5 border border-rc-border/40 hover:shadow-md transition-all duration-300"
                        >
                          {item.type === 'image' ? (
                            <img
                              src={item.url}
                              alt={item.caption || 'Proof'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <>
                              <div className="w-full h-full bg-rc-text/10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-rc-text/40" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                                  <svg className="w-4 h-4 text-rc-text ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          )}
                          {item.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                              <p className="text-xs text-white truncate">{item.caption}</p>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        </>
      )}

      {/* Pattern Confirmation Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>Jesus is delivering others the same way.</p>
            <p className="pt-4 text-rc-text font-medium">The pattern is repeating. Here are more stories.</p>
          </div>
        </motion.div>
      </section>

      {/* Other Stories */}
      {testimonies.length > 1 && (
        <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
          <div className="max-w-5xl mx-auto space-y-16 md:space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text tracking-tight mb-2">More Deliverances</h2>
              <p className="text-base text-rc-text/70">Continue reading real stories of transformation</p>
            </motion.div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-rc-text/60">Loading stories...</p>
              </div>
            ) : (
              <div className="space-y-24 md:space-y-32 border-t border-rc-border/20 pt-16">
                {testimonies.slice(1).map((story, idx) => (
                  <StoryItem key={story.id} story={story} idx={idx + 1} onPlayVideo={setSelectedVideo} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Closing Section - Call to Action */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            You are not stuck.
          </h2>

          <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
            <p>You've seen the proof.</p>
            <p>Jesus delivered them through Prophet TB Joshua.</p>

            <p className="pt-4">The same Jesus is ready to deliver you.</p>
          </div>

          <button
            onClick={() => {
              const event = new CustomEvent('open-deliverance-modal');
              document.dispatchEvent(event);
            }}
            className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
          >
            Book Deliverance
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="/"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/stories"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Stories of Deliverance
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/partnership"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Mission Partners
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>

          {/* Copyright Only */}
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
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
