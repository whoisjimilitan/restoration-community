'use client';

import { useState } from 'react';

export default function DeliverancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    contactNumber: '',
    duration: '',
    freedomFrom: ''
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
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem', backgroundColor: '#FFFBF7' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Thank you.
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#1a1a1a', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              We have received your request.
            </p>
            <p style={{ fontSize: '1.125rem', color: '#1a1a1a', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              We will call you personally very soon.
            </p>
          </div>

          <div style={{ backgroundColor: '#F5F3F0', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.7, marginBottom: '1rem' }}>
              We will speak with you.
            </p>
            <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.7, marginBottom: '1rem' }}>
              We will listen to you.
            </p>
            <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.7, marginBottom: '1rem' }}>
              We will counsel you.
            </p>
            <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.7, marginBottom: '1rem' }}>
              We will help you get ready.
            </p>
            <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.7, marginBottom: '2rem' }}>
              We will arrange a time for your deliverance.
            </p>
            <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.7, marginBottom: '1rem' }}>
              After you are set free we will walk with you through seven days of truth. One day at a time. To help you stand firm in your new life.
            </p>
            <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.7 }}>
              Be encouraged. Jesus Christ is able to set you free.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFFBF7', color: '#1a1a1a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      {/* HERO */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 700, lineHeight: 1.3, marginBottom: '1.5rem', marginTop: 0 }}>
          You were never made to live by lies.
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          Scamming and fraud promise freedom. They only bind you tighter.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          This is a spiritual trap. Only Jesus Christ sets you free.
        </p>
        <button onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ marginTop: '2rem', padding: '1rem 2rem', backgroundColor: '#0F766E', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
          Request Deliverance
        </button>
      </section>

      {/* THE TRAP */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }}>
          The Trap
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          You believe:
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '0.5rem' }}>
          This is just how I survive.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '0.5rem' }}>
          I have no other way.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          God could never forgive me.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          That is deception speaking.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
          You cannot break this chain by yourself.
        </p>
      </section>

      {/* THE WITNESS */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }}>
          The Witness
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          I lived this life.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          I wanted to stop. I could not.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          Until Jesus found me.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          He broke my chains. He gave me a new life.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
          I am not the answer. He is.
        </p>
      </section>

      {/* THE ONLY WAY */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }}>
          The Only Way
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          No amount of money, laws, or advice fixes this.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          Scamming is spiritual bondage.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          There is no cure outside Jesus Christ.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          He is still delivering people today.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
          No one is too far gone.
        </p>
      </section>

      {/* THE JOURNEY OUT */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }}>
          The Journey Out
        </h2>
        <ol style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li>Truth</li>
          <li>Confession</li>
          <li>Repentance</li>
          <li>Forgiveness</li>
          <li>Reconciliation</li>
          <li>Honest Work</li>
          <li>Serving</li>
        </ol>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
          You walk this path with support. Prayer, scripture, people who understand.
        </p>
      </section>

      {/* THE NEW LIFE */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }}>
          The New Life
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          Deliverance is just the start.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          You will learn to work honestly.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          To live without fear.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
          To build something that lasts.
        </p>
      </section>

      {/* FINAL CALL */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }}>
          Final Call
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          Tired of living a lie?
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
          Ready to be free at last?
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
          Jesus is calling you home.
        </p>
        <button onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '1rem 2rem', backgroundColor: '#0F766E', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
          Request Deliverance
        </button>
      </section>

      {/* FORM SECTION */}
      <section id="form-section" style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '2rem', marginTop: 0 }}>
          Request Deliverance
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* First Name */}
          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Contact Number */}
          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Duration */}
          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              How long have you lived this life?
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 5 years, 10 months"
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Freedom From */}
          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              One thing you want to be free from most
            </label>
            <textarea
              name="freedomFrom"
              value={formData.freedomFrom}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ padding: '1rem 2rem', backgroundColor: '#0F766E', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Submitting...' : 'Request Deliverance'}
          </button>
        </form>
      </section>

      {/* Footer spacing */}
      <div style={{ height: '2rem' }} />
    </div>
  );
}
