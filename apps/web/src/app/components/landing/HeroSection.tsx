'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-0 md:pb-0 md:min-h-screen md:flex md:flex-col md:justify-center bg-rc-bg">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 lg:px-12">
        <div className="space-y-10 md:space-y-14">
          {/* Eyebrow */}
          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <p className="text-xs font-semibold text-rc-accent uppercase tracking-widest">
              Deliverance Through Jesus Christ
            </p>
          </div>

          {/* Headline */}
          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-rc-text leading-tight tracking-tight">
              You were not made to be bound by deception.
            </h1>
          </div>

          {/* Supporting Copy */}
          <div
            className={`transform transition-all duration-700 space-y-7 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              Deception promises freedom. It only ever leaves people trapped.
            </p>
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              Every life bound by deception begins with the same lie: that your desires matter more than your obedience to God.
            </p>
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              But Someone still delivers people from this illusion. His name is Jesus Christ. The Son of God.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`transform transition-all duration-700 pt-6 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Link
              href="/deliverance"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium text-base rounded-lg hover:bg-rc-accent-light active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-3 focus:ring-offset-rc-bg shadow-sm hover:shadow-md"
            >
              Get Delivered
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-12 left-1/2 transform -translate-x-1/2 flex-col items-center">
          <p className="text-xs text-rc-text-tertiary uppercase tracking-wider mb-3 font-medium">Scroll</p>
          <svg className="w-5 h-5 text-rc-text-tertiary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
