'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ImpactPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const metrics = [
    { label: 'People Prayed With', value: '15', description: 'Encountering Jesus through prayer' },
    { label: 'In Restoration', value: '15', description: 'Walking the 7-stage journey' },
    { label: 'In Honest Work', value: '0', description: 'Stage 6 - Building with integrity' },
    { label: 'Serving Others', value: '0', description: 'Stage 7 - Helping others find freedom' },
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
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">Real numbers. Real people. Real transformation through Jesus Christ.</p>
          </div>
        </div>
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

      {/* PARTNERSHIP SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">Partner With Us</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>All transformation is completely free.</p>
            <p>We are funded by partners who believe in this work.</p>
          </div>

          <div className="pt-4">
            <a
              href="mailto:james@saintandstory.co.uk"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Become a Sponsor
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
