'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stage1 {
  quotables: Array<{ id: number; text: string; weight: number }>;
}

interface Stage2 {
  lightbulbs: Array<{
    id: number;
    revelation: string;
    significance: string;
    storyMoment?: string;
  }>;
}

interface Stage3 {
  formats: Array<{
    lightbulbId: number;
    revelation: string;
    formats: Record<string, string>;
  }>;
}

interface ContentEngineResult {
  stage1: Stage1;
  stage2: Stage2;
  stage3: Stage3;
}

const FORMAT_LABELS: Record<string, string> = {
  daily_letter: 'Daily Letter',
  social_post: 'Social Post',
  micro_insight: 'Micro Insight',
  devotional: 'Devotional',
  article: 'Article',
  email: 'Email',
  short_video: 'Short Video',
  podcast: 'Podcast',
  long_video: 'Long Video',
};

const FORMAT_ORDER = [
  'daily_letter',
  'social_post',
  'micro_insight',
  'devotional',
  'article',
  'email',
  'short_video',
  'podcast',
  'long_video',
] as const;

export default function ContentEngineAdmin() {
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<ContentEngineResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLightbulb, setSelectedLightbulb] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<typeof FORMAT_ORDER[number]>('daily_letter');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim().length === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/content-engine/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcript.trim() }),
      });

      const data = await res.json();
      if (data.success || (data.stage1 && data.stage2 && data.stage3)) {
        setResult(data);
        setSelectedLightbulb(0);
        setSelectedFormat('daily_letter');
      } else {
        alert('Error: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error processing transcript');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rc-bg text-rc-text">
      {/* Header */}
      <div className="w-full border-b border-rc-border px-6 sm:px-8 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-rc-serif font-bold">Content Engine</h1>
          <p className="text-sm text-rc-text/60 font-light mt-2">
            Transcript → Stage 1 (Quotables) → Stage 2 (Lightbulbs) → Stage 3 (9 Formats)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Paste your teaching transcript here..."
                  className="w-full h-96 bg-white border border-rc-border rounded-lg p-4 text-rc-text placeholder-rc-text/40 font-light text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rc-accent/50 transition"
                />
                <button
                  type="submit"
                  disabled={loading || transcript.trim().length === 0}
                  className={`px-6 py-3 font-light text-sm rounded-lg transition ${
                    loading || transcript.trim().length === 0
                      ? 'bg-rc-border text-rc-text/40 cursor-not-allowed'
                      : 'bg-rc-accent text-white hover:opacity-90'
                  }`}
                >
                  {loading ? 'Processing...' : 'Extract & Generate'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* STAGE 1: QUOTABLES */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-rc-serif font-bold">Stage 1: Quotable Statements</h2>
                  <p className="text-xs text-rc-text/50 uppercase font-light tracking-wide mt-1">
                    {result.stage1.quotables.length} quotables extracted
                  </p>
                </div>

                {result.stage1.quotables.length > 0 ? (
                  <div className="space-y-3">
                    {result.stage1.quotables.map((quotable, idx) => (
                      <motion.div
                        key={quotable.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white border border-rc-border rounded-lg p-4 hover:border-rc-accent/50 transition"
                      >
                        <div className="space-y-2">
                          <p className="text-sm font-light text-rc-text/90">{quotable.text}</p>
                          <p className="text-xs text-rc-text/50">Weight: {quotable.weight}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-rc-text/60 font-light">No quotables extracted.</p>
                )}
              </div>

              {/* STAGE 2: LIGHTBULBS */}
              <div className="space-y-6 pt-8 border-t border-rc-border">
                <div>
                  <h2 className="text-2xl font-rc-serif font-bold">Stage 2: Lightbulb Moments</h2>
                  <p className="text-xs text-rc-text/50 uppercase font-light tracking-wide mt-1">
                    {result.stage2.lightbulbs.length} revelations identified
                  </p>
                </div>

                {result.stage2.lightbulbs.length > 0 ? (
                  <div className="space-y-4">
                    {result.stage2.lightbulbs.map((lightbulb, idx) => (
                      <motion.div
                        key={lightbulb.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white border border-rc-border rounded-lg p-6 space-y-3"
                      >
                        <p className="text-sm font-rc-serif font-bold text-rc-text">
                          {lightbulb.revelation}
                        </p>
                        <p className="text-xs text-rc-text/60 italic">{lightbulb.significance}</p>
                        {lightbulb.storyMoment && (
                          <p className="text-sm text-rc-text/80 font-light bg-rc-warm-gray p-3 rounded">
                            Story: {lightbulb.storyMoment}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-rc-text/60 font-light">No lightbulbs found.</p>
                )}
              </div>

              {/* STAGE 3: 9 FORMATS */}
              <div className="space-y-6 pt-8 border-t border-rc-border">
                <div>
                  <h2 className="text-2xl font-rc-serif font-bold">Stage 3: Publication Formats</h2>
                  <p className="text-xs text-rc-text/50 uppercase font-light tracking-wide mt-1">
                    9 formats per lightbulb
                  </p>
                </div>

                {result.stage3.formats.length > 0 ? (
                  <div className="space-y-10">
                    {result.stage3.formats.map((formatSet, formatIdx) => (
                      <div key={formatSet.lightbulbId} className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm font-rc-serif font-bold text-rc-text border-l-4 border-rc-accent pl-4">
                            Lightbulb {formatSet.lightbulbId}: {formatSet.revelation}
                          </p>
                          <button
                            onClick={() => setSelectedLightbulb(formatIdx)}
                            className={`text-xs font-light px-3 py-1 rounded-lg border transition ${
                              selectedLightbulb === formatIdx
                                ? 'bg-rc-accent text-white border-rc-accent'
                                : 'border-rc-border text-rc-text/60 hover:border-rc-text/30'
                            }`}
                          >
                            {selectedLightbulb === formatIdx ? 'Viewing' : 'View'} Formats
                          </button>
                        </div>

                        {selectedLightbulb === formatIdx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 pt-4"
                          >
                            {/* Format Selector */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                              {FORMAT_ORDER.map((format) => (
                                <button
                                  key={format}
                                  onClick={() => setSelectedFormat(format)}
                                  className={`px-3 py-2 text-xs font-light rounded-lg border transition ${
                                    selectedFormat === format
                                      ? 'bg-rc-accent text-white border-rc-accent'
                                      : 'border-rc-border text-rc-text/70 hover:border-rc-text/30'
                                  }`}
                                >
                                  {FORMAT_LABELS[format]}
                                </button>
                              ))}
                            </div>

                            {/* Format Display */}
                            <div className="bg-white border border-rc-border rounded-lg p-6 min-h-64">
                              <motion.div
                                key={`${formatIdx}-${selectedFormat}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                              >
                                <p className="text-xs text-rc-text/50 uppercase font-light tracking-wide">
                                  {FORMAT_LABELS[selectedFormat]}
                                </p>
                                <p className="text-sm font-light leading-relaxed text-rc-text/90 whitespace-pre-wrap">
                                  {(formatSet.formats as Record<string, string>)[selectedFormat]}
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-rc-text/60 font-light">No formats generated.</p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="pt-8 border-t border-rc-border space-y-2">
                <button
                  onClick={() => {
                    setResult(null);
                    setTranscript('');
                  }}
                  className="px-6 py-2 text-rc-text/60 font-light text-sm hover:text-rc-text transition"
                >
                  ← Process Another Transcript
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
