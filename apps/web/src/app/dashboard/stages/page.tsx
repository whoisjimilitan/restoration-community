'use client';

import { useState, useEffect } from 'react';

const STAGES = [
  { number: 1, name: 'Truth', color: '#E8F4F3', textColor: '#0D5E57' },
  { number: 2, name: 'Confession', color: '#D1EEEA', textColor: '#0D5E57' },
  { number: 3, name: 'Repentance', color: '#B3E5E0', textColor: '#0D5E57' },
  { number: 4, name: 'Forgiveness', color: '#95DDD7', textColor: '#0D5E57' },
  { number: 5, name: 'Reconciliation', color: '#4DB5A6', textColor: '#0D5E57' },
  { number: 6, name: 'Honest Work', color: '#1B7A6F', textColor: '#ffffff' },
  { number: 7, name: 'Service', color: '#0D5E57', textColor: '#ffffff' },
];

const PROMPTS = {
  1: 'Who have you become through fraud? Who does God say you are?',
  2: 'What lies have you told yourself? What is the truth?',
  3: 'What do you need to turn away from? What will you choose?',
  4: 'Where do you need Jesus\' forgiveness? Who do you need to forgive?',
  5: 'Which relationships need healing? What does peace look like?',
  6: 'What honest work is Jesus calling you to?',
  7: 'How will your restored life serve others?'
};

export default function DashboardStages() {
  const [currentStage, setCurrentStage] = useState(1);
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState('Friend');

  useEffect(() => {
    setUserName(localStorage.getItem('user_name') || 'Friend');
  }, []);

  const stage = STAGES[currentStage - 1];
  const prompt = PROMPTS[currentStage as keyof typeof PROMPTS];

  const handleSubmit = () => {
    if (!reflection.trim()) return;
    localStorage.setItem(`stage_${currentStage}_reflection`, reflection);
    setSubmitted(true);
    setTimeout(() => {
      setReflection('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ padding: '48px 24px 32px', backgroundColor: '#FAFAF8', borderBottom: '1px solid #E8E8E6' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: '#0D5E57', textTransform: 'uppercase', margin: 0, marginBottom: '12px' }}>
            Welcome back
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, color: '#1A1A18', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>
            {userName}
          </h1>
          <p style={{ fontSize: '1rem', color: '#7A7A78', margin: '12px 0 0', fontWeight: 400 }}>
            Stage {currentStage} of 7 — {stage.name}
          </p>
        </div>

        {/* Current Stage */}
        <div style={{ padding: '48px 24px' }}>
          <div style={{
            backgroundColor: stage.color,
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '48px',
            transition: 'all 300ms ease'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.875rem',
                fontWeight: 700,
                color: stage.textColor,
                marginBottom: '16px'
              }}>
                {currentStage}
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                margin: 0,
                color: stage.textColor,
                fontFamily: 'Georgia, serif',
                lineHeight: 1.2
              }}>
                {stage.name}
              </h2>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.4)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '32px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: stage.textColor,
                opacity: 0.8,
                margin: '0 0 8px'
              }}>
                Friday 3pm
              </p>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: stage.textColor,
                margin: 0
              }}>
                SCOAN Accra, Ghana
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: stage.textColor,
                opacity: 0.9,
                margin: '0 0 12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                This Week
              </p>
              <p style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: stage.textColor,
                lineHeight: 1.6,
                margin: 0
              }}>
                {prompt}
              </p>
            </div>

            {submitted ? (
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: stage.textColor, margin: 0 }}>
                  ✓ Reflection submitted
                </p>
              </div>
            ) : (
              <div>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Share your reflection..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '16px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    marginBottom: '12px',
                    lineHeight: 1.6,
                    resize: 'vertical'
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!reflection.trim()}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: reflection.trim() ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                    color: stage.textColor,
                    fontSize: '1rem',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: reflection.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit',
                    transition: 'all 200ms'
                  }}
                  onMouseEnter={(e) => {
                    if (reflection.trim()) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (reflection.trim()) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                    }
                  }}
                >
                  Submit Reflection
                </button>
              </div>
            )}
          </div>

          {/* All Stages */}
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#7A7A78',
              margin: '0 0 20px'
            }}>
              Your Journey
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px'
            }}>
              {STAGES.map((s) => (
                <button
                  key={s.number}
                  onClick={() => setCurrentStage(s.number)}
                  style={{
                    padding: '20px 16px',
                    backgroundColor: currentStage === s.number ? s.color : '#ffffff',
                    border: currentStage === s.number ? `2px solid ${s.color}` : '1px solid #E8E8E6',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 200ms',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    if (currentStage !== s.number) {
                      e.currentTarget.style.backgroundColor = '#F5F5F3';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentStage !== s.number) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }
                  }}
                >
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '6px',
                    color: currentStage === s.number ? s.textColor : '#0D5E57'
                  }}>
                    {s.number}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: currentStage === s.number ? s.textColor : '#0D5E57',
                    lineHeight: 1.2
                  }}>
                    {s.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mentor Info */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #E8E8E6',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#7A7A78',
              margin: '0 0 8px'
            }}>
              Your Mentor
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: '#1A1A18', margin: 0 }}>
              Assigned after first gathering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
