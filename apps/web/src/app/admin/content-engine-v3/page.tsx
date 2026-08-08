'use client';

import { useState } from 'react';

interface Stage1Output {
  title: string;
  exactDelivery: string;
  coreRevelation: string;
}

interface Stage2MiniMessage {
  title: string;
  revelation: string;
  exactQuotes: string[];
  angle: string;
}


export default function ContentEngineV3Admin() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage1, setStage1] = useState<Stage1Output | null>(null);
  const [stage2, setStage2] = useState<Stage2MiniMessage[]>([]);
  const [selectedMiniMessage, setSelectedMiniMessage] = useState<number | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('dailyLetter');

  const processTranscript = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/content-engine/extract-stages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) throw new Error('Failed to process');

      const data = await response.json();
      setStage1(data.stage1);
      setStage2(data.stage2.miniMessages);
      setSelectedMiniMessage(0);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process transcript');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Engine V3</h1>
          <p className="text-gray-600">The Irreplaceable Framework: Stage 1 → Stage 2 → Stage 3</p>
        </div>

        {/* Transcript Input */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Paste Transcript</h2>
          <textarea
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            placeholder="Paste your full transcript here..."
            className="w-full mb-4 p-4 border border-gray-300 rounded min-h-[200px] font-mono text-sm"
          />
          <button
            onClick={processTranscript}
            disabled={loading || !transcript.trim()}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Process Transcript'}
          </button>
        </div>

        {/* Stage 1: Exact Delivery */}
        {stage1 && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">STAGE 1: Exact Delivery</h2>
            <p className="text-gray-600 mb-6">Core teaching extracted exactly as you said it</p>

            <div className="bg-gray-50 rounded p-6 mb-4 border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900 mb-4">{stage1.title}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{stage1.exactDelivery}</p>
            </div>

            <div className="bg-blue-50 rounded p-4 border-l-4 border-blue-400">
              <p className="text-sm text-gray-600 mb-1">Core Revelation:</p>
              <p className="text-gray-900 font-medium">{stage1.coreRevelation}</p>
            </div>
          </div>
        )}

        {/* Stage 2: Mini-Messages */}
        {stage2.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">STAGE 2: Mini-Messages ({stage2.length} found)</h2>

            <div className="grid gap-4">
              {stage2.map((msg, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMiniMessage(idx)}
                  className={`p-4 rounded border-2 cursor-pointer transition ${
                    selectedMiniMessage === idx
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{msg.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Angle: {msg.angle}</p>
                  <p className="text-sm text-gray-700 italic">"{msg.revelation}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 3: Full Pipeline */}
        {selectedMiniMessage !== null && stage2[selectedMiniMessage] && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">STAGE 3: Expanded & Formatted</h2>

            <div className="mb-8 bg-gray-50 rounded p-6 border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-900 mb-2">{stage2[selectedMiniMessage].title}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{stage2[selectedMiniMessage].revelation}</p>
            </div>

            {/* Format Selector */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Select Format (9 Available)</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'dailyLetter', label: 'Daily Letter' },
                  { key: 'socialPost', label: 'Social Post' },
                  { key: 'microInsight', label: 'Micro Insight' },
                  { key: 'devotional', label: 'Devotional' },
                  { key: 'article', label: 'Article' },
                  { key: 'shortVideo', label: 'Short Video' },
                  { key: 'longVideo', label: 'Long Video' },
                  { key: 'podcastMoment', label: 'Podcast Moment' },
                  { key: 'email', label: 'Email' },
                ].map(fmt => (
                <button
                  key={fmt.key}
                  onClick={() => setSelectedFormat(fmt.key)}
                  className={`py-2 px-3 rounded text-sm font-medium transition ${
                    selectedFormat === fmt.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {fmt.label}
                </button>
                ))}
              </div>
            </div>

            {/* Format Output */}
            <div className="bg-gray-50 rounded p-6 border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-900 mb-4">
                {selectedFormat.charAt(0).toUpperCase() + selectedFormat.slice(1)} Output
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap font-mono text-sm">
                [This will display the formatted output for the selected mini-message]
              </p>
              <div className="mt-4 flex gap-2">
                <button className="py-2 px-4 border border-gray-300 rounded text-sm font-medium hover:bg-gray-100">
                  Copy to Clipboard
                </button>
                <button className="py-2 px-4 border border-gray-300 rounded text-sm font-medium hover:bg-gray-100">
                  Download as .txt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
