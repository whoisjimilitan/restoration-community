'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface ReflectionFormProps {
  currentStageId: number;
  currentStageName: string;
}

export function ReflectionForm({
  currentStageId,
  currentStageName,
}: ReflectionFormProps) {
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!reflection.trim()) {
      setError('Please share your thoughts before submitting.');
      return;
    }

    setIsSubmitting(true);

    console.log('[REFLECTION-FORM] Submitting reflection for stage', currentStageId);

    try {
      const response = await fetch('/api/restoration/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reflection: reflection.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('[REFLECTION-FORM] Submission failed:', data.error);
        setError(data.error || 'Failed to save reflection. Please try again.');
        return;
      }

      console.log('[REFLECTION-FORM] Reflection saved successfully');
      setSuccess(true);
      setReflection('');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('[REFLECTION-FORM] Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Reflection</CardTitle>
        <CardDescription>
          Share your thoughts about {currentStageName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="reflection"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Your Thoughts
            </label>
            <textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What insights, struggles, or breakthroughs are you experiencing at this stage?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={6}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="px-4 py-3 rounded-lg bg-teal-50 border border-teal-200">
              <p className="text-sm text-teal-700">
                Thank you. Your reflection has been saved.
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !reflection.trim()}
              isLoading={isSubmitting}
              variant="primary"
            >
              {isSubmitting ? 'Saving...' : 'Save Reflection'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
