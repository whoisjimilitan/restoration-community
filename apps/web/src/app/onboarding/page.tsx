'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, PageHeader, Section, Card, CardContent, Input, Textarea, Button, Alert } from '@/components/ui';

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    displayName: '',
    preferredName: '',
    countryRegion: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    bio: '',
    covenantAccepted: false,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors({});
    setLoading(true);
    setError('');

    const newErrors: Record<string, string> = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData.covenantAccepted) {
      newErrors.covenant = 'You must accept the Community Covenant to proceed';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      setLoading(false);
      return;
    }

    console.log('[ONBOARDING] Submitting onboarding');

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Onboarding failed');
      }

      console.log('[ONBOARDING] Success');
      router.push('/dashboard');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred';
      console.error('[ONBOARDING] Error:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout>
      <PageHeader
        title="Welcome to the Community"
        description="Let's get to know you. This is your first step toward restoration."
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Display Name"
                placeholder="What should we call you?"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                error={formErrors.displayName}
                hint="This is how others in the community will know you"
                required
              />

              <Input
                label="Preferred Name (optional)"
                placeholder="Do you prefer a nickname?"
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
                value={formData.timeZone}
                onChange={(e) =>
                  setFormData({ ...formData, timeZone: e.target.value })
                }
                hint="We auto-detected this, but you can change it"
              />

              <Textarea
                label="About You (optional)"
                placeholder="Tell us a bit about yourself. What brings you here? What are you hoping for?"
                rows={4}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />

              {/* Covenant */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.covenantAccepted}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        covenantAccepted: e.target.checked,
                      })
                    }
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    I accept the Community Covenant and agree to treat others with
                    respect, honesty, and grace.
                  </span>
                </label>
                {formErrors.covenant && (
                  <p className="text-sm text-red-600">{formErrors.covenant}</p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  className="w-full"
                >
                  Begin My Journey
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
