'use client';

import Link from 'next/link';

export default function PartnershipSection() {
  return (
    <section id="partnership" style={{
      backgroundColor: '#FFFFFF',
      paddingTop: '4rem',
      paddingBottom: '4rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      borderTop: '1px solid #E8E6E1'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.25rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#202124',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '1.5rem',
          marginTop: 0
        }}>
          Partner With This Mission
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.005em',
          marginBottom: '1.25rem',
          marginTop: 0
        }}>
          This ministry exists because people who believe in this mission choose to stand with us.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.005em',
          marginBottom: '2rem',
          marginTop: 0
        }}>
          If you would like to support what Jesus Christ is doing through this work, contact us to learn how you can partner with us.
        </p>

        <Link
          href="mailto:contact@restoration.local"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.875rem 1.75rem',
            backgroundColor: 'transparent',
            color: '#0F766E',
            fontSize: '0.9375rem',
            fontWeight: 500,
            letterSpacing: '0.01em',
            textDecoration: 'none',
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
          Partner With Us
        </Link>
      </div>
    </section>
  );
}
