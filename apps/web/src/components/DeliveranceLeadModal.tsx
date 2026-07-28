'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const COUNTRY_CODES = [
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
];

const STEPS = [
  { id: 's1', type: 'options', q: 'What is your current situation?', opts: ['Currently trapped in this lifestyle', 'Want to escape but unsure how', 'Tried to leave but keep returning', 'Ready for complete freedom in Jesus'] },
  { id: 's2', type: 'options', q: 'What are you seeking from Jesus?', opts: ['Freedom from deception', 'A completely new life', 'Restoration and peace', 'All of the above'] },
  { id: 's3', type: 'text', q: 'Your full name', name: 'name', placeholder: 'e.g., John Smith' },
  { id: 's4', type: 'text', q: 'Your state or region', name: 'state', placeholder: 'e.g., California, Lagos' },
  { id: 's5', type: 'select', q: 'Which country are you in?', name: 'country', opts: COUNTRY_CODES.map(c => c.name) },
  { id: 's6', type: 'phone', q: 'Your phone number', name: 'phone' },
  { id: 's7', type: 'success', q: 'Jesus is calling you home' },
];

function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'transparent',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background-color 150ms',
        border: 'none',
        fontSize: '0.9375rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: selected ? '#1a1a1a' : '#666666',
        fontWeight: selected ? 600 : 400,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <div style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        border: selected ? '2px solid #0D5E57' : '2px solid #d1d5db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 150ms',
      }}>
        {selected && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D5E57' }} />}
      </div>
      <span>{label}</span>
    </button>
  );
}

export default function DeliveranceLeadModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const isAnswered = currentStep.type === 'text'
    ? answers[currentStep.name!] && answers[currentStep.name!].trim().length > 0
    : currentStep.type === 'phone'
    ? answers[currentStep.name!] && answers[currentStep.name!].trim().length > 0
    : currentStep.type === 'select'
    ? answers[currentStep.name!]
    : answers[currentStep.id];

  // Auto-expand after 800ms
  if (!expanded) {
    setTimeout(() => setExpanded(true), 800);
  }

  const handleSubmit = async () => {
    if (step === STEPS.length - 1) return;

    if (step === STEPS.length - 2) {
      // Submit form
      setLoading(true);
      try {
        const selectedCountry = COUNTRY_CODES.find(c => c.name === answers.country);
        const response = await fetch('/api/auth/register-deliverance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            situation: answers.s1,
            seeking: [answers.s2],
            story: '',
            readiness: 'ready',
            name: answers.name,
            contact: `${selectedCountry?.code} ${answers.phone}`,
            country: answers.country,
            state: answers.state
          })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('user_name', data.user?.name || 'Friend');
          setStep(step + 1); // Show success screen
          setTimeout(() => router.push('/dashboard/stages'), 1500);
        } else {
          const error = await response.json();
          console.error('Registration error:', error);
        }
      } catch (err) {
        console.error('Submission error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  // Success screen
  if (step === STEPS.length - 1) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '48px 32px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            color: '#0D5E57',
            marginBottom: '1rem',
            marginTop: 0
          }}>
            {currentStep.q}
          </h2>
          <p style={{
            fontSize: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#666666',
            marginBottom: '1.5rem',
            marginTop: 0
          }}>
            Your journey toward freedom has begun. We are with you every step.
          </p>
          <button
            onClick={() => router.push('/dashboard/stages')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#0D5E57',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0a4a47')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0D5E57')}
          >
            Enter Your Journey
          </button>
        </div>
      </div>
    );
  }

  // Modal container
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px'
    }} onClick={onClose}>
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          width: expanded ? '100%' : '0',
          maxWidth: expanded ? '420px' : '0',
          maxHeight: '85vh',
          overflow: 'hidden',
          transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1), max-height 0.5s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: expanded ? '0 20px 25px -5px rgba(13,94,87,0.1)' : 'none',
        }}
      >
        {!expanded && (
          <div style={{
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid #e5e7eb',
              borderTopColor: '#0D5E57',
              animation: 'spin 1s linear infinite',
            }} />
            <p style={{ marginTop: '1rem', color: '#999999', fontSize: '0.875rem' }}>
              Please wait...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {expanded && (
          <div style={{ padding: '32px 24px', overflow: 'auto', maxHeight: '85vh' }}>
            {/* Progress bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                width: '100%',
                height: '3px',
                backgroundColor: '#e5e7eb',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  backgroundColor: '#0D5E57',
                  width: `${progress}%`,
                  transition: 'width 300ms ease'
                }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: '#999999', marginTop: '8px', marginBottom: 0, textAlign: 'right' }}>
                {step + 1} of {STEPS.length}
              </p>
            </div>

            {/* Question */}
            <h2 style={{
              fontSize: '1.25rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '20px',
              marginTop: 0
            }}>
              {currentStep.q}
            </h2>

            {/* Options */}
            {currentStep.type === 'options' && (
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                overflow: 'hidden',
                marginBottom: '24px'
              }}>
                {currentStep.opts?.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={answers[currentStep.id] === opt}
                    onClick={() => setAnswers({ ...answers, [currentStep.id]: opt })}
                  />
                ))}
              </div>
            )}

            {/* Text input */}
            {currentStep.type === 'text' && (
              <input
                type="text"
                value={(answers[currentStep.name!] as string) ?? ''}
                onChange={(e) => setAnswers({ ...answers, [currentStep.name!]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && isAnswered && handleSubmit()}
                placeholder={currentStep.placeholder}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '1rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#1a1a1a',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  marginBottom: '24px',
                  transition: 'border-color 200ms, box-shadow 200ms',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0D5E57';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            )}

            {/* Country select */}
            {currentStep.type === 'select' && (
              <select
                value={(answers[currentStep.name!] as string) ?? ''}
                onChange={(e) => setAnswers({ ...answers, [currentStep.name!]: e.target.value })}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '1rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#1a1a1a',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  marginBottom: '24px',
                  transition: 'border-color 200ms, box-shadow 200ms',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0D5E57';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option value="">Select your country...</option>
                {currentStep.opts?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {/* Phone with country code */}
            {currentStep.type === 'phone' && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-end'
                }}>
                  <select
                    value={answers.countryCode || ''}
                    onChange={(e) => setAnswers({ ...answers, countryCode: e.target.value })}
                    style={{
                      padding: '12px 8px',
                      fontSize: '0.9rem',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#1a1a1a',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box',
                      transition: 'border-color 200ms, box-shadow 200ms',
                      outline: 'none',
                      cursor: 'pointer',
                      width: '100px'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0D5E57';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Code</option>
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code + c.name} value={c.code}>{c.code} {c.flag}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={(answers[currentStep.name!] as string) ?? ''}
                    onChange={(e) => setAnswers({ ...answers, [currentStep.name!]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && isAnswered && handleSubmit()}
                    placeholder="1234567890"
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      fontSize: '1rem',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      color: '#1a1a1a',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box',
                      transition: 'border-color 200ms, box-shadow 200ms',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0D5E57';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Next button */}
            <button
              onClick={handleSubmit}
              disabled={!isAnswered || loading}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: isAnswered && !loading ? '#0D5E57' : '#d1d5db',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '0.375rem',
                cursor: isAnswered && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 200ms',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (isAnswered && !loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#0a4a47';
              }}
              onMouseLeave={(e) => {
                if (isAnswered && !loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#0D5E57';
              }}
            >
              {loading ? 'Creating...' : step === STEPS.length - 2 ? 'Complete' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
