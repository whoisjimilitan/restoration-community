'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeliveringRequestModal from '@/components/DeliveringRequestModal';

export default function SamuelVideoPage() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [userState, setUserState] = useState<'convicted' | 'curious' | 'community' | 'stories' | null>(null);
  const [isDeliveringModalOpen, setIsDeliveringModalOpen] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setUserState('convicted');
  };

  const switchState = (state: typeof userState) => {
    setUserState(state);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* CINEMATIC VIDEO SECTION */}
      <section className="flex-1 flex items-center justify-center bg-black px-4 md:px-12 py-8">
        <div className="w-full max-w-5xl">
          {/* Video Container - 16:9 Aspect Ratio */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/bKJCcWQVuq8?enablejsapi=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onEnded={handleVideoEnd}
              title="Samuel Johnson's Deliverance"
            />
          </div>

          {/* Video Title */}
          <div className="mt-6 space-y-2">
            <h1 className="text-3xl md:text-4xl font-rc-serif font-bold">Samuel Johnson's Deliverance</h1>
            <p className="text-white/60 text-sm">41 minutes • Full confession at The SCOAN</p>
          </div>
        </div>
      </section>

      {/* POST-VIDEO MOMENT - Smart Routing */}
      <AnimatePresence>
        {videoEnded && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex-1 flex items-center justify-center px-4 md:px-12 py-12"
          >
            <div className="w-full max-w-3xl space-y-12 text-center">
              {/* Reflection Moment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-3xl md:text-4xl font-rc-serif font-bold leading-relaxed">
                  He is ready to deliver you.
                </p>

                <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                  What resonates with you most right now?
                </p>
              </motion.div>

              {/* DYNAMIC POST-VIDEO OPTIONS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6"
              >
                {/* PRIMARY OPTION - Convicted State */}
                {(!userState || userState === 'convicted') && (
                  <div className="space-y-6 pt-8 border-t border-white/20">
                    <div className="space-y-4">
                      <h3 className="text-lg text-white/80 font-light">
                        I want deliverance too
                      </h3>
                      <button
                        onClick={() => setIsDeliveringModalOpen(true)}
                        className="inline-flex items-center justify-center w-full md:w-auto px-12 py-4 bg-white text-black font-medium text-lg rounded-lg hover:bg-white/95 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 transition-all duration-300"
                      >
                        Request Deliverance
                      </button>
                    </div>

                    <div className="pt-8 space-y-4 border-t border-white/10">
                      <p className="text-sm text-white/60">Or explore your next step:</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                        <button
                          onClick={() => switchState('curious')}
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          Why Only Jesus?
                        </button>
                        <span className="text-white/30">•</span>
                        <button
                          onClick={() => switchState('community')}
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          Join the Gathering
                        </button>
                        <span className="text-white/30">•</span>
                        <button
                          onClick={() => switchState('stories')}
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          More Stories
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CURIOUS STATE - Want to understand */}
                {userState === 'curious' && (
                  <div className="space-y-6 pt-8 border-t border-white/20">
                    <div className="space-y-4">
                      <h3 className="text-lg text-white/80 font-light">
                        I want to understand why only Jesus
                      </h3>
                      <a
                        href="/what-is-deliverance"
                        className="inline-flex items-center justify-center w-full md:w-auto px-12 py-4 bg-white text-black font-medium text-lg rounded-lg hover:bg-white/95 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 transition-all duration-300"
                      >
                        Explore the Truth
                      </a>
                    </div>

                    <div className="pt-8 space-y-4 border-t border-white/10">
                      <p className="text-sm text-white/60">After understanding, explore:</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                        <button
                          onClick={() => switchState('convicted')}
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          Request Deliverance
                        </button>
                        <span className="text-white/30">•</span>
                        <a
                          href="/journey"
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          See the Journey
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* COMMUNITY STATE - Want to join */}
                {userState === 'community' && (
                  <div className="space-y-6 pt-8 border-t border-white/20">
                    <div className="space-y-4">
                      <h3 className="text-lg text-white/80 font-light">
                        I want to join the community
                      </h3>
                      <a
                        href="/gathering"
                        className="inline-flex items-center justify-center w-full md:w-auto px-12 py-4 bg-white text-black font-medium text-lg rounded-lg hover:bg-white/95 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 transition-all duration-300"
                      >
                        Join Us at The Gathering
                      </a>
                    </div>

                    <div className="pt-8 space-y-4 border-t border-white/10">
                      <p className="text-sm text-white/60">Or take the next step:</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                        <button
                          onClick={() => switchState('convicted')}
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          Request Deliverance
                        </button>
                        <span className="text-white/30">•</span>
                        <a
                          href="/journey"
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          Learn the Path
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* STORIES STATE - Want more proof */}
                {userState === 'stories' && (
                  <div className="space-y-6 pt-8 border-t border-white/20">
                    <div className="space-y-4">
                      <h3 className="text-lg text-white/80 font-light">
                        I want to see more testimonies
                      </h3>
                      <a
                        href="/stories"
                        className="inline-flex items-center justify-center w-full md:w-auto px-12 py-4 bg-white text-black font-medium text-lg rounded-lg hover:bg-white/95 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 transition-all duration-300"
                      >
                        See More Stories of Deliverance
                      </a>
                    </div>

                    <div className="pt-8 space-y-4 border-t border-white/10">
                      <p className="text-sm text-white/60">When ready, take action:</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                        <button
                          onClick={() => switchState('convicted')}
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          Request Deliverance
                        </button>
                        <span className="text-white/30">•</span>
                        <button
                          onClick={() => switchState('curious')}
                          className="text-sm text-white/70 hover:text-white underline transition-colors"
                        >
                          Understand Why Jesus
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Back to Home */}
              <div className="pt-12 border-t border-white/10">
                <a href="/" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                  ← Back to Home
                </a>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* DELIVERANCE MODAL */}
      <DeliveringRequestModal isOpen={isDeliveringModalOpen} onClose={() => setIsDeliveringModalOpen(false)} />
    </div>
  );
}
