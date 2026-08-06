'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GatheringPage() {
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState<'form' | 'complete'>('form');
  const [attendanceData, setAttendanceData] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO SECTION */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-3xl mx-auto w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Our Gathering</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight"
          >
            Experience The Roadmap as Teaching
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/80 leading-relaxed font-light"
          >
            Attend live instruction. Walk with others who understand. Experience real community.
          </motion.p>
        </div>
      </section>

      {/* WHAT YOU'LL EXPERIENCE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            What You'll Experience
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">Teaching</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Brother Jimi teaches live from The Roadmap. Real instruction. Real truth. Real transformation.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">Prayer</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Corporate prayer. Encounter with the Holy Spirit. This is where deliverance happens.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">Community</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Walk with people who are on the same journey. Real support. Real understanding. Real family.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-rc-serif font-bold text-rc-text">Testimony</h3>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Hear from people who've been delivered. See what Jesus does. Know it's possible for you.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHEN & WHERE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              When & Where
            </h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-medium text-rc-text uppercase tracking-wide">Date & Time</p>
              <p className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">
                Friday, August 15
              </p>
              <p className="text-lg md:text-xl text-rc-text/70 font-light">
                7:00 PM
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-rc-text uppercase tracking-wide">Location</p>
              <p className="text-lg md:text-xl text-rc-text font-medium">
                Mango Farm, Abokobi
              </p>
              <p className="text-base text-rc-text/70 font-light">
                SCOAN Accra, Ghana
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <a
                href="https://maps.google.com/?q=Mango+Farm+Abokobi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-bg text-rc-text font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group"
              >
                Get Directions
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <button
                onClick={() => {
                  setAttendanceStep('form');
                  setIsAttendanceModalOpen(true);
                }}
                className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
              >
                I'm Attending
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHO'S THERE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            Who's There
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-lg font-rc-serif font-bold text-rc-text">People in Restoration</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Walking the 7-stage journey. Real stories. Real transformation. Real hope.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg font-rc-serif font-bold text-rc-text">People Seeking Deliverance</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Ready to encounter Jesus. Honest about their bondage. Open to freedom.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg font-rc-serif font-bold text-rc-text">People Who've Been Delivered</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Mentors. Teachers. Walking proof that Jesus delivers. Living witnesses.
              </p>
            </div>

            <div className="pt-8 border-t border-rc-border/30">
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light italic">
                This isn't a church service. This is family.
              </p>
            </div>
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
            <a href="/stories" className="text-white/80 hover:text-white transition-colors group text-sm">
              Stories of Deliverance
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/partnership" className="text-white/80 hover:text-white transition-colors group text-sm">
              Partnership
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>

      {/* ATTENDANCE MODAL */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full"
          >
            {attendanceStep === 'form' && (
              <div className="p-8 md:p-12">
                <h2 className="text-xl font-rc-serif font-bold text-rc-text mb-6">
                  Register to Attend
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

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAttendanceModalOpen(false)}
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

            {attendanceStep === 'complete' && (
              <div className="p-8 md:p-12 text-center space-y-4">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-rc-serif font-bold text-rc-text">
                  You're In
                </h3>
                <p className="text-rc-text/70">
                  August 15, 7:00 PM · Mango Farm, Abokobi
                </p>
                <button
                  onClick={() => setIsAttendanceModalOpen(false)}
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
    </div>
  );
}
