'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#F8F6F2', overflow: 'hidden' }}>
      {/* Hero Container: Asymmetrical Split */}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
        {/* Left Side: Narrative (45% on desktop, 100% on mobile) */}
        <div style={{
          width: '100%',
          maxWidth: '45%',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          <div style={{ maxWidth: '500px' }}>
            {/* Eyebrow */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 700ms ease-out',
                transitionDelay: '100ms',
                marginBottom: '2rem'
              }}
            >
              <p style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.08em', color: '#8B8680', textTransform: 'uppercase' }}>
                A Christian Community for Restoration
              </p>
            </div>

            {/* Headline */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 700ms ease-out',
                transitionDelay: '150ms',
                marginBottom: '2.5rem'
              }}
            >
              <h1 style={{ fontSize: '3.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#202124', lineHeight: 1.15 }}>
                Restoration begins where deception ends.
              </h1>
            </div>

            {/* Supporting Narrative */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 700ms ease-out',
                transitionDelay: '200ms'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '1.125rem', color: '#202124', lineHeight: 1.65 }}>
                  You already know what deception costs.
                </p>
                <p style={{ fontSize: '1.125rem', color: '#202124', lineHeight: 1.65 }}>
                  Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God.
                </p>
                <p style={{ fontSize: '1.125rem', color: '#202124', lineHeight: 1.65 }}>
                  Through Jesus Christ, restoration is possible.
                </p>
                <p style={{ fontSize: '1.125rem', color: '#202124', lineHeight: 1.65 }}>
                  And no one should have to walk that journey alone.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 700ms ease-out',
                transitionDelay: '250ms',
                marginTop: '2rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <Link
                href="/auth/register"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#0F766E',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'opacity 200ms'
                }}
              >
                Begin the Journey
              </Link>
              <Link
                href="#about"
                style={{
                  padding: '0.75rem 1.5rem',
                  color: '#0F766E',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'color 200ms'
                }}
              >
                Learn More
              </Link>
            </div>

            {/* Trust Statement */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 700ms ease-out',
                transitionDelay: '300ms',
                marginTop: '1rem'
              }}
            >
              <p style={{ fontSize: '0.75rem', color: '#8B8680', letterSpacing: '0.06em' }}>
                Guiding people toward honest work and living.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Atmosphere (hidden on mobile) */}
        <div style={{
          display: 'none',
          width: '55%',
          height: '100%',
          position: 'relative'
        }} className="hidden md:block">
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom right, #E8E3DC, white, #E8DCC8)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', color: '#8B8680', opacity: 0.4 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Hero Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.4
      }}>
        <p style={{ fontSize: '0.75rem', color: '#8B8680', letterSpacing: '0.08em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
          Scroll
        </p>
        <svg style={{ width: '1.25rem', height: '1.25rem', color: '#8B8680', animation: 'pulse 2s infinite' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
