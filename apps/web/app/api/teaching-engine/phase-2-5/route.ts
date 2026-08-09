import { NextRequest, NextResponse } from 'next/server';
import {
  generatePositioningBlueprint,
  type PositioningBlueprint,
} from '@/lib/strategic-positioning-engine';
import type { VerbatimElement } from '@/lib/types/teaching-process';
import type { DeepReasoning } from '@/lib/types/teaching-process';

export const dynamic = 'force-dynamic';

interface Phase25Request {
  verbatimElements: VerbatimElement[];
  reasoning: DeepReasoning;
}

interface Phase25Response {
  success: boolean;
  positioning: PositioningBlueprint;
  stats: {
    statementsAnalyzed: number;
    trustSignalsIdentified: number;
    turningPointsFound: number;
  };
}

export async function POST(request: NextRequest) {
  console.log('[PHASE-2.5] Strategic Positioning: Analyzing narrative arc');

  try {
    const body = (await request.json()) as Phase25Request;
    const { verbatimElements, reasoning } = body;

    if (!verbatimElements || verbatimElements.length === 0) {
      return NextResponse.json(
        { error: 'Verbatim elements required' },
        { status: 400 }
      );
    }

    if (!reasoning) {
      return NextResponse.json(
        { error: 'Reasoning required' },
        { status: 400 }
      );
    }

    // Generate positioning blueprint
    const positioning = generatePositioningBlueprint(
      verbatimElements,
      reasoning
    );

    console.log('[PHASE-2.5] ✓ Positioning blueprint generated');

    const response: Phase25Response = {
      success: true,
      positioning,
      stats: {
        statementsAnalyzed: positioning.statements.length,
        trustSignalsIdentified: positioning.statements.filter(
          (s) =>
            s.trustSignals.useInverseIncentive ||
            s.trustSignals.restraintSignal ||
            s.trustSignals.positionAsDiscovery
        ).length,
        turningPointsFound: positioning.keyTurningPoints.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[PHASE-2.5] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Positioning failed',
      },
      { status: 500 }
    );
  }
}
