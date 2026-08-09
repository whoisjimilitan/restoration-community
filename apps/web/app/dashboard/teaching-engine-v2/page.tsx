'use client';

import { useState } from 'react';

interface ProcessResult {
  success: boolean;
  validity_report?: any;
  premise_report?: any;
  refined_core?: string;
  formats?: any[];
  summary?: any;
  error?: string;
}

export default function TeachingEngineV2Dashboard() {
  const [transcript, setTranscript] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('article');

  const handleProcess = async () => {
    if (!transcript || !title) {
      alert('Please enter both title and transcript');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/teaching-engine/v2/orchestrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer teachingengine2024',
        },
        body: JSON.stringify({ transcript, sermonTitle: title }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const currentFormat = result?.formats?.find(f => f.format === selectedFormat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Teaching Engine v2</h1>
          <p className="text-slate-400">Holistic sermon processing: Validity → Premise → Refinement → 7 Formats</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Sermon Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Faith Over Fear"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Sermon Transcript</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your sermon text here..."
                rows={12}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleProcess}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium transition"
            >
              {loading ? 'Processing...' : 'Process Sermon'}
            </button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {result?.error && (
              <div className="p-4 rounded-lg bg-red-900 text-red-100">
                Error: {result.error}
              </div>
            )}

            {result?.success && (
              <>
                {/* Reports Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-700">
                    <p className="text-sm text-slate-400">Logic Status</p>
                    <p className="text-lg font-bold text-white">{result.summary?.logic_status}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-700">
                    <p className="text-sm text-slate-400">Scripture Status</p>
                    <p className="text-lg font-bold text-white">{result.summary?.scripture_status}</p>
                  </div>
                </div>

                {/* Refined Core */}
                <div className="p-4 rounded-lg bg-slate-700">
                  <p className="text-sm text-slate-400 mb-2">Refined Core</p>
                  <p className="text-white text-sm line-clamp-4">{result.refined_core}</p>
                </div>

                {/* Format Selector */}
                <div>
                  <p className="text-sm text-slate-400 mb-2">Select Format</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['article', 'email', 'facebook', 'twitter', 'instagram', 'podcast', 'video'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`py-2 px-3 rounded text-sm font-medium transition ${
                          selectedFormat === fmt
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Output */}
                {currentFormat && (
                  <div className="p-4 rounded-lg bg-slate-700">
                    <p className="text-sm text-slate-400 mb-2">Output: {selectedFormat}</p>
                    <p className="text-white text-sm whitespace-pre-wrap line-clamp-8 font-mono text-xs">
                      {currentFormat.content}
                    </p>
                    <p className="text-slate-400 text-xs mt-3">CTA: {currentFormat.call_to_action}</p>
                  </div>
                )}

                {/* Stats */}
                <div className="p-4 rounded-lg bg-slate-700">
                  <p className="text-sm text-slate-400">Formats Generated: {result.summary?.formats_generated}</p>
                  <p className="text-sm text-slate-400">All validations complete</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
