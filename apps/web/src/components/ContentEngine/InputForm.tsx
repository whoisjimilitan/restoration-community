import { useState } from 'react';

interface InputFormProps {
  onGenerate: (statement: string, context?: string) => void;
  isLoading: boolean;
}

export function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [statement, setStatement] = useState('');
  const [context, setContext] = useState('');
  const [sourceType, setSourceType] = useState<'direct' | 'url'>('direct');
  const [url, setUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtractFromUrl = async () => {
    if (!url) return;

    setIsExtracting(true);
    try {
      const response = await fetch('/api/content-engine/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, sourceType: 'webpage' }),
      });

      if (!response.ok) throw new Error('Failed to extract');

      const data = await response.json();
      setStatement(data.transcript);
      setContext(`Source: ${data.title || url}`);
    } catch (error) {
      console.error('Extraction error:', error);
      alert('Failed to extract content from URL');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (statement.trim()) {
      onGenerate(statement, context);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-rc-warm-gray p-8 rounded-lg border border-rc-border/30">
      <div>
        <h2 className="text-xl font-bold text-rc-text mb-4">Input Source</h2>

        {/* Source Type Toggle */}
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="direct"
              checked={sourceType === 'direct'}
              onChange={(e) => setSourceType(e.target.value as 'direct')}
              className="w-4 h-4"
            />
            <span className="text-sm text-rc-text">Direct Input</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="url"
              checked={sourceType === 'url'}
              onChange={(e) => setSourceType(e.target.value as 'url')}
              className="w-4 h-4"
            />
            <span className="text-sm text-rc-text">Extract from URL</span>
          </label>
        </div>

        {/* URL Input */}
        {sourceType === 'url' && (
          <div className="mb-6 space-y-3">
            <label className="block text-sm font-medium text-rc-text/70">URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or podcast URL"
                className="flex-1 px-4 py-2 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 bg-white text-rc-text text-sm"
              />
              <button
                type="button"
                onClick={handleExtractFromUrl}
                disabled={!url || isExtracting}
                className="px-4 py-2 bg-rc-accent text-white rounded-lg text-sm font-medium hover:bg-rc-accent/90 disabled:opacity-50"
              >
                {isExtracting ? 'Extracting...' : 'Extract'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statement Textarea */}
      <div>
        <label className="block text-sm font-medium text-rc-text/70 mb-2">
          Statement or Transcript
        </label>
        <textarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="Paste your statement, transcript, or raw content here..."
          className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 bg-white text-rc-text resize-none"
          rows={6}
        />
        <p className="text-xs text-rc-text/60 mt-2">
          {statement.length} characters
        </p>
      </div>

      {/* Context Textarea */}
      <div>
        <label className="block text-sm font-medium text-rc-text/70 mb-2">
          Context (optional)
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Add any context about the statement..."
          className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 bg-white text-rc-text resize-none"
          rows={3}
        />
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={!statement.trim() || isLoading}
        className="w-full px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </form>
  );
}
