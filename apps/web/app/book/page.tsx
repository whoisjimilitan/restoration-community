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
  'Sold',
  'One More Time',
  'The Spirit of Waste',
  'Partridge Hatching Eggs',
  'Heart of Stone',
  'Victory',
  'What I Learned',
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
        {/* Soft atmospheric glow behind the book — depth without a shadow */}
        <div
          className="absolute pointer-events-none"
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
              A Testimony
            </motion.p>
            <motion.h1 variants={fadeInLine} className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight">
              Weje: The Spirit of Waste Lived Inside Me
            </motion.h1>
            <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-bg/90 leading-relaxed font-rc-serif font-normal mt-6">
              The book follows the same arc as the story. It goes three chapters deeper, with reflections and scripture the camera doesn&rsquo;t have room for.
            </motion.p>
          </div>

          {/* Real 3D book: a front-cover face and a spine face joined at a right
              angle in true 3D space (not a flat image faked with 2D rotation). */}
          <motion.div
            variants={fadeInLine}
            className="mx-auto w-52 sm:w-64 order-1 md:order-2"
            style={{ perspective: '1600px' }}
          >
            <div
              className="relative aspect-[2/3]"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-28deg)',
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
              </div>
              {/* Spine */}
              <div
                className="absolute top-0 bottom-0 bg-rc-canvas"
                style={{
                  left: '-28px',
                  width: '28px',
                  transform: 'rotateY(-90deg)',
                  transformOrigin: 'right',
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

      {/* LOOK INSIDE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.p variants={fadeInLine} className="text-xs uppercase tracking-wider text-rc-accent font-medium mb-6 text-center">
            Chapter One: Preview
          </motion.p>
          <motion.div
            variants={fadeInLine}
            className="bg-white border border-rc-border rounded-xl p-8 md:p-12 space-y-5"
          >
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              There is a spirit moving among young people right now. For twenty years it lived in me. He was Weje.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              My mother took me away from the church where God&rsquo;s covering had been over me. When she did, Weje found his way in.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              She watched me change in front of her. She went from church to church, searching for what would bring me back. On one of those trips, she had an accident. She died in 1996. Her last words to me were &ldquo;Be that child God wants you to be.&rdquo;
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              My human personality was taken over. First it was drug runs across borders. Then it began to teach me what interested it most: fraud, a particular scam that preyed on people&rsquo;s fear.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              In May 2015, <span className="text-rc-accent">Jesus Christ cast Weje out of me</span>, through the ministry of the same Prophet of God my mother once took me from.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              This book is the story of how the spirit got in, what it did while it was in me, and how I got free.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* WAITLIST */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-md mx-auto text-center space-y-6"
        >
          <motion.p variants={fadeInLine} className="text-base text-rc-text/80 leading-relaxed font-light">
            The book is coming. Join the waitlist to be the first to know when it releases.
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
          <motion.div variants={fadeInLine} className="-mt-4">
            <a href="/my-story" className="inline-block text-sm text-rc-accent font-medium hover:underline">
              Watch the story that inspired it →
            </a>
          </motion.div>
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

      <section data-nav-mode="light" className="grain-overlay w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-canvas border-t border-rc-border text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight">
            Jesus Still Delivers.
          </motion.h2>
          <motion.div variants={fadeInLine} className="pt-4">
            <SiteButton variant="outline-light" href="/?prayer=1">I Need Jesus</SiteButton>
          </motion.div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
