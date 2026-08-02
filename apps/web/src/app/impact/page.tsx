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
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>These numbers represent the journey people take.</p>
            <p>Not all will reach Stage 7.</p>
            <p>Some stop at Stage 4 and stay there.</p>
            <p>Some begin at Stage 1.</p>
            <p className="text-rc-accent font-semibold">But all are walking toward freedom.</p>
            <p>This is what God is doing.</p>
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

      {/* WHY THIS MATTERS SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">Why This Matters</h2>
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Our program is free because partners chose this calling.</p>
            <p>All transformation is completely free.</p>
            <p className="pt-2">More money doesn't break spiritual chains.</p>
            <p className="text-rc-accent font-semibold">Only Jesus does.</p>
            <p>And Jesus works through people who answer the call.</p>
          </div>
        </motion.div>
      </section>

      {/* THREE KINDS OF PARTNERS SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">Three Kinds of Partners</h2>
            <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">We couldn't do this work without them.</p>
          </div>

          <div className="space-y-12">
            {/* BELIEF PARTNERS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-4"
            >
              <h3 className="text-lg md:text-xl font-semibold text-rc-accent tracking-tight">Why Belief Comes First</h3>
              <div className="space-y-3 text-base md:text-lg text-rc-text leading-relaxed font-light">
                <p>Some partners believed first.</p>
                <p>Not when there was proof.</p>
                <p>Not when there was momentum.</p>
                <p>They believed when it was just a vision.</p>
                <p>This requires a different kind of faith.</p>
              </div>
            </motion.div>

            {/* VERIFICATION PARTNERS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-4"
            >
              <h3 className="text-lg md:text-xl font-semibold text-rc-accent tracking-tight">Why Verification Builds Commitment</h3>
              <div className="space-y-3 text-base md:text-lg text-rc-text leading-relaxed font-light">
                <p>Some partners saw the transformation and chose to fuel it.</p>
                <p>They waited for proof.</p>
                <p>Not because they doubted God.</p>
                <p>But because they knew: Verification builds commitment.</p>
                <p>They see young people walking free.</p>
                <p>They see families restored.</p>
                <p>They see what Jesus does.</p>
                <p>And they say: "I'm in."</p>
              </div>
            </motion.div>

            {/* INTERCESSION PARTNERS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-4"
            >
              <h3 className="text-lg md:text-xl font-semibold text-rc-accent tracking-tight">Why Intercession Is Warfare</h3>
              <div className="space-y-3 text-base md:text-lg text-rc-text leading-relaxed font-light">
                <p>Some partners pray.</p>
                <p>Not casual prayer. Not "bless the work" prayer.</p>
                <p>Intercession. Spiritual warfare. Breaking spiritual strongholds.</p>
                <p>They understand: The battle is spiritual.</p>
                <p>The victory is spiritual.</p>
                <p>Prayer is the armor that protects the work.</p>
                <p>Without them, the work collapses.</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
            className="text-center space-y-6 pt-8 border-t border-rc-border"
          >
            <div className="space-y-3 text-base md:text-lg text-rc-text leading-relaxed font-light">
              <p>All three kinds make this possible.</p>
              <p>All three are answering the call.</p>
            </div>

            <p className="text-base text-rc-text/80 italic">If you feel called, let's talk about it.</p>

            <a
              href="mailto:james@saintandstory.co.uk"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Begin the Conversation
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
