'use client';

import { useState } from 'react';

type FormatKey = 'twitterThread' | 'linkedinPost' | 'instagramCarousel' | 'facebookPost' | 'shortVideoScript' | 'youtubeOutline' | 'emailNewsletter' | 'podcastSummary' | 'audioClips' | 'socialCarousel';

const formatLabels: Record<FormatKey, string> = {
  twitterThread: 'Twitter Thread',
  linkedinPost: 'LinkedIn Post',
  instagramCarousel: 'Instagram Carousel',
  facebookPost: 'Facebook Post',
  shortVideoScript: 'Short Video (TikTok)',
  youtubeOutline: 'YouTube Outline',
  emailNewsletter: 'Email Newsletter',
  podcastSummary: 'Podcast Summary',
  audioClips: 'Audio Clips',
  socialCarousel: 'Social Carousel',
};

export default function ContentStudio() {
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [outputs, setOutputs] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>('twitterThread');

  const handleProcess = async () => {
    setError('');
    if (!inputText.trim() && !inputUrl.trim()) {
      setError('Paste a transcript or enter a URL');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/content-engine/process-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: inputText.trim(),
          url: inputUrl.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      const data = await res.json();
      setOutputs(data.outputs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (!outputs) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Content Studio</h1>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
            One teaching. 10 proven formats. Field-tested and high-performing.
          </p>

          <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                Teaching Transcript
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your complete teaching here..."
                style={{
                  width: '100%',
                  height: '300px',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                OR URL (extracts automatically)
              </label>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

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
            onClick={handleProcess}
            disabled={loading || (!inputText.trim() && !inputUrl.trim())}
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: loading || (!inputText.trim() && !inputUrl.trim()) ? '#ccc' : '#000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading || (!inputText.trim() && !inputUrl.trim()) ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Processing...' : 'Generate 10 Formats'}
          </button>
        </div>
      </div>
    );
  }

  const formats: FormatKey[] = [
    'twitterThread',
    'linkedinPost',
    'instagramCarousel',
    'facebookPost',
    'shortVideoScript',
    'youtubeOutline',
    'emailNewsletter',
    'podcastSummary',
    'audioClips',
    'socialCarousel',
  ];

  const selectedContent = outputs[selectedFormat];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>10 Formats Ready</h1>
          <button
            onClick={() => { setOutputs(null); setInputText(''); setInputUrl(''); }}
            style={{
              padding: '10px 16px',
              fontSize: '12px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ← Start Over
          </button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', gap: 0 }}>
            {formats.map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                style={{
                  padding: '12px 8px',
                  fontSize: '11px',
                  fontWeight: selectedFormat === format ? '600' : '500',
                  color: selectedFormat === format ? '#000' : '#666',
                  backgroundColor: selectedFormat === format ? 'white' : '#fafafa',
                  border: 'none',
                  borderBottom: selectedFormat === format ? '3px solid #000' : 'none',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {formatLabels[format]}
              </button>
            ))}
          </div>

          <div style={{ padding: '30px' }}>
            <div style={{
              backgroundColor: '#f9f9f9',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              padding: '20px',
              minHeight: '400px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#333',
              maxHeight: '700px',
              overflowY: 'auto',
            }}>
              {selectedContent}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(selectedContent);
                alert('Copied to clipboard!');
              }}
              style={{
                marginTop: '16px',
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
        </div>
      </div>
    </div>
  );
}
