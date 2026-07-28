'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const COUNTRY_CODES = [
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'Andorra', code: '+376' },
  { name: 'Angola', code: '+244' },
  { name: 'Antigua and Barbuda', code: '+1-268' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahamas', code: '+1-242' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Barbados', code: '+1-246' },
  { name: 'Belarus', code: '+375' },
  { name: 'Belgium', code: '+32' },
  { name: 'Belize', code: '+501' },
  { name: 'Benin', code: '+229' },
  { name: 'Bhutan', code: '+975' },
  { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia and Herzegovina', code: '+387' },
  { name: 'Botswana', code: '+267' },
  { name: 'Brazil', code: '+55' },
  { name: 'Brunei', code: '+673' },
  { name: 'Bulgaria', code: '+359' },
  { name: 'Burkina Faso', code: '+226' },
  { name: 'Burundi', code: '+257' },
  { name: 'Cambodia', code: '+855' },
  { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' },
  { name: 'Cape Verde', code: '+238' },
  { name: 'Central African Republic', code: '+236' },
  { name: 'Chad', code: '+235' },
  { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' },
  { name: 'Colombia', code: '+57' },
  { name: 'Comoros', code: '+269' },
  { name: 'Congo', code: '+242' },
  { name: 'Costa Rica', code: '+506' },
  { name: 'Croatia', code: '+385' },
  { name: 'Cuba', code: '+53' },
  { name: 'Cyprus', code: '+357' },
  { name: 'Czech Republic', code: '+420' },
  { name: 'Democratic Republic of the Congo', code: '+243' },
  { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' },
  { name: 'Dominica', code: '+1-767' },
  { name: 'Dominican Republic', code: '+1-809' },
  { name: 'Ecuador', code: '+593' },
  { name: 'Egypt', code: '+20' },
  { name: 'El Salvador', code: '+503' },
  { name: 'Equatorial Guinea', code: '+240' },
  { name: 'Eritrea', code: '+291' },
  { name: 'Estonia', code: '+372' },
  { name: 'Eswatini', code: '+268' },
  { name: 'Ethiopia', code: '+251' },
  { name: 'Fiji', code: '+679' },
  { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' },
  { name: 'Gabon', code: '+241' },
  { name: 'Gambia', code: '+220' },
  { name: 'Georgia', code: '+995' },
  { name: 'Germany', code: '+49' },
  { name: 'Ghana', code: '+233' },
  { name: 'Greece', code: '+30' },
  { name: 'Grenada', code: '+1-473' },
  { name: 'Guatemala', code: '+502' },
  { name: 'Guinea', code: '+224' },
  { name: 'Guinea-Bissau', code: '+245' },
  { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' },
  { name: 'Honduras', code: '+504' },
  { name: 'Hong Kong', code: '+852' },
  { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' },
  { name: 'India', code: '+91' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' },
  { name: 'Ivory Coast', code: '+225' },
  { name: 'Jamaica', code: '+1-876' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' },
  { name: 'Kiribati', code: '+686' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Kyrgyzstan', code: '+996' },
  { name: 'Laos', code: '+856' },
  { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Lesotho', code: '+266' },
  { name: 'Liberia', code: '+231' },
  { name: 'Libya', code: '+218' },
  { name: 'Liechtenstein', code: '+423' },
  { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' },
  { name: 'Macau', code: '+853' },
  { name: 'Madagascar', code: '+261' },
  { name: 'Malawi', code: '+265' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Maldives', code: '+960' },
  { name: 'Mali', code: '+223' },
  { name: 'Malta', code: '+356' },
  { name: 'Marshall Islands', code: '+692' },
  { name: 'Mauritania', code: '+222' },
  { name: 'Mauritius', code: '+230' },
  { name: 'Mexico', code: '+52' },
  { name: 'Micronesia', code: '+691' },
  { name: 'Moldova', code: '+373' },
  { name: 'Monaco', code: '+377' },
  { name: 'Mongolia', code: '+976' },
  { name: 'Montenegro', code: '+382' },
  { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' },
  { name: 'Namibia', code: '+264' },
  { name: 'Nauru', code: '+674' },
  { name: 'Nepal', code: '+977' },
  { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Nicaragua', code: '+505' },
  { name: 'Niger', code: '+227' },
  { name: 'Nigeria', code: '+234' },
  { name: 'North Korea', code: '+850' },
  { name: 'North Macedonia', code: '+389' },
  { name: 'Norway', code: '+47' },
  { name: 'Oman', code: '+968' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Palau', code: '+680' },
  { name: 'Palestine', code: '+970' },
  { name: 'Panama', code: '+507' },
  { name: 'Papua New Guinea', code: '+675' },
  { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' },
  { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' },
  { name: 'Qatar', code: '+974' },
  { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' },
  { name: 'Rwanda', code: '+250' },
  { name: 'Saint Kitts and Nevis', code: '+1-869' },
  { name: 'Saint Lucia', code: '+1-758' },
  { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
  { name: 'Samoa', code: '+685' },
  { name: 'San Marino', code: '+378' },
  { name: 'Sao Tome and Principe', code: '+239' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' },
  { name: 'Seychelles', code: '+248' },
  { name: 'Sierra Leone', code: '+232' },
  { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' },
  { name: 'Solomon Islands', code: '+677' },
  { name: 'Somalia', code: '+252' },
  { name: 'South Africa', code: '+27' },
  { name: 'South Korea', code: '+82' },
  { name: 'South Sudan', code: '+211' },
  { name: 'Spain', code: '+34' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' },
  { name: 'Suriname', code: '+597' },
  { name: 'Sweden', code: '+46' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' },
  { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' },
  { name: 'Timor-Leste', code: '+670' },
  { name: 'Togo', code: '+228' },
  { name: 'Tonga', code: '+676' },
  { name: 'Trinidad and Tobago', code: '+1-868' },
  { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' },
  { name: 'Turkmenistan', code: '+993' },
  { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' },
  { name: 'Ukraine', code: '+380' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' },
  { name: 'Vanuatu', code: '+678' },
  { name: 'Vatican City', code: '+379' },
  { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' },
  { name: 'Yemen', code: '+967' },
  { name: 'Zambia', code: '+260' },
  { name: 'Zimbabwe', code: '+263' },
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
