'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout, PageHeader, Section, Card, CardContent, Button, Alert } from '@/components/ui';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  async function handleResendEmail() {
    if (!email) {
      setError('Email address not found');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to resend email');
      }

      console.log('[AUTH] Verification email resent to:', email);
      setSuccess('Verification email sent. Check your inbox.');
      setResendCooldown(60);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to resend email'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <Section className="w-full max-w-md mb-0">
          <PageHeader
            title="Check Email"
            description="Verify your account"
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

            {success && (
              <Alert
                type="success"
                title="Success"
                message={success}
                onClose={() => setSuccess('')}
              />
            )}

            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Check your inbox for the verification link.
              </p>

              <p className="text-base font-medium text-teal-600">
                {email || 'your email'}
              </p>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleResendEmail}
                  disabled={loading || resendCooldown > 0}
                  isLoading={loading}
                  className="w-full"
                >
                  {resendCooldown > 0 ? (
                    <>Resend Email ({resendCooldown}s)</>
                  ) : (
                    <>Resend Email</>
                  )}
                </Button>

                <Link href="/auth/signin" className="block">
                  <Button
                    variant="secondary"
                    className="w-full"
                    type="button"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        </Section>
      </motion.div>
    </PageLayout>
  );
}
