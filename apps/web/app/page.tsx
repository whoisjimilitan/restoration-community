'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import SiteButton from '@/components/SiteButton';

// Barely-perceptible drift as the photo scrolls past — quiet physical
// presence, not a parallax "effect". Wraps whatever image is passed as children.
function ParallaxPhoto({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[300px] md:max-w-[380px]">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// Slightly slower and more spaced than a typical product-site reveal — this
// is a testimony, not a feature list, and each line deserves room to be read
// before the next arrives.
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const settleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
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
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState<'form' | 'complete'>('form');
  const [attendanceData, setAttendanceData] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  return (
    <div className="bg-rc-bg text-rc-text relative">
      <Suspense fallback={null}>
        <AttendParamWatcher onAttend={() => setIsAttendanceModalOpen(true)} />
      </Suspense>

      {/* 01 THE CLAIM — matches the approved reference design exactly: a
          breathing radial glow behind centered text, no video, no gradient
          wash. One thing, stated once. */}
      <section id="hero" data-nav-mode="light" className="grain-overlay relative w-full min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden bg-rc-canvas px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none animate-[jm-breathe_14s_ease-in-out_infinite]"
          style={{
            width: 'min(1100px, 120vw)',
            height: 'min(1100px, 120vw)',
            background: 'radial-gradient(circle, rgba(27,122,108,0.55) 0%, rgba(20,87,75,0.28) 38%, rgba(10,52,45,0) 68%)',
          }}
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative max-w-2xl mx-auto flex flex-col items-center"
        >
          <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium">
            A Testimony
          </motion.p>
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight mt-8 max-w-[20ch]">
            Fraud is not just a crime. It is a spirit.
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-[#BBC7C6] font-light leading-relaxed mt-7 max-w-[42ch]">
            I know because it lived inside me for 20 years.
          </motion.p>
          <motion.div variants={fadeInLine} className="flex items-center gap-4 mt-11 flex-wrap justify-center">
            <SiteButton href="/?prayer=1" variant="solid">
              Ask for Prayer
            </SiteButton>
            <a
              href="#weje"
              className="relative inline-block text-[#BBC7C6] hover:text-white text-base font-medium transition-colors duration-200 group"
            >
              Keep reading ↓
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </motion.div>
        </motion.div>
        {/* Scroll hint — quiet, functional, not decorative */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-[52px] animate-[jm-hint_3.4s_ease-in-out_infinite]"
          style={{ background: 'linear-gradient(to bottom, rgba(237,255,254,0) 0%, rgba(237,255,254,0.6) 100%)' }}
        />
      </section>

      {/* 02 THE SPIRIT IS NAMED — the page's typographic peak. */}
      <section id="weje" className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <motion.div variants={fadeInLine}>
            <ParallaxPhoto>
              <div className="relative">
                {/* Cool, receding glow — this photo is the past, pulling back */}
                <div
                  className="absolute -inset-8 rounded-full blur-3xl -z-10"
                  style={{ background: 'radial-gradient(circle, rgba(27,122,108,0.35) 0%, transparent 70%)' }}
                />
                <img
                  src="/images/weje-era.png"
                  alt="Brother Jimi during the years Weje controlled his life"
                  className="w-full aspect-[4/5] object-cover rounded-[1rem] saturate-[0.85] contrast-[0.96]"
                  style={{ boxShadow: '0 20px 50px -20px rgba(7,31,27,0.5)' }}
                />
                <span className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-wide font-medium px-3 py-1 rounded-full bg-rc-canvas/80">
                  2012
                </span>
              </div>
            </ParallaxPhoto>
          </motion.div>
          <div className="text-left">
            <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium">
              Yoruba Noun
            </motion.p>
            <motion.h2 variants={fadeInLine} className="text-6xl sm:text-7xl md:text-8xl font-rc-serif font-bold tracking-tight text-rc-text leading-[0.96] mt-6">
              Weje
            </motion.h2>
            <motion.p variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif italic text-rc-text/70 mt-4">
              the wasteful one
            </motion.p>
            <motion.p variants={fadeInLine} className="text-lg text-rc-text/80 leading-relaxed mt-10 max-w-[46ch]">
              The spirit that controlled me for twenty years. He gave me money and took everything money cannot buy. He gave me a heart of stone and stole my heart of flesh.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* 03 THE SENTENCE — text only, no photo. Scripture, then the plea. A much
          dimmer, slower breath than the hero — this section stays the quiet
          one, the glow is just enough that it isn't the only static section
          on the page. */}
      <section data-nav-mode="light" className="grain-overlay relative w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-canvas overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-[jm-breathe_20s_ease-in-out_infinite]"
          style={{
            width: 'min(900px, 100vw)',
            height: 'min(900px, 100vw)',
            background: 'radial-gradient(circle, rgba(27,122,108,0.18) 0%, rgba(20,87,75,0.08) 45%, transparent 70%)',
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto flex flex-col gap-20"
        >
          <motion.div variants={fadeInLine} className="flex flex-col gap-7">
            <p className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium">The Bible Says</p>
            <p className="font-rc-serif italic text-2xl md:text-3xl text-white leading-snug tracking-tight max-w-[30ch]">
              &ldquo;Like a partridge that hatches eggs it did not lay, are those who gain riches by unjust means. When their lives are half gone, their riches will desert them, and in the end they will prove to be fools.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <span className="block w-9 h-px bg-rc-gold/70" />
              <p className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium">Jeremiah 17:11</p>
            </div>
          </motion.div>
          <motion.p variants={fadeInLine} className="font-rc-serif font-bold text-3xl md:text-4xl text-white leading-tight tracking-tight self-end text-right max-w-[20ch]">
            I would have ended as a fool.
          </motion.p>
        </motion.div>
      </section>

      {/* 04 CAST OUT */}
      <section className="w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="font-rc-serif font-bold text-3xl sm:text-4xl md:text-5xl text-rc-text leading-tight tracking-tight max-w-[24ch]">
            But in 2015, Jesus Christ cast Weje out of me.
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-base font-medium text-rc-text/70 mt-2">
            Through Prophet T.B. Joshua&apos;s ministry.
          </motion.p>
          {/* A literal timeline marker — the ten years get a visual presence,
              not just a sentence saying they happened. */}
          <motion.div variants={fadeInLine} className="flex flex-col items-start mt-16 mb-10">
            <span className="w-2 h-2 rounded-full bg-rc-gold" />
            <span className="w-px h-16 mt-1" style={{ background: 'linear-gradient(to bottom, rgba(201,146,90,0.6), transparent)' }} />
          </motion.div>
          <motion.p variants={settleIn} className="font-rc-serif font-bold text-2xl sm:text-3xl md:text-4xl text-rc-text leading-tight tracking-tight max-w-[18ch] ml-auto text-right">
            Ten years later, I&apos;m a product of God&apos;s grace.
          </motion.p>
        </motion.div>
      </section>

      {/* 05 THE APPEAL */}
      <section data-nav-mode="light" className="grain-overlay w-full bg-rc-canvas">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto py-24 md:py-40 px-6 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-11 md:gap-20 items-center"
        >
          <motion.div variants={fadeInLine}>
            <ParallaxPhoto>
              <div className="relative">
                {/* Warm, grounded glow — this photo is the present, arrived */}
                <div
                  className="absolute -inset-10 rounded-full blur-3xl -z-10"
                  style={{ background: 'radial-gradient(circle, rgba(201,146,90,0.28) 0%, transparent 70%)' }}
                />
                <img
                  src="/images/portrait-declaration-closeup.png"
                  alt="Brother Jimi"
                  className="w-full aspect-square object-cover object-[50%_30%] rounded-2xl"
                  style={{ boxShadow: '0 24px 60px -18px rgba(0,0,0,0.55)' }}
                />
                <div
                  className="mx-auto mt-4 h-3 w-3/4 rounded-full blur-md"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)' }}
                />
              </div>
            </ParallaxPhoto>
          </motion.div>
          <div className="flex flex-col gap-11">
            <div className="flex flex-col gap-5">
              <motion.h2 variants={fadeInLine} className="font-rc-serif font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
                I am calling every youth out of fraud into the salvation only Jesus Christ gives.
              </motion.h2>
              <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-[#BBC7C6]/60 font-normal">
                Brother Jimi &middot; A Servant of Jesus Christ
              </motion.p>
            </div>
            <motion.div variants={fadeInLine} className="flex flex-col gap-5 items-start">
              <SiteButton href="/?prayer=1" variant="solid">
                Ask for Prayer
              </SiteButton>
              <a
                href="/deliverances"
                className="text-sm text-[#BBC7C6] hover:text-white border-b border-[#BBC7C6]/40 hover:border-white pb-0.5 transition-colors duration-200"
              >
                See God at work
              </a>
            </motion.div>
          </div>
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
