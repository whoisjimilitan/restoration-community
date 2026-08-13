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
        <div className="max-w-2xl mx-auto w-full flex flex-col justify-center">
          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
            <blockquote className="space-y-8">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-relaxed font-rc-serif font-light italic">
                "That no man go beyond and defraud his brother in any matter: because that the Lord is the avenger of all such, as we also have forewarned you and testified."
              </p>
              <p className="text-base md:text-lg text-white/80 font-light">
                — 1 Thessalonians 4:6
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* WHAT FRAUD DOES */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Face of Fraud</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>Fraud is intentional deception.</p>
            <p>It promises quick gain.</p>
            <p>But it brings long lasting loss.</p>

            <div className="pt-4 space-y-4">
              <p>It destroys people.</p>
              <p>It steals destinies.</p>
              <p>It kills nations.</p>
              <p>It teaches others.</p>
              <p>It multiplies itself.</p>
            </div>

            <div className="pt-4 space-y-4">
              <p>The Lord sees.</p>
              <p>The Lord judges.</p>
              <p>The Lord is the avenger.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* HOW FRAUD BINDS YOU */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Spirit Behind It</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>When you believe a lie</p>
            <p>for the promise of gain,</p>
            <p>you agree with deception.</p>
            <p>And its spirit enters you.</p>
            <p className="pt-4">Two entities but one body.</p>
            <p>You war against yourself.</p>
            <p className="pt-4">One wants you to inherit His wrath.</p>
            <p>The other may not.</p>
            <p className="pt-4">Only One Man can separate you.</p>
          </div>
        </motion.div>
      </section>

      {/* MY ENCOUNTER */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">My Story</h2>

          <div className="space-y-6 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>I too was once controlled by that spirit.</p>
            <p>I told myself I was collecting what was stolen.</p>
            <p>I convinced myself I had no choice.</p>
            <p className="pt-4">I had it all.</p>
            <p>But there was no peace.</p>
            <p className="pt-4">The partridge was me.</p>
            <p>Hatching eggs I did not lay.</p>
            <p>Labor without gain.</p>
            <p>Gain without substance.</p>
            <p className="pt-4">Empty. Trapped. Foolish.</p>
          </div>
        </motion.div>
      </section>

      {/* MY FREEDOM */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">My Freedom</h2>

          <div className="space-y-6 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>It came in Jesus's name.</p>
            <p>In 2015, through His servant Prophet TB Joshua.</p>
            <p>One utterance: "All that is over."</p>
            <p className="pt-4">The urge for wastage left me.</p>
            <p>That desire for fantasy gone.</p>
            <p>My confusion disappeared.</p>
            <p>The curses undone.</p>
            <p className="pt-4">I was bound in spiritual chains.</p>
            <p>Jesus shattered them.</p>
          </div>
        </motion.div>
      </section>

      {/* SAMUEL JOHNSON'S ENCOUNTER */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">Samuel's Freedom</h2>

          <div className="space-y-6 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>He had it all.</p>
            <p>But there was no peace.</p>
            <p className="pt-4">A spirit lived inside him.</p>
            <p>Two entities in one body.</p>
            <p>Fear. Isolation.</p>
            <p className="pt-6">Then came Jesus Christ.</p>
            <p>One touch from His servant.</p>
            <p>The spirit left him.</p>
            <p>His identity restored.</p>
            <p className="pt-4">Everything changed.</p>
          </div>
        </motion.div>
      </section>

      {/* YOUR TURN */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-14"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">Your Freedom</h2>

          <div className="space-y-6 text-lg md:text-xl text-white/95 leading-relaxed font-light">
            <p>I was delivered.</p>
            <p>Samuel was delivered.</p>
            <p className="pt-4">Now it's your turn.</p>
            <p className="pt-4">You have seen what the spirit does.</p>
            <p>You have seen Jesus break it.</p>
            <p className="pt-4">Will you turn to Him?</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <a
              href="/stories"
              className="inline-flex items-center justify-center px-8 py-4 min-h-[52px] bg-white text-rc-text font-medium rounded-lg hover:bg-white/95 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-300 ease-out"
            >
              See the Full Story
            </a>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setDeliverance({ step: 1, need: '', duration: '', name: '', email: '', phone: '', submitted: false });
              }}
              className="inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-white font-medium border-2 border-white/70 rounded-lg hover:border-white hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-300 ease-out"
            >
              Prepare for Deliverance
            </button>
          </div>
        </motion.div>
      </section>

      {/* Deliverance Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-rc-bg rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Step 1: Need + Duration */}
              {deliverance.step === 1 && (
                <div className="p-8 md:p-12 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                      Submit your prayer request.
                    </h2>
                    <p className="text-rc-text/70 text-sm">Briefly tell us what you want Jesus to do for you</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (deliverance.need.trim() && deliverance.duration.trim()) {
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
                        placeholder="What is destroying you?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        value={deliverance.duration}
                        onChange={(e) => setDeliverance({ ...deliverance, duration: e.target.value })}
                        className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                        placeholder="Tell us how long the problem has been"
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

              {/* Step 2: Contact */}
              {deliverance.step === 2 && (
                <div className="p-8 md:p-12 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                      How we reach you
                    </h2>
                    <p className="text-rc-text/70 text-sm">Step 2 of 2</p>
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
                            setDeliverance({ ...deliverance, submitted: true, step: 3 });
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
                        onClick={() => setDeliverance({ ...deliverance, step: 1 })}
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

              {/* Step 3: Success */}
              {deliverance.step === 3 && deliverance.submitted && (
                <div className="p-8 md:p-12 text-center space-y-4">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-2xl font-rc-serif font-bold text-rc-text">
                    Your request is received
                  </h3>
                  <p className="text-rc-text/70">
                    We will pray, and point you to Jesus Christ, the Deliverer. Expect contact via WhatsApp.
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full"
            >
              {/* Form Step */}
              {attendanceStep === 'form' && (
                <div className="p-8 md:p-12">
                  <h2 className="text-xl font-rc-serif font-bold text-rc-text mb-6">
                    Live Teaching and Meeting With Brother Jimi
                  </h2>
                  <p className="text-rc-text/70 text-sm mb-6">
                    Friday, August 15 at 7:00 PM · Patmos Retreat Centre, Larteh Junction, Akpropong
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
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
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
              Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/gathering"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Gathering
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/journey"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Journey
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
