'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout, PageHeader, Section, Card, CardContent, Button } from '@/components/ui';

export default function VerifyEmailErrorPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason') || 'unknown';

  const getErrorMessage = (reason: string): { title: string; message: string } => {
    switch (reason) {
      case 'invalid':
        return {
          title: 'Invalid Link',
          message: 'This verification link is invalid or has already been used. Please request a new verification email.',
        };
      case 'expired':
        return {
          title: 'Link Expired',
          message: 'This verification link has expired. Please request a new verification email to continue.',
        };
      case 'error':
        return {
          title: 'Verification Failed',
          message: 'An error occurred while verifying your email. Please try again or contact support.',
        };
      default:
        return {
          title: 'Verification Error',
          message: 'Unable to verify your email. Please try again or request a new verification link.',
        };
    }
  };

  const error = getErrorMessage(reason);

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
            title={error.title}
            description=""
          />

          <Card>
            <CardContent>
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-4xl mb-2">✗</div>
                <p className="text-gray-700">
                  {error.message}
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <Link href="/auth/signin" className="block">
                  <Button className="w-full">
                    Sign In
                  </Button>
                </Link>

                <Link href="/auth/register" className="block">
                  <Button variant="secondary" className="w-full">
                    Create Account
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
