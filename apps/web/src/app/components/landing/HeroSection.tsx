'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#F8F6F2',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      {/* FORENSIC AUDIT 001 — Hero Version Marker */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '2rem',
        fontSize: '0.625rem',
        color: '#8B8680',
        fontFamily: 'monospace',
        backgroundColor: 'rgba(139, 134, 128, 0.1)',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        border: '1px solid rgba(139, 134, 128, 0.2)'
      }}>
        <div>🔬 HERO VERSION</div>
        <div>Commit: c103f5c</div>
        <div>Layout: Full-width vertical</div>
        <div>Inline styles: YES</div>
      </div>

      <div style={{
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Eyebrow */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 700ms ease-out',
            transitionDelay: '100ms',
            marginBottom: '2.5rem'
          }}
        >
          <p style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#8B8680',
            textTransform: 'uppercase',
            margin: 0
          }}>
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
          <h1 style={{
            fontSize: '3.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            color: '#202124',
            lineHeight: 1.15,
            margin: 0
          }}>
            Restoration begins where deception ends.
          </h1>
        </div>

        {/* Narrative */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 700ms ease-out',
            transitionDelay: '200ms',
            marginBottom: '2.5rem'
          }}
        >
          <p style={{
            fontSize: '1.125rem',
            color: '#202124',
            lineHeight: 1.65,
            margin: '0 0 1rem 0'
          }}>
            You already know what deception costs.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#202124',
            lineHeight: 1.65,
            margin: '0 0 1rem 0'
          }}>
            Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#202124',
            lineHeight: 1.65,
            margin: '0 0 1rem 0'
          }}>
            Through Jesus Christ, restoration is possible.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#202124',
            lineHeight: 1.65,
            margin: 0
          }}>
            And no one should have to walk that journey alone.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 700ms ease-out',
            transitionDelay: '250ms',
            marginBottom: '2rem',
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
            transitionDelay: '300ms'
          }}
        >
          <p style={{
            fontSize: '0.75rem',
            color: '#8B8680',
            letterSpacing: '0.06em',
            margin: 0
          }}>
            Guiding people toward honest work and living.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.4
      }}>
        <p style={{
          fontSize: '0.75rem',
          color: '#8B8680',
          letterSpacing: '0.08em',
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
          margin: '0 0 0.75rem 0'
        }}>
          Scroll
        </p>
        <svg style={{ width: '1.25rem', height: '1.25rem', color: '#8B8680' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
