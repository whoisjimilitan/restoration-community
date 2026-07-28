'use client';

import { useState } from 'react';

interface DeliveranceFormProps {
  onSubmitSuccess?: () => void;
}

export default function DeliveranceForm({ onSubmitSuccess }: DeliveranceFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    situation: '',
    seeking: [] as string[],
    story: '',
    readiness: '',
    name: '',
    contact: '',
    country: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/deliverance-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSubmitSuccess?.();
      } else {
        setError('Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{
        fontSize: '1.875rem',
        fontFamily: 'Georgia, Garamond, serif',
        fontWeight: 700,
        color: '#202124',
        marginBottom: '1rem',
        marginTop: 0
      }}>
        What Do You N<span style={{ fontStyle: 'italic' }}>e</span>ed J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ to D<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>r You From?
      </h2>

      <p style={{
        fontSize: '1rem',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        color: '#202124',
        lineHeight: 1.6,
        marginBottom: '2rem',
        marginTop: 0
      }}>
        This is a private first step. Be honest about where you are. Jesus Christ can deliver and restore you.
      </p>

      {error && (
        <div style={{
          backgroundColor: '#FEE2E2',
          border: '1px solid #FECACA',
          color: '#991B1B',
          padding: '1rem',
          borderRadius: '0.375rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.9375rem' }}>
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Question 1 */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9375rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 600,
            color: '#202124',
            marginBottom: '0.5rem'
          }}>
            Ar<span style={{ fontStyle: 'italic' }}>e</span> you curr<span style={{ fontStyle: 'italic' }}>e</span>ntly involv<span style={{ fontStyle: 'italic' }}>e</span>d in fraud, scams, d<span style={{ fontStyle: 'italic' }}>e</span>c<span style={{ fontStyle: 'italic' }}>e</span>ption, or dishon<span style={{ fontStyle: 'italic' }}>e</span>st gain?
          </label>
          <select
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              border: '1px solid #D5D3CF',
              borderRadius: '0.375rem',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="">Select...</option>
            <option value="currently">Yes, I am currently involved</option>
            <option value="past">I was involved before and want freedom from that life</option>
            <option value="struggling">I am struggling to leave this lifestyle behind</option>
            <option value="affected">I have been affected by this lifestyle and need restoration</option>
            <option value="other">I want Jesus Christ to deliver me from something else</option>
          </select>
        </div>

        {/* Question 2 */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9375rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 600,
            color: '#202124',
            marginBottom: '0.5rem'
          }}>
            What ar<span style={{ fontStyle: 'italic' }}>e</span> you s<span style={{ fontStyle: 'italic' }}>e</span>eking J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ to do in your lif<span style={{ fontStyle: 'italic' }}>e</span>?
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { value: 'freedom', label: 'Freedom from fraud and deception' },
              { value: 'relationship', label: 'A new relationship with Jesus Christ' },
              { value: 'direction', label: 'A new direction in life' },
              { value: 'restoration', label: 'Restoration and purpose' },
              { value: 'overcome', label: 'Freedom from a lifestyle I cannot overcome alone' }
            ].map((option) => (
              <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={formData.seeking.includes(option.value)}
                  onChange={(e) => {
                    const newSeeking = e.target.checked
                      ? [...formData.seeking, option.value]
                      : formData.seeking.filter((v) => v !== option.value);
                    setFormData({ ...formData, seeking: newSeeking });
                  }}
                  style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                />
                <span style={{
                  fontSize: '1rem',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  color: '#202124'
                }}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 3 */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9375rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 600,
            color: '#202124',
            marginBottom: '0.5rem'
          }}>
            Bri<span style={{ fontStyle: 'italic' }}>e</span>fly t<span style={{ fontStyle: 'italic' }}>e</span>ll us your story
          </label>
          <p style={{
            fontSize: '0.875rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#8B8680',
            marginBottom: '0.5rem',
            marginTop: 0
          }}>
            You do not n<span style={{ fontStyle: 'italic' }}>e</span>ed to <span style={{ fontStyle: 'italic' }}>e</span>xplain <span style={{ fontStyle: 'italic' }}>e</span>v<span style={{ fontStyle: 'italic' }}>e</span>rything. Shar<span style={{ fontStyle: 'italic' }}>e</span> only what you f<span style={{ fontStyle: 'italic' }}>e</span>el r<span style={{ fontStyle: 'italic' }}>e</span>ady to shar<span style={{ fontStyle: 'italic' }}>e</span>.
          </p>
          <textarea
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            placeholder="I want Jesus Christ to deliver me from..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              border: '1px solid #D5D3CF',
              borderRadius: '0.375rem',
              backgroundColor: '#FFFFFF',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Question 4 */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9375rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 600,
            color: '#202124',
            marginBottom: '0.5rem'
          }}>
            Ar<span style={{ fontStyle: 'italic' }}>e</span> you r<span style={{ fontStyle: 'italic' }}>e</span>ady to l<span style={{ fontStyle: 'italic' }}>e</span>av<span style={{ fontStyle: 'italic' }}>e</span> this lif<span style={{ fontStyle: 'italic' }}>e</span> b<span style={{ fontStyle: 'italic' }}>e</span>hind and s<span style={{ fontStyle: 'italic' }}>e</span>ek a n<span style={{ fontStyle: 'italic' }}>e</span>w path through J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ?
          </label>
          <select
            value={formData.readiness}
            onChange={(e) => setFormData({ ...formData, readiness: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              border: '1px solid #D5D3CF',
              borderRadius: '0.375rem',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="">Select...</option>
            <option value="ready">Yes, I am ready</option>
            <option value="want">I want to be ready</option>
            <option value="help">I need help taking this step</option>
          </select>
        </div>

        {/* Contact Information */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #D5D3CF' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            marginBottom: '0.5rem',
            marginTop: 0
          }}>
            How Can W<span style={{ fontStyle: 'italic' }}>e</span> R<span style={{ fontStyle: 'italic' }}>e</span>ach You?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                padding: '0.75rem',
                fontSize: '1rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                color: '#202124',
                border: '1px solid #D5D3CF',
                borderRadius: '0.375rem',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="text"
              placeholder="Phone / WhatsApp"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              style={{
                padding: '0.75rem',
                fontSize: '1rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                color: '#202124',
                border: '1px solid #D5D3CF',
                borderRadius: '0.375rem',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              style={{
                padding: '0.75rem',
                fontSize: '1rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                color: '#202124',
                border: '1px solid #D5D3CF',
                borderRadius: '0.375rem',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#0D5E57',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            borderRadius: '0.375rem',
            border: '2px solid #0D5E57',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#0a4a47';
              e.currentTarget.style.borderColor = '#0a4a47';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(13, 94, 87, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#0D5E57';
              e.currentTarget.style.borderColor = '#0D5E57';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {loading ? 'Submitting...' : <>R<span style={{ fontStyle: 'italic' }}>e</span>qu<span style={{ fontStyle: 'italic' }}>e</span>st D<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>ranc<span style={{ fontStyle: 'italic' }}>e</span> Prayer</>}
        </button>
      </form>
    </div>
  );
}
