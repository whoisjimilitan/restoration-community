import { NextRequest, NextResponse } from 'next/server';
import { generateContentFromTranscript } from '@/lib/content-engine-simple';

export async function POST(request: NextRequest) {
  console.log('[TRANSFORMATION-ENGINE] Analyzing for pain → identity → consequence → mechanism...');

  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    console.log('[STAGE-1] Analyzing core system elements');
    console.log('[STAGE-2] Transforming content');
    console.log('[STAGE-3] Generating 9 formats');

    const result = generateContentFromTranscript(transcript.trim());

    console.log('[TRANSFORMATION-ENGINE] Complete');

    return NextResponse.json({
      success: true,
      stage1: result.stage1,
      stage2: result.stage2,
      stage3: result.stage3,
    });
  } catch (error) {
    console.error('[TRANSFORMATION-ENGINE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to transform content' },
      { status: 500 }
    );
  }
}
