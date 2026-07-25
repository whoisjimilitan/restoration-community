'use client';

export default function WhatHappensNextSection() {
  const stages = [
    { number: 1, name: 'Truth', description: 'Facing your reality honestly before God. No hiding. No excuses.' },
    { number: 2, name: 'Confession', description: 'Turning away from deception and bringing your past before Jesus Christ.' },
    { number: 3, name: 'Repentance', description: 'Leaving behind the old life and choosing a new direction.' },
    { number: 4, name: 'Forgiveness', description: 'Receiving God\'s forgiveness and learning to walk in freedom.' },
    { number: 5, name: 'Reconciliation', description: 'Beginning the work of restoring broken relationships and trust.' },
    { number: 6, name: 'Honest Work', description: 'Building a life of integrity, purpose, and honest living.' },
    { number: 7, name: 'Serving', description: 'Becoming a witness of God\'s work and helping others find freedom.' }
  ];

  return (
    <section style={{
      backgroundColor: '#F9F9F8',
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.25rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#0a0a0a',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '1rem',
          marginTop: 0,
          textAlign: 'center'
        }}>
          Restoration was never meant to happen alone.
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.004em',
          marginBottom: '3rem',
          marginTop: 0,
          textAlign: 'center'
        }}>
          Mentors. Prayer. Scripture. Honest conversations. Faithful encouragement. Real relationships.
        </p>

        {/* Visual 7-Stage Journey - Connected Circles */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '4rem',
          overflowX: 'auto',
          paddingBottom: '1rem'
        }}>
          {stages.map((stage, index) => (
            <div key={stage.number} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {/* Circle */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #CCC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <p style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0F766E',
                  margin: 0,
                  fontFamily: 'Georgia, Garamond, serif'
                }}>
                  {stage.number}
                </p>
              </div>

              {/* Connecting Line */}
              {index < stages.length - 1 && (
                <div style={{
                  width: '2rem',
                  height: '2px',
                  backgroundColor: '#DDD',
                  flexShrink: 0
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Stage Names Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          {stages.map((stage) => (
            <div key={stage.number}>
              <p style={{
                fontSize: '0.95rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                color: '#0a0a0a',
                margin: 0,
                letterSpacing: '0.01em'
              }}>
                {stage.name}
              </p>
            </div>
          ))}
        </div>

        {/* Stage Descriptions - 3 Column */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {stages.map((stage) => (
            <div key={stage.number}>
              <h3 style={{
                fontSize: '0.95rem',
                fontFamily: 'Georgia, Garamond, serif',
                fontWeight: 700,
                color: '#0a0a0a',
                marginTop: 0,
                marginBottom: '0.5rem'
              }}>
                {stage.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                color: '#555555',
                lineHeight: 1.6,
                margin: 0
              }}>
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
