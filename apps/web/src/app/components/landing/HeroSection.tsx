'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-rc-navy">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 w-full">
        <div className="space-y-16 md:space-y-24">
          {/* Eyebrow */}
          <div
            className={`animate-fade-rise ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-xs md:text-sm font-bold text-rc-accent uppercase tracking-widest">
              Deliverance Through Jesus Christ
            </p>
          </div>

          {/* Headline - Massive & Bold */}
          <div
            className={`animate-fade-rise-delay ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight max-w-4xl">
              You were not made to be bound by deception.
            </h1>
          </div>

          {/* Supporting Copy - Generous Spacing */}
          <div
            className={`animate-fade-rise-delay-2 space-y-12 max-w-3xl ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-lg md:text-2xl text-rc-text leading-relaxed font-light">
              Deception promises freedom. It only ever leaves people trapped.
            </p>
            <p className="text-lg md:text-2xl text-rc-text leading-relaxed font-light">
              Every life bound by deception begins with the same lie: that your desires matter more than your obedience to God.
            </p>
            <p className="text-lg md:text-2xl text-rc-text leading-relaxed font-light">
              But Someone still delivers people from this illusion. His name is Jesus Christ. The Son of God.
            </p>
          </div>

          {/* CTA Button - Burak Style (Bright Yellow) */}
          <div
            className={`animate-fade-rise-delay-3 pt-8 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              href="/deliverance"
              className="btn-primary inline-flex animate-glow-pulse"
            >
              Get Delivered
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-20 left-1/2 transform -translate-x-1/2 flex-col items-center opacity-50">
          <p className="text-xs text-rc-text-secondary uppercase tracking-wider mb-4 font-medium">Scroll</p>
          <svg className="w-5 h-5 text-rc-accent animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
