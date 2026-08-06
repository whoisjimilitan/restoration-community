'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DeliveringRequestModal from '@/components/DeliveringRequestModal';

export default function WhatIsDeliverance() {
  const [isDeliveringModalOpen, setIsDeliveringModalOpen] = useState(false);

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
            <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Understanding Deliverance</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight"
          >
            What is Deliverance?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/80 leading-relaxed font-light"
          >
            Freedom is not a program. It's not a therapy. It's not a self-help strategy. Freedom is an encounter with Jesus Christ.
          </motion.p>
        </div>
      </section>

      {/* WHAT BONDAGE LOOKS LIKE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            What Bondage Really Is
          </h2>

          <div className="space-y-8 text-base md:text-lg text-rc-text/75 leading-relaxed font-light">
            <p>
              Bondage is not just a habit. It's not a mistake you keep repeating. It's a spiritual condition.
            </p>

            <p>
              When you are in bondage, something has authority over you. Your fear has authority. Your shame has authority. Your compulsion has authority. The patterns have authority.
            </p>

            <p>
              You try to break free. You make promises. You try willpower. You try therapy. You try discipline. But the bondage remains because the authority has not changed.
            </p>

            <p>
              That is what bondage is: the authority of something other than Jesus over your life.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHY PROGRAMS DON'T WORK */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            Why Programs Fail
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">A program changes your behavior</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                But it doesn't change your heart. It doesn't change the authority.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">A program teaches you control</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                But control requires constant effort. When you're tired, when you're stressed, when you're hurt—the control breaks.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">A program gives you tools</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                But tools can't overcome authority. You can have all the strategies in the world and still be enslaved.
              </p>
            </div>

            <div className="pt-8 border-t border-rc-border/30">
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light italic">
                Deliverance is not about behavior. It's about authority.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHAT DELIVERANCE IS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            What Deliverance Is
          </h2>

          <div className="space-y-8 text-base md:text-lg text-rc-text/75 leading-relaxed font-light">
            <p>
              Deliverance is an encounter with the authority of Jesus Christ.
            </p>

            <p>
              When Jesus shows up—in prayer, in His Word, in His Spirit—the authority of bondage breaks.
            </p>

            <p>
              This is not psychology. This is not self-improvement. This is Jesus displaying His power over the forces that have held you captive.
            </p>

            <p>
              When deliverance happens, the authority changes. Jesus becomes your authority. His voice becomes louder than your shame. His power is greater than the addiction. His love is stronger than the fear.
            </p>

            <p>
              That is deliverance.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHY ONLY JESUS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            Why Only Jesus Delivers
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">He has the authority</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Jesus has authority over all powers—spiritual and earthly. No other power is greater than His.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">He sees the real problem</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Jesus looks at your heart. He sees not just what you've done, but what has done this to you.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">He offers real freedom</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Not just behavior change. Not just coping tools. Real freedom. A new life. A transformed identity.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">He paid the price</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Your bondage comes with shame and guilt. Jesus took that on Himself. He paid for your freedom with His blood.
              </p>
            </div>

            <div className="pt-8 border-t border-rc-border/30">
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light italic">
                No human can deliver you. No program can. No amount of effort can. Only Jesus.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* HOW DELIVERANCE HAPPENS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            How Deliverance Happens
          </h2>

          <div className="space-y-8 text-base md:text-lg text-rc-text/75 leading-relaxed font-light">
            <div className="space-y-2">
              <p className="font-rc-serif font-bold text-rc-text">You confess the truth</p>
              <p>
                Not just to yourself. Out loud. To God. Naming what has held you, what you've done, what shame you carry.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-rc-serif font-bold text-rc-text">You cry out to Jesus</p>
              <p>
                In prayer. In desperation. Asking Him to set you free. This is not an intellectual request. It's a prayer from your whole self.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-rc-serif font-bold text-rc-text">Jesus meets you</p>
              <p>
                In His power. In His presence. And something changes. The authority shifts. The bondage breaks. The shame lifts.
              </p>
            </div>

            <div className="pt-8 border-t border-rc-border/30">
              <p className="font-light">
                This is not a process. This is an encounter. This is deliverance.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
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
              Ready for an encounter?
            </h2>

            <p className="text-base md:text-lg text-white/80 leading-relaxed font-light">
              Deliverance starts with a prayer. A real conversation with Jesus. Honest. Desperate. Real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              onClick={() => setIsDeliveringModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:bg-white/95 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Request Deliverance
            </button>

            <a
              href="/stories"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border border-white/60 rounded-lg hover:border-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              See Real Testimonies
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

      {/* DELIVERANCE MODAL */}
      <DeliveringRequestModal isOpen={isDeliveringModalOpen} onClose={() => setIsDeliveringModalOpen(false)} />
    </div>
  );
}
