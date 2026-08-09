import { NextRequest, NextResponse } from 'next/server';
import { analyzeValidity } from '@/lib/teaching-engine/v2/validity-analyzer';
import { validatePremises } from '@/lib/teaching-engine/v2/premise-validator';
import { refineTrivium } from '@/lib/teaching-engine/v2/trivium-refiner';
import { generateAllFormats } from '@/lib/teaching-engine/v2/format-generator';
import { createGuardRails } from '@/lib/voice/guardrails';

export const dynamic = 'force-dynamic';

interface OrchestratorRequest {
  transcript: string;
  sermonTitle: string;
}

interface OrchestratorResponse {
  success: boolean;
  validity_report: any;
  premise_report: any;
  refined_core: string;
  formats: any[];
  summary: {
    logic_status: string;
    scripture_status: string;
    formats_generated: number;
  };
}

export async function POST(request: NextRequest) {
  console.log('[ORCHESTRATOR-V2] Starting teaching engine pipeline');

  try {
    const body = (await request.json()) as OrchestratorRequest;
    const { transcript, sermonTitle } = body;

    if (!transcript || !sermonTitle) {
      return NextResponse.json(
        { error: 'Transcript and sermon title required' },
        { status: 400 }
      );
    }

    const guardrails = createGuardRails();

    console.log('[ORCHESTRATOR-V2] Phase 1: Validity analysis');
    const validityReport = analyzeValidity(transcript);

    console.log('[ORCHESTRATOR-V2] Phase 2: Premise validation');
    const premiseReport = validatePremises(transcript, validityReport);

    console.log('[ORCHESTRATOR-V2] Phase 3: Trivium refinement');
    const refinedCore = refineTrivium(transcript, validityReport, premiseReport, guardrails);

    console.log('[ORCHESTRATOR-V2] Phase 4: Format generation');
    const formats = generateAllFormats(
      refinedCore.refined_transcript,
      refinedCore.verbatim_highlights,
      guardrails
    );

    const response: OrchestratorResponse = {
      success: true,
      validity_report: validityReport,
      premise_report: premiseReport,
      refined_core: refinedCore.refined_transcript,
      formats,
      summary: {
        logic_status: validityReport.logic_status,
        scripture_status: premiseReport.overall_scriptural_integrity,
        formats_generated: formats.length,
      },
    };

    console.log('[ORCHESTRATOR-V2] ✓ Pipeline complete');
    return NextResponse.json(response);
  } catch (error) {
    console.error('[ORCHESTRATOR-V2] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Pipeline failed' },
      { status: 500 }
    );
  }
}
