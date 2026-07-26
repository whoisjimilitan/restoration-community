'use client';

import Link from 'next/link';

export default function FinalInvitationSection() {
  return (
    <section style={{
      backgroundColor: '#FFFFFF',
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.25rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#0a0a0a',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '2rem',
          marginTop: 0
        }}>
          Every meaningful journey begins with truth.
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.004em',
          marginBottom: '1rem',
          marginTop: 0
        }}>
          The hardest part of restoration is rarely admitting that something has gone wrong.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.004em',
          marginBottom: '1rem',
          marginTop: 0
        }}>
          The hardest part is allowing truth to restore reality.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.004em',
          marginBottom: '2.5rem',
          marginTop: 0
        }}>
          This community exists because every lasting restoration begins there.
        </p>

        <Link
          href="/journey"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.875rem 2rem',
            backgroundColor: '#0F766E',
            color: 'white',
            fontSize: '0.95rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            borderRadius: '0.5rem',
            textDecoration: 'none',
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
          Explore the Restoration Journey
        </Link>
      </div>
    </section>
  );
}
