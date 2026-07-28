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

  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem', background: '#FFFBF7' }}>
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
    <div style={{ backgroundColor: '#FFFBF7', color: '#1a1a1a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* SECTION 1: HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0F766E 0%, #1a1a1a 100%)', padding: '4rem 1.5rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white' }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', opacity: 0.8 }}>
          Deliverance Through Jesus Christ
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'Georgia, serif', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '800px' }}>
          You were never made to live by lies.
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '600px', opacity: 0.9 }}>
          Scamming and fraud promise freedom. They only bind you tighter. This is a spiritual trap. Only Jesus Christ sets you free.
        </p>
        <button onClick={scrollToForm} style={{ padding: '1rem 2rem', backgroundColor: 'white', color: '#0F766E', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms' }}>
          Request Deliverance
        </button>
      </section>

      {/* SECTION 2: THE TRAP */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0, color: '#1a1a1a' }}>
          The Trap
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          You believe:
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '0.5rem', color: '#1a1a1a' }}>
          This is just how I survive.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '0.5rem', color: '#1a1a1a' }}>
          I have no other way.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#1a1a1a' }}>
          God could never forgive me.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          That is d<span style={{ fontStyle: 'italic' }}>e</span>ception speaking.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#1a1a1a' }}>
          You cannot break this chain by yourself.
        </p>
      </section>

      {/* SECTION 3: THE WITNESS */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0, color: '#1a1a1a' }}>
          The Witness
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          I lived this life.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          I wanted to stop. I could not.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          Until J<span style={{ fontStyle: 'italic' }}>e</span>sus found m<span style={{ fontStyle: 'italic' }}>e</span>.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          He broke my chains. He gave me a new life.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#1a1a1a' }}>
          I am not the answer. H<span style={{ fontStyle: 'italic' }}>e</span> is.
        </p>
      </section>

      {/* SECTION 4: THE ONLY WAY */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0, color: '#1a1a1a' }}>
          The Only Way
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          No amount of money, laws, or advice fixes this.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          Scamming is spiritual bondage.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          Th<span style={{ fontStyle: 'italic' }}>e</span>r<span style={{ fontStyle: 'italic' }}>e</span> is no cur<span style={{ fontStyle: 'italic' }}>e</span> outside J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          He is still delivering people today.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#1a1a1a' }}>
          No one is too far gon<span style={{ fontStyle: 'italic' }}>e</span>.
        </p>
      </section>

      {/* SECTION 5: THE JOURNEY OUT */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0, color: '#1a1a1a' }}>
          The J<span style={{ fontStyle: 'italic' }}>o</span>urney <span style={{ fontStyle: 'italic' }}>O</span>ut
        </h2>
        <ol style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.5rem', color: '#1a1a1a' }}>
          <li>Truth</li>
          <li>Conf<span style={{ fontStyle: 'italic' }}>e</span>ssion</li>
          <li>R<span style={{ fontStyle: 'italic' }}>e</span>p<span style={{ fontStyle: 'italic' }}>e</span>ntanc<span style={{ fontStyle: 'italic' }}>e</span></li>
          <li>Forgiv<span style={{ fontStyle: 'italic' }}>e</span>n<span style={{ fontStyle: 'italic' }}>e</span>ss</li>
          <li>R<span style={{ fontStyle: 'italic' }}>e</span>conciliation</li>
          <li>H<span style={{ fontStyle: 'italic' }}>o</span>n<span style={{ fontStyle: 'italic' }}>e</span>st Work</li>
          <li>S<span style={{ fontStyle: 'italic' }}>e</span>rving</li>
        </ol>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#1a1a1a' }}>
          You walk this path with support. Prayer, scripture, p<span style={{ fontStyle: 'italic' }}>e</span>opl<span style={{ fontStyle: 'italic' }}>e</span> who und<span style={{ fontStyle: 'italic' }}>e</span>rstand.
        </p>
      </section>

      {/* SECTION 6: THE NEW LIFE */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0, color: '#1a1a1a' }}>
          Th<span style={{ fontStyle: 'italic' }}>e</span> N<span style={{ fontStyle: 'italic' }}>e</span>w Lif<span style={{ fontStyle: 'italic' }}>e</span>
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          D<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>ranc<span style={{ fontStyle: 'italic' }}>e</span> is just the start.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          You will l<span style={{ fontStyle: 'italic' }}>e</span>arn to work hon<span style={{ fontStyle: 'italic' }}>e</span>stly.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          To liv<span style={{ fontStyle: 'italic' }}>e</span> without f<span style={{ fontStyle: 'italic' }}>e</span>ar.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#1a1a1a' }}>
          To build som<span style={{ fontStyle: 'italic' }}>e</span>thing that lasts.
        </p>
      </section>

      {/* SECTION 7: FINAL CALL */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0, color: '#1a1a1a' }}>
          Final Call
        </h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>
          Tir<span style={{ fontStyle: 'italic' }}>e</span>d of living a li<span style={{ fontStyle: 'italic' }}>e</span>?
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem', color: '#1a1a1a' }}>
          R<span style={{ fontStyle: 'italic' }}>e</span>ady to b<span style={{ fontStyle: 'italic' }}>e</span> fr<span style={{ fontStyle: 'italic' }}>e</span>e at last?
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem', color: '#1a1a1a' }}>
          J<span style={{ fontStyle: 'italic' }}>e</span>sus is calling you hom<span style={{ fontStyle: 'italic' }}>e</span>.
        </p>
        <button onClick={scrollToForm} style={{ padding: '1rem 2rem', backgroundColor: '#0F766E', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms' }}>
          Request D<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>ranc<span style={{ fontStyle: 'italic' }}>e</span>
        </button>
      </section>

      {/* SECTION 8: FORM */}
      <section id="form-section" style={{ padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto', borderTop: '1px solid #E5E5E5' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '2rem', marginTop: 0, color: '#1a1a1a' }}>
          R<span style={{ fontStyle: 'italic' }}>e</span>qu<span style={{ fontStyle: 'italic' }}>e</span>st D<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>ranc<span style={{ fontStyle: 'italic' }}>e</span>
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
              First Nam<span style={{ fontStyle: 'italic' }}>e</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box', transition: 'all 200ms' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
              Contact Numb<span style={{ fontStyle: 'italic' }}>e</span>r
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box', transition: 'all 200ms' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
              How long hav<span style={{ fontStyle: 'italic' }}>e</span> you liv<span style={{ fontStyle: 'italic' }}>e</span>d this lif<span style={{ fontStyle: 'italic' }}>e</span>?
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 5 years, 10 months"
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box', transition: 'all 200ms' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
              On<span style={{ fontStyle: 'italic' }}>e</span> thing you want to b<span style={{ fontStyle: 'italic' }}>e</span> fr<span style={{ fontStyle: 'italic' }}>e</span>e from most
            </label>
            <textarea
              name="freedomFrom"
              value={formData.freedomFrom}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #D0D0D0', borderRadius: '0.375rem', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'all 200ms' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ padding: '1rem 2rem', backgroundColor: '#0F766E', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 200ms' }}
          >
            {loading ? 'Submitting...' : 'R<span style={{ fontStyle: \'italic\' }}>e</span>qu<span style={{ fontStyle: \'italic\' }}>e</span>st D<span style={{ fontStyle: \'italic\' }}>e</span>liv<span style={{ fontStyle: \'italic\' }}>e</span>ranc<span style={{ fontStyle: \'italic\' }}>e</span>'}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '2rem 1.5rem', textAlign: 'center', fontSize: '0.9rem', borderTop: '1px solid #E5E5E5', marginTop: '2rem' }}>
        <p style={{ marginBottom: '1rem' }}>
          R<span style={{ fontStyle: 'italic' }}>e</span>storation Community — J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ D<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>rs
        </p>
        <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
          © 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
