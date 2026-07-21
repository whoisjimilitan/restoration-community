'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setLoading(true);
    setError('');

    if (!formData.displayName.trim()) {
      setError('Display name is required');
      setLoading(false);
      return;
    }

    if (!formData.covenantAccepted) {
      setError('You must accept the Community Covenant to proceed');
      setLoading(false);
      return;
    }

    console.log('[ONBOARDING] Submitting onboarding:', formData);

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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Restoration Community
          </h1>
          <p className="text-gray-600">
            Let's set up your profile so the community can know you better.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Display Name *
            </label>
            <input
              id="displayName"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="How should others know you?"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
            />
          </div>

          {/* Preferred Name */}
          <div>
            <label
              htmlFor="preferredName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Name (optional)
            </label>
            <input
              id="preferredName"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Nickname or formal name"
              value={formData.preferredName}
              onChange={(e) =>
                setFormData({ ...formData, preferredName: e.target.value })
              }
            />
          </div>

          {/* Country/Region */}
          <div>
            <label
              htmlFor="countryRegion"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country/Region (optional)
            </label>
            <input
              id="countryRegion"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Where are you?"
              value={formData.countryRegion}
              onChange={(e) =>
                setFormData({ ...formData, countryRegion: e.target.value })
              }
            />
          </div>

          {/* Time Zone */}
          <div>
            <label
              htmlFor="timeZone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Zone
            </label>
            <input
              id="timeZone"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Auto-detected"
              value={formData.timeZone}
              onChange={(e) =>
                setFormData({ ...formData, timeZone: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-detected: {formData.timeZone}
            </p>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              About You (optional)
            </label>
            <textarea
              id="bio"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="A brief bio..."
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          {/* Covenant Acceptance */}
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                checked={formData.covenantAccepted}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    covenantAccepted: e.target.checked,
                  })
                }
              />
              <span className="ml-3 text-sm text-gray-700">
                I accept the{' '}
                <a
                  href="#covenant"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Community Covenant
                </a>
                {' '}and agree to participate respectfully *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Setting up your profile...' : 'Continue'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          * Required fields
        </p>
      </div>
    </div>
  );
}
