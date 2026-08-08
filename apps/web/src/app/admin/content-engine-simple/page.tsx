'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentOutput {
  transcript: string;
  title: string;
  core_message: string;
  formats: {
    daily_letter: string;
    social_post: string;
    micro_insight: string;
    devotional: string;
    article: string;
    email: string;
    short_video: string;
    podcast: string;
    long_video: string;
  };
}

const FORMAT_LABELS: Record<keyof ContentOutput['formats'], string> = {
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

export default function ContentEngineSimple() {
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<ContentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<keyof ContentOutput['formats']>('daily_letter');

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
      if (data.success) {
        setResult(data.data);
        setSelectedFormat('daily_letter');
      } else {
        alert('Error: ' + data.error);
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
          <p className="text-sm text-rc-text/60 font-light mt-1">
            Raw transcript → 9 publication formats
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
              className="max-w-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Paste your teaching transcript here..."
                  className="w-full h-80 bg-white border border-rc-border rounded-lg p-4 text-rc-text placeholder-rc-text/40 font-light text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rc-accent/50 transition"
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
                  {loading ? 'Generating...' : 'Generate 9 Formats'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Metadata */}
              <div className="space-y-2">
                <h2 className="text-2xl font-rc-serif font-bold">{result.title}</h2>
                <p className="text-sm text-rc-text/60 font-light max-w-3xl leading-relaxed">
                  {result.core_message}
                </p>
              </div>

              {/* Format Selector */}
              <div className="space-y-4">
                <p className="text-xs text-rc-text/50 uppercase font-light tracking-wide">
                  Publication Formats
                </p>

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
              </div>

              {/* Format Display */}
              <div className="bg-white border border-rc-border rounded-lg p-8 min-h-96">
                <motion.div
                  key={selectedFormat}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-xs text-rc-text/50 uppercase font-light tracking-wide">
                    {FORMAT_LABELS[selectedFormat]}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-rc-text/90 whitespace-pre-wrap">
                    {result.formats[selectedFormat]}
                  </p>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="pt-8 border-t border-rc-border space-y-2">
                <button
                  onClick={() => {
                    setResult(null);
                    setTranscript('');
                  }}
                  className="px-6 py-2 text-rc-text/60 font-light text-sm hover:text-rc-text transition"
                >
                  ← Generate Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
