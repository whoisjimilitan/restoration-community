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
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState<'form' | 'complete'>('form');
  const [attendanceData, setAttendanceData] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text relative">
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
            <p className="pt-2">That is the voice of deceit.</p>
            <p className="font-medium">The spirit controlling our young people across nations.</p>
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
            <p>I blamed my country's economy.</p>
            <p>I convinced myself I had no choice.</p>
            <p className="pt-3">Until my encounter with One Man.</p>
            <p className="font-medium">He delivered me from <em className="not-italic">that spirit</em>.</p>
            <p className="font-medium">He gave me a new beginning.</p>
            <p className="pt-3">God. My Deliverer.</p>
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
            <p>From sin and its penalties.</p>
            <p>It is the only way out of fraud.</p>
            <p className="pt-3">For young people trapped in it.</p>
            <p>For nations plagued by it.</p>
            <p className="pt-3">More money will not free you from it.</p>
            <p>More laws will not free our nations from it.</p>
            <p className="pt-3 font-medium">Fraud is a spiritual issue.</p>
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
            <p>The journey out starts with truth.</p>
            <p>It is the only way to confession.</p>
            <p>To repentance. Forgiveness. And beyond.</p>
            <p>Do not deceive yourself.</p>
            <p>Only deliverance frees you from the spirit of fraud.</p>
            <p className="pt-3">You walk with those who chose truth before you.</p>
            <p>And through grace, become one who leads others there.</p>
          </div>
        </motion.div>
      </section>

      {/* DELIVERANCE PRAYER */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">Deliverance Prayer</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Do you see the stages in this divine journey?</p>
            <p>Prayer is essential to each stage.</p>
            <p>But not just any kind of prayer will bring us to truth.</p>
            <p>Deliverance prayer only does.</p>
            <p className="pt-3">In 2013, God used His servant Prophet TB Joshua to pray for me.</p>
            <p>I walked out completely.</p>
            <p className="pt-3">One deliverance prayer.</p>
            <p>Freedom from fraud.</p>
            <p className="pt-3 font-medium">If you are ready, the Living Word is ready in me.</p>
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
            <p>To live the life you were always meant to live.</p>
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
            <Link
              href="/request-prayer"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Request Deliverance
            </Link>
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

      {/* EPILOGUE - The pastor's final words */}
      <section className="w-full py-16 md:py-20 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <div className="space-y-6">
            <p className="text-sm text-rc-text/60 uppercase tracking-widest font-medium">If you are ready, Jesus is</p>

            <div className="space-y-3 text-lg md:text-lg text-rc-text leading-relaxed font-light">
              <p>SCOAN Accra, Ghana</p>
              <p>Friday, August 15 at 3:00 PM</p>
              <p className="text-sm text-rc-text/70 pt-2">Stage 1: Truth Teaching</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a href="https://maps.google.com/?q=SCOAN+Accra+Ghana" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-text/10 text-rc-text font-medium rounded-lg hover:-translate-y-0.5 hover:bg-rc-text/15 hover:shadow-lg active:translate-y-0 transition-all duration-300">
                Get Directions
              </a>
              <button onClick={() => setIsAttendanceModalOpen(true)} className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-rc-text font-medium border-2 border-rc-text/40 rounded-lg hover:-translate-y-0.5 hover:border-rc-text/60 hover:shadow-lg active:translate-y-0 transition-all duration-300">
                I'm Attending
              </button>
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

      {/* Attendance Modal */}
      <AnimatePresence>
        {isAttendanceModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full"
            >
              {/* Form Step */}
              {attendanceStep === 'form' && (
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl font-rc-serif font-bold text-rc-text mb-6">
                    I'm Ready
                  </h2>
                  <p className="text-rc-text/70 text-sm mb-6">
                    Join us August 15 at 3pm SCOAN Accra for Truth Teaching.
                  </p>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmittingAttendance(true);
                      try {
                        const res = await fetch('/api/attendance-register', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(attendanceData),
                        });
                        if (res.ok) {
                          setAttendanceStep('complete');
                        } else {
                          console.error('Submission failed');
                        }
                      } catch (error) {
                        console.error('Error:', error);
                      } finally {
                        setIsSubmittingAttendance(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={attendanceData.name}
                        onChange={(e) => setAttendanceData({ ...attendanceData, name: e.target.value })}
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
                        value={attendanceData.email}
                        onChange={(e) => setAttendanceData({ ...attendanceData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={attendanceData.phone}
                        onChange={(e) => setAttendanceData({ ...attendanceData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="+233..."
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAttendanceModalOpen(false);
                          setAttendanceData({ name: '', email: '', phone: '' });
                        }}
                        className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingAttendance}
                        className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300 disabled:opacity-50"
                      >
                        {isSubmittingAttendance ? 'Registering...' : 'I\'m Attending'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Success Step */}
              {attendanceStep === 'complete' && (
                <div className="p-8 md:p-12 text-center space-y-4">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-2xl font-rc-serif font-bold text-rc-text">
                    You're In
                  </h3>
                  <p className="text-rc-text/70">
                    August 15, 3:00 PM · SCOAN Accra, Ghana
                  </p>
                  <button
                    onClick={() => {
                      setIsAttendanceModalOpen(false);
                      setAttendanceStep('form');
                      setAttendanceData({ name: '', email: '', phone: '' });
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
      <footer className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="/"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/partnership"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Partnership
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/testimonies"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Success Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>

          {/* Copyright Only */}
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
