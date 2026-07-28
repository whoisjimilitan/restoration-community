'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STAGES = [
  { number: 1, name: 'Truth', sequence: 1, status: 'current' },
  { number: 2, name: 'Confession', sequence: 2, status: 'locked' },
  { number: 3, name: 'Repentance', sequence: 3, status: 'locked' },
  { number: 4, name: 'Forgiveness', sequence: 4, status: 'locked' },
  { number: 5, name: 'Reconciliation', sequence: 5, status: 'locked' },
  { number: 6, name: 'Honest Work', sequence: 6, status: 'locked' },
  { number: 7, name: 'Serving', sequence: 7, status: 'locked' }
];

export default function DashboardStagesPage() {
  const [displayName, setDisplayName] = useState('Friend');

  useEffect(() => {
    const userName = localStorage.getItem('user_name') || 'Friend';
    setDisplayName(userName);
  }, []);

  const currentStage = STAGES[0]; // Stage 1 is always current for new users
  const progressPercent = ((currentStage.sequence - 1) / 6) * 100;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 32px 48px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '12px',
            marginTop: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Welcome back, {displayName}
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666666',
            margin: '0',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            You&apos;re on a journey of restoration. Here&apos;s what&apos;s next.
          </p>
        </div>

        {/* Current Journey Status Card */}
        <div style={{
          marginBottom: '32px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '24px',
          backgroundColor: '#ffffff'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '8px',
              marginTop: 0,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Your Restoration Journey
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#999999',
              margin: '0',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Stage {currentStage.sequence} of 7
            </p>
          </div>

          {/* Stage Display */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: '#e8f4f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#0D5E57',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {currentStage.sequence}
                </span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  marginBottom: '4px',
                  marginTop: 0,
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {currentStage.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  margin: '0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  You&apos;re here right now
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Progress
                </label>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0D5E57',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e5e5e5',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#0D5E57',
                  transition: 'width 300ms ease'
                }} />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ paddingTop: '16px' }}>
            <Link
              href="/dashboard/stage/1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 16px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#0D5E57',
                textDecoration: 'none',
                transition: 'color 200ms ease',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#0a4a47';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#0D5E57';
              }}
            >
              Continue to Stage 1 →
            </Link>
          </div>
        </div>

        {/* All Stages Grid */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '16px',
            marginTop: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            All Stages
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {STAGES.map((stage) => (
              <div
                key={stage.number}
                style={{
                  border: stage.status === 'current' ? '2px solid #0D5E57' : '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: stage.status === 'current' ? '#f9fffe' : '#ffffff',
                  opacity: stage.status === 'locked' ? 0.6 : 1
                }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: stage.status === 'current' ? '#0D5E57' : '#e5e5e5',
                    color: stage.status === 'current' ? 'white' : '#999999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {stage.sequence}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  marginBottom: '4px',
                  marginTop: 0,
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {stage.name}
                </h3>
                {stage.status === 'locked' && (
                  <p style={{
                    fontSize: '12px',
                    color: '#999999',
                    margin: '0',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Locked
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
