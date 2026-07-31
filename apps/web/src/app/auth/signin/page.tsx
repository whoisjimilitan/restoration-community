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

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/stages';

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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FAFAF8'
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h1 style={{
            fontSize: '2.75rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1.2,
            marginBottom: '0.75rem',
            marginTop: 0,
            letterSpacing: '-0.02em'
          }}>
            W<span style={{ fontStyle: 'italic' }}>e</span>lcom<span style={{ fontStyle: 'italic' }}>e</span> Back
          </h1>
          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#666666',
            lineHeight: 1.7,
            marginTop: 0
          }}>
            Sign in to continue your restoration journey.
          </p>
        </div>

        {/* Form Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '2.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #f0f0f0'
        }}>
          {/* Error Banner */}
          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#991B1B',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1.5rem'
            }}>
              <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>
                Sign In Failed
              </p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9375rem', lineHeight: 1.5 }}>
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
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
                  padding: '0.875rem',
                  fontSize: '1rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#1a1a1a',
                  border: formErrors.email ? '1px solid #DC2626' : '1px solid #D1D5DB',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  transition: 'all 200ms',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  if (!formErrors.email) {
                    e.currentTarget.style.borderColor = '#0D5E57';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = formErrors.email ? '#DC2626' : '#D1D5DB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {formErrors.email && (
                <p style={{ color: '#DC2626', fontSize: '0.8125rem', marginTop: '0.375rem', margin: '0.375rem 0 0 0', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 500 }}>
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
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
                  padding: '0.875rem',
                  fontSize: '1rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#1a1a1a',
                  border: formErrors.password ? '1px solid #DC2626' : '1px solid #D1D5DB',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  transition: 'all 200ms',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  if (!formErrors.password) {
                    e.currentTarget.style.borderColor = '#0D5E57';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,94,87,0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = formErrors.password ? '#DC2626' : '#D1D5DB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {formErrors.password && (
                <p style={{ color: '#DC2626', fontSize: '0.8125rem', marginTop: '0.375rem', margin: '0.375rem 0 0 0', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 500 }}>
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              style={{
                padding: '0.875rem 1.5rem',
                backgroundColor: !isFormValid || loading ? '#E5E7EB' : '#0D5E57',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: !isFormValid || loading ? 'not-allowed' : 'pointer',
                transition: 'all 200ms',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                opacity: loading ? 0.8 : 1,
                marginTop: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (isFormValid && !loading) {
                  e.currentTarget.style.backgroundColor = '#0a4a47';
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid && !loading) {
                  e.currentTarget.style.backgroundColor = '#0D5E57';
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Links */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #F0F0F0' }}>
            <p style={{
              fontSize: '0.9375rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#666666',
              textAlign: 'center',
              margin: '1rem 0 0 0'
            }}>
              <Link
                href="/auth/password-reset"
                style={{
                  color: '#0D5E57',
                  textDecoration: 'none',
                  fontWeight: 500,
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
            <p style={{
              fontSize: '0.9375rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#666666',
              textAlign: 'center',
              margin: '1rem 0 0 0'
            }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/deliverance"
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
                Start your journey
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* FOOTER - Matches Partnership/Landing Pages */}
      <footer style={{
        width: '100%',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid #333333',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem'
          }}>
            <a
              href="/"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              Home
            </a>
            <a
              href="/partnership"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              Partnership
            </a>
            <a
              href="/testimonies"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              Success Stories
            </a>
          </div>

          {/* Copyright Only */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.25)',
            fontSize: '0.75rem',
            margin: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            © 2026. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
