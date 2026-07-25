'use client';

import Link from 'next/link';

export default function FinalInvitationSection() {
  return (
    <section style={{
      backgroundColor: '#F8F6F2',
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#202124',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '1.5rem',
          marginTop: 0
        }}>
          Ready to Take the First Step?
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.005em',
          marginBottom: '3rem',
          marginTop: 0
        }}>
          The first step is a confession. Open your heart to the possibility that Jesus Christ can deliver you. Take a moment to acknowledge where you are. God is listening.
        </p>

        <Link
          href="/deliverance"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 2.5rem',
            backgroundColor: '#0F766E',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            border: '2px solid #0F766E',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0a5c59';
            e.currentTarget.style.borderColor = '#0a5c59';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 118, 110, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0F766E';
            e.currentTarget.style.borderColor = '#0F766E';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          I Need Deliverance
        </Link>

        <p style={{
          fontSize: '0.875rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#8B8680',
          lineHeight: 1.6,
          marginTop: '2rem',
          marginBottom: 0
        }}>
          No registration. No pressure. Just the beginning of your encounter with Jesus Christ.
        </p>
      </div>
    </section>
  );
}
