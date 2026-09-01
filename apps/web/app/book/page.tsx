'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
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

const CHAPTERS = [
  'There Is a Spirit Moving',
  'Before the Spirit',
  'Rise Up and Walk',
  'Weje',
  "I'm Taking This Death Because of You",
  'Sold',
  'One More Time',
  'The Spirit of Waste',
  'Partridge Hatching Eggs',
  'Heart of Stone',
  'Victory',
  'Take This As a Warning',
];

export default function BookPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/book-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.15]);

  return (
    <div className="bg-rc-bg text-rc-text relative">
      <section ref={heroRef} data-nav-mode="light" className="grain-overlay relative w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-canvas overflow-hidden">
        {/* Soft atmospheric glow behind the book — it breathes, like the
            homepage's hero, so the page is never fully still */}
        <div
          className="absolute pointer-events-none animate-[jm-breathe_14s_ease-in-out_infinite]"
          style={{
            right: '5%',
            top: '10%',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, rgba(201,146,90,0.16) 0%, rgba(27,122,108,0.14) 45%, transparent 72%)',
          }}
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <div className="text-center md:text-left order-2 md:order-1">
            <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium mb-5">
              The Book
            </motion.p>
            <motion.h1 variants={fadeInLine} className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight">
              Weje: The Spirit of Waste Lived Inside Me
            </motion.h1>
            <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-bg/90 leading-relaxed font-rc-serif font-normal mt-6">
              The series tells the story in nine episodes. The book goes three chapters deeper.
            </motion.p>
            <motion.p variants={fadeInLine} className="text-sm md:text-base text-rc-bg/60 leading-relaxed font-light mt-3">
              The reflections and scripture the camera doesn&rsquo;t have room for.
            </motion.p>
            <motion.div variants={fadeInLine} className="mt-6">
              <a href="/my-story" className="inline-block text-sm text-rc-accent font-medium hover:underline">
                Watch the story that inspired it →
              </a>
            </motion.div>
          </div>

          {/* Real 3D book: a front-cover face and a spine face joined at a right
              angle in true 3D space (not a flat image faked with 2D rotation). */}
          <motion.div
            variants={fadeInLine}
            className="group mx-auto w-52 sm:w-64 order-1 md:order-2"
            style={{ perspective: '1600px' }}
          >
            <div
              className="relative aspect-[2/3] transition-transform duration-700 ease-out [transform:rotateY(-28deg)] group-hover:[transform:rotateY(-14deg)]"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front cover */}
              <div
                className="absolute inset-0 rounded-r-sm overflow-hidden"
                style={{ transform: 'translateZ(14px)', boxShadow: '2px 2px 10px rgba(0,0,0,0.4)' }}
              >
                <img
                  src="/images/book-cover.png"
                  alt="Weje: The Spirit of Waste Lived Inside Me, book cover"
                  className="w-full h-full object-cover"
                />
                {/* Light falls off toward the spine — the curve of a bound cover */}
                <div
                  className="absolute inset-y-0 left-0 w-[18%] pointer-events-none"
                  style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 45%, transparent 100%)' }}
                />
                {/* Sheen — a printed cover catches light, it doesn't emit it */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)' }}
                />
              </div>
              {/* Spine — cloth-bound, darkest at the hinge where light can't reach */}
              <div
                className="absolute top-0 bottom-0"
                style={{
                  left: '-28px',
                  width: '28px',
                  transform: 'rotateY(-90deg)',
                  transformOrigin: 'right',
                  background: 'linear-gradient(to right, #101b17 0%, #18251f 55%, #22332c 100%)',
                  boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.5)',
                }}
              />
              {/* Page edges */}
              <div
                className="absolute top-[2px] bottom-[2px]"
                style={{
                  right: '-6px',
                  width: '6px',
                  transform: 'rotateY(90deg)',
                  transformOrigin: 'left',
                  background: 'repeating-linear-gradient(180deg, #e8e2d4 0px, #e8e2d4 1px, #d4cdb8 1px, #d4cdb8 2px)',
                }}
              />
            </div>
            {/* Contact shadow grounding the book in the dark */}
            <div
              className="mx-auto mt-3 h-3 w-4/5 rounded-full"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 70%)' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* LOOK INSIDE — the opening pages only. A preview creates the want;
          it doesn't satisfy it. The text cuts at the heaviest line, so the
          reader must turn past the spread to know what happened next. */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.p variants={fadeInLine} className="text-xs uppercase tracking-wider text-rc-accent font-medium mb-10 text-center">
            Look Inside
          </motion.p>
          <motion.div variants={fadeInLine} className="relative" style={{ perspective: '2400px' }}>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 rounded-md overflow-hidden"
              style={{ boxShadow: '0 30px 60px -30px rgba(7,31,27,0.35), 0 0 0 1px rgba(0,0,0,0.06)' }}
            >
              {/* Verso — the chapter opening */}
              <div className="relative bg-white px-7 py-10 md:px-10 md:py-14 sm:pr-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8f8a80] font-medium">Chapter One</p>
                <h3 className="font-rc-serif font-bold text-xl md:text-2xl text-[#1a1a18] mt-3 leading-tight">
                  There Is a Spirit Moving
                </h3>
                <div className="mt-8 space-y-4 font-rc-serif text-[13px] md:text-sm leading-relaxed text-[#2b2b28]">
                  <p>
                    <span className="float-left font-rc-serif font-bold text-5xl md:text-6xl leading-[0.8] pr-2 pt-1 text-[#1a1a18]">T</span>here is a spirit moving among young people right now. For twenty years it lived in me. He was Weje.
                  </p>
                  <p>My mother took me away from the church where God&rsquo;s covering had been over me. When she did, Weje found his way in.</p>
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-[#8f8a80] font-rc-serif">1</span>
                {/* Gutter — light dies toward the spine */}
                <div className="hidden sm:block absolute inset-y-0 right-0 w-10 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.10), transparent)' }} />
              </div>
              {/* Recto — the story continues, and cuts at the heaviest line */}
              <div className="relative bg-[#fbfaf7] px-7 py-10 md:px-10 md:py-14 sm:pl-10 border-t sm:border-t-0 border-[#e9e7e1]">
                <p className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-[#8f8a80] font-medium">There Is a Spirit Moving</p>
                <div className="mt-8 space-y-4 font-rc-serif text-[13px] md:text-sm leading-relaxed text-[#2b2b28]">
                  <p>She watched me change in front of her. She went from church to church, searching for what would bring me back. On one of those trips, she had an accident. She died in 1996. Her last words to me were &ldquo;Be that child God wants you to be.&rdquo;</p>
                  <p className="italic text-[#6f6b62]">The story continues in print.</p>
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-[#8f8a80] font-rc-serif">2</span>
                <div className="hidden sm:block absolute inset-y-0 left-0 w-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.10), transparent)' }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CHAPTERS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            Chapters
          </motion.h2>
          <motion.div variants={staggerContainer} className="space-y-1">
            {CHAPTERS.map((title, i) => (
              <motion.div key={title} variants={fadeInLine} className="flex items-baseline gap-3 py-2">
                <span className="text-rc-accent font-rc-serif font-bold text-base shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base md:text-lg text-rc-text font-rc-serif shrink-0">{title}</span>
                <span aria-hidden="true" className="flex-1 border-b border-dotted border-rc-border mb-1" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* WAITLIST — after the chapters, once the titles have built the want */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-md mx-auto text-center space-y-6"
        >
          <motion.p variants={fadeInLine} className="text-base text-rc-text/80 leading-relaxed font-light">
            The book is coming. Be first to read it.
          </motion.p>

          {submitted ? (
            <motion.p variants={fadeInLine} className="text-rc-accent font-medium">
              Thank you. You&rsquo;ll be the first to know.
            </motion.p>
          ) : (
            <motion.form variants={fadeInLine} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-rc-border rounded-lg bg-rc-bg"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-rc-border rounded-lg bg-rc-bg"
              />
              {submitError && (
                <p className="text-sm text-red-600">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-rc-bg rounded-lg font-medium tracking-wide shadow-md transition-all duration-300 ease-out hover:bg-rc-accent-light hover:shadow-xl hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? 'Joining…' : 'Join Waitlist'}
              </button>
            </motion.form>
          )}
        </motion.div>
      </section>

      <section data-nav-mode="light" className="grain-overlay w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-canvas border-t border-rc-border text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight max-w-[26ch] mx-auto">
            If the same spirit is moving in your life, reading my book can wait.
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-bg/80 leading-relaxed font-light">
            Deliverance can&rsquo;t.
          </motion.p>
          <motion.div variants={fadeInLine} className="pt-4">
            <SiteButton variant="outline-light" href="/?prayer=1">Ask for Prayer</SiteButton>
          </motion.div>
          <motion.a
            variants={fadeInLine}
            href="/deliverances"
            className="block text-sm text-rc-bg/60 hover:text-rc-bg hover:underline"
          >
            Or watch one more story →
          </motion.a>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
