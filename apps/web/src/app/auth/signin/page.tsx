'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-rc-bg flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight mb-4">
              Welcome Back
            </h1>
            <p className="text-base md:text-lg text-rc-text/70 leading-relaxed font-light">
              Continue your journey toward freedom in Jesus.
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-900 px-6 py-4 rounded-lg">
                <p className="font-medium text-sm">Sign In Failed</p>
                <p className="text-sm mt-2 leading-relaxed">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-rc-text/70">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className={`w-full px-4 py-3 text-base border rounded-lg transition-all duration-200 bg-white focus:outline-none ${
                    formErrors.email
                      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-rc-border/30 focus:border-rc-accent/60 focus:ring-2 focus:ring-rc-accent/10'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-600 text-sm font-medium">{formErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-rc-text/70">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-4 py-3 text-base border rounded-lg transition-all duration-200 bg-white focus:outline-none ${
                    formErrors.password
                      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-rc-border/30 focus:border-rc-accent/60 focus:ring-2 focus:ring-rc-accent/10'
                  }`}
                />
                {formErrors.password && (
                  <p className="text-red-600 text-sm font-medium">{formErrors.password}</p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full mt-4 px-6 py-3 min-h-[48px] bg-rc-text text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none text-base"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Links */}
            <div className="pt-8 border-t border-rc-border/20 space-y-4">
              <p className="text-center text-base text-rc-text/70">
                <Link
                  href="/auth/password-reset"
                  className="text-rc-accent hover:text-rc-accent/80 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </p>
              <p className="text-center text-base text-rc-text/70">
                Don&apos;t have an account?{' '}
                <Link
                  href="/"
                  className="text-rc-accent hover:text-rc-accent/80 font-semibold transition-colors"
                >
                  Start your journey
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a href="/" className="text-white/80 hover:text-white transition-colors group text-sm">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/partnership" className="text-white/80 hover:text-white transition-colors group text-sm">
              Partnership
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/testimonies" className="text-white/80 hover:text-white transition-colors group text-sm">
              Success Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>
          <p className="text-white/25 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
