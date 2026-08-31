'use client';

import { motion, type Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

type PageHeroProps = {
  headline: string;
  photo?: { src: string; alt: string };
  headlineSizeClass?: string;
};

/** Shared inner-page hero: a real photo with a mostly-black overlay (teal
 *  reduced to a hairline wash, not a dominant tone) when a photo is given,
 *  or the existing flat gradient unchanged when it isn't. */
export default function PageHero({ headline, photo, headlineSizeClass }: PageHeroProps) {
  const sizeClass = headlineSizeClass ?? 'text-4xl sm:text-5xl md:text-6xl';

  return (
    <section
      data-nav-mode="light"
      className={`grain-overlay w-full px-6 sm:px-8 md:px-12 py-24 md:py-32 ${
        photo
          ? 'relative min-h-[60svh] flex flex-col justify-center overflow-hidden bg-rc-canvas'
          : 'bg-gradient-to-br from-rc-accent to-rc-canvas'
      }`}
    >
      {photo && (
        <>
          <img
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Strong dark overlay throughout, for text contrast against any photo */}
          <div className="absolute inset-0 bg-rc-canvas/85" />
          {/* Teal reduced to a single contained accent glow, not a wash */}
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-3/4 bg-rc-accent/40 blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rc-canvas/40" />
        </>
      )}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className={['max-w-2xl mx-auto text-center', photo && 'relative z-10']
          .filter(Boolean)
          .join(' ')}
      >
        <motion.h1 variants={fadeInLine} className={`${sizeClass} font-rc-serif font-bold text-rc-bg leading-tight tracking-tight`}>
          {headline}
        </motion.h1>
      </motion.div>
    </section>
  );
}
