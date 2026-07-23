'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-rc-bg">
      {/* Background gradient - subtle, not dominant */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white pointer-events-none" />

      {/* Main container */}
      <div className="relative h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 max-w-5xl mx-auto">

        {/* Content grid - vertical rhythm and generous spacing */}
        <div className="space-y-16 md:space-y-20 py-20 md:py-0">

          {/* Primary statement - Recognition */}
          <div
            className={`space-y-6 transform transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight tracking-tight">
              You know what it costs to live in <span className="text-teal-600">deception</span>.
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 font-light leading-relaxed max-w-2xl">
              We&apos;re not here to judge you for it. We&apos;re here because we understand it.
            </p>
          </div>

          {/* Secondary statement - Invitation to deeper reflection */}
          <div
            className={`space-y-6 transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              But the path forward doesn&apos;t begin with fixing what you&apos;ve done. It begins by seeing the truth about why you did it.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Truth restores reality. And from there, everything changes.
            </p>
          </div>

          {/* Tertiary statement - Hope grounded in Christ */}
          <div
            className={`space-y-6 transform transition-all duration-1000 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '360ms' }}
          >
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl font-light">
              No failure has the final word. No past places you beyond God&apos;s grace. Jesus Christ remains at the centre of restoration.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              And you don&apos;t have to walk this journey alone.
            </p>
          </div>

          {/* CTA - Invitation to explore, not commitment */}
          <div
            className={`pt-8 transform transition-all duration-1000 delay-900 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '480ms' }}
          >
            <Link
              href="/auth/register"
              className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            >
              Begin the restoration journey
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <p className="mt-6 text-sm text-gray-500">
              Or{' '}
              <Link href="#about" className="text-teal-600 hover:text-teal-700 font-medium">
                continue reading
              </Link>
              {' '}to understand more.
            </p>
          </div>

        </div>

        {/* Scroll indicator - subtle hint of more content */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Scroll</p>
          <svg className="w-5 h-5 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Responsive adjustments for smaller screens */}
      <style jsx>{`
        @media (max-width: 640px) {
          section {
            min-height: auto;
            padding-bottom: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
