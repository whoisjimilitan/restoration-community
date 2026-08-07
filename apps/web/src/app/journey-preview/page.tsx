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

          {/* Progress Visualization - Bottom of Hero */}
          <div className={`transform transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <div className="pt-12 space-y-4 border-t border-white/20">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/70">Progress</span>
                  <span className="text-xs font-medium text-white/70">0%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isLoaded ? '0%' : 0 }}
                    transition={{ duration: 0.8, type: 'spring', damping: 30, stiffness: 120 }}
                  />
                </div>
              </div>

              {/* Stage Grid */}
              <div className="grid grid-cols-7 gap-2">
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.number}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-sm font-semibold bg-white/20 text-white"
                  >
                    {stage.number}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE DESCRIPTIONS */}
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
              Your Seven Steps to Restoration
            </h2>
            <p className="text-base text-rc-text/70 font-light">
              Each stage is a step closer to your true identity in Jesus Christ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.15 }}
                className="space-y-3"
              >
                <div className="flex items-baseline gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rc-accent text-white font-semibold text-sm flex-shrink-0">
                    {stage.number}
                  </div>
                  <h3 className="text-lg md:text-xl font-rc-serif font-bold text-rc-text leading-tight">
                    {stage.name}
                  </h3>
                </div>
                <p className="text-base text-rc-text/80 leading-relaxed font-light">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              How the Journey Works
            </h2>
            <p className="text-base text-rc-text/70 font-light">
              From the gathering to transformation, this is your path forward.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Begin at the Gathering',
                description: 'Connect with the community. Encounter the prophetic voice of the restoration gospel. Meet your mentor.'
              },
              {
                step: '2',
                title: 'Move Through Each Stage',
                description: 'Work privately through each of the seven stages at your own pace. No rushing. Your mentor walks with you.'
              },
              {
                step: '3',
                title: 'Experience Transformation',
                description: 'From Truth to Serving. As each stage completes, you move closer to your true identity in Jesus Christ.'
              },
              {
                step: '4',
                title: 'Serve Others',
                description: 'The final stage is giving to others what you received. Your story becomes someone else\'s hope.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.15 }}
                className="flex gap-6"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-rc-accent/10 border border-rc-accent/30 flex-shrink-0">
                  <span className="text-base font-semibold text-rc-accent">{item.step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-rc-text leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base text-rc-text/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CLOSING CTA */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Ready to Begin
            </h2>

            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>This journey is not theoretical.</p>
              <p>It is not a course to complete from your bedroom.</p>
              <p className="pt-4">It is an encounter with Jesus Christ that transforms you from the inside out.</p>
              <p className="pt-4">The gathering is your first step.</p>
            </div>
          </div>

          <a
            href="/gathering"
            className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
          >
            Attend the Gathering
          </a>
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
