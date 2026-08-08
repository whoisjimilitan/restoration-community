import { NextRequest, NextResponse } from 'next/server';
import { generateContentFromTranscript } from '@/lib/content-engine-simple';

export async function POST(request: NextRequest) {
  console.log('[CONTENT-ENGINE] Processing transcript...');

  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    console.log('[CONTENT-ENGINE] Generating 9 formats from transcript');
    const result = generateContentFromTranscript(transcript.trim());

    console.log('[CONTENT-ENGINE] Complete');

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content' },
      { status: 500 }
    );
  }
}
