'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import SiteButton from '@/components/SiteButton';

/** Same reveal choreography as the homepage — shared DNA, not a coincidence. */
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Barely-perceptible drift as the photo scrolls past — the homepage's own
// ParallaxPhoto, so the about page speaks the same visual language.
function ParallaxPhoto({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[340px]">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// The eras of one life. Each photo is a print in the pile; clicking one
// brings it to the front. The pile IS the testimony: Weje, Jimi.
// New prints can be added to the stack; each needs src, tag, and a back
// position. Captions are optional — a print can speak for itself.
const ERAS = [
  {
    id: 'weje',
    src: '/images/weje-era-group.png',
    alt: 'Brother Jimi during the years Weje controlled his life',
    tag: 'Weje',
    caption: 'The Weje years. The username still leads to the people I ran with.',
    // Back of the pile.
    back: { x: 0, y: -6, rotate: 3, filter: 'saturate(0.7) contrast(0.92) brightness(0.85)' },
  },
  {
    id: 'today',
    src: '/images/portrait-today-current.jpg',
    alt: 'Brother Jimi today',
    tag: 'Jimi',
    caption: '',
    // Front of the pile by default; recedes left when the other era is pulled forward.
    back: { x: -26, y: 8, rotate: -6, filter: 'saturate(0.65) contrast(0.92) brightness(0.8)' },
  },
] as const;

type EraId = (typeof ERAS)[number]['id'];

export default function AboutPage() {
  const [frontEra, setFrontEra] = useState<EraId>('today');

  return (
    <div className="bg-rc-bg text-rc-text relative">
      {/* HERO — same language as the homepage and the story page: dark canvas,
          grain, breathing glow, one line at a time. */}
      <section data-nav-mode="light" className="grain-overlay relative w-full min-h-[70svh] flex flex-col justify-center overflow-hidden bg-rc-canvas px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none animate-[jm-breathe_14s_ease-in-out_infinite]"
          style={{
            width: 'min(900px, 110vw)',
            height: 'min(900px, 110vw)',
            background: 'radial-gradient(circle, rgba(27,122,108,0.45) 0%, rgba(20,87,75,0.22) 40%, rgba(10,52,45,0) 68%)',
          }}
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.p variants={fadeInLine} className="text-xs uppercase tracking-[0.2em] text-rc-gold font-medium">
            About
          </motion.p>
          <motion.div variants={fadeInLine} className="w-12 h-px bg-rc-accent-light mx-auto" />
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-rc-bg leading-tight tracking-tight">
            Brother Jimi
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-bg/90 leading-relaxed font-rc-serif font-normal">
            A minister of the gospel of Jesus Christ.
          </motion.p>
        </motion.div>
      </section>

      {/* THE ARC IN MINIATURE — the bio on the right; on the left, a pile of
          three prints. Click one and it comes to the front. The pile is the
          testimony: Jimi, Weje, Jimi. */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <motion.div variants={fadeInLine}>
            <ParallaxPhoto>
              <div className="relative">
                {/* Warm, grounded glow — the present, arrived */}
                <div
                  className="absolute -inset-10 rounded-full blur-3xl -z-10"
                  style={{ background: 'radial-gradient(circle, rgba(201,146,90,0.25) 0%, transparent 70%)' }}
                />
                {/* The pile — z-order follows which era is in front */}
                {ERAS.map((era) => {
                  const isFront = era.id === frontEra;
                  const pos = isFront
                    ? { x: 0, y: 0, rotate: -2, filter: 'none' }
                    : era.back;
                  return (
                    <button
                      key={era.id}
                      type="button"
                      onClick={() => setFrontEra(era.id)}
                      aria-label={`Bring ${era.tag} photo to the front`}
                      aria-pressed={isFront}
                      className="absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rc-accent rounded-[1rem]"
                      style={{
                        transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotate}deg)`,
                        zIndex: isFront ? 30 : 10,
                        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease',
                        filter: pos.filter,
                      }}
                    >
                      <img
                        src={era.src}
                        alt={era.alt}
                        className="w-full aspect-[941/1672] object-cover rounded-[1rem] pointer-events-none"
                        style={{ boxShadow: '0 24px 60px -18px rgba(0,0,0,0.55)' }}
                      />
                      {era.tag && (
                        <span className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-wide font-medium px-3 py-1 rounded-full bg-rc-canvas/80 pointer-events-none">
                          {era.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
                {/* Spacer keeps the pile's height from the tallest print */}
                <div className="invisible">
                  <img src="/images/portrait-today-current.jpg" alt="" className="w-full aspect-[941/1672]" />
                </div>
              </div>
            </ParallaxPhoto>
            {/* The caption of the era in front, if it has one */}
            {(ERAS.find((e) => e.id === frontEra)!.caption || '') && (
              <p className="mt-6 text-sm text-rc-text/60 font-light leading-relaxed text-center min-h-[2.5rem]">
                {ERAS.find((e) => e.id === frontEra)!.caption}
              </p>
            )}
          </motion.div>

          <div className="space-y-8 text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
            <motion.p variants={fadeInLine}>
              Born in Canada, raised in Nigeria, he was controlled by a spirit called Weje for twenty years.
            </motion.p>
            <motion.p variants={fadeInLine}>
              Through the ministry of Prophet T.B. Joshua, <span className="text-rc-accent">Jesus Christ delivered him from Weje in May 2015 and gave him a new heart</span>.
            </motion.p>
            <motion.p variants={fadeInLine}>
              Today he lives in Ghana with his wife and two sons, Josiah and Jeriah, ministering to young people across West Africa and beyond.
            </motion.p>
            <motion.p variants={fadeInLine} className="pt-2 font-medium text-rc-text">
              His message is clear: fraud is a spiritual problem and the solution is deliverance through Jesus Christ.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* CLOSER — the confession-level ask, with the story one quiet link away */}
      <section data-nav-mode="light" className="grain-overlay w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-canvas border-t border-rc-border text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.p variants={fadeInLine} className="text-rc-bg font-rc-serif text-xl md:text-2xl font-medium leading-relaxed">
            The same Jesus who delivered me can deliver you.
          </motion.p>
          <motion.div variants={fadeInLine} className="pt-2">
            <SiteButton variant="outline-light" href="/?prayer=1">Ask for Prayer</SiteButton>
          </motion.div>
          <motion.a
            variants={fadeInLine}
            href="/my-story"
            className="block text-sm text-rc-bg/60 hover:text-rc-bg hover:underline"
          >
            Or watch my testimony →
          </motion.a>
        </motion.div>
      </section>

      <SiteFooter precededByDarkSection />
    </div>
  );
}