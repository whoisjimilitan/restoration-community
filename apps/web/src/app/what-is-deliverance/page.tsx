'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DeliveringRequestModal from '@/components/DeliveringRequestModal';

export default function WhyOnlyJesus() {
  const [isDeliveringModalOpen, setIsDeliveringModalOpen] = useState(false);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO SECTION */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Your Convictions</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight"
          >
            Why Only Jesus Delivers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/80 leading-relaxed font-light"
          >
            Deliverance means total freedom. From sin and its consequences.
          </motion.p>
        </div>
      </section>

      {/* THE ONLY WAY */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            The Only Way
          </h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
            <p>Deliverance means total freedom.</p>
            <p>From sin and its consequences.</p>
            <p>It is the only way out of fraud.</p>

            <p className="pt-2 font-medium text-rc-text">Only Jesus Christ offers this deliverance.</p>

            <p className="pt-3">Your money cannot fix this.</p>
            <p>The Law cannot fix this.</p>
            <p>Punishment cannot fix this.</p>

            <p className="pt-2 font-medium text-rc-text">Fraud is a spiritual issue.</p>
            <p className="font-medium text-rc-text">There is no cure outside Jesus Christ.</p>
            <p>He is the only way.</p>
          </div>
        </motion.div>
      </section>

      {/* WHAT THIS MEANS */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 border-t border-rc-border" style={{ backgroundColor: '#FAFAF8' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            What This Means
          </h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>Fraud is a spiritual trap. Not a financial problem. Not a legal problem. Not a personal failure.</p>
            <p>A spiritual trap requires a spiritual solution.</p>
            <p className="pt-3 font-medium text-rc-text">Jesus Christ is that solution.</p>
            <p>He breaks the authority of the spiritual forces holding you.</p>
            <p>He restores your identity.</p>
            <p>He gives you a new life.</p>
          </div>
        </motion.div>
      </section>

      {/* THE JOURNEY AFTER */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            After Deliverance
          </h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
            <p>Deliverance is just the beginning.</p>
            <p>After the encounter with Jesus comes the journey.</p>
            <p>A path of restoration. Of learning to live honestly. Of building something that lasts.</p>
            <p className="pt-2 font-medium text-rc-text">This journey has 7 stages.</p>
            <p>Truth → Confession → Repentance → Forgiveness → Reconciliation → Honest Work → Service</p>
            <p className="pt-3">You walk this path with support. Encouragement. Prayer. People who understand.</p>
          </div>

          <div className="pt-8">
            <a
              href="/journey"
              className="inline-flex items-center justify-center px-8 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              See the 7-Stage Journey
            </a>
          </div>
        </motion.div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              You feel this trap.
            </h2>

            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>You know time is running out.</p>
              <p>No one can go it alone.</p>
              <p className="pt-2">I have been there and know this.</p>
              <p className="pt-2 font-medium text-white">Take the first step of faith.</p>
              <p className="pt-2 font-medium text-white">It will be your best step of faith.</p>
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
              href="/samuel-video"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border border-white/60 rounded-lg hover:border-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Watch Samuel's Deliverance
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
            <a href="/samuel-video" className="text-white/80 hover:text-white transition-colors group text-sm">
              Samuel's Deliverance
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/journey" className="text-white/80 hover:text-white transition-colors group text-sm">
              The Journey
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/gathering" className="text-white/80 hover:text-white transition-colors group text-sm">
              The Gathering
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>

      <DeliveringRequestModal isOpen={isDeliveringModalOpen} onClose={() => setIsDeliveringModalOpen(false)} />
    </div>
  );
}
