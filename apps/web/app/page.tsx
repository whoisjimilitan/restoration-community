'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import SiteButton from '@/components/SiteButton';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const GATHERING_TZ = 'UTC';

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
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState<'form' | 'complete'>('form');
  const [attendanceData, setAttendanceData] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
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

      {/* HERO — full-bleed muted looping video background, with the teal/charcoal
          gradient layered on top (not replaced) so the brand color still governs
          the frame and the centered text stays legible everywhere, not just one side. */}
      <section ref={heroRef} id="hero" data-nav-mode="light" className="relative w-full min-h-[85svh] flex flex-col justify-center overflow-hidden bg-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          onCanPlay={(e) => {
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(() => {
                // Some browsers still block autoplay outright (e.g. low-power
                // mode). The poster frame is styled to match the video's own
                // first frame, so this fallback state looks intentional, not broken.
              });
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-optimized.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-rc-accent/85 to-rc-text/90" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-2xl mx-auto w-full flex flex-col justify-center space-y-8 text-center">
          <div className={`transform transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Fraud is not just a crime. It is a spirit.
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light leading-relaxed mt-6">
              I know because it lived inside me for 20 years.
            </p>
          </div>

          <div className={`flex items-center justify-center gap-6 transform transition-all duration-500 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <SiteButton href="/my-story" variant="solid">
              Preview My Story
            </SiteButton>
            <a
              href="/book"
              className="inline-block text-white/70 hover:text-white text-base font-medium transition-colors duration-200"
            >
              Preview My Book
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOUNDER'S WITNESS — proof the journey is real, before anything else is asked of the visitor */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-text leading-relaxed font-light">
            Its name was Weje. A Yoruba word for the wasteful one. It controlled my life for twenty years.
          </motion.p>

          <motion.p variants={fadeInLine} className="text-xl md:text-2xl font-rc-serif tracking-tight leading-snug mt-14">
            <span className="font-bold text-rc-text">But in 2015, Jesus Christ delivered me completely,</span>
            <span className="font-light text-rc-text/70"> through Prophet T.B. Joshua&apos;s ministry.</span>
          </motion.p>

          <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-text/70 font-light leading-relaxed mt-14">
            I tell this story so someone else does not have to wander hopelessly, searching rather than believing.
          </motion.p>
        </motion.div>
      </section>

      {/* THE DARK BAND — the page's one deliberate dramatic peak: the real man
          alongside the highest-stakes line on the page, at the same weight. */}
      <section data-nav-mode="light" className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <motion.img
            variants={fadeInLine}
            src="/images/portrait-declaration-closeup.png"
            alt="Brother Jimi"
            className="mx-auto w-full max-w-[300px] md:max-w-[380px] aspect-square object-cover rounded-[2rem]"
          />
          <div className="text-left">
            <motion.p variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold tracking-tight text-white leading-snug">
              This would have been my end.
            </motion.p>
            <motion.p variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold tracking-tight text-white leading-snug mb-6">
              A fool&apos;s end.
            </motion.p>
            <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/70 font-light leading-relaxed mb-2">
              &ldquo;Like a partridge that hatches eggs it did not lay, are those who gain riches by unjust means.
              When their lives are half gone, their riches will desert them, and in the end they will prove to be fools.&rdquo;
            </motion.p>
            <motion.p variants={fadeInLine} className="text-base md:text-lg font-medium text-white/90">
              Jeremiah 17:11
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* CLOSING ACTION — the page's one goal, kept in the same dark passage
          as the testimony above it, not a hard cut back to a bright section.
          Mission statement leads: scripture said what God says about fraud,
          this says what he's doing about it, then the two cards say where
          to go next. Glass cards float on the dark surface, not opaque white. */}
      <section data-nav-mode="light" className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.p variants={fadeInLine} className="text-xl md:text-2xl font-rc-serif tracking-tight leading-snug">
            <span className="font-bold text-white">I am calling every youth away from fraud</span>
            <span className="font-light text-white/70"> into the salvation only Jesus Christ gives.</span>
          </motion.p>
          <motion.div variants={fadeInLine} className="w-12 h-px bg-white/15 mt-14 mb-14" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <motion.a
            variants={fadeInLine}
            href="/my-story"
            className="block bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 hover:border-white/40 transition-all duration-200 group"
          >
            <span className="text-base font-medium text-white">
              Preview the series →
            </span>
          </motion.a>
          <motion.a
            variants={fadeInLine}
            href="/book"
            className="block bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-white/15 hover:border-white/40 transition-all duration-200 group"
          >
            <span className="text-base font-medium text-white">
              Preview the book →
            </span>
          </motion.a>
        </motion.div>
      </section>

      <SiteFooter precededByDarkSection />

      {/* ATTENDANCE MODAL */}
      <AnimatePresence>
        {isAttendanceModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAttendanceModalOpen(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
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
                    className="w-full px-4 py-3 min-h-[48px] border border-rc-border rounded-lg font-light focus:outline-none focus:border-rc-accent transition-colors duration-200"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={attendanceData.email}
                    onChange={(e) => setAttendanceData({ ...attendanceData, email: e.target.value })}
                    className="w-full px-4 py-3 min-h-[48px] border border-rc-border rounded-lg font-light focus:outline-none focus:border-rc-accent transition-colors duration-200"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={attendanceData.phone}
                    onChange={(e) => setAttendanceData({ ...attendanceData, phone: e.target.value })}
                    className="w-full px-4 py-3 min-h-[48px] border border-rc-border rounded-lg font-light focus:outline-none focus:border-rc-accent transition-colors duration-200"
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
                    className="w-full px-4 py-3 min-h-[48px] bg-rc-accent text-white rounded-lg font-medium transition-all duration-200 hover:bg-rc-accent/90 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
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
                    className="w-full px-4 py-3 min-h-[48px] bg-rc-accent text-white rounded-lg font-medium transition-all duration-200 hover:bg-rc-accent/90 hover:shadow-lg"
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
