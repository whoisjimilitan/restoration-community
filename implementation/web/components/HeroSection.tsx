'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Hero Section for Restoration Community
 *
 * Governance Foundation:
 * - Book Four: Platform must communicate identity from first moment
 * - Book Three: Platform is first doorway into community
 * - Core Principle: Visitor should feel entering a community, not a system
 */

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-center items-start px-6 py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAFAF9 0%, #F5F3F0 100%)',
      }}
    >
      {/* Atmospheric Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% -10%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
        }}
      />

      {/* Subtle Depth Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 30%, rgba(0, 0, 0, 0.02) 100%)',
        }}
      />

      {/* Content Container */}
      <div className="hero-container relative z-10">
        {/* Eyebrow */}
        <div
          className="mb-8"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '100ms',
          }}
        >
          <p className="text-eyebrow">A Christian Community for Restoration</p>
        </div>

        {/* Main Headline */}
        <div
          className="mb-8"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '150ms',
          }}
        >
          <h1 className="text-headline-lg">Your past does not define your future in Christ.</h1>
        </div>

        {/* Narrative */}
        <div
          className="mb-10"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '200ms',
          }}
        >
          <p className="text-body-lg mb-5">
            You know what deception costs. You understand the weight of shame, the fear of judgment, the loneliness of carrying secrets.
          </p>
          <p className="text-body-lg mb-5">
            What you may not yet know is that restoration is possible—not through shame or punishment, but through grace. Through Jesus Christ, people are experiencing genuine transformation, rebuilding relationships, finding purpose in honest work, and discovering they are not walking this journey alone.
          </p>
          <p className="text-body-lg">
            The Restoration Community exists for people like you—people ready to be honest, to receive help, and to walk alongside others who understand.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex gap-4 flex-wrap mb-8"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '250ms',
          }}
        >
          <Link href="/auth/register" className="btn-primary">
            Begin Your Journey
          </Link>
          <Link href="#pillars" className="btn-secondary">
            Learn More
          </Link>
        </div>

        {/* Trust Statement */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '300ms',
            paddingTop: '1.5rem',
          }}
        >
          <p className="text-eyebrow">Guiding people toward honest work and living.</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-6 flex flex-col items-center cursor-default"
        style={{
          opacity: 0.4,
          transition: 'opacity 300ms ease-out',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.4';
        }}
      >
        <p className="text-eyebrow mb-3">Scroll</p>
        <svg
          className="w-5 h-5 text-rc-warm-gray animate-bounce"
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
