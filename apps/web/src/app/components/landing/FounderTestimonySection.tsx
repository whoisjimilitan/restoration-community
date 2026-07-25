'use client';

import Link from 'next/link';

export default function FounderTestimonySection() {
  return (
    <section style={{
      backgroundColor: '#FFFFFF',
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
          fontSize: '2rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          marginBottom: '2.5rem',
          marginTop: 0
        }}>
          A Message from Someone Who Walked This Road
        </h2>

        <div style={{
          borderLeft: '3px solid #555555',
          paddingLeft: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'left'
        }}>
          <p style={{
            fontSize: '1.1875rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#2a2a2a',
            lineHeight: 1.8,
            letterSpacing: '-0.005em',
            margin: '0 0 1.5rem 0',
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            I was once trapped like you.
          </p>

          <p style={{
            fontSize: '1.1875rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#2a2a2a',
            lineHeight: 1.8,
            letterSpacing: '-0.005em',
            margin: '0 0 1.5rem 0',
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            Jesus Christ delivered me completely.
          </p>

          <p style={{
            fontSize: '1.1875rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#2a2a2a',
            lineHeight: 1.8,
            letterSpacing: '-0.005em',
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            Now I help others receive their deliverance from Him.
          </p>
        </div>

        <Link
          href="/founder-story"
          style={{
            color: '#555555',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fontWeight: 500,
            letterSpacing: '0.02em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3a3a3a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#555555';
          }}
        >
          Read My Full Story →
        </Link>
      </div>
    </section>
  );
}
