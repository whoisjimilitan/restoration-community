import { useState } from 'react';

interface OutputDisplayProps {
  format: string;
  content: string;
}

export function OutputDisplay({ format, content }: OutputDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${format}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4 bg-rc-warm-gray p-8 rounded-lg border border-rc-border/30">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-rc-text">Generated Content</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-2 text-sm bg-rc-accent text-white rounded-lg hover:bg-rc-accent/90 transition-all"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-2 text-sm border border-rc-border text-rc-text rounded-lg hover:bg-rc-bg transition-all"
          >
            Download
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-rc-border/30 min-h-[400px]">
        <pre className="text-sm text-rc-text leading-relaxed whitespace-pre-wrap font-mono">
          {content}
        </pre>
      </div>

      <div className="flex items-center justify-between text-xs text-rc-text/60 pt-4">
        <span>{content.length} characters</span>
        <span>{content.split(' ').length} words</span>
      </div>
    </div>
  );
}
