'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { PageLayout, PageHeader, Section, Card, CardContent, Input, Button, Alert } from '@/components/ui';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setFormErrors({});

    const newErrors: Record<string, string> = {};

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      console.log('[REGISTER] Account created, signing in...');

      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!signInResult?.ok) {
        throw new Error('Sign in failed after registration');
      }

      console.log('[REGISTER] Sign in successful, redirecting to onboarding');
      router.push('/onboarding');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <Section className="w-full max-w-md mb-0">
        <PageHeader
          title="Start Your Journey"
          description="Create an account to begin"
        />

        <Card>
          <CardContent>
            {error && (
              <Alert
                type="error"
                title="Error"
                message={error}
                onClose={() => setError('')}
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint="At least 8 characters"
                error={formErrors.password}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={formErrors.confirmPassword}
                required
              />

              <Button
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="w-full"
              >
                Create Account
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link
                    href="/auth/signin"
                    className="font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
