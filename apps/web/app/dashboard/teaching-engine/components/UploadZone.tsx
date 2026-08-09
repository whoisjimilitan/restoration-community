'use client';

import { useState } from 'react';

interface UploadZoneProps {
  onUpload: (process: any) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!title.trim()) {
      setError('Sermon title required');
      return;
    }
    if (!transcript.trim()) {
      setError('Transcript required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/teaching-engine/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sermonTitle: title, transcript }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onUpload(data.process);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Title Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Sermon Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., A Contented Life"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Transcript Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Sermon Transcript
        </label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your full sermon transcript here..."
          rows={12}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
        />
        <p className="mt-2 text-xs text-gray-500">
          {transcript.length} characters
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? 'Processing...' : 'Process Sermon'}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Your sermon will be analyzed through 3 phases: verbatim extraction,
        deep reasoning, and output generation.
      </p>
    </div>
  );
}
