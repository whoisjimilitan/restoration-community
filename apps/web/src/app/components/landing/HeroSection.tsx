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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '5rem',
      paddingBottom: '6rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Atmospheric Gradient Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #FAFAF8 0%, #F8F6F2 40%, #F5F3F0 100%)',
        zIndex: -2
      }} />

      {/* Radial Light */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 120% 100% at 50% -10%, rgba(255, 255, 255, 0.5) 0%, transparent 60%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      {/* Depth Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 30%, rgba(0, 0, 0, 0.03) 100%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{
        maxWidth: '640px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Eyebrow */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '100ms',
            marginBottom: '1.5rem'
          }}
        >
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: '#888888',
            textTransform: 'uppercase',
            margin: 0,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}>
            Deliverance Through Jesus Christ
          </p>
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '150ms',
            marginBottom: '2rem'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#0a0a0a',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Restoration begins where deception ends.
          </h1>
        </div>

        {/* Narrative - 4-Part Arc (VERSION B) - Single Flowing Paragraph */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '200ms',
            marginBottom: '3rem'
          }}
        >
          <p style={{
            fontSize: '1.125rem',
            color: '#202124',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: 0,
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 400
          }}>
            You already know what deception costs. Perhaps what has remained hidden is that our deepest need is not simply freedom from wrongdoing, but reconciliation with God. Through Jesus Christ, restoration is possible. And no one should have to walk that journey alone.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '250ms',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2.5rem'
          }}
        >
          <Link
            href="/deliverance"
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: '#0F766E',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0a5c59';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 118, 110, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0F766E';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            I Need Deliverance
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.4,
          cursor: 'default',
          transition: 'opacity 300ms ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.7';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.4';
        }}
      >
        <p style={{
          fontSize: '0.7rem',
          color: '#888888',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 0.75rem 0',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontWeight: 500
        }}>
          Scroll
        </p>
      </div>
    </section>
  );
}
