'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface UserData {
  name: string;
}

const STAGES = [
  {
    number: 1,
    name: 'Truth',
    description: 'Acknowledge where you truly are. No hiding. No shame.',
    color: '#E8F4F3',
    textColor: '#0D5E57',
    status: 'current' // Stage 1 is always current for new users
  },
  {
    number: 2,
    name: 'Confession',
    description: 'Speak what has been hidden. Words bring freedom.',
    color: '#F0F0F0',
    textColor: '#999999',
    status: 'locked'
  },
  {
    number: 3,
    name: 'Repentance',
    description: 'Turn away from the old path. Choose a new direction.',
    color: '#F0F0F0',
    textColor: '#999999',
    status: 'locked'
  },
  {
    number: 4,
    name: 'Forgiveness',
    description: 'Receive forgiveness through Jesus Christ.',
    color: '#F0F0F0',
    textColor: '#999999',
    status: 'locked'
  },
  {
    number: 5,
    name: 'Reconciliation',
    description: 'Restore relationships broken by deception.',
    color: '#F0F0F0',
    textColor: '#999999',
    status: 'locked'
  },
  {
    number: 6,
    name: 'Honest Work',
    description: 'Build a life founded on truth and integrity.',
    color: '#F0F0F0',
    textColor: '#999999',
    status: 'locked'
  },
  {
    number: 7,
    name: 'Serving',
    description: 'Your freedom becomes others&apos; hope. Serve in love.',
    color: '#F0F0F0',
    textColor: '#999999',
    status: 'locked'
  }
];

export default function DashboardStagesPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from session or localStorage
    // For now, extract from localStorage or use a placeholder
    const userName = localStorage.getItem('user_name') || 'Friend';
    setUser({ name: userName });
    setLoading(false);

    console.log('[DASHBOARD-STAGES] User loaded:', userName);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAF8' }}>
        <p style={{ fontSize: '1rem', color: '#999' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem', backgroundColor: '#FAFAF8' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            marginBottom: '0.5rem',
            marginTop: 0
          }}>
            W<span style={{ fontStyle: 'italic' }}>e</span>lcom<span style={{ fontStyle: 'italic' }}>e</span>, {user?.name}
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.7,
            marginBottom: '1rem',
            marginTop: 0
          }}>
            Your journ<span style={{ fontStyle: 'italic' }}>e</span>y toward d<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>ranc<span style={{ fontStyle: 'italic' }}>e</span> b<span style={{ fontStyle: 'italic' }}>e</span>gins h<span style={{ fontStyle: 'italic' }}>e</span>r<span style={{ fontStyle: 'italic' }}>e</span>.
          </p>

          <div style={{ backgroundColor: '#F8F6F2', padding: '1.5rem', borderRadius: '0.5rem', display: 'inline-block' }}>
            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#0D5E57',
              margin: 0,
              fontWeight: 600
            }}>
              Stag<span style={{ fontStyle: 'italic' }}>e</span> 1: <span style={{ fontStyle: 'italic' }}>e</span>T ruth is r<span style={{ fontStyle: 'italic' }}>e</span>ady for you.
            </p>
          </div>
        </div>

        {/* Stages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {STAGES.map((stage) => (
            <div
              key={stage.number}
              style={{
                backgroundColor: stage.color,
                borderRadius: '0.5rem',
                padding: '2rem',
                border: stage.status === 'current' ? '2px solid #0D5E57' : '1px solid #DDD',
                opacity: stage.status === 'locked' ? 0.6 : 1,
                cursor: stage.status === 'current' ? 'pointer' : 'not-allowed',
                transition: 'all 300ms ease',
                transform: stage.status === 'current' ? 'scale(1.02)' : 'scale(1)',
                boxShadow: stage.status === 'current' ? '0 4px 12px rgba(13, 94, 87, 0.15)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (stage.status === 'current') {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(13, 94, 87, 0.25)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (stage.status === 'current') {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(13, 94, 87, 0.15)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                }
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: stage.textColor,
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  fontFamily: 'Georgia, Garamond, serif'
                }}>
                  {stage.number}
                </div>

                {stage.status === 'locked' && (
                  <span style={{
                    marginLeft: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: stage.textColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Locked
                  </span>
                )}

                {stage.status === 'current' && (
                  <span style={{
                    marginLeft: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: stage.textColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Start H<span style={{ fontStyle: 'italic' }}>e</span>r<span style={{ fontStyle: 'italic' }}>e</span>
                  </span>
                )}
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontFamily: 'Georgia, Garamond, serif',
                fontWeight: 700,
                color: stage.textColor,
                marginBottom: '0.5rem',
                marginTop: 0
              }}>
                {stage.name}
              </h3>

              <p style={{
                fontSize: '1rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                color: stage.textColor,
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                marginTop: 0
              }}>
                {stage.description}
              </p>

              {stage.status === 'current' && (
                <Link
                  href={`/dashboard/stage/${stage.number}`}
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#0D5E57',
                    color: 'white',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 300ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0a4a47';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0D5E57';
                  }}
                >
                  B<span style={{ fontStyle: 'italic' }}>e</span>gin
                </Link>
              )}

              {stage.status === 'locked' && (
                <div style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#E0E0E0',
                  color: '#666',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  borderRadius: '0.375rem',
                  textAlign: 'center'
                }}>
                  Coming Soon
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Info */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: '0.5rem',
          border: '1px solid #E5E5E5'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            marginBottom: '1rem',
            marginTop: 0
          }}>
            Your Journ<span style={{ fontStyle: 'italic' }}>e</span>y
          </h2>

          <p style={{
            fontSize: '1rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.6,
            marginBottom: '1rem',
            marginTop: 0
          }}>
            Each stage builds on the pr<span style={{ fontStyle: 'italic' }}>e</span>vious on<span style={{ fontStyle: 'italic' }}>e</span>. Take your tim<span style={{ fontStyle: 'italic' }}>e</span>. Th<span style={{ fontStyle: 'italic' }}>e</span>r<span style={{ fontStyle: 'italic' }}>e</span> is no rush.
          </p>

          <p style={{
            fontSize: '1rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.6,
            marginBottom: 0,
            marginTop: 0
          }}>
            Wh<span style={{ fontStyle: 'italic' }}>e</span>n you complet<span style={{ fontStyle: 'italic' }}>e</span> Stag<span style={{ fontStyle: 'italic' }}>e</span> 1: Truth, th<span style={{ fontStyle: 'italic' }}>e</span> n<span style={{ fontStyle: 'italic' }}>e</span>xt stag<span style={{ fontStyle: 'italic' }}>e</span> will unlo<span style={{ fontStyle: 'italic' }}>c</span>k automatically. Our r<span style={{ fontStyle: 'italic' }}>e</span>stor<span style={{ fontStyle: 'italic' }}>e</span>d comm<span style={{ fontStyle: 'italic' }}>e</span>unity and Brother Jimi ar<span style={{ fontStyle: 'italic' }}>e</span> h<span style={{ fontStyle: 'italic' }}>e</span>r<span style={{ fontStyle: 'italic' }}>e</span> to walk with you.
          </p>
        </div>
      </div>
    </div>
  );
}
