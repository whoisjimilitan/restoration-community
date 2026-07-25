'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DeliverancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const response = await fetch('/api/deliverance-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            marginTop: 0
          }}>
            Your First Step Has Been Taken
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            marginTop: 0
          }}>
            Thank you for opening your heart.
          </p>

          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.7,
            marginBottom: '2rem',
            marginTop: 0
          }}>
            Your request has been received. Someone from the ministry will reach out to you regarding the next step toward prayer and your encounter with Jesus Christ.
          </p>

          <div style={{ backgroundColor: '#F8F6F2', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontFamily: 'Georgia, Garamond, serif',
              fontWeight: 700,
              color: '#202124',
              marginBottom: '1rem',
              marginTop: 0
            }}>
              What Happens Next
            </h2>

            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              lineHeight: 1.6,
              marginBottom: '1rem',
              marginTop: 0
            }}>
              A ministry leader will contact you within 24-48 hours to discuss the next step toward prayer and your encounter with Jesus Christ.
            </p>

            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              lineHeight: 1.6,
              marginBottom: 0,
              marginTop: 0,
              fontStyle: 'italic'
            }}>
              Remember: your past does not have to define your future. Through Jesus Christ, a new life is possible.
            </p>
          </div>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.875rem 1.75rem',
              backgroundColor: 'transparent',
              color: '#0F766E',
              fontSize: '0.9375rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(15, 118, 110, 0.3)',
              borderRadius: '0.375rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#202124';
              e.currentTarget.style.borderColor = '#202124';
              e.currentTarget.style.backgroundColor = 'rgba(15, 118, 110, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#0F766E';
              e.currentTarget.style.borderColor = 'rgba(15, 118, 110, 0.3)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem', backgroundColor: '#FAFAF8' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#202124',
          lineHeight: 1.2,
          marginBottom: '1rem',
          marginTop: 0
        }}>
          What Do You Need Jesus Christ to Deliver You From?
        </h1>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          marginBottom: '3rem',
          marginTop: 0
        }}>
          This is a private and personal first step. Be honest about where you are. Jesus Christ can deliver, restore, and lead you into a new life.
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            marginBottom: '0.5rem',
            marginTop: 0
          }}>
            Your First Step Is Honesty
          </h2>
          <p style={{
            fontSize: '1rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.6,
            marginBottom: 0,
            marginTop: 0
          }}>
            Freedom begins when we stop hiding. Tell us where you are and what you are seeking Jesus Christ to deliver you from.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Question 1 */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#202124',
              marginBottom: '0.75rem'
            }}>
              Are you currently involved in fraud, scams, deception, or dishonest gain?
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
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#202124',
              marginBottom: '0.75rem'
            }}>
              What are you seeking Jesus Christ to do in your life?
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
                    style={{ marginRight: '0.5rem' }}
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
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#202124',
              marginBottom: '0.75rem'
            }}>
              Briefly tell us your story
            </label>
            <p style={{
              fontSize: '0.875rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#8B8680',
              marginBottom: '0.5rem',
              marginTop: 0
            }}>
              You do not need to explain everything. Share only what you feel ready to share.
            </p>
            <textarea
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              placeholder="I want Jesus Christ to deliver me from..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                color: '#202124',
                border: '1px solid #D5D3CF',
                borderRadius: '0.375rem',
                backgroundColor: '#FFFFFF',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Question 4 */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#202124',
              marginBottom: '0.75rem'
            }}>
              Are you ready to leave this life behind and seek a new path through Jesus Christ?
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
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #D5D3CF' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontFamily: 'Georgia, Garamond, serif',
              fontWeight: 700,
              color: '#202124',
              marginBottom: '0.5rem',
              marginTop: 0
            }}>
              How Can We Reach You?
            </h3>
            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              marginBottom: '1rem',
              marginTop: 0
            }}>
              After reviewing your request, someone from the ministry will contact you about the next step toward prayer and deliverance.
            </p>

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
                  backgroundColor: '#FFFFFF'
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
                  backgroundColor: '#FFFFFF'
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
                  backgroundColor: '#FFFFFF'
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
              backgroundColor: '#0F766E',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
              borderRadius: '0.375rem',
              border: '2px solid #0F766E',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#0a5c59';
                e.currentTarget.style.borderColor = '#0a5c59';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 118, 110, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#0F766E';
                e.currentTarget.style.borderColor = '#0F766E';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? 'Submitting...' : 'Request Deliverance Prayer'}
          </button>
        </form>
      </div>
    </div>
  );
}
