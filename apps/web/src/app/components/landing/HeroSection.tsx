'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full pt-20 pb-16 md:pt-0 md:pb-0 md:min-h-screen md:flex md:flex-col md:justify-center bg-rc-bg">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8 md:space-y-12">
          {/* Eyebrow */}
          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="text-sm font-medium text-rc-accent uppercase tracking-wide">
              Deliverance Through Jesus Christ
            </p>
          </div>

          {/* Headline */}
          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
              You were not made to be bound by deception.
            </h1>
          </div>

          {/* Supporting Copy */}
          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '360ms' }}
          >
            <p className="text-lg text-rc-text leading-relaxed">
              Deception promises freedom.
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              It only ever leaves people trapped.
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              Every life bound by deception begins with the same lie:
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              that your desires matter more than your obedience to God.
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              But Someone still delivers people from this illusion.
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              His name is Jesus Christ.
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              The Son Of God.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`transform transition-all duration-700 pt-4 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '480ms' }}
          >
            <Link
              href="/deliverance"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
            >
              Get Delivered
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center opacity-50">
          <p className="text-xs text-rc-text-secondary uppercase tracking-widest mb-3">Scroll</p>
          <svg className="w-5 h-5 text-rc-text-secondary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
