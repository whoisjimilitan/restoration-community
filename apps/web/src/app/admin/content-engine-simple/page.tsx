'use client';

import { useState } from 'react';

interface Stage1 {
  analysis: {
    painPoint: string;
    identity: string;
    consequence: string;
    mechanism: string;
  };
}

interface Stage2 {
  transformed: {
    painPoint: string;
    preservedLines: string[];
    consequence: string;
    identityShift: string;
    mechanism: string;
    proof: string;
    measurableTransformation: string;
    backendBridge: string;
  };
}

interface Stage3 {
  formats: Record<string, string>;
}

interface ContentEngineResult {
  success?: boolean;
  stage1: Stage1;
  stage2: Stage2;
  stage3: Stage3;
}

export default function ContentEngineAdmin() {
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<ContentEngineResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLightbulb, setSelectedLightbulb] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('daily_letter');

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

  if (!result) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8', padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
            Content Engine
          </h1>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '30px' }}>
            Extract teaching → Identify lightbulbs → Generate 9 formats
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your teaching transcript here..."
              style={{
                width: '100%',
                height: '400px',
                padding: '15px',
                fontSize: '14px',
                fontFamily: 'monospace',
                border: '1px solid #ccc',
                borderRadius: '6px',
                resize: 'none',
              }}
            />

            <button
              type="submit"
              disabled={loading || transcript.trim().length === 0}
              style={{
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: loading || transcript.trim().length === 0 ? '#ccc' : '#000',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading || transcript.trim().length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Processing...' : 'Extract & Generate'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const formatLabels: Record<string, string> = {
    daily_letter: '📬 Letter',
    social_post: '📱 Social',
    micro_insight: '💡 Insight',
    devotional: '🙏 Devotional',
    article: '📰 Article',
    email: '✉️ Email',
    short_video: '🎬 Short',
    podcast: '🎙️ Podcast',
    long_video: '🎥 Long',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
            Content Engine
          </h1>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Stage 1 → Stage 2 → Stage 3
          </p>
          <button
            onClick={() => {
              setResult(null);
              setTranscript('');
            }}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              fontSize: '12px',
              backgroundColor: '#eee',
              border: '1px solid #999',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ← Process Another
          </button>
        </div>

        {/* STAGE 1 */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Stage 1: Core System Analysis
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #000', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>PAIN POINT</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage1.analysis.painPoint}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #ff6b00', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>IDENTITY TENSION</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage1.analysis.identity}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #d32f2f', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>CONSEQUENCE</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage1.analysis.consequence}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #1976d2', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>MECHANISM</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage1.analysis.mechanism}
              </p>
            </div>
          </div>
        </div>

        {/* STAGE 2 */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Stage 2: Transformed Content
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #1976d2', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>PRESERVED LINES (Verbatim Power)</p>
              {result.stage2.transformed.preservedLines.map((line, i) => (
                <p key={i} style={{ fontSize: '13px', lineHeight: '1.6', margin: i === 0 ? 0 : '8px 0 0 0', fontStyle: 'italic' }}>
                  "{line}"
                </p>
              ))}
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #d32f2f', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>INTENSIFIED CONSEQUENCE</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage2.transformed.consequence}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #00a8e8', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>IDENTITY SHIFT</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage2.transformed.identityShift}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #ffa726', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>PROOF ELEMENT</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage2.transformed.proof}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #66bb6a', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>MEASURABLE TRANSFORMATION</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage2.transformed.measurableTransformation}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderLeft: '4px solid #ab47bc', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0', fontWeight: '600' }}>BACKEND BRIDGE</p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {result.stage2.transformed.backendBridge}
              </p>
            </div>
          </div>
        </div>

        {/* STAGE 3 */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Stage 3: 9 Transformed Formats
          </h2>

          {/* Format tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
            {Object.keys(result.stage3.formats).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                style={{
                  padding: '10px 14px',
                  fontSize: '12px',
                  fontWeight: selectedFormat === fmt ? '600' : '400',
                  backgroundColor: selectedFormat === fmt ? '#000' : '#eee',
                  color: selectedFormat === fmt ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {formatLabels[fmt] || fmt}
              </button>
            ))}
          </div>

          {/* Format content */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '4px',
              fontSize: '13px',
              lineHeight: '1.8',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              minHeight: '400px',
              border: '1px solid #eee',
            }}
          >
            {(result.stage3.formats as Record<string, string>)[selectedFormat]}
          </div>
        </div>
      </div>
    </div>
  );
}
