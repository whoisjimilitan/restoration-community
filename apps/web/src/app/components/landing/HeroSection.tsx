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
      alignItems: 'flex-start',
      paddingTop: '5rem',
      paddingBottom: '6rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      overflow: 'hidden'
    }}>
      {/* Atmospheric Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #FAFAF8 0%, #F8F6F2 40%, #F5F3F0 100%)',
        zIndex: -2
      }} />

      {/* Light Overlay */}
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
        maxWidth: '560px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Eyebrow */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '100ms',
            marginBottom: '3rem'
          }}
        >
          <p style={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: '#8B8680',
            textTransform: 'uppercase',
            margin: 0,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}>
            DELIVERANCE THROUGH JESUS CHRIST
          </p>
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '150ms',
            marginBottom: '2rem'
          }}
        >
          <h1 style={{
            fontSize: '3.75rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            You were not created to live trapped in deception.
          </h1>
        </div>

        {/* Narrative */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '200ms',
            marginBottom: '3.5rem'
          }}
        >
          <p style={{
            fontSize: '1.0625rem',
            color: '#202124',
            lineHeight: 1.7,
            letterSpacing: '-0.005em',
            margin: 0,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 400
          }}>
            If fraud, scams, or dishonest living have become part of your life, there is a way out. Jesus Christ delivers, restores, and leads people into a new life of truth and purpose.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '250ms',
            marginBottom: '2.5rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <Link
            href="/deliverance"
            style={{
              padding: '0.875rem 1.75rem',
              backgroundColor: '#0F766E',
              color: 'white',
              fontSize: '0.9375rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              display: 'inline-block',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid #0F766E',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0a5c59';
              e.currentTarget.style.borderColor = '#0a5c59';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(15, 118, 110, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0F766E';
              e.currentTarget.style.borderColor = '#0F766E';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            I Need Deliverance
          </Link>
          <Link
            href="#testimony"
            style={{
              padding: '0.875rem 1.75rem',
              color: '#0F766E',
              fontSize: '0.9375rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              display: 'inline-block',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(15, 118, 110, 0.3)',
              borderRadius: '0.375rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#202124';
              e.currentTarget.style.borderColor = '#202124';
              e.currentTarget.style.backgroundColor = 'rgba(15, 118, 110, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#0F766E';
              e.currentTarget.style.borderColor = 'rgba(15, 118, 110, 0.3)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            My Story
          </Link>
        </div>

        {/* Hero Closing Line */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '300ms',
            paddingTop: '1.5rem'
          }}
        >
          <p style={{
            fontSize: '0.9375rem',
            color: '#202124',
            letterSpacing: '-0.005em',
            margin: 0,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            fontStyle: 'italic'
          }}>
            The first step is not registration. It is confession.
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
        opacity: 0.4,
        transition: 'opacity 300ms ease-out',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.4';
      }}>
        <p style={{
          fontSize: '0.75rem',
          color: '#8B8680',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: '0 0 0.75rem 0',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontWeight: 500
        }}>
          Scroll
        </p>
        <svg
          style={{
            width: '1.25rem',
            height: '1.25rem',
            color: '#8B8680',
            animation: 'gentle-float 3s ease-in-out infinite'
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
