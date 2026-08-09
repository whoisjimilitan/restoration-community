'use client';

import { useState } from 'react';

interface Phase {
  name: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  stats?: Record<string, number>;
}

interface OutputFormat {
  format: 'article' | 'email' | 'facebook' | 'twitter' | 'instagram' | 'podcast' | 'video';
  content: string;
  edited: boolean;
}

export default function TeachingEngineDashboard() {
  const [transcript, setTranscript] = useState('');
  const [sermonTitle, setSermonTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [phases, setPhases] = useState<Phase[]>([
    { name: 'Phase 1: Verbatim Extraction', status: 'pending' },
    { name: 'Phase 2: Deep Reasoning', status: 'pending' },
    { name: 'Phase 2.5: Strategic Positioning', status: 'pending' },
    { name: 'Phase 3: Output Generation', status: 'pending' },
  ]);
  const [outputs, setOutputs] = useState<OutputFormat[]>([]);
  const [activeTab, setActiveTab] = useState<OutputFormat['format']>('article');
  const [editingFormat, setEditingFormat] = useState<OutputFormat['format'] | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleUpload = async () => {
    if (!transcript.trim() || !sermonTitle.trim()) {
      alert('Please enter both a sermon title and transcript');
      return;
    }

    setIsProcessing(true);
    setPhases(phases.map((p) => ({ ...p, status: 'pending' })));
    setOutputs([]);

    try {
      // Call orchestrator endpoint
      const response = await fetch('/api/teaching-engine/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, sermonTitle }),
      });

      if (!response.ok) {
        throw new Error(`Orchestrator failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Simulate phase progression (in production, this would be real-time via WebSocket)
      setPhases([
        { name: 'Phase 1: Verbatim Extraction', status: 'complete', stats: { statementsExtracted: data.verbatimCount || 0 } },
        { name: 'Phase 2: Deep Reasoning', status: 'complete', stats: { triviumAnalyzed: data.reasoningCount || 0 } },
        { name: 'Phase 2.5: Strategic Positioning', status: 'complete', stats: { trustSignalsIdentified: data.positioningCount || 0 } },
        { name: 'Phase 3: Output Generation', status: 'complete', stats: { formatsGenerated: 7 } },
      ]);

      // Set outputs
      if (data.outputs) {
        const formatsArray: OutputFormat[] = [
          { format: 'article', content: data.outputs.article, edited: false },
          { format: 'email', content: data.outputs.email, edited: false },
          { format: 'facebook', content: data.outputs.facebook, edited: false },
          { format: 'twitter', content: data.outputs.twitter, edited: false },
          { format: 'instagram', content: data.outputs.instagram, edited: false },
          { format: 'podcast', content: data.outputs.podcast, edited: false },
          { format: 'video', content: data.outputs.video, edited: false },
        ];
        setOutputs(formatsArray);
        setActiveTab('article');
      }
    } catch (error) {
      console.error('Pipeline error:', error);
      setPhases(
        phases.map((p) => ({
          ...p,
          status: p.status === 'complete' ? 'complete' : 'error',
        }))
      );
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditSave = () => {
    if (!editingFormat) return;
    setOutputs(
      outputs.map((o) =>
        o.format === editingFormat
          ? { ...o, content: editContent, edited: true }
          : o
      )
    );
    setEditingFormat(null);
    setEditContent('');
  };

  const activeOutput = outputs.find((o) => o.format === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Teaching Engine</h1>
          <p className="text-slate-600">Upload a sermon to generate publication-ready content across 7 formats</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sermon Title</label>
              <input
                type="text"
                value={sermonTitle}
                onChange={(e) => setSermonTitle(e.target.value)}
                placeholder="e.g., Breaking Free from Bondage"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isProcessing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sermon Transcript</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your full sermon transcript here..."
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                disabled={isProcessing}
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={isProcessing || !transcript.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {isProcessing ? 'Processing through pipeline...' : 'Process Sermon'}
            </button>
          </div>
        </div>

        {/* Phases Progress */}
        {phases.some((p) => p.status !== 'pending') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Pipeline Progress</h2>
            <div className="space-y-4">
              {phases.map((phase, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {phase.status === 'complete' && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {phase.status === 'running' && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full animate-spin" />
                    )}
                    {phase.status === 'error' && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    {phase.status === 'pending' && <div className="w-6 h-6 border-2 border-slate-300 rounded-full" />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{phase.name}</p>
                    {phase.stats && (
                      <p className="text-sm text-slate-600 mt-1">
                        {Object.entries(phase.stats)
                          .map(([key, val]) => `${val} ${key}`)
                          .join(' • ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outputs Section */}
        {outputs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-slate-200 bg-slate-50">
              <div className="flex overflow-x-auto">
                {outputs.map((output) => (
                  <button
                    key={output.format}
                    onClick={() => {
                      setActiveTab(output.format);
                      setEditingFormat(null);
                    }}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === output.format
                        ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {output.format.charAt(0).toUpperCase() + output.format.slice(1)}
                    {output.edited && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">✓ Edited</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Content */}
            {activeOutput && (
              <div className="p-8">
                {editingFormat === activeTab ? (
                  <div className="space-y-4">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleEditSave}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingFormat(null)}
                        className="bg-slate-300 hover:bg-slate-400 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">{activeOutput.content}</p>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setEditingFormat(activeTab);
                          setEditContent(activeOutput.content);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeOutput.content);
                          alert('Copied to clipboard!');
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
