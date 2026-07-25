'use client';

import Link from 'next/link';

export default function FinalInvitationSection() {
  return (
    <section style={{
      backgroundColor: '#F5F5F4',
      paddingTop: '6rem',
      paddingBottom: '6rem',
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
          marginBottom: '2rem',
          marginTop: 0
        }}>
          Every meaningful journey begins with truth.
        </h2>

        <p style={{
          fontSize: '1.125rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#2a2a2a',
          lineHeight: 1.8,
          letterSpacing: '-0.003em',
          marginBottom: '0.75rem',
          marginTop: 0
        }}>
          The hardest part of restoration is rarely admitting that something has gone wrong.
        </p>

        <p style={{
          fontSize: '1.125rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#2a2a2a',
          lineHeight: 1.8,
          letterSpacing: '-0.003em',
          marginBottom: '0.75rem',
          marginTop: 0
        }}>
          The hardest part is allowing truth to restore reality.
        </p>

        <p style={{
          fontSize: '1.125rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#2a2a2a',
          lineHeight: 1.8,
          letterSpacing: '-0.003em',
          marginBottom: '3rem',
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
            padding: '1rem 2.5rem',
            backgroundColor: '#555555',
            color: 'white',
            fontSize: '0.95rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            border: '2px solid #555555',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3a3a3a';
            e.currentTarget.style.borderColor = '#3a3a3a';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#555555';
            e.currentTarget.style.borderColor = '#555555';
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
