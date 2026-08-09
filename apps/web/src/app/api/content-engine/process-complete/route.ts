import { NextRequest, NextResponse } from 'next/server';
import { digestTeaching } from '@/lib/teaching-digester';
import { generateHumanVoiceFormats } from '@/lib/human-voice-formats';

export async function POST(request: NextRequest) {
  console.log('[CONTENT-ENGINE] Processing with Teaching Digestion + Human Voice Formats');

  try {
    const { transcript, url } = await request.json();

    let sourceText = transcript;

    if (url && !transcript) {
      console.log('[CONTENT-ENGINE] Extracting from URL');
      try {
        const firecrawlRes = await fetch('https://api.firecrawl.dev/v0/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
          },
          body: JSON.stringify({
            url,
            formats: ['markdown'],
          }),
        });

        if (firecrawlRes.ok) {
          const firecrawlData = await firecrawlRes.json();
          sourceText = firecrawlData.markdown || firecrawlData.content || '';
        }
      } catch (err) {
        console.warn('[CONTENT-ENGINE] Firecrawl extraction failed');
      }
    }

    if (!sourceText || sourceText.trim().length === 0) {
      return NextResponse.json({ error: 'Transcript or URL required' }, { status: 400 });
    }

    const teaching = digestTeaching(sourceText);
    const outputs = generateHumanVoiceFormats(teaching);

    return NextResponse.json({
      success: true,
      teaching: {
        revelation: teaching.revelation,
        mechanism: teaching.mechanism,
        cost: teaching.cost,
        transformation: teaching.transformation,
        keyPhrases: teaching.keyPhrases,
        themes: teaching.themes,
      },
      outputs,
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}
