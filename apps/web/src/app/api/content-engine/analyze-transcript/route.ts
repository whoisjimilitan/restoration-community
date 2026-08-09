import { NextRequest, NextResponse } from 'next/server';
import { analyzeSentence, refineSentence } from '@/lib/trivium-analyzer';

export async function POST(request: NextRequest) {
  console.log('[TRIVIUM-ANALYZER] Analysis request received');

  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: 'Transcript required' }, { status: 400 });
    }

    const sentences = transcript
      .split(/(?<=[.!?])\s+/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 10);

    console.log(`[TRIVIUM-ANALYZER] Analyzing ${sentences.length} sentences`);

    const analyses = sentences.map((sent: string) => {
      const analysis = analyzeSentence(sent);
      return {
        ...analysis,
        refinedVersion: !analysis.overallPass ? refineSentence(analysis) : undefined,
      };
    });

    const refinedTranscript = analyses
      .map((a: any) => (a.overallPass ? a.text : a.refinedVersion || a.text))
      .join(' ');

    const passCount = analyses.filter((a: any) => a.overallPass).length;

    console.log(`[TRIVIUM-ANALYZER] Complete: ${passCount}/${sentences.length} sentences pass`);

    return NextResponse.json({
      success: true,
      summary: {
        totalSentences: sentences.length,
        passing: passCount,
        failingTrivium: analyses.filter((a: any) => !a.trivium.grammar.isComplete || !a.trivium.logic.isValid || !a.trivium.rhetoric.isStrong).length,
        failingMasterprompt: analyses.filter((a: any) => !a.masterprompt.pass).length,
      },
      analyses,
      refinedTranscript,
    });
  } catch (error) {
    console.error('[TRIVIUM-ANALYZER] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}
