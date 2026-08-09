'use client';

import { useState } from 'react';

interface SentenceAnalysis {
  text: string;
  trivium: any;
  masterprompt: any;
  overallPass: boolean;
  refinedVersion?: string;
}

interface AnalysisResult {
  success: boolean;
  summary: {
    totalSentences: number;
    passing: number;
    failingTrivium: number;
    failingMasterprompt: number;
  };
  analyses: SentenceAnalysis[];
  refinedTranscript: string;
}

export default function TriviumAnalyzer() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'sentences' | 'refined'>('summary');

  const handleAnalyze = async () => {
    setError('');
    if (!input.trim()) {
      setError('Paste your transcript first');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/content-engine/analyze-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: input.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (!result) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Trivium Analyzer
          </h1>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
            Test every sentence against Trivium (Grammar, Logic, Rhetoric) + Masterprompt standards
          </p>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your teaching transcript..."
            style={{
              width: '100%',
              height: '400px',
              padding: '12px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'monospace',
              boxSizing: 'border-box',
              marginBottom: '20px',
              resize: 'vertical',
            }}
          />

          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              border: '1px solid #ef5350',
              color: '#c62828',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || !input.trim()}
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: loading || !input.trim() ? '#ccc' : '#000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze Transcript'}
          </button>
        </div>
      </div>
    );
  }

  const failing = result.analyses.filter((a) => !a.overallPass);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              Analysis Complete
            </h1>
            <p style={{ fontSize: '13px', color: '#666' }}>
              {result.summary.passing}/{result.summary.totalSentences} pass • {failing.length} refine
            </p>
          </div>
          <button
            onClick={() => { setResult(null); setInput(''); }}
            style={{
              padding: '10px 16px',
              fontSize: '12px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ← Analyze Another
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '30px' }}>
          {(['summary', 'sentences', 'refined'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '12px',
                fontSize: '13px',
                fontWeight: viewMode === mode ? '600' : '500',
                backgroundColor: viewMode === mode ? '#000' : '#fff',
                color: viewMode === mode ? '#fff' : '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {mode === 'summary' && 'Summary'} {mode === 'sentences' && 'Sentences'} {mode === 'refined' && 'Refined'}
            </button>
          ))}
        </div>

        {viewMode === 'summary' && (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Report</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: '#e8f5e9', borderRadius: '4px', borderLeft: '4px solid #2e7d32' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', margin: 0, color: '#1b5e20' }}>Passing</p>
                <p style={{ fontSize: '28px', fontWeight: '700', margin: '8px 0 0 0', color: '#2e7d32' }}>{result.summary.passing}/{result.summary.totalSentences}</p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#fff3e0', borderRadius: '4px', borderLeft: '4px solid #ff9800' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', margin: 0, color: '#e65100' }}>Need Refinement</p>
                <p style={{ fontSize: '28px', fontWeight: '700', margin: '8px 0 0 0', color: '#ff9800' }}>{failing.length}</p>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'sentences' && (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Sentences</h2>
            {result.analyses.map((analysis, idx) => (
              <div key={idx} style={{ marginBottom: '16px', padding: '12px', backgroundColor: analysis.overallPass ? '#e8f5e9' : '#fff3e0', borderRadius: '4px', borderLeft: `4px solid ${analysis.overallPass ? '#2e7d32' : '#ff9800'}` }}>
                <p style={{ fontSize: '12px', margin: '0 0 8px 0' }}>{analysis.overallPass ? '✓ PASS' : '⚠ REFINE'}</p>
                <p style={{ fontSize: '13px', margin: '0 0 8px 0', fontStyle: 'italic' }}>"{analysis.text}"</p>
                {analysis.refinedVersion && (
                  <p style={{ fontSize: '12px', margin: 0, color: '#333' }}>→ "{analysis.refinedVersion}"</p>
                )}
              </div>
            ))}
          </div>
        )}

        {viewMode === 'refined' && (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Refined Transcript</h2>
            <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', color: '#333', maxHeight: '600px', overflowY: 'auto', marginBottom: '16px' }}>
              {result.refinedTranscript}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.refinedTranscript);
                alert('Copied!');
              }}
              style={{
                padding: '10px 16px',
                fontSize: '12px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
