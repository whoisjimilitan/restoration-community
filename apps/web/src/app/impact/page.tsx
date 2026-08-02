'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ImpactPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const metrics = [
    { label: 'People Prayed With', value: '15', description: '15 encounters with Jesus Christ' },
    { label: 'In Restoration', value: '15', description: '15 walking the journey from slavery to freedom' },
    { label: 'In Honest Work', value: '0', description: 'The next stage begins. Watch this number grow.' },
    { label: 'Serving Others', value: '0', description: 'Freedom leads to service. The cycle continues.' },
  ];

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">What We are Building</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Our Impact
            </h1>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }}>
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">These numbers represent spiritual reality.</p>
          </div>
        </div>
      </section>

      {/* CONTEXT BRIDGE SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Every metric is a person.</p>
            <p>Every person is a spirit set free.</p>
            <p>This is what transformation looks like.</p>
            <p className="text-rc-accent font-semibold">Not statistics. Not results. Freedom.</p>
          </div>
        </motion.div>
      </section>

      {/* METRICS SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white rounded-lg p-8 border border-rc-border/30 hover:border-rc-border/60 transition-colors duration-300"
              >
                <p className="text-xs font-medium text-rc-text/70 uppercase tracking-wider mb-4">{m.label}</p>
                <p className="text-4xl font-rc-serif font-bold text-rc-accent mb-4">{m.value}</p>
                <p className="text-base text-rc-text/80 leading-relaxed font-light">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* IMPACT CONTEXT SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>These numbers move because spirits move.</p>
            <p>Not by law.</p>
            <p>Not by willpower.</p>
            <p className="text-rc-accent font-semibold">By Jesus Christ.</p>
          </div>
        </motion.div>
      </section>

      {/* WHY TRANSFORMATION IS FREE SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p className="font-medium">All transformation is completely free.</p>
            <p>This is important.</p>

            <p className="pt-3">More money doesn't free young people from fraud.</p>
            <p>More laws don't break the spirit controlling them.</p>

            <p className="pt-2 font-medium text-rc-accent">Only Jesus delivers.</p>

            <p className="pt-3">And Jesus works through people who answer the call.</p>
          </div>
        </motion.div>
      </section>

      {/* PARTNER TYPES SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">Three Kinds of Partners</h2>
            <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">Make this work possible.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 border border-rc-border/30 hover:border-rc-border/60 transition-colors duration-300">
              <p className="text-base font-semibold text-rc-accent mb-3 tracking-tight">Founding Partners</p>
              <p className="text-base text-rc-text/80 leading-relaxed font-light">Believed when there was no proof.</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-rc-border/30 hover:border-rc-border/60 transition-colors duration-300">
              <p className="text-base font-semibold text-rc-accent mb-3 tracking-tight">Standing Partners</p>
              <p className="text-base text-rc-text/80 leading-relaxed font-light">Saw transformation and chose to fuel it.</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-rc-border/30 hover:border-rc-border/60 transition-colors duration-300">
              <p className="text-base font-semibold text-rc-accent mb-3 tracking-tight">Prayer Partners</p>
              <p className="text-base text-rc-text/80 leading-relaxed font-light">Their intercession protects the work.</p>
            </div>
          </div>

          <div className="text-center space-y-6 pt-8 border-t border-rc-border">
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">Which kind are you called to be?</p>

            <a
              href="mailto:james@saintandstory.co.uk"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Become a Partner
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
