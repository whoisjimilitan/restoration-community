'use client';

import { useState } from 'react';
import OutputEditor from './OutputEditor';

interface OutputGalleryProps {
  process: {
    id: string;
    outputs: {
      article: string;
      email: string;
      facebook: string;
      twitter: string;
      instagram: string;
      podcast: string;
      video: string;
    };
    viralityScores: Record<string, number>;
  };
  onUpdate: (process: any) => void;
}

const FORMAT_ICONS: Record<string, string> = {
  article: '📄',
  email: '✉️',
  facebook: 'f',
  twitter: '𝕏',
  instagram: '📸',
  podcast: '🎙️',
  video: '▶️',
};

export default function OutputGallery({
  process,
  onUpdate,
}: OutputGalleryProps) {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [editedOutputs, setEditedOutputs] = useState(process.outputs);

  const formats = Object.entries(process.outputs) as [string, string][];

  if (selectedFormat) {
    return (
      <OutputEditor
        format={selectedFormat}
        content={editedOutputs[selectedFormat as keyof typeof editedOutputs]}
        processId={process.id}
        onSave={(content) => {
          setEditedOutputs((prev) => ({
            ...prev,
            [selectedFormat]: content,
          }));
          setSelectedFormat(null);
        }}
        onClose={() => setSelectedFormat(null)}
      />
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Publication-Ready Outputs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {formats.map(([format, content]) => (
          <div
            key={format}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedFormat(format)}
          >
            {/* Format Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{FORMAT_ICONS[format]}</span>
              <h3 className="font-semibold text-gray-900 capitalize">
                {format}
              </h3>
            </div>

            {/* Virality Score */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">
                  Virality Score
                </span>
                <span className="text-sm font-bold text-black">
                  {Math.round(process.viralityScores[format] || 0)}/100
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition"
                  style={{
                    width: `${process.viralityScores[format] || 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Preview */}
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {content}
            </p>

            {/* Stats */}
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p>📊 {content.length} characters</p>
              <p>
                💬{' '}
                {(content.match(/[!?]/g) || []).length} emotional markers
              </p>
            </div>

            {/* Action Button */}
            <button className="w-full px-3 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-900 transition">
              Edit & Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
