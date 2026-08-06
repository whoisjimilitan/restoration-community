'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProofGallery from '@/components/ProofGallery';
import VideoHero from '@/components/VideoHero';
import VideoModal from '@/components/VideoModal';
import DeliveringRequestModal from '@/components/DeliveringRequestModal';

export default function StoriesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDeliveringModalOpen, setIsDeliveringModalOpen] = useState(false);

  useEffect(() => {
    // Page loaded, animations can begin
  }, []);

  const samuelProofItems = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b2f?w=400&h=400&fit=crop',
      type: 'image' as const,
      caption: 'Journey of Transformation',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1513225557199-3e91250b6da4?w=400&h=400&fit=crop',
      type: 'image' as const,
      caption: 'New Life',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
      type: 'image' as const,
      caption: 'Freedom',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1552058544-f771b1a615ce?w=400&h=400&fit=crop',
      type: 'image' as const,
      caption: 'Peace',
    },
  ];

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO SECTION */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-3xl mx-auto w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Stories of Deliverance</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight"
          >
            Not stories of shame.
            <br />
            Stories of freedom.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/80 leading-relaxed font-light"
          >
            Real people. Real deliverance. Real transformation.
          </motion.p>
        </div>
      </section>

      {/* SAMUEL'S STORY SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Content - Left */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
                  Samuel Johnson
                </h2>
                <p className="text-base text-rc-text/70 font-medium">
                  Delivered from Internet Fraud
                </p>
              </div>

              <blockquote className="border-l-4 border-rc-accent pl-6 py-2">
                <p className="text-lg md:text-xl font-rc-serif italic text-rc-text leading-relaxed">
                  &ldquo;When the man of God touched me, I immediately saw myself facing a judge.&rdquo;
                </p>
              </blockquote>

              <div className="text-base text-rc-text/80 leading-relaxed font-light space-y-4">
                <p>
                  Samuel Johnson was a professional internet fraudster. Known in Nigeria as Yahoo and in Ghana as Sakawa. Demonically inspired to deceive, defraud, and destroy through the most advanced online tactics and methods.
                </p>

                <p>
                  He was the local king of internet scamming. He taught hundreds of youngsters his satanic tricks.
                </p>

                <p>
                  Then came Jesus Christ. At The SCOAN, one touch from His anointed servant. Something left him. Everything changed.
                </p>

                <p>
                  His deliverance is complete. There are many valuable lessons in his testimony — not just for those in fraud, but for anyone bound by spiritual deception.
                </p>

                <p>
                  Watch his full 41-minute confession to see what Jesus does.
                </p>

                <div className="pt-8 border-t border-rc-border/30">
                  <p className="text-sm text-rc-text/60">41 minutes • Full confession at The SCOAN</p>
                </div>
              </div>
            </div>

            {/* Proof Gallery - Right */}
            <div>
              <ProofGallery
                items={samuelProofItems}
                onVideoClick={setSelectedVideo}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* VIDEO HERO - Cinematic Centerpiece */}
      <VideoHero
        imageUrl="https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop"
        imageAlt="Samuel's Transformation"
        onPlayClick={() => setSelectedVideo('https://www.youtube.com/embed/bKJCcWQVuq8')}
      />

      {/* WHAT THIS MEANS - Reflection Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            Deliverance is Real
          </h2>

          <div className="space-y-6 text-base md:text-lg text-rc-text/75 leading-relaxed font-light">
            <p>
              Samuel was trapped in fraud. Every tactic. Every deception. Every fear.
            </p>

            <p>
              One encounter with Jesus Christ. Everything changed.
            </p>

            <p>
              His life is now honest. His purpose is now clear.
            </p>

            <p>
              This is not a story about one man. This is proof that Jesus delivers.
            </p>
          </div>

          <div className="pt-8 border-t border-rc-border/30 space-y-6">
            <h3 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">
              What This Means for You
            </h3>

            <p className="text-base md:text-lg text-rc-text/75 leading-relaxed font-light">
              If Jesus could deliver Samuel, He can deliver you. The same Jesus who met Samuel at The SCOAN is ready to meet you where you are.
            </p>

            <p className="text-base md:text-lg text-rc-text/75 leading-relaxed font-light">
              All you have to do is ask.
            </p>
          </div>
        </motion.div>
      </section>

      {/* THE JOURNEY TEASER */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            What Comes After Deliverance
          </h2>

          <div className="space-y-6 text-base md:text-lg text-rc-text/75 leading-relaxed font-light">
            <div className="space-y-2">
              <p className="font-rc-serif font-bold text-rc-text">You encounter Jesus</p>
              <p>Not a program. An encounter.</p>
            </div>

            <div className="space-y-2">
              <p className="font-rc-serif font-bold text-rc-text">You decide: Do I want restoration?</p>
              <p>No pressure. No commitment upfront.</p>
            </div>

            <div className="space-y-2">
              <p className="font-rc-serif font-bold text-rc-text">You walk the 7-stage journey (7 weeks)</p>
              <p>Truth → Confession → Repentance → Forgiveness → Reconciliation → Honest Work → Serving</p>
            </div>

            <div className="pt-8 border-t border-rc-border/30">
              <p className="font-light">
                The journey is real. The community is real. The transformation is real.
              </p>
              <p className="font-light pt-4">
                No program. No commitment upfront. Just Jesus. Just you. Just prayer.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTAs SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Ready to be free?
            </h2>

            <div className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed font-light">
              <p>The same Jesus who delivered Samuel is ready to deliver you.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              onClick={() => setIsDeliveringModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:bg-white/95 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Request Deliverance
            </button>

            <a
              href="/gathering"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border border-white/60 rounded-lg hover:border-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Attend the Gathering
            </a>

            <a
              href="/journey"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium hover:underline transition-all duration-300"
            >
              Learn The Journey
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a href="/" className="text-white/80 hover:text-white transition-colors group text-sm">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/stories" className="text-white/80 hover:text-white transition-colors group text-sm">
              Stories of Deliverance
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/partnership" className="text-white/80 hover:text-white transition-colors group text-sm">
              Partnership
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>

      {/* MODALS */}
      <VideoModal videoUrl={selectedVideo || ''} isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} />
      <DeliveringRequestModal isOpen={isDeliveringModalOpen} onClose={() => setIsDeliveringModalOpen(false)} />
    </div>
  );
}
