'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PageLayout, PageHeader, Section, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Textarea, Alert, Progress } from '@/components/ui';

interface Stage {
  id: number;
  key: string;
  name: string;
  sequence: number;
  content?: {
    description: string;
    scripture?: string;
    guidance?: string;
  };
}

interface Transition {
  id: number;
  fromStage: Stage;
  toStage: Stage;
  createdAt: string;
}

interface Reflection {
  id: number;
  reflection: string;
  createdAt: string;
}

interface Journey {
  currentStage: Stage;
  currentStageNumber: number;
  progressPercent: number;
  recentTransitions: Transition[];
  recentReflections: Reflection[];
}

export default function JourneyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [allStages, setAllStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const [reflection, setReflection] = useState('');
  const [submittingReflection, setSubmittingReflection] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated' || !session) {
      router.push('/auth/signin');
      return;
    }

    loadData();
  }, [status, session, router]);

  async function loadData() {
    try {
      const [journeyRes, stagesRes] = await Promise.all([
        fetch('/api/restoration/journey'),
        fetch('/api/restoration/stages'),
      ]);

      if (!journeyRes.ok || !stagesRes.ok) {
        throw new Error('Failed to load data');
      }

      const journeyData = await journeyRes.json();
      const stagesData = await stagesRes.json();

      setJourney(journeyData);
      setAllStages(stagesData);
    } catch (err) {
      console.error('[JOURNEY] Error loading data:', err);
      setError('Could not load your journey');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdvance() {
    if (!journey || journey.currentStageNumber >= 7) return;

    setAdvancing(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/restoration/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: 'Ready to move forward',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to advance');
      }

      const data = await response.json();
      setSuccess(
        `You've progressed to ${data.toStage.name}. Keep going!`
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));
      await loadData();
    } catch (err) {
      console.error('[JOURNEY] Error advancing:', err);
      setError('Could not advance to next stage');
    } finally {
      setAdvancing(false);
    }
  }

  async function handleAddReflection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reflection.trim()) {
      setError('Please share your thoughts');
      return;
    }

    setSubmittingReflection(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/restoration/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reflection }),
      });

      if (!response.ok) {
        throw new Error('Failed to save reflection');
      }

      setSuccess('Reflection saved');
      setReflection('');

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await loadData();
    } catch (err) {
      console.error('[JOURNEY] Error saving reflection:', err);
      setError('Could not save reflection');
    } finally {
      setSubmittingReflection(false);
    }
  }

  if (status === 'loading' || loading) {
    return (
      <PageLayout>
        <PageHeader title="Your Restoration Journey" />
        <p className="text-gray-600">Loading...</p>
      </PageLayout>
    );
  }

  if (!journey) {
    return (
      <PageLayout>
        <PageHeader title="Your Restoration Journey" />
        <Alert type="error" message="Could not load your journey" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="Your Restoration Journey"
        description={`You're on stage ${journey.currentStageNumber} of 7`}
      />

      {error && (
        <Section>
          <Alert
            type="error"
            message={error}
            onClose={() => setError('')}
          />
        </Section>
      )}

      {success && (
        <Section>
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess('')}
          />
        </Section>
      )}

      {/* Current Stage */}
      <Section>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>{journey.currentStage.name}</CardTitle>
                <CardDescription>
                  Stage {journey.currentStageNumber} of 7
                </CardDescription>
              </div>
              <Badge variant="primary">Current</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress */}
              <Progress
                value={journey.progressPercent}
                label="Overall Progress"
                showPercent
              />

              {/* Content */}
              {journey.currentStage.content && (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {journey.currentStage.content.description}
                  </p>

                  {journey.currentStage.content.scripture && (
                    <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-600">
                      <p className="text-sm font-medium text-teal-900 mb-1">
                        Scripture
                      </p>
                      <p className="text-sm text-teal-800 italic">
                        {journey.currentStage.content.scripture}
                      </p>
                    </div>
                  )}

                  {journey.currentStage.content.guidance && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Guidance for This Stage
                      </p>
                      <p className="text-sm text-gray-700">
                        {journey.currentStage.content.guidance}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              {journey.currentStageNumber < 7 && (
                <div className="pt-4">
                  <Button
                    onClick={handleAdvance}
                    disabled={advancing}
                    isLoading={advancing}
                  >
                    Move to Next Stage
                  </Button>
                </div>
              )}

              {journey.currentStageNumber === 7 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-900">
                    ✓ You have completed all seven stages
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Reflections */}
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Your Reflections</CardTitle>
            <CardDescription>
              Capture your thoughts and growth at this stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Add Reflection */}
              <form onSubmit={handleAddReflection} className="space-y-3">
                <Textarea
                  placeholder="What are you learning? What's changing in you?"
                  rows={3}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={submittingReflection}
                  isLoading={submittingReflection}
                  variant="secondary"
                >
                  Save Reflection
                </Button>
              </form>

              {/* Recent Reflections */}
              {journey.recentReflections.length > 0 ? (
                <div className="space-y-3 pt-4">
                  {journey.recentReflections.map((ref) => (
                    <div
                      key={ref.id}
                      className="p-3 bg-gray-50 rounded-lg text-sm"
                    >
                      <p className="text-xs text-gray-500 mb-1.5">
                        {new Date(ref.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </p>
                      <p className="text-gray-800">{ref.reflection}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No reflections yet. Start writing to capture your journey.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* All Stages Overview */}
      <Section>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            All Stages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allStages.map((stage) => (
              <div
                key={stage.id}
                className={`p-4 rounded-lg border-2 ${
                  stage.sequence <= journey.currentStageNumber
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      stage.sequence <= journey.currentStageNumber
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {stage.sequence}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {stage.name}
                    </h3>
                    {stage.sequence === journey.currentStageNumber && (
                      <p className="text-xs text-teal-600 font-medium mt-1">
                        You are here
                      </p>
                    )}
                    {stage.sequence < journey.currentStageNumber && (
                      <p className="text-xs text-teal-600 font-medium mt-1">
                        Completed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Back Link */}
      <Section>
        <a
          href="/dashboard"
          className="inline-flex text-base font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
        >
          ← Back to Dashboard
        </a>
      </Section>
    </PageLayout>
  );
}
