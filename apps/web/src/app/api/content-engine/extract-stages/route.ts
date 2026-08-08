import { NextRequest, NextResponse } from 'next/server';
import { runVoiceEngine } from '@/lib/voice-engine-orchestrator';

export async function POST(request: NextRequest) {
  console.log('[API] Content engine: extract stages');

  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }

    console.log('[API] Running voice engine pipeline...');
    const result = await runVoiceEngine(transcript);

    return NextResponse.json({
      success: true,
      stage1Result: result.stage1,
      stage2Result: result.stage2,
      stage3Result: result.stage3,
    });
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process transcript' },
      { status: 500 }
    );
  }
}
