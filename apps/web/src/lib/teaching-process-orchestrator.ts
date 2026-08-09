import { PrismaClient } from '@prisma/client';
import type { TeachingProcess } from './types/teaching-process';

const prisma = new PrismaClient();

export async function runTeachingPipeline(
  transcript: string,
  sermonTitle: string
): Promise<TeachingProcess> {
  console.log('[ORCHESTRATOR] Starting pipeline for:', sermonTitle);

  try {
    // Step 1: Call Phase 1
    console.log('[ORCHESTRATOR] Phase 1: Verbatim extraction');
    const phase1Response = await fetch(
      'http://localhost:3000/api/teaching-engine/phase-1',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      }
    );
    const phase1 = await phase1Response.json();

    if (!phase1.success) {
      throw new Error(`Phase 1 failed: ${phase1.error}`);
    }

    // Step 2: Call Phase 2
    console.log('[ORCHESTRATOR] Phase 2: Deep reasoning');
    const phase2Response = await fetch(
      'http://localhost:3000/api/teaching-engine/phase-2',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawContent: transcript,
          verbatimElements: phase1.verbatimElements,
        }),
      }
    );
    const phase2 = await phase2Response.json();

    if (!phase2.success) {
      throw new Error(`Phase 2 failed: ${phase2.error}`);
    }

    // Step 2.5: Call Phase 2.5 (Strategic Positioning)
    console.log('[ORCHESTRATOR] Phase 2.5: Strategic positioning');
    const phase25Response = await fetch(
      'http://localhost:3000/api/teaching-engine/phase-2-5',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verbatimElements: phase1.verbatimElements,
          reasoning: phase2.reasoning,
        }),
      }
    );
    const phase25 = await phase25Response.json();

    if (!phase25.success) {
      throw new Error(`Phase 2.5 failed: ${phase25.error}`);
    }

    // Step 3: Call Phase 3
    console.log('[ORCHESTRATOR] Phase 3: Output generation');
    const phase3Response = await fetch(
      'http://localhost:3000/api/teaching-engine/phase-3',
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
    const phase3 = await phase3Response.json();

    if (!phase3.success) {
      throw new Error(`Phase 3 failed: ${phase3.error}`);
    }

    // Step 4: Store in database
    console.log('[ORCHESTRATOR] Storing results in database');
    const process = await prisma.teachingProcess.create({
      data: {
        sermonTitle,
        transcript,
        verbatimElements: phase1.verbatimElements,
        reasoning: phase2.reasoning,
        outputs: phase3.outputs,
        viralityScores: calculateViralityScores(phase3.outputs),
        status: 'complete',
      },
    });

    console.log('[ORCHESTRATOR] ✓ Pipeline complete:', process.id);
    return process as unknown as TeachingProcess;
  } catch (error) {
    console.error('[ORCHESTRATOR] Error:', error);
    throw error;
  }
}

function calculateViralityScores(outputs: Record<string, string>): Record<string, number> {
  const scores: Record<string, number> = {};

  for (const [format, content] of Object.entries(outputs)) {
    let score = 50;

    if (format === 'twitter' || format === 'instagram') {
      score += Math.max(0, 20 - (content.length / 100));
    }

    const questions = (content.match(/\?/g) || []).length;
    score += questions * 5;

    const emotionalWords = ['believe', 'powerful', 'amazing', 'transform', 'breakthrough'];
    const emotionCount = emotionalWords.filter((w) =>
      content.toLowerCase().includes(w)
    ).length;
    score += emotionCount * 3;

    if (
      content.toLowerCase().includes('share') ||
      content.toLowerCase().includes('join') ||
      content.toLowerCase().includes('discover')
    ) {
      score += 10;
    }

    scores[format] = Math.min(100, Math.max(0, score));
  }

  return scores;
}
