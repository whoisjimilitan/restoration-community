'use client';

export default function WhatHappensNextSection() {
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
          fontSize: '2.25rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#202124',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '2rem',
          marginTop: 0
        }}>
          What Happens Next
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontFamily: 'Georgia, Garamond, serif',
              fontWeight: 700,
              color: '#202124',
              marginBottom: '0.75rem',
              marginTop: 0
            }}>
              You begin
            </h3>
            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              lineHeight: 1.6,
              marginBottom: 0,
              marginTop: 0
            }}>
              Join our community of people walking the same journey. Connect with peers, find mentoring, and begin the work of restoration.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontFamily: 'Georgia, Garamond, serif',
              fontWeight: 700,
              color: '#202124',
              marginBottom: '0.75rem',
              marginTop: 0
            }}>
              You grow
            </h3>
            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              lineHeight: 1.6,
              marginBottom: 0,
              marginTop: 0
            }}>
              Follow a clear path of seven stages: truth, confession, repentance, forgiveness, reconciliation, honest work, and serving others.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontFamily: 'Georgia, Garamond, serif',
              fontWeight: 700,
              color: '#202124',
              marginBottom: '0.75rem',
              marginTop: 0
            }}>
              You lead
            </h3>
            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              lineHeight: 1.6,
              marginBottom: 0,
              marginTop: 0
            }}>
              As you experience restoration, you guide others. The journey doesn&apos;t end at personal change—it leads to serving others.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
