'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PageLayout, PageHeader, Section, Card, CardContent, Input, Textarea, Button, Alert } from '@/components/ui';

interface ProfileData {
  displayName: string;
  preferredName: string;
  countryRegion: string;
  timeZone: string;
  bio: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProfileData>({
    displayName: '',
    preferredName: '',
    countryRegion: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    bio: '',
  });

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated' || !session) {
      console.log('[PROFILE] Not authenticated, redirecting to signin');
      router.push('/auth/signin');
      return;
    }

    console.log('[PROFILE] Authenticated, fetching profile');
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, router]);

  async function fetchProfile() {
    try {
      console.log('[PROFILE] Fetching profile data');
      const response = await fetch('/api/profile');

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setFormData({
        displayName: data.displayName || '',
        preferredName: data.preferredName || '',
        countryRegion: data.countryRegion || '',
        timeZone: data.timeZone || formData.timeZone,
        bio: data.bio || '',
      });

      console.log('[PROFILE] Profile loaded');
    } catch (err) {
      console.error('[PROFILE] Error fetching:', err);
      setError('Could not load profile');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors({});
    setSaving(true);
    setError('');
    setSuccess('');

    if (!formData.displayName.trim()) {
      setFormErrors({ displayName: 'Display name is required' });
      setSaving(false);
      return;
    }

    console.log('[PROFILE] Saving profile');

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      console.log('[PROFILE] Saved');
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred';
      console.error('[PROFILE] Error:', message);
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  if (status === 'loading' || loading) {
    return (
      <PageLayout>
        <PageHeader title="Loading..." />
        <p className="text-gray-600">Loading your profile...</p>
      </PageLayout>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <PageLayout>
      <PageHeader
        title="Edit Your Profile"
        description="Update your information anytime"
      />

      <Section>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Display Name"
                placeholder="How should we know you?"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                error={formErrors.displayName}
                required
              />

              <Input
                label="Preferred Name (optional)"
                placeholder="What do you prefer to be called?"
                value={formData.preferredName}
                onChange={(e) =>
                  setFormData({ ...formData, preferredName: e.target.value })
                }
              />

              <Input
                label="Country/Region (optional)"
                placeholder="Where are you located?"
                value={formData.countryRegion}
                onChange={(e) =>
                  setFormData({ ...formData, countryRegion: e.target.value })
                }
              />

              <Input
                label="Time Zone"
                placeholder="Your time zone"
                value={formData.timeZone}
                onChange={(e) =>
                  setFormData({ ...formData, timeZone: e.target.value })
                }
              />

              <Textarea
                label="About You (optional)"
                placeholder="Tell us a bit about yourself—what you're learning, what matters to you..."
                rows={4}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  isLoading={saving}
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push('/dashboard')}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
