'use client';

import { useState } from 'react';
import { InputForm } from '@/components/ContentEngine/InputForm';
import { NarrativePreview } from '@/components/ContentEngine/NarrativePreview';
import { FormatSelector } from '@/components/ContentEngine/FormatSelector';
import { OutputDisplay } from '@/components/ContentEngine/OutputDisplay';

interface GeneratedContent {
  narrative: string;
  elements: {
    revelation: string;
    contrast: string;
    coreMessage: string;
    identityChoice: string;
    callToAction: string;
  };
  formats: {
    [key: string]: string;
  };
}

export default function ContentEnginePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('dailyLetter');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (statement: string, context?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/content-engine/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement, context }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setContent(data);
      setSelectedFormat('dailyLetter');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('[ADMIN] Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rc-bg text-rc-text">
      {/* Header */}
      <div className="border-b border-rc-border/30 px-6 sm:px-8 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text">
          Content Engine V3
        </h1>
        <p className="text-rc-text/70 mt-2">
          Transform raw statements into 9 polished formats
        </p>
      </div>

      <div className="px-6 sm:px-8 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Input & Preview */}
          <div className="lg:col-span-1 space-y-8">
            <InputForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {content && (
              <NarrativePreview
                narrative={content.narrative}
                elements={content.elements}
              />
            )}
          </div>

          {/* Right Column: Format Selection & Output */}
          {content && (
            <div className="lg:col-span-2 space-y-8">
              <FormatSelector
                selectedFormat={selectedFormat}
                onSelect={setSelectedFormat}
                availableFormats={Object.keys(content.formats)}
              />

              <OutputDisplay
                format={selectedFormat}
                content={content.formats[selectedFormat]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
