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
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Premium Grey Background - Full Width */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #FAFAF9 0%, #F5F5F3 50%, #F0F0ED 100%)',
        zIndex: -2
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      {/* Left: Content - Premium Typography at Scale */}
      <div style={{
        paddingLeft: 'max(2rem, 5vw)',
        paddingRight: '3rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Eyebrow */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '100ms',
            marginBottom: '2rem'
          }}
        >
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            color: '#777777',
            textTransform: 'uppercase',
            margin: 0,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}>
            Christian Community for Restoration
          </p>
        </div>

        {/* Headline - Powerful, Large */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '200ms',
            marginBottom: '2.5rem'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#0a0a0a',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Restoration begins where deception ends.
          </h1>
        </div>

        {/* Theological Narrative */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '300ms',
            marginBottom: '2.5rem',
            maxWidth: '520px'
          }}
        >
          <p style={{
            fontSize: '1.125rem',
            color: '#333333',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 400
          }}>
            You already know what deception costs.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#333333',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 400
          }}>
            Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#333333',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 400
          }}>
            Through Jesus Christ, restoration is possible.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#333333',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: 0,
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 400
          }}>
            And no one should have to walk that journey alone.
          </p>
        </div>

        {/* CTA - Premium Button */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '400ms',
            marginTop: '3rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <Link
            href="/journey"
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: '#3a3a3a',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 450ms cubic-bezier(0.16, 1, 0.3, 1)',
              border: '1.5px solid #3a3a3a',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.borderColor = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3a3a3a';
              e.currentTarget.style.borderColor = '#3a3a3a';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Begin the Journey
          </Link>
        </div>
      </div>

      {/* Right: Visual Accent - Empty Space for Breathing */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 'max(2rem, 5vw)'
      }}>
        <div style={{
          width: '100%',
          height: '60%',
          background: 'linear-gradient(135deg, rgba(100, 100, 100, 0.03) 0%, rgba(120, 120, 120, 0.05) 100%)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(150, 150, 150, 0.1)'
        }} />
      </div>
    </section>
  );
}
