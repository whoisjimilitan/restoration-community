'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

const stages = [
  { number: 1, name: 'Truth', color: '#E8F4F3', textColor: 'text-rc-text' },
  { number: 2, name: 'Confession', color: '#D1EEEA', textColor: 'text-rc-text' },
  { number: 3, name: 'Repentance', color: '#B3E5E0', textColor: 'text-rc-text' },
  { number: 4, name: 'Forgiveness', color: '#95DDD7', textColor: 'text-rc-text' },
  { number: 5, name: 'Reconciliation', color: '#4DB5A6', textColor: 'text-rc-text' },
  { number: 6, name: 'Honest Work', color: '#1B7A6F', textColor: 'text-white' },
  { number: 7, name: 'Service', color: '#0D5E57', textColor: 'text-white' },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState<'form' | 'complete'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', story: '' });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">For Young People In A Hurry</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              You were made for something far better.
            </h1>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }}>
            <div className="space-y-3 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>Scamming and fraud promise freedom.</p>
              <p>They only bind you tighter.</p>
              <p className="pt-2">This is a spiritual trap.</p>
              <p>Only One Man can set you free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE TRAP */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Trap</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>You tell yourself:</p>
            <p className="text-rc-text/80">The country is hard.</p>
            <p className="text-rc-text/80">I have no opportunities.</p>
            <p className="text-rc-text/80">I am just recovering what was stolen.</p>
            <p className="pt-3 font-medium">That is the voice of deception.</p>
            <p className="font-medium">The spirit recruiting our youths across nations.</p>
          </div>
        </motion.div>
      </section>

      {/* THE WITNESS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Witness</h2>

          <div className="border-l-4 border-rc-accent pl-8 space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>I too was controlled by <em className="not-italic font-medium">that spirit</em>.</p>
            <p>I justified my actions.</p>
            <p>I convinced myself I had no choice.</p>
            <p className="pt-3">Until my encounter with God.</p>
            <p className="font-medium">He delivered me from <em className="not-italic">that spirit</em>.</p>
            <p className="font-medium">He gave me a new beginning.</p>
            <p className="pt-3"><em className="not-italic font-medium">My God.</em> <em className="not-italic font-medium">My Deliverer.</em></p>
            <p className="font-medium">His name is Jesus Christ.</p>
          </div>
        </motion.div>
      </section>

      {/* THE ONLY WAY */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Only Way</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Deliverance means total freedom.</p>
            <p>From sin and its consequences.</p>
            <p>It is the only way out of fraud.</p>
            <p className="pt-3">Our money cannot offer it.</p>
            <p>Our laws cannot offer it.</p>
            <p className="pt-2 font-medium">Fraud is a spiritual issue.</p>
            <p className="font-medium">Jesus Christ is the only way.</p>
          </div>
        </motion.div>
      </section>

      {/* THE JOURNEY OUT */}
      <section id="journey" className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-10"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Journey Out</h2>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-6 left-0 right-0 h-px bg-rc-text/10" />
              <div className="relative flex justify-between w-full gap-4">
                {stages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center group flex-1">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 relative z-10"
                      style={{
                        backgroundColor: stage.color,
                        color: stage.textColor === 'text-white' ? 'white' : '#1A1A18'
                      }}
                    >
                      {stage.number}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-rc-text">{stage.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-0">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center gap-4 py-3 pl-4 border-l-4" style={{ borderColor: stage.color }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: stage.color,
                    color: stage.textColor === 'text-white' ? 'white' : '#1A1A18'
                  }}
                >
                  {stage.number}
                </div>
                <p className="font-medium text-rc-text">{stage.name}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-10 md:pt-12 border-t border-rc-text/15 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>This journey is walked with those who have traveled it before.</p>
            <p>Prayer. Encouragement. People who understand.</p>
          </div>
        </motion.div>
      </section>

      {/* THE NEW LIFE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The New Life</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Deliverance is just the start.</p>
            <p>His grace will teach you to work honestly.</p>
            <p>To live without fear.</p>
            <p>To build something that lasts.</p>
          </div>
        </motion.div>
      </section>

      {/* RETURN */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">Return</h2>

          <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
            <p>Everything you have heard is true.</p>
            <p>You were made for something better.</p>
            <p>I have been there.</p>
            <p>And returned by grace.</p>
            <p>Through deliverance.</p>
            <p className="pt-3">The trap is real.</p>
            <p>But so is the Deliverer, Jesus Christ.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              Request Deliverance
            </button>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border-2 border-white rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Return to Your Journey
            </Link>
          </div>

          <div className="pt-12 border-t border-white/20">
            <div>
              <p className="text-xs font-medium text-white/60 uppercase tracking-widest mb-6">Or explore</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
              <Link href="/testimonies" className="text-base text-white/80 hover:text-white transition-colors duration-200 group">
                Success Stories
                <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-2"></span>
              </Link>
              <Link href="/partnership" className="text-base text-white/80 hover:text-white transition-colors duration-200 group">
                Our Partners
                <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-2"></span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-rc-bg rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Form Step */}
              {formStep === 'form' && (
                <div className="p-8 md:p-12 space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                      Tell Us Your Story
                    </h2>
                    <p className="text-rc-text/70">
                      Your testimony matters. Share your journey with us, and we'll connect you with support.
                    </p>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (formData.name && formData.email && formData.story) {
                        setFormStep('complete');
                      }
                    }}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Story Textarea */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Your Story
                      </label>
                      <textarea
                        required
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text resize-none"
                        placeholder="Share your journey. What brought you here? What are you hoping for?"
                        rows={6}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setFormData({ name: '', email: '', story: '' });
                        }}
                        className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                      >
                        Send My Story
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Success Step */}
              {formStep === 'complete' && (
                <div className="p-8 md:p-12 text-center space-y-4">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-2xl font-rc-serif font-bold text-rc-text">
                    Thank You
                  </h3>
                  <p className="text-rc-text/70">
                    Your story has been received. Someone from our team will reach out soon to walk with you through this journey.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormStep('form');
                      setFormData({ name: '', email: '', story: '' });
                    }}
                    className="mt-6 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                  >
                    Back to Page
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
