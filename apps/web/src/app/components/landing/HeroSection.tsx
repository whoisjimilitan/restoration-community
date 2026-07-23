'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full bg-rc-bg">
      {/* SCENE ONE: Arrival — Peaceful room. Almost silence. Large breathing room. */}
      <div className="min-h-screen md:min-h-[120vh] flex flex-col justify-center px-6 sm:px-8 md:px-12 pt-32 md:pt-0">
        <div className="max-w-xl mx-auto">
          {/* Eyebrow — settles the visitor */}
          <div
            className={`transform transition-all duration-1000 mb-16 md:mb-24 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-xs md:text-sm font-medium text-rc-accent uppercase tracking-widest">
              A Christian Community for Restoration
            </p>
          </div>

          {/* Headline — allows space to settle before speaking */}
          <div
            className={`transform transition-all duration-1000 mb-12 md:mb-16 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-rc-text leading-tight">
              Restoration begins where deception ends.
            </h1>
          </div>

          {/* Supporting copy — quiet, not rushed */}
          <div
            className={`transform transition-all duration-1000 space-y-8 md:space-y-10 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
              You already know what deception costs.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
              Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
              Through Jesus Christ, restoration is possible. And no one should have to walk that journey alone.
            </p>
          </div>

          {/* Invitation buttons — subtle, not aggressive */}
          <div
            className={`transform transition-all duration-1000 pt-16 md:pt-20 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-rc-accent border border-rc-accent hover:bg-rc-accent hover:text-white transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
              >
                Begin the Journey
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-rc-text-secondary hover:text-rc-text transition-colors duration-300"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator — almost disappears */}
        <div className="hidden md:flex absolute bottom-12 left-1/2 transform -translate-x-1/2 flex-col items-center opacity-30 hover:opacity-60 transition-opacity duration-500">
          <p className="text-xs text-rc-text-secondary uppercase tracking-widest mb-2">Scroll</p>
          <svg className="w-4 h-4 text-rc-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
