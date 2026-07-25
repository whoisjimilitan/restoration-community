'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
      <Section className="w-full max-w-md mb-0">
        <PageHeader
          title={error.title}
          description="Email verification"
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
                    Back to Sign In
                  </Button>
                </Link>

                <Link href="/auth/register" className="block">
                  <Button variant="secondary" className="w-full">
                    Create New Account
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
