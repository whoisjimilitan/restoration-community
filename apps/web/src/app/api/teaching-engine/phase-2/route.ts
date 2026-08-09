/**
 * TEACHING ENGINE - PHASE 2
 * Deep Reasoning: Sentence Analysis + Trivium + Validation
 *
 * POST /api/teaching-engine/phase-2
 * Body: { rawContent: string; verbatimElements: VerbatimElement[] }
 */

import { NextRequest, NextResponse } from 'next/server';
import { performDeepReasoning } from '@/lib/reasoning-engine';
import type { VerbatimElement } from '@/lib/verbatim-extractor';

export const dynamic = 'force-dynamic';

interface Phase2Request {
  rawContent: string;
  verbatimElements: VerbatimElement[];
}

interface Phase2Response {
  success: boolean;
  reasoning: any;
  stats: {
    sentencesAnalyzed: number;
    hiddenTruthsExtracted: number;
    supportingVerses: number;
    readyForGeneration: boolean;
  };
}

export async function POST(request: NextRequest) {
  console.log('[TEACHING-ENGINE] Phase 2: Deep Reasoning');

  try {
    const body = (await request.json()) as Phase2Request;
    const { rawContent, verbatimElements } = body;

    if (!rawContent || rawContent.trim().length === 0) {
      return NextResponse.json({ error: 'Raw content required' }, { status: 400 });
    }

    if (!verbatimElements || verbatimElements.length === 0) {
      return NextResponse.json(
        { error: 'Verbatim elements from Phase 1 required' },
        { status: 400 }
      );
    }

    // Perform deep reasoning
    console.log('[PHASE-2] Performing deep reasoning...');
    const reasoning = performDeepReasoning(rawContent, verbatimElements);

    console.log('[PHASE-2] ✓ Phase 2 complete');

    const response: Phase2Response = {
      success: true,
      reasoning,
      stats: {
        sentencesAnalyzed: reasoning.sentenceAnalyses.length,
        hiddenTruthsExtracted: reasoning.triviumAnalysis.hiddenTruths.length,
        supportingVerses: reasoning.validation.scripture.supportingVerses.length,
        readyForGeneration: reasoning.readinessForGeneration.ready,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[PHASE-2] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Processing failed',
      },
      { status: 500 }
    );
  }
}
