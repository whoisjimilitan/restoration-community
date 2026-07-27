'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    covenantAccepted: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Validate token on load
  useEffect(() => {
    if (!token) {
      setError('No signup token provided. Invalid or expired link.');
      setLoading(false);
      return;
    }

    console.log('[SIGNUP] Token received:', token.substring(0, 8) + '...');
    setTokenValid(true);
    setLoading(false);
  }, [token]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';

    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (!formData.covenantAccepted) errors.covenant = 'You must accept the covenant to proceed';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('[SIGNUP] Validation failed');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      console.log('[SIGNUP] Submitting signup form');

      const res = await fetch('/api/onboarding/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          covenantAccepted: formData.covenantAccepted
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('[SIGNUP] Signup failed:', data.error);
        setError(data.error || 'Signup failed. Please try again.');
        return;
      }

      console.log('[SIGNUP] Signup successful:', data.user.id);

      // Redirect to journey
      router.push('/journey');
    } catch (err) {
      console.error('[SIGNUP] Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F6F2' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#666' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F6F2', padding: '2rem' }}>
        <div style={{ maxWidth: '500px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '1rem', color: '#c33' }}>
            Invalid Link
          </h1>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>
            {error}
          </p>
          <Link href="/" style={{ color: '#0F766E', fontWeight: 'bold' }}>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F6F2', paddingTop: '4rem', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div style={{ maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
            Welcome to Restoration
          </h1>
          <p style={{ fontSize: '1rem', color: '#666', textAlign: 'center' }}>
            Create your account to begin your journey of truth
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee', border: '1px solid #fcc', color: '#c33', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: formErrors.email ? '2px solid #c33' : '1px solid #ddd',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            {formErrors.email && <p style={{ color: '#c33', fontSize: '0.85rem', marginTop: '0.25rem' }}>{formErrors.email}</p>}
          </div>

          {/* First Name */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: formErrors.firstName ? '2px solid #c33' : '1px solid #ddd',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            {formErrors.firstName && <p style={{ color: '#c33', fontSize: '0.85rem', marginTop: '0.25rem' }}>{formErrors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: formErrors.lastName ? '2px solid #c33' : '1px solid #ddd',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            {formErrors.lastName && <p style={{ color: '#c33', fontSize: '0.85rem', marginTop: '0.25rem' }}>{formErrors.lastName}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: formErrors.password ? '2px solid #c33' : '1px solid #ddd',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            {formErrors.password && <p style={{ color: '#c33', fontSize: '0.85rem', marginTop: '0.25rem' }}>{formErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: formErrors.confirmPassword ? '2px solid #c33' : '1px solid #ddd',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            {formErrors.confirmPassword && <p style={{ color: '#c33', fontSize: '0.85rem', marginTop: '0.25rem' }}>{formErrors.confirmPassword}</p>}
          </div>

          {/* Covenant */}
          <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #ddd' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.covenantAccepted}
                onChange={(e) => setFormData({ ...formData, covenantAccepted: e.target.checked })}
                style={{ marginRight: '0.75rem', marginTop: '0.25rem', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                I accept the covenant to walk the path of truth and restoration with integrity and honesty.
              </span>
            </label>
            {formErrors.covenant && <p style={{ color: '#c33', fontSize: '0.85rem', marginTop: '0.5rem' }}>{formErrors.covenant}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#0F766E',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              transition: 'all 200ms'
            }}
            onMouseEnter={(e) => {
              if (!submitting) (e.currentTarget.style.backgroundColor = '#0a5c59');
            }}
            onMouseLeave={(e) => {
              if (!submitting) (e.currentTarget.style.backgroundColor = '#0F766E');
            }}
          >
            {submitting ? 'Creating Account...' : 'Begin Your Journey'}
          </button>
        </form>
      </div>
    </div>
  );
}
