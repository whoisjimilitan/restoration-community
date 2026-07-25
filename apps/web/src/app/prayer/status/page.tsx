'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PageLayout, PageHeader, Section, Card, CardContent, Badge, Button, Alert } from '@/components/ui';

interface PrayerRequest {
  id: string;
  content: string;
  status: string;
  createdAt: string;
}

export default function PrayerStatusPage() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStatus === 'loading') return;

    if (sessionStatus === 'unauthenticated' || !session) {
      router.push('/auth/signin');
      return;
    }

    loadRequests();
  }, [sessionStatus, session, router]);

  async function loadRequests() {
    try {
      const response = await fetch('/api/prayer/status');

      if (!response.ok) {
        throw new Error('Failed to load prayer requests');
      }

      const data = await response.json();
      setRequests(data.requests);
    } catch (err) {
      console.error('[PRAYER] Error loading requests:', err);
      setError('Could not load your prayer requests');
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'RECEIVED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PRAYER':
        return 'bg-green-100 text-green-800';
      case 'FOLLOW_UP_REQUIRED':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusLabel(status: string): string {
    switch (status) {
      case 'SUBMITTED':
        return 'Submitted';
      case 'RECEIVED':
        return 'Received';
      case 'IN_PRAYER':
        return 'In Prayer';
      case 'FOLLOW_UP_REQUIRED':
        return 'Follow-up Needed';
      case 'COMPLETED':
        return 'Completed';
      default:
        return status;
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (sessionStatus === 'loading' || loading) {
    return (
      <PageLayout>
        <PageHeader title="Your Prayer Requests" />
        <Section>
          <p>Loading...</p>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="Your Prayer Requests"
        description="View the status of prayers submitted to Brother Jimi's prayer ministry"
      />

      <Section>
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} />
          </div>
        )}

        {requests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600">You haven&apos;t submitted any prayer requests yet.</p>
                <Button
                  onClick={() => router.push('/prayer')}
                  className="w-full"
                >
                  Submit Your First Prayer Request
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusLabel(request.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Your Prayer Request</h3>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {request.content}
                      </p>
                    </div>

                    {request.status === 'IN_PRAYER' && (
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-sm text-green-700">
                          This prayer request is being lifted up in prayer.
                        </p>
                      </div>
                    )}

                    {request.status === 'FOLLOW_UP_REQUIRED' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <p className="text-sm text-yellow-700">
                          The prayer ministry has noted follow-up needed. Watch for communication from Brother Jimi.
                        </p>
                      </div>
                    )}

                    {request.status === 'COMPLETED' && (
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <p className="text-sm text-gray-700">
                          This prayer request has been completed. God has moved.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              onClick={() => router.push('/prayer')}
              className="w-full"
            >
              Submit Another Prayer Request
            </Button>
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
