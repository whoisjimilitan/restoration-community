'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ReachingHandIllustration = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Gradient definitions */}
    <defs>
      <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#D4A574', stopOpacity: 0.8 }} />
        <stop offset="50%" style={{ stopColor: '#E8DCC8', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#0F766E', stopOpacity: 0.4 }} />
      </linearGradient>
      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>
    </defs>

    {/* Wrist and forearm */}
    <path
      d="M 200 450 Q 180 380 160 320 L 170 310 Q 190 370 210 440 Z"
      fill="url(#handGradient)"
      opacity="0.7"
    />

    {/* Palm base */}
    <ellipse cx="180" cy="280" rx="45" ry="55" fill="url(#handGradient)" opacity="0.8" />

    {/* Thumb */}
    <path
      d="M 160 300 Q 140 280 130 250 Q 125 240 135 235 Q 145 245 165 290 Z"
      fill="url(#handGradient)"
      opacity="0.75"
    />

    {/* Index finger */}
    <path
      d="M 175 220 Q 170 150 165 80 Q 165 70 175 75 Q 185 150 190 230 Z"
      fill="url(#handGradient)"
      opacity="0.8"
    />

    {/* Middle finger */}
    <path
      d="M 185 210 Q 185 120 180 40 Q 180 30 190 35 Q 195 120 195 220 Z"
      fill="url(#handGradient)"
      opacity="0.85"
    />

    {/* Ring finger */}
    <path
      d="M 200 220 Q 205 140 210 60 Q 210 50 220 55 Q 215 140 205 230 Z"
      fill="url(#handGradient)"
      opacity="0.8"
    />

    {/* Pinky finger */}
    <path
      d="M 215 250 Q 230 190 240 120 Q 240 110 248 115 Q 235 190 220 260 Z"
      fill="url(#handGradient)"
      opacity="0.75"
    />

    {/* Subtle light accent on palm */}
    <ellipse cx="175" cy="270" rx="25" ry="30" fill="#E8DCC8" opacity="0.4" />

    {/* Atmospheric glow around hand */}
    <circle cx="185" cy="200" r="120" fill="#D4A574" opacity="0.1" filter="url(#softShadow)" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rc-bg via-rc-bg to-rc-warm-gray">
      {/* Atmospheric background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-rc-gold-light/30 to-rc-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-gradient-to-t from-rc-accent/5 to-transparent blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-0">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen md:min-h-0 md:py-20">
            {/* Left: Text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              className="space-y-8 md:space-y-10"
            >
              {/* Eyebrow */}
              <motion.div variants={itemVariants}>
                <p className="text-sm font-medium text-rc-accent uppercase tracking-wide">
                  A Christian Community for Restoration
                </p>
              </motion.div>

              {/* Headline */}
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight">
                  Restoration begins where deception ends.
                </h1>
              </motion.div>

              {/* Supporting Copy */}
              <motion.div variants={itemVariants} className="space-y-6 max-w-2xl">
                <p className="text-lg md:text-xl text-rc-text leading-relaxed">
                  You already know what deception costs. Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God.
                </p>
                <p className="text-lg md:text-xl text-rc-text leading-relaxed">
                  Through Jesus Christ, restoration is possible. And no one should have to walk that journey alone.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent hover:bg-rc-accent/90 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Begin the Journey
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/70 hover:bg-white text-rc-accent font-medium rounded-lg border border-rc-accent/20 transition-all duration-200 backdrop-blur-sm"
                >
                  Learn About Our Community
                </Link>
              </motion.div>

              {/* Value Props */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-6 pt-8 border-t border-rc-accent/10"
              >
                <div>
                  <p className="text-sm font-semibold text-rc-gold mb-1">Rooted in Scripture</p>
                  <p className="text-sm text-rc-text-secondary">Built on biblical truth</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-rc-gold mb-1">Real Community</p>
                  <p className="text-sm text-rc-text-secondary">Genuine relationships</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-rc-gold mb-1">Grace-Centered</p>
                  <p className="text-sm text-rc-text-secondary">Restoration through Christ</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-rc-gold mb-1">Christ Above All</p>
                  <p className="text-sm text-rc-text-secondary">Jesus is the foundation</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Reaching Hand Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="hidden md:flex relative h-96 lg:h-[500px] items-center justify-center"
            >
              <div className="w-full h-full max-w-sm">
                <ReachingHandIllustration />
              </div>
              {/* Subtle animated glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-rc-gold/10 to-transparent rounded-full blur-2xl animate-pulse opacity-40 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex flex-col items-center"
      >
        <p className="text-xs text-rc-text-secondary uppercase tracking-widest mb-3">Scroll</p>
        <svg className="w-5 h-5 text-rc-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
