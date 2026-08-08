import { NextRequest, NextResponse } from 'next/server';
import { generateContentFromTranscript } from '@/lib/content-engine-simple';

export async function POST(request: NextRequest) {
  console.log('[CONTENT-ENGINE] Processing transcript through three-stage pipeline...');

  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    console.log('[CONTENT-ENGINE] Stage 1: Extracting quotables');
    console.log('[CONTENT-ENGINE] Stage 2: Identifying lightbulbs');
    console.log('[CONTENT-ENGINE] Stage 3: Generating 9 formats per lightbulb');

    const result = generateContentFromTranscript(transcript.trim());

    console.log('[CONTENT-ENGINE] Pipeline complete');

    return NextResponse.json({
      success: true,
      stage1: result.stage1,
      stage2: result.stage2,
      stage3: result.stage3,
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content' },
      { status: 500 }
    );
  }
}
