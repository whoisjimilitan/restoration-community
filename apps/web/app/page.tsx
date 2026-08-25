'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import DeliveranceForm from '@/components/DeliveranceForm';

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
      <section ref={heroRef} className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
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
            <p className="text-base md:text-lg text-white/80 font-rc-serif font-normal leading-relaxed mt-6">
              I know because it lived inside me for over 20 years.
            </p>
          </div>

          <div className={`transform transition-all duration-500 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="/my-story"
              className="inline-block text-white/70 hover:text-white text-base font-medium transition-colors duration-200"
            >
              Watch My Story
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOUNDER'S WITNESS — proof the journey is real, before anything else is asked of the visitor */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-xl mx-auto space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light"
        >
          <motion.p variants={fadeInLine}>
            His name was Weje. Yoruba for the prodigal spirit, the wasteful one. He controlled my life for over twenty years.
          </motion.p>
          <motion.p variants={fadeInLine}>
            In 2015, Jesus Christ delivered me completely, through Prophet T.B. Joshua&apos;s ministry.
          </motion.p>
          <motion.p variants={fadeInLine} className="font-medium text-rc-text">
            Now I tell this story so someone else does not have to walk it for twenty years before finding the way out.
          </motion.p>
        </motion.div>
      </section>

      {/* THE SCRIPTURE MOMENT — one anchor verse, given room to breathe */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text leading-relaxed mb-6">
            &ldquo;Like a partridge that hatches eggs it did not lay, are those who gain riches by unjust means.
            When their lives are half gone, their riches will desert them, and in the end they will prove to be fools.&rdquo;
          </motion.p>
          <motion.p variants={fadeInLine} className="text-base font-medium text-rc-accent mb-2">
            Jeremiah 17:11
          </motion.p>
          <motion.p variants={fadeInLine} className="text-base text-rc-text/70 font-light">
            This is the end for everyone who does not repent and receive God&apos;s mercy. It would have been mine.
          </motion.p>
        </motion.div>
      </section>

      {/* CLOSING ACTION — the page's one goal. Embedded form, no extra click.
          Series/Book stay present but quiet: plain text links, not cards. */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text text-center mb-4">
            If you identify with the spirit described on this site, there is a way out.
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-sm text-rc-text/60 text-center mb-10">
            No registration. No pressure. I read every request personally.
          </motion.p>
          <motion.div variants={fadeInLine} className="bg-white border-t-4 border-rc-accent rounded-lg p-6 md:p-8 shadow-sm">
            <DeliveranceForm />
          </motion.div>
          <motion.div variants={fadeInLine} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <a href="/my-story" className="text-sm text-rc-text/60 hover:text-rc-accent transition-colors duration-200">
              Watch the full series →
            </a>
            <a href="/book" className="text-sm text-rc-text/60 hover:text-rc-accent transition-colors duration-200">
              Read the book →
            </a>
          </motion.div>
        </motion.div>
      </section>

      <SiteFooter />

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
