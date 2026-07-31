'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout, PageHeader, Section, Card, CardContent, Input, Button, Alert } from '@/components/ui';

const PASSWORD_MIN_LENGTH = 12;

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    password.length >= PASSWORD_MIN_LENGTH &&
    password === confirmPassword &&
    !error;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setFormErrors({});

    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.error || 'Registration failed';

        if (response.status === 409) {
          setError('An account already exists with this email address.');
        } else {
          setError(errorMessage);
        }
        return;
      }

      console.log('[AUTH] Account created, redirecting to email verification');
      router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
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
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <Section className="w-full max-w-md mb-0">
          <PageHeader
            title="Begin Your Journey"
            description="Create an account to join the community"
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
                label="First Name"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={formErrors.firstName}
                required
              />

              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={formErrors.lastName}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formErrors.email}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint={`Minimum ${PASSWORD_MIN_LENGTH} characters`}
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
                disabled={!isFormValid || loading}
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
                    Sign In
                  </Link>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  Your information is handled with care and used only to support your participation in the Restoration Community.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        </Section>
      </motion.div>
    </PageLayout>
  );
}
