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

/** Shared inner-page hero: a real photo + the homepage's exact charcoal
 *  overlay math when a photo is given, or the existing flat gradient
 *  unchanged when it isn't — so pages with no photo (e.g. /scriptures)
 *  render identically to what they always have. */
export default function PageHero({ headline, photo, headlineSizeClass }: PageHeroProps) {
  const sizeClass = headlineSizeClass ?? 'text-4xl sm:text-5xl md:text-6xl';

  return (
    <section
      className={`w-full px-6 sm:px-8 md:px-12 py-24 md:py-32 ${
        photo
          ? 'relative min-h-[60svh] flex flex-col justify-center overflow-hidden bg-rc-text'
          : 'bg-gradient-to-br from-rc-accent to-rc-text'
      }`}
    >
      {photo && (
        <>
          <img
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rc-accent/85 to-rc-text/90" />
        </>
      )}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.h1 variants={fadeInLine} className={`${sizeClass} font-rc-serif font-bold text-white leading-tight tracking-tight`}>
          {headline}
        </motion.h1>
      </motion.div>
    </section>
  );
}
