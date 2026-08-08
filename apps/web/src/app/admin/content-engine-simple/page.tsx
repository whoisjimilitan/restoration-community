'use client';

import { useState } from 'react';

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
            Stage 1: Quotable Statements ({result.stage1.quotables.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {result.stage1.quotables.map((q) => (
              <div
                key={q.id}
                style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderLeft: '4px solid #000',
                  borderRadius: '4px',
                }}
              >
                <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {q.text}
                </p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '8px', margin: 0 }}>
                  Weight: {q.weight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* STAGE 2 */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Stage 2: Lightbulb Moments ({result.stage2.lightbulbs.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {result.stage2.lightbulbs.map((lb) => (
              <div
                key={lb.id}
                style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderLeft: '4px solid #ff6b00',
                  borderRadius: '4px',
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>
                  {lb.revelation}
                </p>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0', fontStyle: 'italic' }}>
                  {lb.significance}
                </p>
                {lb.storyMoment && (
                  <p style={{ fontSize: '12px', color: '#555', margin: 0, backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '3px' }}>
                    📖 {lb.storyMoment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* STAGE 3 */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Stage 3: 9 Formats
          </h2>

          {result.stage3.formats.map((formatSet, idx) => (
            <div key={idx} style={{ marginBottom: '40px' }}>
              {/* Lightbulb selector */}
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderLeft: '4px solid #00a8e8',
                  marginBottom: '15px',
                  borderRadius: '4px',
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0' }}>
                  Lightbulb {formatSet.lightbulbId}: {formatSet.revelation}
                </p>

                {selectedLightbulb === idx && (
                  <>
                    {/* Format tabs */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                      {Object.keys(formatSet.formats).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setSelectedFormat(fmt)}
                          style={{
                            padding: '8px 12px',
                            fontSize: '12px',
                            backgroundColor: selectedFormat === fmt ? '#000' : '#eee',
                            color: selectedFormat === fmt ? 'white' : '#000',
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
                        backgroundColor: '#fafafa',
                        padding: '15px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        lineHeight: '1.8',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        maxHeight: '500px',
                        overflowY: 'auto',
                      }}
                    >
                      {(formatSet.formats as Record<string, string>)[selectedFormat]}
                    </div>
                  </>
                )}

                <button
                  onClick={() => setSelectedLightbulb(selectedLightbulb === idx ? -1 : idx)}
                  style={{
                    marginTop: selectedLightbulb === idx ? '15px' : '0',
                    padding: '8px 12px',
                    fontSize: '12px',
                    backgroundColor: selectedLightbulb === idx ? '#ff6b00' : '#00a8e8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {selectedLightbulb === idx ? '− Hide Formats' : '+ View Formats'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
