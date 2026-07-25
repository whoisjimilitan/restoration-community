'use client';

export default function WhatHappensNextSection() {
  const stages = [
    { number: 1, name: 'Truth', description: 'Facing the reality of where you are.' },
    { number: 2, name: 'Confession', description: 'Bringing your life before God.' },
    { number: 3, name: 'Repentance', description: 'Turning from the old way.' },
    { number: 4, name: 'Forgiveness', description: 'Receiving the freedom Christ gives.' },
    { number: 5, name: 'Reconciliation', description: 'Restoring what was broken.' },
    { number: 6, name: 'Honest Work', description: 'Building a life of truth and integrity.' },
    { number: 7, name: 'Serving', description: 'Becoming a testimony that helps others.' }
  ];

  return (
    <section style={{
      backgroundColor: '#F9F9F8',
      paddingTop: '6rem',
      paddingBottom: '8rem',
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
          color: '#1a1a1a',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '1rem',
          marginTop: 0,
          textAlign: 'center'
        }}>
          After Deliverance Comes Restoration
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#2a2a2a',
          lineHeight: 1.8,
          letterSpacing: '-0.003em',
          marginBottom: '3.5rem',
          marginTop: 0,
          textAlign: 'center'
        }}>
          Deliverance is not the end. It is the beginning of a new life with Jesus Christ.
        </p>

        {/* Visual Journey - Connected Circles */}
        <div style={{
          marginBottom: '4rem',
          overflowX: 'auto',
          paddingBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 'min-content',
            gap: '1.5rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem'
          }}>
            {stages.map((stage, index) => (
              <div key={stage.number} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem'
              }}>
                {/* Stage Circle */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #888888',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative'
                }}>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#555555',
                    margin: 0,
                    fontFamily: 'Georgia, Garamond, serif'
                  }}>
                    {stage.number}
                  </p>
                </div>

                {/* Connecting Line */}
                {index < stages.length - 1 && (
                  <div style={{
                    width: '2.5rem',
                    height: '2px',
                    backgroundColor: '#CCCCCC',
                    flexShrink: 0
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stage Names - Horizontal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
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
                color: '#1a1a1a',
                margin: 0,
                letterSpacing: '0.01em'
              }}>
                {stage.name}
              </p>
            </div>
          ))}
        </div>

        {/* Stage Descriptions - Detailed */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          marginTop: '3rem'
        }}>
          {stages.map((stage) => (
            <div key={stage.number} style={{
              backgroundColor: '#FFFFFF',
              padding: '2rem',
              borderRadius: '0.5rem',
              borderLeft: '3px solid #888888'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontFamily: 'Georgia, Garamond, serif',
                fontWeight: 700,
                color: '#1a1a1a',
                marginTop: 0,
                marginBottom: '0.75rem'
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
