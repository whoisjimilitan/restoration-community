'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stage3Format {
  lightbulb: string;
  formats: Record<string, string>;
}

interface ContentEngineResults {
  stage1Result: any;
  stage2Result: any;
  stage3Result: any;
}

export default function ContentEngineAdmin() {
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState<ContentEngineResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcriptId, setTranscriptId] = useState<string | null>(null);
  const [showMyPieces, setShowMyPieces] = useState(false);
  const [savedPieces, setSavedPieces] = useState<any[]>([]);
  const [loadingPieces, setLoadingPieces] = useState(false);
  const [selectedFormatLightbulb, setSelectedFormatLightbulb] = useState(0);
  const [selectedFormatType, setSelectedFormatType] = useState(0);
  const [savingPieces, setSavingPieces] = useState<Set<number>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim().length === 0) return;

    setLoading(true);
    try {
      // Save transcript first
      const transcriptRes = await fetch('/api/voice-engine/save-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcript.trim(),
          title: 'Teaching - ' + new Date().toLocaleDateString(),
        }),
      });

      const transcriptData = await transcriptRes.json();
      if (!transcriptData.success) throw new Error('Failed to save transcript');

      const tId = transcriptData.transcriptId;
      setTranscriptId(tId);

      // Extract content
      const res = await fetch('/api/content-engine/extract-stages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcript.trim() }),
      });

      const data = await res.json();
      if (data.success) {
        setResults(data);
        setSelectedFormatLightbulb(0);
        setSelectedFormatType(0);
      }
    } catch (error) {
      alert('Error processing transcript');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWisdomPiece = async (piece: any, index: number) => {
    if (!transcriptId) {
      alert('Please extract a teaching first');
      return;
    }

    setSavingPieces(prev => new Set(prev).add(index));

    try {
      const res = await fetch('/api/voice-engine/save-wisdom-piece', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcriptId,
          wisdomPiece: piece,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Wisdom piece saved!');
      }
    } catch (error) {
      alert('Error saving wisdom piece');
    } finally {
      setSavingPieces(prev => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }
  };

  const handleLoadSavedPieces = async () => {
    if (!transcriptId) {
      alert('Please extract a teaching first');
      return;
    }

    setLoadingPieces(true);
    try {
      const res = await fetch(`/api/voice-engine/load-wisdom-pieces?transcriptId=${transcriptId}`);
      const data = await res.json();
      if (data.success) {
        setSavedPieces(data.pieces);
        setShowMyPieces(true);
      }
    } catch (error) {
      alert('Error loading wisdom pieces');
    } finally {
      setLoadingPieces(false);
    }
  };

  const formatTypes = ['daily_letter', 'social_post', 'micro_insight', 'devotional', 'article', 'email', 'short_video', 'podcast', 'long_video'];
  const formatLabels: Record<string, string> = {
    daily_letter: 'Letter',
    social_post: 'Social',
    micro_insight: 'Insight',
    devotional: 'Devotional',
    article: 'Article',
    email: 'Email',
    short_video: 'Video',
    podcast: 'Podcast',
    long_video: 'Long Video',
  };

  return (
    <div className="min-h-screen bg-rc-bg text-rc-text">
      <div className="w-full border-b border-rc-border px-6 sm:px-8 md:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-rc-serif font-bold">Voice Engine</h1>
          <p className="text-sm text-rc-text/60 font-light mt-1">Extract wisdom. Save. Iterate.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-12">
        <AnimatePresence mode="wait">
          {!results && !showMyPieces ? (
            <div key="input" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Paste your teaching..."
                  className="w-full h-64 bg-rc-bg border border-rc-border rounded-lg p-4 text-rc-text placeholder-rc-text/40 font-light text-base resize-none focus:outline-none focus:border-rc-accent transition"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading || transcript.trim().length === 0}
                    className={`px-6 py-2 font-light text-sm rounded-lg transition ${
                      loading || transcript.trim().length === 0
                        ? 'bg-rc-border text-rc-text/40 cursor-not-allowed'
                        : 'bg-rc-accent text-white hover:opacity-90'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Extract'}
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSavedPieces}
                    disabled={loadingPieces}
                    className="px-6 py-2 font-light text-sm text-rc-text/60 border border-rc-border rounded-lg hover:border-rc-text/40 transition"
                  >
                    {loadingPieces ? 'Loading...' : 'My Wisdom Pieces'}
                  </button>
                </div>
              </form>
            </div>
          ) : showMyPieces ? (
            <div key="saved" className="space-y-6">
              <div>
                <h2 className="text-2xl font-rc-serif font-bold mb-2">Saved Wisdom Pieces</h2>
                <p className="text-sm text-rc-text/60">Click a piece to view details</p>
              </div>

              {savedPieces.length > 0 ? (
                <div className="space-y-3">
                  {savedPieces.map((piece, idx) => (
                    <motion.div
                      key={piece.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="bg-white border border-rc-border rounded-lg p-4 hover:border-rc-accent/50 transition cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <p className="font-rc-serif font-bold text-rc-text group-hover:text-rc-accent transition">
                          {piece.claim}
                        </p>
                        <p className="text-xs text-rc-text/60">
                          {new Date(piece.createdAt).toLocaleDateString()} • {piece.status}
                        </p>
                        <div className="text-xs text-rc-text/70 italic line-clamp-2">
                          "{piece.exact_quote}"
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-rc-text/60 font-light">No saved pieces yet. Extract a teaching to save pieces.</p>
              )}

              <button
                onClick={() => setShowMyPieces(false)}
                className="px-6 py-2 text-rc-text/60 font-light text-sm hover:text-rc-text transition"
              >
                ← Back
              </button>
            </div>
          ) : (
            <div key="results" className="space-y-16">
              {/* STAGE 1 */}
              {results?.stage1Result && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-rc-serif font-bold">Wisdom Pieces</h2>

                  {results.stage1Result.wisdom_pieces?.length > 0 ? (
                    <div className="space-y-4">
                      {results.stage1Result.wisdom_pieces.map((piece: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                          className="space-y-3 border-l-4 border-rc-accent pl-6 py-3"
                        >
                          <p className="text-base font-rc-serif font-bold text-rc-text">{piece.claim}</p>

                          <div className="bg-rc-warm-gray rounded-lg p-4 space-y-2 text-sm">
                            <p><span className="font-medium text-rc-text/80">Strongest Case:</span> {piece.strongest_case}</p>
                            <p className="text-xs text-rc-text/60 italic">"{piece.exact_quote}"</p>
                          </div>

                          <button
                            onClick={() => handleSaveWisdomPiece(piece, idx)}
                            disabled={savingPieces.has(idx)}
                            className={`px-4 py-2 text-sm font-light rounded-lg transition ${
                              savingPieces.has(idx)
                                ? 'bg-rc-border text-rc-text/40 cursor-not-allowed'
                                : 'bg-rc-accent text-white hover:opacity-90'
                            }`}
                          >
                            {savingPieces.has(idx) ? 'Saving...' : 'Save This Piece'}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-rc-text/60 font-light">No wisdom pieces extracted.</p>
                  )}
                </div>
              )}

              {/* STAGE 2 */}
              {results?.stage2Result && (
                <div className="space-y-6 pt-8 border-t border-rc-border">
                  <h2 className="text-2xl font-rc-serif font-bold">Lightbulb Moments</h2>
                  {results.stage2Result.mini_teachings?.length > 0 ? (
                    <div className="space-y-4">
                      {results.stage2Result.mini_teachings.map((teaching: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                          className="space-y-2 border-l-4 border-rc-accent pl-6 py-2"
                        >
                          <p className="text-sm font-rc-serif font-bold text-rc-text">
                            {idx + 1}. {teaching.lightbulb}
                          </p>
                          <p className="text-sm text-rc-text/70 font-light leading-relaxed">
                            {teaching.revelation}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-rc-text/60 font-light">No lightbulbs found.</p>
                  )}
                </div>
              )}

              {/* STAGE 3 */}
              {results?.stage3Result && (
                <div className="space-y-6 pt-8 border-t border-rc-border">
                  <h2 className="text-2xl font-rc-serif font-bold">Publication Formats</h2>
                  {results.stage3Result.formats?.length > 0 ? (
                    <div className="space-y-10">
                      {results.stage3Result.formats.map((format: Stage3Format, lightbulbIdx: number) => (
                        <div key={lightbulbIdx} className="space-y-3">
                          <p className="text-sm font-rc-serif font-bold text-rc-text border-l-4 border-rc-accent pl-4">
                            {format.lightbulb}
                          </p>

                          <div className="flex gap-2 flex-wrap">
                            {formatTypes.map((formatKey, idx) => (
                              <button
                                key={formatKey}
                                onClick={() => {
                                  setSelectedFormatLightbulb(lightbulbIdx);
                                  setSelectedFormatType(idx);
                                }}
                                className={`px-3 py-1 text-xs font-light rounded-lg border transition ${
                                  selectedFormatLightbulb === lightbulbIdx && selectedFormatType === idx
                                    ? 'bg-rc-accent text-white border-rc-accent'
                                    : 'border-rc-border text-rc-text/70 hover:border-rc-accent/50'
                                }`}
                              >
                                {formatLabels[formatKey]}
                              </button>
                            ))}
                          </div>

                          {selectedFormatLightbulb === lightbulbIdx && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="bg-rc-warm-gray rounded-lg p-6 border border-rc-border"
                            >
                              <p className="text-sm text-rc-text/80 font-light leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                                {(format.formats as Record<string, string>)[formatTypes[selectedFormatType]]}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-rc-text/60 font-light">No formats generated.</p>
                  )}
                </div>
              )}

              {/* ACTIONS */}
              <div className="pt-8 border-t border-rc-border space-y-2">
                <button
                  onClick={() => setResults(null)}
                  className="px-6 py-2 text-rc-text/60 font-light text-sm hover:text-rc-text transition"
                >
                  Extract Another Teaching
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
