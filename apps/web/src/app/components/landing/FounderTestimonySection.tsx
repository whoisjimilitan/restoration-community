'use client';

import Link from 'next/link';

export default function FounderTestimonySection() {
  return (
    <section id="story" style={{
      backgroundColor: '#FFFFFF',
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#0F766E',
            fontWeight: 500,
            margin: '0 0 1rem 0',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Brother Jimi&apos;s Story of Deliverance
          </p>
          <h2 style={{
            fontSize: '2rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#0a0a0a',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            marginBottom: '0.5rem',
            marginTop: 0
          }}>
            How Jesus Christ Delivered Me
          </h2>
        </div>

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
            I know this life because I lived it.
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
            I knew the life I was living was wrong,
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
            but I could not find a way out.
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
            Then Jesus Christ found me.
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
            He gave me a new identity.
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
            A new direction.
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
            A new purpose.
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
            My story is not about what I changed.
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
            It is about the One who changed me.
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
            Today,
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
            I help others find that same Deliverer.
          </p>
        </div>

        <Link
          href="/story"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '1rem',
            fontWeight: 500,
            color: '#0F766E',
            textDecoration: 'none',
            transition: 'color 200ms',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0a5c59';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#0F766E';
          }}
        >
          Read My Full Story
        </Link>
      </div>
    </section>
  );
}
