'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import PageHero from '@/components/PageHero';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function GetHelpPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.15]);

  return (
    <div className="bg-rc-bg text-rc-text relative">
      <PageHero
        headline="If You Identify With This Spirit, There Is a Way Out"
        photo={{ src: '/images/portrait-declaration-closeup.png', alt: 'Brother Jimi' }}
        headlineSizeClass="text-3xl sm:text-4xl md:text-5xl"
      />
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-2xl mx-auto space-y-8 text-center"
        >
          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light text-left">
            <motion.p variants={fadeInLine}>Fraud is not just a habit. It is not just a choice. If you are caught in this lifestyle and you cannot stop, it may be because a spirit is operating inside you.</motion.p>
            <motion.p variants={fadeInLine} className="pt-2">I know because I carried one for twenty years. His name was Weje and he controlled my affairs until <span className="text-rc-accent-light">Jesus Christ cast him out</span> in May 2015.</motion.p>
            <motion.p variants={fadeInLine}>That was the same year Jeremiah 17:11 stopped describing someone else's life. And started describing mine.</motion.p>
            <motion.p variants={fadeInLine} className="pt-2 font-medium"><span className="text-rc-accent-light">The same Jesus who set me free</span> can set you free. You do not have to carry this alone. Make me your prayer partner and let us seek deliverance together.</motion.p>
          </motion.div>
          <motion.a
            variants={fadeInLine}
            href="/about"
            className="inline-block text-sm text-white/60 hover:text-white hover:underline"
          >
            Want the fuller story first? Read about who I am →
          </motion.a>
        </motion.div>
      </section>

      <section className="w-full py-16 md:py-20 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border text-center">
        <p className="text-white/90 font-rc-serif text-lg md:text-xl">
          &ldquo;Jesus Christ is the same yesterday, today, and forever.&rdquo;
        </p>
        <p className="text-white/60 text-sm mt-3">Hebrews 13:8</p>
      </section>

      <SiteFooter />
    </div>
  );
}
