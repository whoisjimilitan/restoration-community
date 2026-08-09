/**
 * TEACHING ENGINE - ORCHESTRATOR
 * Coordinates the full pipeline: Phase 1 → 2 → 2.5 → 3
 *
 * POST /api/teaching-engine/orchestrator
 * Body: {
 *   transcript: string;
 *   sermonTitle: string;
 * }
 */

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface OrchestratorRequest {
  transcript: string;
  sermonTitle: string;
}

interface OrchestratorResponse {
  success: boolean;
  outputs: {
    article: string;
    email: string;
    facebook: string;
    twitter: string;
    instagram: string;
    podcast: string;
    video: string;
  };
  verbatimCount: number;
  reasoningCount: number;
  positioningCount: number;
  stats?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  console.log('[ORCHESTRATOR] Starting full pipeline');

  try {
    const body = (await request.json()) as OrchestratorRequest;
    const { transcript, sermonTitle } = body;

    if (!transcript || !sermonTitle) {
      return NextResponse.json(
        { error: 'Transcript and sermon title required' },
        { status: 400 }
      );
    }

    // Step 1: Phase 1 - Verbatim Extraction
    console.log('[ORCHESTRATOR] Phase 1: Verbatim extraction');
    const phase1Response = await fetch(
      `${process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL : 'http://localhost:3000'}/api/teaching-engine/phase-1`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      }
    );

    if (!phase1Response.ok) {
      throw new Error(`Phase 1 failed: ${phase1Response.statusText}`);
    }

    const phase1 = await phase1Response.json();

    if (!phase1.success) {
      throw new Error(`Phase 1 failed: ${phase1.error}`);
    }

    // Step 2: Phase 2 - Deep Reasoning
    console.log('[ORCHESTRATOR] Phase 2: Deep reasoning');
    const phase2Response = await fetch(
      `${process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL : 'http://localhost:3000'}/api/teaching-engine/phase-2`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawContent: transcript,
          verbatimElements: phase1.verbatimElements,
        }),
      }
    );

    if (!phase2Response.ok) {
      throw new Error(`Phase 2 failed: ${phase2Response.statusText}`);
    }

    const phase2 = await phase2Response.json();

    if (!phase2.success) {
      throw new Error(`Phase 2 failed: ${phase2.error}`);
    }

    // Step 2.5: Phase 2.5 - Strategic Positioning
    console.log('[ORCHESTRATOR] Phase 2.5: Strategic positioning');
    const phase25Response = await fetch(
      `${process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL : 'http://localhost:3000'}/api/teaching-engine/phase-2-5`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verbatimElements: phase1.verbatimElements,
          reasoning: phase2.reasoning,
        }),
      }
    );

    if (!phase25Response.ok) {
      throw new Error(`Phase 2.5 failed: ${phase25Response.statusText}`);
    }

    const phase25 = await phase25Response.json();

    if (!phase25.success) {
      throw new Error(`Phase 2.5 failed: ${phase25.error}`);
    }

    // Step 3: Phase 3 - Output Generation
    console.log('[ORCHESTRATOR] Phase 3: Output generation');
    const phase3Response = await fetch(
      `${process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL : 'http://localhost:3000'}/api/teaching-engine/phase-3`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verbatimElements: phase1.verbatimElements,
          reasoning: phase2.reasoning,
          positioning: phase25.positioning,
        }),
      }
    );

    if (!phase3Response.ok) {
      throw new Error(`Phase 3 failed: ${phase3Response.statusText}`);
    }

    const phase3 = await phase3Response.json();

    if (!phase3.success) {
      throw new Error(`Phase 3 failed: ${phase3.error}`);
    }

    console.log('[ORCHESTRATOR] ✓ Pipeline complete');

    const response: OrchestratorResponse = {
      success: true,
      outputs: phase3.outputs,
      verbatimCount: phase1.verbatimElements?.length || 0,
      reasoningCount: phase2.reasoning ? 1 : 0,
      positioningCount: phase25.stats?.statementsAnalyzed || 0,
      stats: {
        phase1: phase1.stats,
        phase2: phase2.stats,
        phase25: phase25.stats,
        phase3: phase3.stats,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[ORCHESTRATOR] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Pipeline failed',
      },
      { status: 500 }
    );
  }
}
