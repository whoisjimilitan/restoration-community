'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const isFormValid = email.trim() && password.trim();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setFormErrors({});

    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setLoading(true);

    console.log('[AUTH] Sign in attempt:', email);

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      console.log('[AUTH] Sign in result:', result);

      if (!result?.ok) {
        const errorMessage = result?.error || 'Sign in failed';

        if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
          setError('No account found with this email address.');
        } else if (errorMessage.includes('not verified') || errorMessage.includes('emailVerified')) {
          setError(
            'Your email has not been verified yet. Please check your inbox for the verification link or request a new one.'
          );
        } else if (errorMessage.includes('password') || errorMessage.includes('mismatch')) {
          setError('Incorrect email or password.');
        } else {
          setError(errorMessage);
        }
        return;
      }

      console.log('[AUTH] Sign in successful, redirecting to:', callbackUrl);
      router.push(callbackUrl);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred';
      console.error('[AUTH] Sign in error:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '2rem', paddingRight: '2rem', backgroundColor: '#FAFAF8' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            marginTop: 0
          }}>
            W<span style={{ fontStyle: 'italic' }}>e</span>lcom<span style={{ fontStyle: 'italic' }}>e</span> Back
          </h1>
          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.7,
            marginTop: 0
          }}>
            Sign in to continue your r<span style={{ fontStyle: 'italic' }}>e</span>storation journ<span style={{ fontStyle: 'italic' }}>e</span>y.
          </p>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#991B1B',
              padding: '1rem',
              borderRadius: '0.375rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.9375rem' }}>
                Sign In Failed
              </p>
              <p style={{ margin: 0, fontSize: '0.9375rem' }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9375rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                color: '#202124',
                marginBottom: '0.5rem'
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  color: '#202124',
                  border: formErrors.email ? '1px solid #EF4444' : '1px solid #D5D3CF',
                  borderRadius: '0.375rem',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              />
              {formErrors.email && (
                <p style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9375rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                color: '#202124',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  color: '#202124',
                  border: formErrors.password ? '1px solid #EF4444' : '1px solid #D5D3CF',
                  borderRadius: '0.375rem',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              />
              {formErrors.password && (
                <p style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                  {formErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: !isFormValid || loading ? '#D1D5DB' : '#0D5E57',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
                borderRadius: '0.375rem',
                border: '2px solid #0D5E57',
                cursor: !isFormValid || loading ? 'not-allowed' : 'pointer',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (isFormValid && !loading) {
                  e.currentTarget.style.backgroundColor = '#0a4a47';
                  e.currentTarget.style.borderColor = '#0a4a47';
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid && !loading) {
                  e.currentTarget.style.backgroundColor = '#0D5E57';
                  e.currentTarget.style.borderColor = '#0D5E57';
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <p style={{ fontSize: '0.9375rem', fontFamily: 'Inter, system-ui, -apple-system, sans-serif', color: '#202124', margin: 0 }}>
                <Link
                  href="/auth/password-reset"
                  style={{
                    color: '#0D5E57',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.textDecoration = 'none';
                  }}
                >
                  Forgot password?
                </Link>
              </p>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid #E5E5E5' }}>
              <p style={{ textAlign: 'center', fontSize: '0.9375rem', fontFamily: 'Inter, system-ui, -apple-system, sans-serif', color: '#202124', margin: 0 }}>
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/register"
                  style={{
                    fontWeight: 600,
                    color: '#0D5E57',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.textDecoration = 'none';
                  }}
                >
                  Cr<span style={{ fontStyle: 'italic' }}>e</span>at<span style={{ fontStyle: 'italic' }}>e</span> on<span style={{ fontStyle: 'italic' }}>e</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
