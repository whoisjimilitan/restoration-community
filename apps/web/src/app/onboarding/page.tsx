'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, PageHeader, Section, Card, CardContent, Input, Button, Alert } from '@/components/ui';

// Community Covenant from GOV-003
const COMMUNITY_COVENANT_V1 = `I acknowledge that true restoration begins and ends with Jesus Christ. No programme, mentor, community or platform can replace Him. Everything within this community exists only to point people toward Him.

I commit myself to honesty. I will not deliberately deceive, manipulate or misrepresent myself. Where I fail, I will seek truth rather than hiding behind appearances.

I understand that restoration is a journey rather than a single event. I will embrace growth with patience. I will not expect perfection from myself or from others.

I choose to walk with others rather than alone. I recognise that restoration flourishes within healthy relationships. I will seek unity, encouragement and mutual care.

I acknowledge that I do not possess every answer. I will remain teachable. I will receive correction graciously and offer correction gently.

Every person I encounter bears the image of God. I will treat every participant with dignity, kindness and patience. Even in disagreement I will refuse contempt.

Where trust is given, I will protect it. I will not disclose another person's personal journey except where required for safety or by law.

My restoration remains my responsibility. The community may guide me. Mentors may encourage me. But no one can choose obedience on my behalf.

As I grow, I will seek opportunities to strengthen others. Restoration naturally becomes service. Receiving eventually becomes giving.

I understand that every member of this community is imperfect. Mistakes will occur. Grace does not ignore truth. Truth is always offered with grace.

I reject hostility, division and unnecessary conflict. Where disagreement exists, I will pursue reconciliation before accusation.

I will use this platform honestly. I will respect its purpose. I will not intentionally misuse its resources or disrupt the community.

I believe restoration is possible. Not because of human ability, but because Jesus Christ continues to restore broken people. That hope shapes my participation here.

By continuing into the Restoration Community I affirm that:
• I have read this Covenant.
• I understand its purpose.
• I desire to participate in this spirit.
• I recognise that this Covenant guides the life of the community.
• I understand that participation remains voluntary.
• I may withdraw at any time.`;

type OnboardingStep = 'welcome' | 'covenant' | 'profile' | 'confirming';

export default function OnboardingPage() {
  const router = useRouter();
  const covenantRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [covenantScrolled, setCovenantScrolled] = useState(false);
  const [covenantAccepted, setCovenantAccepted] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: '',
  });

  function handleCovenanScroll(e: React.UIEvent<HTMLDivElement>) {
    const element = e.currentTarget;
    const isNearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 10;
    if (isNearBottom) {
      setCovenantScrolled(true);
    }
  }

  async function handleCovenantAccept() {
    if (!covenantScrolled) {
      setError(
        'Please read the entire Covenant by scrolling to the bottom before accepting.'
      );
      return;
    }

    if (!covenantAccepted) {
      setError('Please check the box to acknowledge the Covenant.');
      return;
    }

    setError('');
    setStep('profile');
  }

  async function handleProfileSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors({});
    setError('');

    const newErrors: Record<string, string> = {};

    if (!profileData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setLoading(true);
    setStep('confirming');

    console.log('[ONBOARDING] Submitting onboarding');

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: profileData.displayName.trim(),
          covenantVersion: '1.0',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Onboarding failed');
      }

      console.log('[ONBOARDING] Success, redirecting to dashboard');
      router.push('/dashboard');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred';
      console.error('[ONBOARDING] Error:', message);
      setError(message);
      setStep('profile');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'welcome') {
    return (
      <PageLayout className="flex items-center justify-center min-h-screen">
        <Section className="w-full max-w-2xl mb-0">
          <Card>
            <CardContent className="py-12">
              <div className="space-y-6 text-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Welcome
                  </h1>
                  <p className="text-lg text-gray-600">
                    You are welcome here.
                  </p>
                </div>

                <div className="space-y-4 text-left bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700">
                    Restoration is a journey walked with Christ and His people.
                  </p>
                  <p className="text-gray-700">
                    Today is simply the first faithful step.
                  </p>
                  <p className="text-gray-700">
                    This community exists to walk alongside you as you pursue
                    truth, restoration, honest work, faithful relationships, and
                    continual dependence upon Jesus Christ.
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => setStep('covenant')}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </PageLayout>
    );
  }

  if (step === 'covenant') {
    return (
      <PageLayout>
        <PageHeader
          title="Community Covenant"
          description="Please read this carefully before proceeding"
        />

        <Section>
          <Card>
            <CardContent>
              {error && (
                <Alert
                  type="error"
                  title="Please Complete"
                  message={error}
                  onClose={() => setError('')}
                />
              )}

              <div className="space-y-4">
                <div
                  ref={covenantRef}
                  onScroll={handleCovenanScroll}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 overflow-y-auto max-h-96"
                >
                  <div className="prose prose-sm max-w-none text-gray-700 space-y-3 whitespace-pre-wrap text-sm leading-relaxed">
                    {COMMUNITY_COVENANT_V1}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    {covenantScrolled
                      ? "✓ You've read the full Covenant"
                      : 'Please scroll to the bottom to read the entire Covenant before accepting'}
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={covenantAccepted}
                    onChange={(e) => setCovenantAccepted(e.target.checked)}
                    disabled={!covenantScrolled}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span className="text-sm text-gray-700">
                    I have read this Covenant. I understand its purpose. I desire
                    to participate in this spirit. I recognise that this Covenant
                    guides the life of the community. I understand that
                    participation remains voluntary. I may withdraw at any time.
                  </span>
                </label>

                <div className="pt-4 space-y-3">
                  <Button
                    onClick={handleCovenantAccept}
                    disabled={!covenantScrolled || !covenantAccepted}
                    className="w-full"
                  >
                    Accept Covenant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </PageLayout>
    );
  }

  if (step === 'profile') {
    return (
      <PageLayout>
        <PageHeader
          title="Tell Us Your Name"
          description="How would you like to be known in this community?"
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

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <Input
                  label="Display Name"
                  placeholder="What should we call you?"
                  value={profileData.displayName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, displayName: e.target.value })
                  }
                  error={formErrors.displayName}
                  hint="This is how others in the community will know you"
                  required
                  autoFocus
                />

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

  return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <Section className="w-full max-w-md mb-0">
        <Card>
          <CardContent className="py-12 text-center">
            <div className="space-y-4">
              <p className="text-gray-600">Completing your registration...</p>
              <div className="inline-block animate-spin">
                <div className="h-8 w-8 border-4 border-gray-300 border-t-teal-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
