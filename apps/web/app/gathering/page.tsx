'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GatheringPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState<'form' | 'complete'>('form');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Our Gathering</p>
          </div>

          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '80ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Your restoration continues here.
            </h1>
          </div>

          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '160ms' }}>
            <div className="space-y-3 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>In prayer. In community. With those who have been saved.</p>
              <p className="pt-2">Not alone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHEN & WHERE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-16"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              When & Where
            </h2>
            <p className="text-base text-rc-text/70 font-light">
              Friday, August 15, 2025 · 7:00 PM
              <br />
              Mango Farm, Abokobi
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Mango+Farm+Abokobi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
          >
            Get Directions
          </a>
        </motion.div>
      </section>

      {/* WHY TOGETHER */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            Why You Need to Be Here
          </h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
            <p>Jesus didn't heal people from a distance. He showed up. He was present.</p>
            <p>Deliverance is real when you're with others. In prayer. In witness. When you know you're not alone.</p>
            <p>This gathering is where you meet Jesus and your community. It's where everything begins.</p>
          </div>
        </motion.div>
      </section>

      {/* WHAT YOU'LL EXPERIENCE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            What Happens Here
          </h2>

          <div className="space-y-8">
            <div className="space-y-3 border-l-4 border-rc-accent pl-8">
              <p className="text-sm font-medium text-rc-text uppercase tracking-wide">Teaching</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                Brother Jimi walks you through your 7-stage journey. Why each stage matters. What you'll face. How Jesus leads you forward.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-rc-accent pl-8">
              <p className="text-sm font-medium text-rc-text uppercase tracking-wide">Prayer</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                We pray together. The Holy Spirit meets you where you are. God begins to show you things about yourself and your situation.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-rc-accent pl-8">
              <p className="text-sm font-medium text-rc-text uppercase tracking-wide">Community</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                You're not alone. You meet others on this same journey. You find your mentor. You begin.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-rc-accent pl-8">
              <p className="text-sm font-medium text-rc-text uppercase tracking-wide">Counsel</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                One-on-one conversations where someone listens. Where God speaks through the wisdom of those who've been delivered.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-rc-border/30 space-y-4">
            <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
              When the gathering ends, your private journey starts. For six weeks you work through the seven stages with your mentor. You pray. You confess. You experience Jesus in a way you never have before.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            Ready to come?
          </h2>

          <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
            Jesus Christ is waiting for you.
          </p>

          <button
            onClick={() => {
              setAttendanceStep('form');
              setIsAttendanceModalOpen(true);
            }}
            className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
          >
            I'm Attending
          </button>
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
            <a href="/journey" className="text-white/80 hover:text-white transition-colors group text-sm">
              Journey
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full"
          >
            {attendanceStep === 'form' && (
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-rc-serif font-bold text-rc-text mb-2">
                  Attending the Gathering
                </h2>
                <p className="text-rc-text/70 text-sm mb-8">
                  Friday, August 15 · 7:00 PM
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
                    <label className="block text-sm font-medium text-rc-text/70">Full Name</label>
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
                    <label className="block text-sm font-medium text-rc-text/70">Email Address</label>
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
                    <label className="block text-sm font-medium text-rc-text/70">Phone Number</label>
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
                      className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200 disabled:opacity-50"
                    >
                      {isSubmittingAttendance ? 'Registering...' : "I'm Attending"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {attendanceStep === 'complete' && (
              <div className="p-8 md:p-12 text-center space-y-4">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-rc-serif font-bold text-rc-text">You're in</h3>
                <p className="text-rc-text/70">August 15, 7:00 PM · Mango Farm, Abokobi</p>
                <button
                  onClick={() => {
                    setIsAttendanceModalOpen(false);
                    setAttendanceStep('form');
                    setAttendanceData({ name: '', email: '', phone: '' });
                  }}
                  className="mt-6 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
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
