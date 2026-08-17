'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';

/** Shared reveal choreography: section container staggers its children in,
 *  each line rises and settles on the same eased curve used site-wide. */
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const GATHERING_TZ = 'UTC';

/** Next Friday, 3 PM GMT. Deterministic given "now", so safe to compute in a
 *  useState initializer with no layout shift or hydration mismatch. */
function getNextGathering(): Date {
  const now = new Date();
  const zonedNow = new Date(now.toLocaleString('en-US', { timeZone: GATHERING_TZ }));
  const day = zonedNow.getDay();
  const daysUntilFriday = (5 - day + 7) % 7;

  const zonedCandidate = new Date(zonedNow);
  zonedCandidate.setDate(zonedNow.getDate() + daysUntilFriday);
  zonedCandidate.setHours(15, 0, 0, 0);

  if (daysUntilFriday === 0 && zonedNow >= zonedCandidate) {
    zonedCandidate.setDate(zonedCandidate.getDate() + 7);
  }

  const offsetMinutes = (zonedNow.getTime() - now.getTime()) / 60000;
  return new Date(zonedCandidate.getTime() - offsetMinutes * 60000);
}

function formatGatheringDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: GATHERING_TZ });
}

/** Premium, subtle, on-dark button — same approved color/shape as the rest of the site,
 *  weightier motion (slower ease, gentle lift, soft glow) reserved for this closing section. */
function ReturnButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border-2 border-white rounded-lg
        transition-all duration-300 ease-out
        hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </button>
  );
}

/** Isolated so only this tiny piece defers to client-side rendering —
 *  the rest of the page must stay statically rendered for SEO and first paint. */
function AttendParamWatcher({ onAttend }: { onAttend: () => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('attend') === '1') {
      onAttend();
    }
  }, [searchParams, onAttend]);
  return null;
}

export default function Home() {
  const [nextGathering] = useState(getNextGathering);
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

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.15]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text relative">
      <Suspense fallback={null}>
        <AttendParamWatcher onAttend={() => setIsAttendanceModalOpen(true)} />
      </Suspense>

      {/* HERO - Premium Minimal Binary + Scripture */}
      <section ref={heroRef} className="w-full min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-2xl mx-auto w-full flex flex-col justify-center space-y-0">
          {/* The Binary - Conversational Contrast */}
          <div className={`transform transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-base md:text-lg text-white/70 font-rc-serif font-normal leading-relaxed">
              You think it's a blessing.
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-rc-serif font-bold text-white leading-tight tracking-tight mt-2">
              It is a curse.
            </h1>
          </div>

          {/* Scripture Validation - Unified with Binary */}
          <div className={`transform transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ marginTop: '3rem' }}>
            <blockquote className="border-l-4 border-white/30 pl-6 md:pl-8">
              <p className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
                Like a partridge that hatches eggs it did not lay are those who gain riches by fraud. At midlife they will prove to be fools, and in the end they will face the consequences of their folly.
              </p>
              <p className="text-sm md:text-base text-white/70 font-rc-serif font-light mt-4">
                — Jeremiah 17:11
              </p>
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* MY STORY */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.h2 variants={fadeInLine} className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">My Story</motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <motion.p variants={fadeInLine}>I would have ended up a fool.</motion.p>
            <motion.p variants={fadeInLine}>That was once supposed to be my story.</motion.p>
            <motion.p variants={fadeInLine} className="pt-4">I told myself I was taking back mine.</motion.p>
            <motion.p variants={fadeInLine}>I convinced myself I had no choice.</motion.p>
            <motion.p variants={fadeInLine} className="pt-4">Even though I had it all.</motion.p>
            <motion.p variants={fadeInLine}>But there was no peace.</motion.p>
            <motion.p variants={fadeInLine} className="pt-4">I was the partridge God spoke of.</motion.p>
            <motion.p variants={fadeInLine}>Hatching eggs I did not lay.</motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* MY ENCOUNTER */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.h2 variants={fadeInLine} className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">My Encounter</motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <motion.p variants={fadeInLine}>In 2015.</motion.p>
            <motion.p variants={fadeInLine}>God used Prophet TB Joshua.</motion.p>
            <motion.p variants={fadeInLine}>To pray for me in Jesus name.</motion.p>
            <motion.p variants={fadeInLine} className="pt-4">One utterance: &ldquo;All that is over.&rdquo;</motion.p>

            <motion.div variants={staggerContainer} className="pt-4 space-y-4">
              <motion.p variants={fadeInLine}>The urge for waste left me.</motion.p>
              <motion.p variants={fadeInLine}>That desire for fantasy gone.</motion.p>
              <motion.p variants={fadeInLine}>My confusion dispelled.</motion.p>
              <motion.p variants={fadeInLine}>My curses undone.</motion.p>
            </motion.div>

            <motion.p variants={fadeInLine} className="pt-4">The partridge became free.</motion.p>
            <motion.p variants={fadeInLine}>Now it lays its own eggs.</motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* THE ONLY WAY */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.h2 variants={fadeInLine} className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Only Way</motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <motion.p variants={fadeInLine}>Only One Man delivers.</motion.p>
            <motion.p variants={fadeInLine}>His name is Jesus Christ.</motion.p>

            <motion.p variants={fadeInLine} className="pt-4">By acting faith in Him,</motion.p>
            <motion.p variants={fadeInLine}>you fetch in His grace.</motion.p>

            <motion.p variants={fadeInLine} className="pt-4">Believe what you read here.</motion.p>
            <motion.p variants={fadeInLine}>Confess your sins.</motion.p>
            <motion.p variants={fadeInLine}>Repent genuinely.</motion.p>

            <motion.p variants={fadeInLine} className="pt-4">You will be delivered.</motion.p>
            <motion.p variants={fadeInLine}>You will be saved.</motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* THE SAME PRAYER — Return Section, bookends the hero */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.h2 variants={fadeInLine} className="text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">Same Prayer</motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
            <motion.p variants={fadeInLine}>Just as I was set free by prayer,</motion.p>
            <motion.p variants={fadeInLine}>Jesus Christ is saying to you:</motion.p>

            <motion.p variants={fadeInLine} className="pt-4">Ask, and it will be given.</motion.p>
            <motion.p variants={fadeInLine}>Seek, and you will find.</motion.p>
            <motion.p variants={fadeInLine}>Knock, and the door will be opened.</motion.p>

            <motion.p variants={fadeInLine} className="pt-4 font-medium">If you are tired of deception,</motion.p>
          </motion.div>

          <motion.div variants={fadeInLine} className="flex flex-col sm:flex-row gap-4">
            <ReturnButton onClick={() => setIsModalOpen(true)}>Request Prayer</ReturnButton>
            <ReturnButton onClick={() => setIsAttendanceModalOpen(true)}>Attend Gathering</ReturnButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <a href="/" className="text-white/80 hover:text-white transition-colors group text-sm">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/deliverances" className="text-white/80 hover:text-white transition-colors group text-sm">
              Deliverances
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/journey" className="text-white/80 hover:text-white transition-colors group text-sm">
              Sign In
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>

      {/* PRAYER REQUEST MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-2xl font-rc-serif font-bold text-rc-text mb-6">Prayer Request</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={deliverance.name}
                  onChange={(e) => setDeliverance({ ...deliverance, name: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={deliverance.email}
                  onChange={(e) => setDeliverance({ ...deliverance, email: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={deliverance.phone}
                  onChange={(e) => setDeliverance({ ...deliverance, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg"
                />
                <textarea
                  placeholder="What would you like prayer for?"
                  value={deliverance.need}
                  onChange={(e) => setDeliverance({ ...deliverance, need: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg h-24"
                />

                <button
                  onClick={async () => {
                    if (!deliverance.name || !deliverance.email || !deliverance.need) {
                      alert('Please fill in all required fields');
                      return;
                    }
                    setIsSubmittingDeliverance(true);
                    try {
                      const res = await fetch('/api/prayer-request', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: deliverance.name,
                          email: deliverance.email,
                          phone: deliverance.phone,
                          need: deliverance.need,
                        }),
                      });
                      if (res.ok) {
                        setDeliverance({
                          step: 'video',
                          need: '',
                          duration: '',
                          name: '',
                          email: '',
                          phone: '',
                          submitted: true,
                        });
                        alert('Thank you. Your prayer request has been received.');
                        setIsModalOpen(false);
                      }
                    } catch (e) {
                      console.error(e);
                      alert('Error submitting request. Please try again.');
                    } finally {
                      setIsSubmittingDeliverance(false);
                    }
                  }}
                  disabled={isSubmittingDeliverance}
                  className="w-full px-4 py-2 bg-rc-accent text-white rounded-lg font-bold transition-all duration-300 ease-out hover:bg-rc-accent/90 hover:scale-[1.01] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmittingDeliverance ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ATTENDANCE MODAL */}
      <AnimatePresence>
        {isAttendanceModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAttendanceModalOpen(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-2xl font-rc-serif font-bold text-rc-text mb-6">{formatGatheringDate(nextGathering)} at 3 PM GMT</h3>

              {attendanceStep === 'form' ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={attendanceData.name}
                    onChange={(e) => setAttendanceData({ ...attendanceData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-rc-border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={attendanceData.email}
                    onChange={(e) => setAttendanceData({ ...attendanceData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-rc-border rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={attendanceData.phone}
                    onChange={(e) => setAttendanceData({ ...attendanceData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-rc-border rounded-lg"
                  />

                  <button
                    onClick={async () => {
                      if (!attendanceData.name || !attendanceData.email) {
                        alert('Please fill in required fields');
                        return;
                      }
                      setIsSubmittingAttendance(true);
                      try {
                        const res = await fetch('/api/attendance', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(attendanceData),
                        });
                        if (res.ok) {
                          setAttendanceStep('complete');
                        }
                      } catch (e) {
                        console.error(e);
                        alert('Error submitting. Please try again.');
                      } finally {
                        setIsSubmittingAttendance(false);
                      }
                    }}
                    disabled={isSubmittingAttendance}
                    className="w-full px-4 py-2 bg-rc-accent text-white rounded-lg font-bold transition-all duration-300 ease-out hover:bg-rc-accent/90 hover:scale-[1.01] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmittingAttendance ? 'Registering...' : 'Register'}
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-lg text-rc-text font-rc-serif">You're registered!</p>
                  <p className="text-rc-text/80">We'll send you the call link via email. See you Friday at 3 PM GMT.</p>
                  <a
                    href="https://maps.google.com/?q=Mango+Farm+Abokobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-rc-accent font-medium hover:underline"
                  >
                    Get directions →
                  </a>
                  <button
                    onClick={() => {
                      setIsAttendanceModalOpen(false);
                      setAttendanceStep('form');
                    }}
                    className="w-full px-4 py-2 bg-rc-accent text-white rounded-lg font-bold transition-all duration-300 ease-out hover:bg-rc-accent/90 hover:scale-[1.01] hover:shadow-lg"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
