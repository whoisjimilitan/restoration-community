'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const COUNTRY_CODES = [
  { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
  { name: 'Albania', code: '+355', flag: '🇦🇱' },
  { name: 'Algeria', code: '+213', flag: '🇩🇿' },
  { name: 'Andorra', code: '+376', flag: '🇦🇩' },
  { name: 'Angola', code: '+244', flag: '🇦🇴' },
  { name: 'Antigua and Barbuda', code: '+1-268', flag: '🇦🇬' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Armenia', code: '+374', flag: '🇦🇲' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Azerbaijan', code: '+994', flag: '🇦🇿' },
  { name: 'Bahamas', code: '+1-242', flag: '🇧🇸' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Barbados', code: '+1-246', flag: '🇧🇧' },
  { name: 'Belarus', code: '+375', flag: '🇧🇾' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' },
  { name: 'Belize', code: '+501', flag: '🇧🇿' },
  { name: 'Benin', code: '+229', flag: '🇧🇯' },
  { name: 'Bhutan', code: '+975', flag: '🇧🇹' },
  { name: 'Bolivia', code: '+591', flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', code: '+387', flag: '🇧🇦' },
  { name: 'Botswana', code: '+267', flag: '🇧🇼' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Brunei', code: '+673', flag: '🇧🇳' },
  { name: 'Bulgaria', code: '+359', flag: '🇧🇬' },
  { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' },
  { name: 'Burundi', code: '+257', flag: '🇧🇮' },
  { name: 'Cambodia', code: '+855', flag: '🇰🇭' },
  { name: 'Cameroon', code: '+237', flag: '🇨🇲' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Cape Verde', code: '+238', flag: '🇨🇻' },
  { name: 'Central African Republic', code: '+236', flag: '🇨🇫' },
  { name: 'Chad', code: '+235', flag: '🇹🇩' },
  { name: 'Chile', code: '+56', flag: '🇨🇱' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Comoros', code: '+269', flag: '🇰🇲' },
  { name: 'Congo', code: '+242', flag: '🇨🇬' },
  { name: 'Costa Rica', code: '+506', flag: '🇨🇷' },
  { name: 'Croatia', code: '+385', flag: '🇭🇷' },
  { name: 'Cuba', code: '+53', flag: '🇨🇺' },
  { name: 'Cyprus', code: '+357', flag: '🇨🇾' },
  { name: 'Czech Republic', code: '+420', flag: '🇨🇿' },
  { name: 'Democratic Republic of the Congo', code: '+243', flag: '🇨🇩' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰' },
  { name: 'Djibouti', code: '+253', flag: '🇩🇯' },
  { name: 'Dominica', code: '+1-767', flag: '🇩🇲' },
  { name: 'Dominican Republic', code: '+1-809', flag: '🇩🇴' },
  { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'El Salvador', code: '+503', flag: '🇸🇻' },
  { name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶' },
  { name: 'Eritrea', code: '+291', flag: '🇪🇷' },
  { name: 'Estonia', code: '+372', flag: '🇪🇪' },
  { name: 'Eswatini', code: '+268', flag: '🇸🇿' },
  { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
  { name: 'Fiji', code: '+679', flag: '🇫🇯' },
  { name: 'Finland', code: '+358', flag: '🇫🇮' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Gabon', code: '+241', flag: '🇬🇦' },
  { name: 'Gambia', code: '+220', flag: '🇬🇲' },
  { name: 'Georgia', code: '+995', flag: '🇬🇪' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'Grenada', code: '+1-473', flag: '🇬🇩' },
  { name: 'Guatemala', code: '+502', flag: '🇬🇹' },
  { name: 'Guinea', code: '+224', flag: '🇬🇳' },
  { name: 'Guinea-Bissau', code: '+245', flag: '🇬🇼' },
  { name: 'Guyana', code: '+592', flag: '🇬🇾' },
  { name: 'Haiti', code: '+509', flag: '🇭🇹' },
  { name: 'Honduras', code: '+504', flag: '🇭🇳' },
  { name: 'Hong Kong', code: '+852', flag: '🇭🇰' },
  { name: 'Hungary', code: '+36', flag: '🇭🇺' },
  { name: 'Iceland', code: '+354', flag: '🇮🇸' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Iran', code: '+98', flag: '🇮🇷' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪' },
  { name: 'Israel', code: '+972', flag: '🇮🇱' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Ivory Coast', code: '+225', flag: '🇨🇮' },
  { name: 'Jamaica', code: '+1-876', flag: '🇯🇲' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' },
  { name: 'Kazakhstan', code: '+7', flag: '🇰🇿' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Kiribati', code: '+686', flag: '🇰🇮' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name: 'Kyrgyzstan', code: '+996', flag: '🇰🇬' },
  { name: 'Laos', code: '+856', flag: '🇱🇦' },
  { name: 'Latvia', code: '+371', flag: '🇱🇻' },
  { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name: 'Lesotho', code: '+266', flag: '🇱🇸' },
  { name: 'Liberia', code: '+231', flag: '🇱🇷' },
  { name: 'Libya', code: '+218', flag: '🇱🇾' },
  { name: 'Liechtenstein', code: '+423', flag: '🇱🇮' },
  { name: 'Lithuania', code: '+370', flag: '🇱🇹' },
  { name: 'Luxembourg', code: '+352', flag: '🇱🇺' },
  { name: 'Macau', code: '+853', flag: '🇲🇴' },
  { name: 'Madagascar', code: '+261', flag: '🇲🇬' },
  { name: 'Malawi', code: '+265', flag: '🇲🇼' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'Maldives', code: '+960', flag: '🇲🇻' },
  { name: 'Mali', code: '+223', flag: '🇲🇱' },
  { name: 'Malta', code: '+356', flag: '🇲🇹' },
  { name: 'Marshall Islands', code: '+692', flag: '🇲🇭' },
  { name: 'Mauritania', code: '+222', flag: '🇲🇷' },
  { name: 'Mauritius', code: '+230', flag: '🇲🇺' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Micronesia', code: '+691', flag: '🇫🇲' },
  { name: 'Moldova', code: '+373', flag: '🇲🇩' },
  { name: 'Monaco', code: '+377', flag: '🇲🇨' },
  { name: 'Mongolia', code: '+976', flag: '🇲🇳' },
  { name: 'Montenegro', code: '+382', flag: '🇲🇪' },
  { name: 'Morocco', code: '+212', flag: '🇲🇦' },
  { name: 'Mozambique', code: '+258', flag: '🇲🇿' },
  { name: 'Myanmar', code: '+95', flag: '🇲🇲' },
  { name: 'Namibia', code: '+264', flag: '🇳🇦' },
  { name: 'Nauru', code: '+674', flag: '🇳🇷' },
  { name: 'Nepal', code: '+977', flag: '🇳🇵' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { name: 'Nicaragua', code: '+505', flag: '🇳🇮' },
  { name: 'Niger', code: '+227', flag: '🇳🇪' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'North Korea', code: '+850', flag: '🇰🇵' },
  { name: 'North Macedonia', code: '+389', flag: '🇲🇰' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'Palau', code: '+680', flag: '🇵🇼' },
  { name: 'Palestine', code: '+970', flag: '🇵🇸' },
  { name: 'Panama', code: '+507', flag: '🇵🇦' },
  { name: 'Papua New Guinea', code: '+675', flag: '🇵🇬' },
  { name: 'Paraguay', code: '+595', flag: '🇵🇾' },
  { name: 'Peru', code: '+51', flag: '🇵🇪' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name: 'Romania', code: '+40', flag: '🇷🇴' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' },
  { name: 'Rwanda', code: '+250', flag: '🇷🇼' },
  { name: 'Saint Kitts and Nevis', code: '+1-869', flag: '🇰🇳' },
  { name: 'Saint Lucia', code: '+1-758', flag: '🇱🇨' },
  { name: 'Saint Vincent and the Grenadines', code: '+1-784', flag: '🇻🇨' },
  { name: 'Samoa', code: '+685', flag: '🇼🇸' },
  { name: 'San Marino', code: '+378', flag: '🇸🇲' },
  { name: 'Sao Tome and Principe', code: '+239', flag: '🇸🇹' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Senegal', code: '+221', flag: '🇸🇳' },
  { name: 'Serbia', code: '+381', flag: '🇷🇸' },
  { name: 'Seychelles', code: '+248', flag: '🇸🇨' },
  { name: 'Sierra Leone', code: '+232', flag: '🇸🇱' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Slovakia', code: '+421', flag: '🇸🇰' },
  { name: 'Slovenia', code: '+386', flag: '🇸🇮' },
  { name: 'Solomon Islands', code: '+677', flag: '🇸🇧' },
  { name: 'Somalia', code: '+252', flag: '🇸🇴' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'South Sudan', code: '+211', flag: '🇸🇸' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Sudan', code: '+249', flag: '🇸🇩' },
  { name: 'Suriname', code: '+597', flag: '🇸🇷' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Syria', code: '+963', flag: '🇸🇾' },
  { name: 'Taiwan', code: '+886', flag: '🇹🇼' },
  { name: 'Tajikistan', code: '+992', flag: '🇹🇯' },
  { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Timor-Leste', code: '+670', flag: '🇹🇱' },
  { name: 'Togo', code: '+228', flag: '🇹🇬' },
  { name: 'Tonga', code: '+676', flag: '🇹🇴' },
  { name: 'Trinidad and Tobago', code: '+1-868', flag: '🇹🇹' },
  { name: 'Tunisia', code: '+216', flag: '🇹🇳' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'Turkmenistan', code: '+993', flag: '🇹🇲' },
  { name: 'Tuvalu', code: '+688', flag: '🇹🇻' },
  { name: 'Uganda', code: '+256', flag: '🇺🇬' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Uruguay', code: '+598', flag: '🇺🇾' },
  { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
  { name: 'Vanuatu', code: '+678', flag: '🇻🇺' },
  { name: 'Vatican City', code: '+379', flag: '🇻🇦' },
  { name: 'Venezuela', code: '+58', flag: '🇻🇪' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
  { name: 'Yemen', code: '+967', flag: '🇾🇪' },
  { name: 'Zambia', code: '+260', flag: '🇿🇲' },
  { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' },
];

const STEPS = [
  { id: 's1', type: 'options', q: 'What brought you here?', opts: ['I want freedom from fraud', 'I\'m tired of the trap', 'I want Jesus to set me free', 'I\'m ready for a new life'] },
  { id: 's2', type: 'options', q: 'What do you need from Jesus?', opts: ['Deliverance from deception', 'Restoration and healing', 'A path out of this', 'Everything above'] },
  { id: 's3', type: 'text', q: 'Your full name', name: 'name', placeholder: 'e.g., John Smith' },
  { id: 's4', type: 'text', q: 'Your state or region', name: 'state', placeholder: 'e.g., Lagos' },
  { id: 's5', type: 'select', q: 'Which country are you in?', name: 'country' },
  { id: 's6', type: 'phone', q: 'Your phone number', name: 'phone' },
  { id: 's7', type: 'success', q: 'Brother Jimi is praying for you' },
];

function OptionPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        padding: '16px 20px',
        backgroundColor: selected ? '#0D5E57' : '#f9fafb',
        border: selected ? '2px solid #0D5E57' : '2px solid #e5e7eb',
        color: selected ? '#ffffff' : '#1a1a1a',
        fontSize: '0.9375rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: selected ? 600 : 500,
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 150ms',
        textAlign: 'center',
        marginBottom: '12px',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.borderColor = '#d1d5db';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }
      }}
    >
      {label}
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

  if (!expanded) {
    setTimeout(() => setExpanded(true), 800);
  }

  const handleSubmit = async () => {
    if (step === STEPS.length - 1) return;

    if (step === STEPS.length - 2) {
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
          setStep(step + 1);
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
          borderRadius: '16px',
          padding: '64px 48px',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(13,94,87,0.1)',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#e8f4f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '28px'
          }}>
            ✓
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            color: '#0D5E57',
            marginBottom: '12px',
            marginTop: 0,
            lineHeight: 1.3
          }}>
            {currentStep.q}
          </h2>
          <p style={{
            fontSize: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#666666',
            marginBottom: '32px',
            marginTop: '12px',
            lineHeight: 1.6
          }}>
            Brother Jimi will respond personally with prayer and encouragement. Your restoration begins with prayer.
          </p>
          <button
            onClick={() => router.push('/dashboard/stages')}
            style={{
              width: '100%',
              padding: '14px 28px',
              backgroundColor: '#0D5E57',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'all 150ms',
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
          borderRadius: '16px',
          width: expanded ? '100%' : '0',
          maxWidth: expanded ? '480px' : '0',
          maxHeight: '90vh',
          overflow: 'hidden',
          transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1), max-height 0.5s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: expanded ? '0 25px 50px -12px rgba(13,94,87,0.15)' : 'none',
        }}
      >
        {!expanded && (
          <div style={{
            padding: '48px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '3px solid #e5e7eb',
              borderTopColor: '#0D5E57',
              animation: 'spin 1s linear infinite',
            }} />
            <p style={{ marginTop: '16px', color: '#999999', fontSize: '0.9375rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Loading...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {expanded && (
          <div style={{ padding: '48px 40px', overflow: 'auto', maxHeight: '90vh' }}>
            {/* Progress */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#e5e7eb',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '12px'
              }}>
                <div style={{
                  height: '100%',
                  backgroundColor: '#0D5E57',
                  width: `${progress}%`,
                  transition: 'width 300ms ease'
                }} />
              </div>
              <p style={{
                fontSize: '0.8125rem',
                color: '#999999',
                textAlign: 'right',
                margin: '8px 0 0 0',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 500
              }}>
                Step {step + 1} of {STEPS.length}
              </p>
            </div>

            {/* Question */}
            <h2 style={{
              fontSize: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '28px',
              marginTop: 0,
              lineHeight: 1.3
            }}>
              {currentStep.q}
            </h2>

            {/* Options */}
            {currentStep.type === 'options' && (
              <div style={{ marginBottom: '0' }}>
                {currentStep.opts?.map((opt) => (
                  <OptionPill
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
                  padding: '14px 16px',
                  fontSize: '1rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#1a1a1a',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  marginBottom: '0',
                  transition: 'border-color 200ms, box-shadow 200ms',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0D5E57';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
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
                  padding: '14px 16px',
                  fontSize: '1rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: answers[currentStep.name!] ? '#1a1a1a' : '#999999',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  marginBottom: '0',
                  transition: 'border-color 200ms, box-shadow 200ms',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230D5E57' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  paddingRight: '40px'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0D5E57';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option value="">Select your country...</option>
                {COUNTRY_CODES.map((c) => (
                  <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            )}

            {/* Phone with country code */}
            {currentStep.type === 'phone' && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '0' }}>
                <select
                  value={answers.countryCode || ''}
                  onChange={(e) => setAnswers({ ...answers, countryCode: e.target.value })}
                  style={{
                    width: '120px',
                    padding: '14px 12px',
                    fontSize: '0.9375rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: answers.countryCode ? '#1a1a1a' : '#999999',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    transition: 'border-color 200ms, box-shadow 200ms',
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230D5E57' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    paddingRight: '32px'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0D5E57';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Code</option>
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.name} value={c.code}>{c.flag} {c.code}</option>
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
                    padding: '14px 16px',
                    fontSize: '1rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: '#1a1a1a',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
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
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={!isAnswered || loading}
              style={{
                width: '100%',
                padding: '14px 24px',
                marginTop: '32px',
                backgroundColor: isAnswered && !loading ? '#0D5E57' : '#e5e7eb',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '10px',
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
              {loading ? 'Creating...' : step === STEPS.length - 2 ? 'Complete Journey Start' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
