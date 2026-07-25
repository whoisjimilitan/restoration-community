'use client';

import Link from 'next/link';

export default function FounderTestimonySection() {
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
          fontSize: '2rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#0a0a0a',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '2.5rem',
          marginTop: 0
        }}>
          A Message From Someone Who Walked This Road
        </h2>

        <div style={{
          borderLeft: '3px solid #0F766E',
          paddingLeft: '2rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#202124',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            I was once trapped like you.
          </p>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#202124',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            I knew the life I was living was wrong, but I did not know how to escape it.
          </p>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#202124',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            But Jesus Christ found me.
          </p>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#202124',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            He delivered me completely.
          </p>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#202124',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: '0 0 1.25rem 0',
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            He gave me a new identity, a new direction, and a new purpose.
          </p>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'Georgia, Garamond, serif',
            color: '#202124',
            lineHeight: 1.8,
            letterSpacing: '-0.004em',
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 400
          }}>
            Now I help others receive their deliverance from Him.
          </p>
        </div>

        <Link
          href="#"
          style={{
            color: '#0F766E',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            cursor: 'pointer',
            transition: 'color 300ms ease',
            fontWeight: 500,
            letterSpacing: '0.02em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0a5c59';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#0F766E';
          }}
        >
          Read My Full Story →
        </Link>
      </div>
    </section>
  );
}
