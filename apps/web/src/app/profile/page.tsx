'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ProfileData {
  displayName: string;
  preferredName: string;
  countryRegion: string;
  timeZone: string;
  bio: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<ProfileData>({
    displayName: '',
    preferredName: '',
    countryRegion: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    bio: '',
  });

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    fetchProfile();
  }, [session, router]);

  async function fetchProfile() {
    console.log('[PROFILE] Fetching profile data');
    try {
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
    setSaving(true);
    setError('');
    setSuccess('');

    if (!formData.displayName.trim()) {
      setError('Display name is required');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600 mt-2">Update your information</p>
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
            />
          </div>

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
              value={formData.preferredName}
              onChange={(e) =>
                setFormData({ ...formData, preferredName: e.target.value })
              }
            />
          </div>

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
              value={formData.countryRegion}
              onChange={(e) =>
                setFormData({ ...formData, countryRegion: e.target.value })
              }
            />
          </div>

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
              value={formData.timeZone}
              onChange={(e) =>
                setFormData({ ...formData, timeZone: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              About You (optional)
            </label>
            <textarea
              id="bio"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <a
          href="/dashboard"
          className="block text-center mt-6 text-teal-600 hover:text-teal-700"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
