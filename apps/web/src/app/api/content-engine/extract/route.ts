import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { extractTranscript } from '@/lib/firecrawl-connector';

export async function POST(request: NextRequest) {
  // Allow unauthenticated requests for testing/demo

  console.log('[EXTRACT] Transcript extraction request');

  try {
    const { url, sourceType = 'webpage' } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const extraction = await extractTranscript({
      url,
      sourceType: sourceType as 'youtube' | 'podcast' | 'webpage' | 'transcript',
    });

    console.log('[EXTRACT] Extraction successful');

    return NextResponse.json(extraction);
  } catch (error) {
    console.error('[EXTRACT] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to extract transcript' },
      { status: 500 }
    );
  }
}
