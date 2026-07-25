'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full pt-32 pb-16 md:pt-0 md:pb-0 md:min-h-screen md:flex md:flex-col md:justify-center bg-rc-bg">
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
              Restoration begins where deception ends.
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
              You know what deception costs. Fraud and a life built on falsehood can slowly take you away from who God created you to be.
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              But your past does not have to become your future.
            </p>
            <p className="text-lg text-rc-text leading-relaxed mt-6">
              Jesus Christ alone delivers, restores, and leads people into a new life of truth and purpose.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`transform transition-all duration-700 pt-4 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '480ms' }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/deliverance"
                className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
              >
                Request Deliverance
              </Link>
              <Link
                href="#story"
                className="inline-flex items-center justify-center px-8 py-4 text-rc-accent font-medium hover:text-rc-text transition-colors duration-200"
              >
                How Jesus Changed My Life
              </Link>
            </div>
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
