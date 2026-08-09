/**
 * CONTENT INPUT
 * Handles URL extraction via Firecrawl and direct transcript input
 */

export interface ContentSource {
  type: 'url' | 'transcript';
  raw: string;
  source?: string; // URL if applicable
  extractedAt: string;
}

/**
 * Extract content from URL using Firecrawl
 */
export async function extractFromUrl(url: string): Promise<ContentSource> {
  console.log('[CONTENT-INPUT] Extracting from URL:', url);

  if (!process.env.FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY environment variable not set');
  }

  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.data?.markdown || data.markdown || '';

    if (!content || content.trim().length === 0) {
      throw new Error('Firecrawl returned no content');
    }

    console.log('[CONTENT-INPUT] ✓ Extracted', content.length, 'characters from URL');

    return {
      type: 'url',
      raw: content,
      source: url,
      extractedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[CONTENT-INPUT] Firecrawl extraction failed:', error);
    throw new Error(
      `Failed to extract content from URL: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Accept direct transcript input
 */
export function acceptTranscript(transcript: string): ContentSource {
  if (!transcript || transcript.trim().length === 0) {
    throw new Error('Transcript cannot be empty');
  }

  console.log('[CONTENT-INPUT] ✓ Accepted transcript,', transcript.length, 'characters');

  return {
    type: 'transcript',
    raw: transcript.trim(),
    extractedAt: new Date().toISOString(),
  };
}

/**
 * Preprocess content: clean whitespace, normalize line breaks
 */
export function preprocessContent(content: string): string {
  return (
    content
      // Normalize line breaks
      .replace(/\r\n/g, '\n')
      // Remove multiple consecutive spaces
      .replace(/[ \t]+/g, ' ')
      // Remove leading/trailing whitespace from lines
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n')
      // Remove excessive blank lines (more than 2 in a row)
      .replace(/\n\n\n+/g, '\n\n')
      .trim()
  );
}
