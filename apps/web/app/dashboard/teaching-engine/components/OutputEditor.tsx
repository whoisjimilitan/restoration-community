'use client';

import { useState } from 'react';

interface OutputEditorProps {
  format: string;
  content: string;
  processId: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

export default function OutputEditor({
  format,
  content: initialContent,
  processId,
  onSave,
  onClose,
}: OutputEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('now');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([format]);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      for (const platform of selectedPlatforms) {
        const response = await fetch('/api/social/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            processId,
            platform,
            format,
            content,
            scheduledFor: publishMode === 'schedule' ? scheduledTime : new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to schedule post to ${platform}`);
        }
      }

      alert('Posts scheduled successfully!');
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to schedule posts');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900 capitalize">
            Edit {format}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Editor */}
        <div className="px-6 py-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-black focus:border-transparent"
            rows={10}
          />
          <p className="mt-2 text-xs text-gray-500">
            {content.length} characters
            {format === 'twitter' && content.length > 280 && (
              <span className="ml-4 text-red-600">
                ⚠️ Exceeds Twitter limit
              </span>
            )}
          </p>
        </div>

        {/* Platform Selection */}
        <div className="border-t border-gray-200 px-6 py-4">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Publish to Platforms
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['twitter', 'instagram', 'facebook', 'tiktok'].map(
              (platform) => (
                <label
                  key={platform}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPlatforms((prev) => [
                          ...prev,
                          platform,
                        ]);
                      } else {
                        setSelectedPlatforms((prev) =>
                          prev.filter((p) => p !== platform)
                        );
                      }
                    }}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {platform}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Scheduling */}
        <div className="border-t border-gray-200 px-6 py-4">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Publishing
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="now"
                checked={publishMode === 'now'}
                onChange={(e) => setPublishMode(e.target.value as 'now')}
                className="w-4 h-4 accent-black"
              />
              <span className="text-sm text-gray-700">Publish now</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="schedule"
                checked={publishMode === 'schedule'}
                onChange={(e) =>
                  setPublishMode(e.target.value as 'schedule')
                }
                className="w-4 h-4 accent-black"
              />
              <span className="text-sm text-gray-700">Schedule for later</span>
            </label>
          </div>

          {publishMode === 'schedule' && (
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(content);
            }}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Save Changes
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing || selectedPlatforms.length === 0}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
