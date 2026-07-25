'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full pt-32 pb-16 md:pt-0 md:pb-0 md:min-h-screen md:flex md:flex-col md:justify-center overflow-hidden">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-rc-cream via-rc-bg to-rc-cream-light z-0" />
      <div className="absolute inset-0 bg-radial-gradient opacity-40 z-0" style={{
        backgroundImage: 'radial-gradient(ellipse 120% 100% at 50% -10%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)'
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 z-0" />

      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        <div className="space-y-10 md:space-y-14">
          {/* Eyebrow */}
          <div
            className={`transform transition-all duration-800 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <p className="text-xs font-semibold text-rc-accent uppercase tracking-[0.15em]">
              A Christian Community for Restoration
            </p>
          </div>

          {/* Headline */}
          <div
            className={`transform transition-all duration-800 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-[1.08] tracking-[-0.02em]">
              Restoration begins where deception ends.
            </h1>
          </div>

          {/* Supporting Copy */}
          <div
            className={`transform transition-all duration-800 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-base md:text-lg text-rc-text leading-[1.75] tracking-[-0.005em] max-w-xl">
              You already know what deception costs. Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-[1.75] tracking-[-0.005em] mt-7 max-w-xl">
              Through Jesus Christ, restoration is possible. And no one should have to walk that journey alone.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`transform transition-all duration-800 pt-6 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-accent/90 hover:shadow-[0_12px_24px_rgba(15,118,110,0.2)] hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
              >
                Begin the Journey
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 text-rc-accent font-medium border border-rc-accent/20 hover:border-rc-accent/50 hover:bg-rc-accent/5 hover:text-rc-text transition-all duration-200 rounded-lg"
              >
                Learn About Our Community
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center opacity-40 hover:opacity-70 transition-opacity duration-300">
          <p className="text-xs text-rc-text-secondary uppercase tracking-[0.1em] mb-4 font-medium">Scroll</p>
          <svg className="w-6 h-6 text-rc-accent animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
