'use client';

import Link from 'next/link';

export default function FounderTestimonySection() {
  return (
    <section style={{
      backgroundColor: '#FFFFFF',
      paddingTop: '4rem',
      paddingBottom: '4rem',
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#202124',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '1.5rem',
          marginTop: 0
        }}>
          A Message from Someone Who Walked This Road
        </h2>

        <div style={{
          borderLeft: '4px solid #0F766E',
          paddingLeft: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.7,
            letterSpacing: '-0.005em',
            margin: '0 0 1.25rem 0',
            fontStyle: 'italic'
          }}>
            I was once trapped like you. Jesus Christ delivered me completely. Now I help others receive their deliverance from Him.
          </p>
        </div>

        <Link
          href="/founder-story"
          style={{
            color: '#0F766E',
            textDecoration: 'underline',
            fontSize: '1rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0a5c59';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#0F766E';
          }}
        >
          Read My Story
        </Link>
      </div>
    </section>
  );
}
