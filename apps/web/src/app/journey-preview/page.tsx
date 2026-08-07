'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stages = [
  { number: 1, name: 'Truth', description: 'See yourself clearly and Jesus clearly' },
  { number: 2, name: 'Confession', description: 'Speak it aloud to God' },
  { number: 3, name: 'Repentance', description: 'Turn away from what harmed you' },
  { number: 4, name: 'Forgiveness', description: 'Release what held you captive' },
  { number: 5, name: 'Reconciliation', description: 'Restore what was broken' },
  { number: 6, name: 'Honest Work', description: 'Build a life that reflects who you are' },
  { number: 7, name: 'Serving', description: 'Give to others what you received' },
];

export default function JourneyPreviewPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Your Restoration</p>
          </div>

          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '80ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              The 7-Stage Journey
            </h1>
          </div>

          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '160ms' }}>
            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>Jesus Christ's work of restoration unfolds through seven transformative stages.</p>
              <p className="pt-2">Each stage builds on the last. Each step brings you closer to your identity in Christ.</p>
            </div>
          </div>

          {/* Stage Grid */}
          <div className={`transform transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <div className="pt-12 space-y-8 border-t border-white/20">
              <div className="grid grid-cols-7 gap-2">
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.number}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-sm font-semibold bg-white text-rc-accent"
                  >
                    {stage.number}
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.number}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-white/70">Stage {stage.number}</div>
                      <h3 className="text-lg font-medium text-white">{stage.name}</h3>
                    </div>
                    <p className="text-base text-white/80 font-light">{stage.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              Begin Your Journey
            </h2>
            <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
              Attend the gathering to begin this seven-stage restoration. Work with a mentor. Move through each stage at your own pace. Experience Jesus Christ's transformative work in your life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/gathering"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
            >
              Attend the Gathering
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <a href="/" className="text-white/80 hover:text-white transition-colors group text-sm">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/stories" className="text-white/80 hover:text-white transition-colors group text-sm">
              Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/gathering" className="text-white/80 hover:text-white transition-colors group text-sm">
              Gathering
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/journey-preview" className="text-white/80 hover:text-white transition-colors group text-sm">
              Journey Preview
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>

          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
