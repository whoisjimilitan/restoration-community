'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PageLayout, PageHeader, Section, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Textarea, Alert } from '@/components/ui';

export default function PrayerPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated' || !session) {
      router.push('/auth/signin');
      return;
    }
  }, [status, session, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please share your prayer request');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/prayer/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit prayer request');
      }

      const data = await response.json();
      setSuccess(data.message);
      setContent('');
      setSubmitted(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push('/prayer/status');
    } catch (err) {
      console.error('[PRAYER] Error submitting request:', err);
      setError('Could not submit prayer request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'loading') {
    return (
      <PageLayout>
        <PageHeader title="Prayer" />
        <Section>
          <p>Loading...</p>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="Prayer Ministry"
        description="Submit your prayer request to Brother Jimi's prayer ministry"
      />

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Prayer Request</CardTitle>
            <CardDescription>
              Share what you need prayer for. Your request is private and will be handled with care.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="mb-6">
                <Alert type="success" message={success} />
              </div>
            )}
            {error && (
              <div className="mb-6">
                <Alert type="error" message={error} />
              </div>
            )}

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-2">
                    Your Prayer Request
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Share what you need prayer for..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={submitting}
                    className="min-h-32"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Your request is confidential and will be shared only with Brother Jimi and the prayer ministry.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || !content.trim()}
                  className="w-full"
                >
                  {submitting ? 'Submitting...' : 'Submit Prayer Request'}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-lg font-semibold">Thank you for your trust.</p>
                <p className="text-gray-600">
                  Your prayer request has been received by Brother Jimi&apos;s prayer ministry.
                </p>
                <Button
                  onClick={() => router.push('/prayer/status')}
                  className="w-full"
                >
                  View Your Requests
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About Prayer Ministry</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-4">
            <p>
              Prayer is the spiritual foundation of your restoration journey. When you submit a prayer request here, you are reaching out to Brother Jimi&apos;s prayer ministry for intercession.
            </p>
            <p>
              The prayer ministry will stand with you before God. Your vulnerability is safe with us.
            </p>
            <p>
              You can check the status of your prayer requests anytime. This is your space to seek prayer for whatever you need.
            </p>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
