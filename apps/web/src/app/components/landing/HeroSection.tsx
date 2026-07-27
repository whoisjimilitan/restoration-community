'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full pt-40 pb-20 md:pt-0 md:pb-0 md:min-h-screen md:flex md:flex-col md:justify-center bg-rc-bg">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 md:px-12 w-full">
        <div className="space-y-12 md:space-y-16">
          {/* Eyebrow */}
          <div
            className={`animate-fade-rise ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-xs md:text-sm font-semibold text-rc-accent uppercase tracking-widest">
              Deliverance Through Jesus Christ
            </p>
          </div>

          {/* Headline - Premium Typography */}
          <div
            className={`animate-fade-rise-delay ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-rc-navy leading-tight">
              You were not made to be bound by deception.
            </h1>
          </div>

          {/* Supporting Copy - Generous Spacing */}
          <div
            className={`animate-fade-rise-delay-2 space-y-8 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              Deception promises freedom. It only ever leaves people trapped.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              Every life bound by deception begins with the same lie: that your desires matter more than your obedience to God.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              But Someone still delivers people from this illusion. His name is Jesus Christ. The Son of God.
            </p>
          </div>

          {/* CTA Button - Burak Style */}
          <div
            className={`animate-fade-rise-delay-3 pt-4 ${
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
        <div className="hidden md:flex absolute bottom-12 left-1/2 transform -translate-x-1/2 flex-col items-center opacity-40">
          <p className="text-xs text-rc-text-secondary uppercase tracking-wider mb-3 font-medium">Scroll</p>
          <svg className="w-5 h-5 text-rc-text-secondary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
