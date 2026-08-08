import FirecrawlApp from 'firecrawl';

const apiKey = process.env.FIRECRAWL_API_KEY;

let firecrawl: FirecrawlApp | null = null;

function getFirecrawl(): FirecrawlApp {
  if (!firecrawl && apiKey) {
    firecrawl = new FirecrawlApp({ apiKey });
  }
  return firecrawl!;
}

export interface ExtractionInput {
  url: string;
  sourceType: 'youtube' | 'podcast' | 'webpage' | 'transcript';
}

export interface ExtractionResult {
  transcript: string;
  sourceType: string;
  sourceUrl: string;
  title?: string;
}

/**
 * Extracts text content from various sources using Firecrawl
 */
export async function extractTranscript(input: ExtractionInput): Promise<ExtractionResult> {
  console.log('[FIRECRAWL] Extracting from:', input.url);

  if (!apiKey) {
    console.warn('[FIRECRAWL] API key not configured. Using dummy extraction.');
    return {
      transcript: `[Dummy transcript from ${input.url}]`,
      sourceType: input.sourceType,
      sourceUrl: input.url,
      title: 'Untitled',
    };
  }

  try {
    const fc = getFirecrawl();
    const result = await fc.scrapeUrl(input.url, {
      formats: ['markdown'],
    });

    if (!result.success) {
      throw new Error(`Firecrawl failed: ${result.error}`);
    }

    console.log('[FIRECRAWL] Extraction successful');

    return {
      transcript: result.markdown || '',
      sourceType: input.sourceType,
      sourceUrl: input.url,
      title: (result as any).metadata?.title,
    };
  } catch (error) {
    console.error('[FIRECRAWL] Extraction error:', error);
    throw error;
  }
}
