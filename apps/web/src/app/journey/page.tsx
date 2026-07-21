'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Stage {
  id: number;
  key: string;
  name: string;
  sequence: number;
  content?: {
    description: string;
    scripture?: string;
    guidance?: string;
    resources?: unknown;
  };
}

interface Transition {
  id: number;
  fromStage: Stage;
  toStage: Stage;
  createdAt: string;
  reason?: string;
}

interface Reflection {
  id: number;
  stageId: number;
  reflection: string;
  createdAt: string;
}

interface Journey {
  userId: string;
  currentStage: Stage;
  currentStageNumber: number;
  progressPercent: number;
  totalStages: number;
  createdAt: string;
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
      console.log('[JOURNEY] Not authenticated, redirecting');
      router.push('/auth/signin');
      return;
    }

    console.log('[JOURNEY] Authenticated, loading data');
    loadData();
  }, [status, session, router]);

  async function loadData() {
    try {
      console.log('[JOURNEY] Fetching journey and stages');
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
      console.log(
        '[JOURNEY] Loaded journey at stage',
        journeyData.currentStageNumber
      );
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

    console.log(
      '[JOURNEY] Advancing from stage',
      journey.currentStageNumber
    );

    try {
      const response = await fetch('/api/restoration/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: 'Self-directed advancement',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to advance');
      }

      const data = await response.json();
      setSuccess(
        `Progressed to ${data.toStage.name}. Well done on your journey!`
      );
      console.log('[JOURNEY] Advanced to stage', data.toStage.sequence);

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
      setError('Please enter a reflection');
      return;
    }

    setSubmittingReflection(true);
    setError('');
    setSuccess('');

    console.log('[JOURNEY] Submitting reflection');

    try {
      const response = await fetch('/api/restoration/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reflection }),
      });

      if (!response.ok) {
        throw new Error('Failed to save reflection');
      }

      console.log('[JOURNEY] Reflection saved');
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
      <div className="min-h-screen bg-white py-12 px-4 flex items-center justify-center">
        <p className="text-gray-600">Loading your restoration journey...</p>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 flex items-center justify-center">
        <p className="text-gray-600">Could not load your journey</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Restoration Journey
          </h1>
          <p className="text-lg text-gray-600">
            Progress: {journey.currentStageNumber} of {journey.totalStages}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-700">Overall Progress</h2>
            <span className="text-sm font-medium text-gray-900">
              {journey.progressPercent}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-teal-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${journey.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Current Stage Card */}
        <div className="mb-12 rounded-lg border border-gray-200 p-8 bg-gradient-to-br from-teal-50 to-white">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
              Stage {journey.currentStageNumber} of {journey.totalStages}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {journey.currentStage.name}
          </h3>
          {journey.currentStage.content && (
            <>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {journey.currentStage.content.description}
              </p>
              {journey.currentStage.content.scripture && (
                <div className="mb-6 p-4 bg-white rounded border-l-4 border-teal-600">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Scripture
                  </p>
                  <p className="text-gray-900 italic">
                    {journey.currentStage.content.scripture}
                  </p>
                </div>
              )}
              {journey.currentStage.content.guidance && (
                <div className="mb-6 p-4 bg-white rounded">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Guidance
                  </p>
                  <p className="text-gray-700">
                    {journey.currentStage.content.guidance}
                  </p>
                </div>
              )}
            </>
          )}

          {journey.currentStageNumber < 7 && (
            <button
              onClick={handleAdvance}
              disabled={advancing}
              className="mt-6 inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              {advancing ? 'Advancing...' : 'Move to Next Stage'}
            </button>
          )}
          {journey.currentStageNumber === 7 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-900 font-medium">
                ✓ You have completed all seven stages of restoration.
              </p>
            </div>
          )}
        </div>

        {/* Reflection Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Reflections
          </h2>

          <form
            onSubmit={handleAddReflection}
            className="mb-8 rounded-lg border border-gray-200 p-6"
          >
            <label
              htmlFor="reflection"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Share your thoughts on this stage
            </label>
            <textarea
              id="reflection"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="What is God teaching you? What progress are you making?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
            <button
              type="submit"
              disabled={submittingReflection}
              className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              {submittingReflection ? 'Saving...' : 'Save Reflection'}
            </button>
          </form>

          {journey.recentReflections.length > 0 ? (
            <div className="space-y-4">
              {journey.recentReflections.map((ref) => (
                <div
                  key={ref.id}
                  className="rounded-lg border border-gray-200 p-4 bg-gray-50"
                >
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(ref.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800">{ref.reflection}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No reflections yet. Start capturing your thoughts.
            </p>
          )}
        </div>

        {/* Progression History */}
        {journey.recentTransitions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Progress
            </h2>
            <div className="space-y-4">
              {journey.recentTransitions.map((transition) => (
                <div
                  key={transition.id}
                  className="rounded-lg border border-gray-200 p-4 flex items-center gap-4"
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(transition.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {transition.fromStage.name} →{' '}
                      {transition.toStage.name}
                    </p>
                    {transition.reason && (
                      <p className="text-sm text-gray-600">{transition.reason}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Stages Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The Seven Stages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allStages.map((stage) => (
              <div
                key={stage.id}
                className={`rounded-lg border-2 p-4 transition-all ${
                  stage.sequence <= journey.currentStageNumber
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                      stage.sequence <= journey.currentStageNumber
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {stage.sequence}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {stage.name}
                    </h3>
                    {stage.sequence === journey.currentStageNumber && (
                      <p className="text-xs text-teal-600 font-medium mt-1">
                        ● Current Stage
                      </p>
                    )}
                    {stage.sequence < journey.currentStageNumber && (
                      <p className="text-xs text-teal-600 font-medium mt-1">
                        ✓ Completed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="/dashboard"
          className="inline-block text-teal-600 hover:text-teal-700 font-medium"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
