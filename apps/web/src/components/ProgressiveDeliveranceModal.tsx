'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const STEPS = [
  {
    id: 's1',
    type: 'options',
    q: 'Where are you in this journey?',
    opts: [
      'I\'m currently trapped in this lifestyle',
      'I want to escape but don\'t know how',
      'I\'ve tried to leave but keep returning',
      'I want Jesus to set me completely free'
    ]
  },
  {
    id: 's2',
    type: 'options',
    q: 'What are you seeking from Jesus?',
    opts: [
      'Freedom from deception',
      'A completely new life',
      'Restoration and peace',
      'All of the above'
    ]
  },
  {
    id: 's3',
    type: 'text',
    q: 'Tell us your name',
    name: 'name',
    placeholder: 'Your name'
  },
  {
    id: 's4',
    type: 'text',
    q: 'How can we reach you?',
    name: 'contact',
    placeholder: 'Email or phone'
  },
  {
    id: 's5',
    type: 'success',
    q: 'Jesus is calling you home'
  }
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
        gap: '16px',
        padding: '16px 20px',
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: 'transparent',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background-color 200ms',
        border: 'none'
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#F9FAFB';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: selected ? '2px solid #0D5E57' : '2px solid #E5E7EB',
        backgroundColor: selected ? '#0D5E57' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 200ms'
      }}>
        {selected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} />}
      </div>
      <span style={{
        fontSize: '1rem',
        color: selected ? '#1a1a1a' : '#666666',
        fontWeight: selected ? 600 : 400,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {label}
      </span>
    </button>
  );
}

export default function ProgressiveDeliveranceModal() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;
  const isAnswered = answers[currentStep.id];

  const handleNext = async () => {
    if (step === STEPS.length - 1) {
      // Submit
      setLoading(true);
      try {
        const response = await fetch('/api/auth/register-deliverance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            situation: answers.s1,
            seeking: [answers.s2],
            story: '',
            readiness: 'ready',
            name: answers.s3,
            contact: answers.s4,
            country: ''
          })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('user_name', data.user?.name || 'Friend');
          setTimeout(() => {
            router.push(data.redirectTo || '/dashboard/stages');
          }, 1500);
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

  if (step === STEPS.length - 1) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 24px'
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
          marginBottom: '2rem',
          marginTop: 0,
          maxWidth: '300px'
        }}>
          Your journey toward freedom has begun. We are with you.
        </p>
        <button
          onClick={() => router.push('/dashboard/stages')}
          disabled={loading}
          style={{
            padding: '12px 32px',
            backgroundColor: '#0D5E57',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: '0.375rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 200ms',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#0a4a47';
          }}
          onMouseLeave={(e) => {
            if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#0D5E57';
          }}
        >
          {loading ? 'Creating...' : 'Enter Your Journey'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 24px' }}>
      {/* Progress bar */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#E5E7EB',
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
        <p style={{
          fontSize: '0.75rem',
          color: '#999999',
          marginTop: '8px',
          marginBottom: 0,
          textAlign: 'right',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {step + 1} of {STEPS.length}
        </p>
      </div>

      {/* Question */}
      <h2 style={{
        fontSize: '1.25rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: 700,
        color: '#1a1a1a',
        marginBottom: '24px',
        marginTop: 0
      }}>
        {currentStep.q}
      </h2>

      {/* Options */}
      {currentStep.type === 'options' && (
        <div style={{
          border: '1px solid #E5E7EB',
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
          onKeyDown={(e) => e.key === 'Enter' && isAnswered && handleNext()}
          placeholder={currentStep.placeholder}
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1a1a1a',
            border: '1px solid #D1D5DB',
            borderRadius: '0.375rem',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            marginBottom: '24px',
            transition: 'border-color 200ms'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#0D5E57';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#D1D5DB';
          }}
        />
      )}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!isAnswered || loading}
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: isAnswered && !loading ? '#0D5E57' : '#D1D5DB',
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
        {loading ? 'Processing...' : step === STEPS.length - 2 ? 'Complete' : 'Continue'}
      </button>
    </div>
  );
}
