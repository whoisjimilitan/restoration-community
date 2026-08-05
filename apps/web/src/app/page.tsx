'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliverance, setDeliverance] = useState({
    step: 'video' as string | number,
    need: '',
    duration: '',
    name: '',
    email: '',
    phone: '',
    submitted: false,
  });
  const [isSubmittingDeliverance, setIsSubmittingDeliverance] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState<'form' | 'complete'>('form');
  const [attendanceData, setAttendanceData] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleOpenAttendance = () => setIsAttendanceModalOpen(true);
    document.addEventListener('open-attendance-modal', handleOpenAttendance);
    return () => document.removeEventListener('open-attendance-modal', handleOpenAttendance);
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
              <p>Fraud promised you freedom.</p>
              <p>But gave you a version without peace.</p>
              <p className="pt-2">Fraud is a spiritual trap.</p>
              <p>Only One Man can set you free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MY STORY */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">My Story</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>I too was once controlled by that spirit.</p>
            <p>I justified my actions.</p>
            <p>I blamed my country's economy.</p>
            <p>I convinced myself I had no choice.</p>
            <p className="pt-2">Until my encounter with that One Man.</p>
            <p className="pt-4 text-rc-text font-medium">He delivered me from that spirit.</p>
            <p className="pt-4">My God. My Deliverer.</p>
            <p className="text-rc-text font-medium">Jesus Christ.</p>
          </div>
        </motion.div>
      </section>

      {/* MY ENCOUNTER */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">My Encounter</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>In 2015.</p>
            <p>Jesus used Prophet TB Joshua.</p>
            <p>To pray for me in His name.</p>
            <p className="pt-2 text-rc-text font-medium">Just one utterance: "All that is over."</p>
            <p className="pt-4">The spirit of waste expelled.</p>
            <p>The spirit of fantasy gone.</p>
            <p>Delusion shattered.</p>
            <p>My curses undone.</p>
          </div>
        </motion.div>
      </section>

      {/* THE DIVINE CALL */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-16"
        >
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">Jesus is calling you.</h2>

            <div className="space-y-3 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>My brother. My sister.</p>
              <p>I urge you to listen intently.</p>
              <p className="pt-2">Act upon it by faith.</p>
              <p className="pt-4">What the Lord did for me,</p>
              <p className="text-white font-medium">He will do for you.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setDeliverance({ step: 1, need: '', duration: '', name: '', email: '', phone: '', submitted: false });
              }}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:bg-white/95 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Request Deliverance
            </button>
            <a
              href="/stories"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border border-white/60 rounded-lg hover:border-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
            >
              Brother Samuel's Deliverance
            </a>
          </div>
        </motion.div>
      </section>


      {/* Deliverance Request Modal */}
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
              {/* Step 1: Need */}
              {deliverance.step === 1 && (
                <div className="p-8 md:p-12 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                      What do you need deliverance from?
                    </h2>
                    <p className="text-rc-text/70 text-sm">Step 1 of 3</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (deliverance.need.trim()) {
                        setDeliverance({ ...deliverance, step: 2 });
                      }
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <textarea
                        required
                        value={deliverance.need}
                        onChange={(e) => setDeliverance({ ...deliverance, need: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text resize-none"
                        placeholder="Be honest about what's binding you."
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setDeliverance({ step: 1, need: '', duration: '', name: '', email: '', phone: '', submitted: false });
                        }}
                        className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Duration */}
              {deliverance.step === 2 && (
                <div className="p-8 md:p-12 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                      Book Deliverance
                    </h2>
                    <p className="text-rc-text/70 text-sm">Step 2 of 3</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (deliverance.duration.trim()) {
                        setDeliverance({ ...deliverance, step: 3 });
                      }
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        How long has this been?
                      </label>
                      <input
                        type="text"
                        required
                        value={deliverance.duration}
                        onChange={(e) => setDeliverance({ ...deliverance, duration: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="e.g., 2 years, since 2022"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setDeliverance({ ...deliverance, step: 1 })}
                        className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Contact */}
              {deliverance.step === 3 && (
                <div className="p-8 md:p-12 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                      How we reach you
                    </h2>
                    <p className="text-rc-text/70 text-sm">Step 3 of 3</p>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (deliverance.name && deliverance.email && deliverance.phone) {
                        setIsSubmittingDeliverance(true);
                        try {
                          const res = await fetch('/api/deliverance-request', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              need: deliverance.need,
                              duration: deliverance.duration,
                              name: deliverance.name,
                              email: deliverance.email,
                              phone: deliverance.phone,
                            }),
                          });
                          if (res.ok) {
                            setDeliverance({ ...deliverance, submitted: true, step: 4 });
                          }
                        } catch (error) {
                          console.error('Error:', error);
                        } finally {
                          setIsSubmittingDeliverance(false);
                        }
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={deliverance.name}
                        onChange={(e) => setDeliverance({ ...deliverance, name: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={deliverance.email}
                        onChange={(e) => setDeliverance({ ...deliverance, email: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-rc-text/70">
                        Phone Number (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        required
                        value={deliverance.phone}
                        onChange={(e) => setDeliverance({ ...deliverance, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="+233..."
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setDeliverance({ ...deliverance, step: 2 })}
                        className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingDeliverance}
                        className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300 disabled:opacity-50"
                      >
                        {isSubmittingDeliverance ? 'Sending...' : 'Send Request'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 4: Success */}
              {deliverance.step === 4 && deliverance.submitted && (
                <div className="p-8 md:p-12 text-center space-y-4">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-2xl font-rc-serif font-bold text-rc-text">
                    Your request is received
                  </h3>
                  <p className="text-rc-text/70">
                    We will pray for you. Expect contact via WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setDeliverance({ step: 1, need: '', duration: '', name: '', email: '', phone: '', submitted: false });
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
                  <h2 className="text-xl font-rc-serif font-bold text-rc-text mb-6">
                    Live Teaching and Meeting With Brother Jimi
                  </h2>
                  <p className="text-rc-text/70 text-sm mb-6">
                    Friday, August 15 at 7:00 PM · Mango Farm, Abokobi
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
                        className="flex-1 px-6 py-3 bg-white text-rc-text font-medium border-2 border-rc-text/25 rounded-lg hover:-translate-y-0.5 hover:border-rc-text/40 hover:shadow-lg active:translate-y-0 transition-all duration-300 disabled:opacity-50"
                        style={{ boxShadow: '0 0 12px rgba(26, 26, 24, 0.15)' }}
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
                    className="mt-6 px-6 py-3 bg-white text-rc-text font-medium border-2 border-rc-text/30 rounded-lg hover:-translate-y-0.5 hover:border-rc-text/50 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                    style={{ boxShadow: '0 0 12px rgba(26, 26, 24, 0.15)' }}
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
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/stories"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Deliverance Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/partnership"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Partnership
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/auth/signin"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Your Journey
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
