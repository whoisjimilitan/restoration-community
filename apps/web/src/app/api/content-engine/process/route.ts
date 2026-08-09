import { NextRequest, NextResponse } from 'next/server';
import { runVoiceEngine } from '@/lib/voice-engine-orchestrator';

export async function POST(request: NextRequest) {
  console.log('[VOICE-ENGINE] Three-stage pipeline started');

  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    console.log('[VOICE-ENGINE] Processing transcript');
    const result = await runVoiceEngine(transcript.trim());

    console.log('[VOICE-ENGINE] Pipeline complete');

    return NextResponse.json({
      success: true,
      stage1: result.stage1,
      stage2: result.stage2,
      stage3: result.stage3,
    });
  } catch (error) {
    console.error('[VOICE-ENGINE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}
