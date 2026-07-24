'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen bg-rc-bg overflow-hidden">
      {/* Hero Container: Asymmetrical Split (45% narrative, 55% atmosphere) */}
      <div className="relative w-full h-full flex items-center">
        {/* Left Side: Narrative (45%) */}
        <div className="w-full md:w-[45%] px-6 sm:px-8 md:px-12 py-16 md:py-0 flex flex-col justify-center">
          <div className="max-w-md space-y-8">
            {/* Eyebrow */}
            <div
              className={`transform transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <p className="text-xs md:text-sm font-medium tracking-widest text-rc-text-secondary uppercase">
                A Christian Community for Restoration
              </p>
            </div>

            {/* Headline */}
            <div
              className={`transform transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
                Restoration begins where deception ends.
              </h1>
            </div>

            {/* Supporting Narrative */}
            <div
              className={`transform transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="max-w-sm space-y-4">
                <p className="text-base md:text-lg text-rc-text leading-relaxed">
                  You already know what deception costs.
                </p>
                <p className="text-base md:text-lg text-rc-text leading-relaxed">
                  Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God.
                </p>
                <p className="text-base md:text-lg text-rc-text leading-relaxed">
                  Through Jesus Christ, restoration is possible.
                </p>
                <p className="text-base md:text-lg text-rc-text leading-relaxed">
                  And no one should have to walk that journey alone.
                </p>
              </div>
            </div>

            {/* Primary and Secondary CTAs */}
            <div
              className={`transform transition-all duration-700 pt-4 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-6 py-3 bg-rc-accent text-white text-sm font-medium rounded hover:bg-opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
                >
                  Begin the Journey
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center px-6 py-3 text-rc-accent text-sm font-medium hover:text-rc-text transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Trust Statement */}
            <div
              className={`transform transition-all duration-700 pt-4 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-xs md:text-sm text-rc-text-secondary tracking-wide">
                Guiding people toward honest work and living.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Atmospheric Image Placeholder (55%) */}
        <div className="hidden md:flex w-[55%] h-full relative">
          {/* Image Placeholder Container */}
          <div className="relative w-full h-full bg-gradient-to-br from-rc-warm-gray via-white to-rc-gold-light overflow-hidden">
            {/* Placeholder for Hero Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-rc-text-secondary opacity-40">
                <p className="text-sm font-medium">Hero Image Placeholder</p>
                <p className="text-xs mt-1">Person at window, morning light, Bible, reflection</p>
              </div>
            </div>

            {/* Subtle gradient overlay to create atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-rc-bg/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-xs text-rc-text-secondary uppercase tracking-widest mb-3 opacity-40">
          Scroll
        </p>
        <svg
          className="w-5 h-5 text-rc-text-secondary opacity-40 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
