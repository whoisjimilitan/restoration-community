'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageLayout, PageHeader, Section, Card, CardContent, Input, Button, Alert } from '@/components/ui';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('[AUTH] Sign in attempt:', email);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('[AUTH] Sign in result:', result);

      if (!result?.ok) {
        throw new Error(result?.error || 'Sign in failed');
      }

      console.log('[AUTH] Sign in successful');
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
    <PageLayout className="flex items-center justify-center min-h-screen">
      <Section className="w-full max-w-md mb-0">
        <PageHeader
          title="Welcome back"
          description="Sign in to continue your restoration journey"
        />

        <Card>
          <CardContent>
            {error && (
              <Alert
                type="error"
                title="Sign in failed"
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
                required
              />

              <Button
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="w-full"
              >
                Sign In
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/auth/register"
                    className="font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    Create one
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
