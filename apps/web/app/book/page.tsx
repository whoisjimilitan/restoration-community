'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to a real waitlist endpoint before this ships live.
    setSubmitted(true);
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.15]);

  return (
    <div className="bg-rc-bg text-rc-text relative">
      <section ref={heroRef} className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <motion.div
            variants={fadeInLine}
            className="mx-auto w-48 md:w-56"
            style={{ perspective: '1000px' }}
          >
            <div
              className="rounded overflow-hidden"
              style={{
                transform: 'rotateY(-18deg) rotateX(4deg)',
                boxShadow: '24px 24px 48px rgba(0, 0, 0, 0.45)',
              }}
            >
              <img src="/images/book-cover.png" alt="Weje: The Spirit of Waste Lived Inside Me, book cover" className="w-full h-auto" />
            </div>
          </motion.div>

          <motion.h1 variants={fadeInLine} className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            Weje: The Spirit of Waste Lived Inside Me
          </motion.h1>

          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
            The spirit of waste lived inside me for twenty years. He drove me across nations. He built an empire of deception through my hands. And then Jesus Christ cast him out. This is the full story.
          </motion.p>
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
              There is a spirit moving among young people right now. I know because it lived inside me for twenty years. This spirit was named Weje when it lived in me.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              It entered when I was removed from the covering of God that protected me from the attacks of the devil. My mother died in 1996. Her last words to me were that she was taking her death because of me. I carried that for years.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              Then came trafficking. Drug runs across multiple countries. Then finally, fraud, a scam that preyed on people&rsquo;s fear and made tens of thousands of dollars a week. None of it brought peace.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              But in May 2015, Jesus Christ cast Weje out of me, through the ministry of Prophet T.B. Joshua.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              This book is the story of how Weje got in, what it did while it was in me, and how I got free.
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
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white rounded-lg font-medium tracking-wide shadow-md transition-all duration-300 ease-out hover:bg-rc-accent-light hover:shadow-xl hover:scale-[1.01]"
              >
                Join Waitlist
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
          <motion.div variants={fadeInLine} className="-mt-4 space-y-2">
            <p className="text-sm text-rc-text/60 leading-relaxed font-light">
              The book follows the same arc as the series. It goes three chapters deeper, with reflections and scripture the camera doesn&rsquo;t have room for.
            </p>
            <a href="/my-story" className="inline-block text-sm text-rc-accent font-medium hover:underline">
              Watch the nine-episode series →
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

      <SiteFooter />
    </div>
  );
}
