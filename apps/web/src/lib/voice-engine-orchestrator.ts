/**
 * VOICE ENGINE ORCHESTRATOR
 * Coordinates all three stages: Extract → Extract Lightbulbs → Validate & Produce
 */

import { extractStage1CoreTeaching } from './voice-engine-stage1';
import { extractStage2Lightbulbs } from './voice-engine-stage2';
import { validateAndProduceLightbulbs } from './voice-engine-stage3';

export interface VoiceEngineOutput {
  stage1: any;
  stage2: any;
  stage3: any;
}

export async function runVoiceEngine(transcript: string): Promise<VoiceEngineOutput> {
  console.log('[VOICE-ENGINE] Starting three-stage pipeline...');

  // STAGE 1: Extract wisdom scripts
  console.log('[VOICE-ENGINE] → Stage 1: Extract wisdom scripts');
  const stage1 = extractStage1CoreTeaching(transcript);

  // Reconstruct core teaching from wisdom pieces for Stage 2
  const reconstructedTeaching = stage1.wisdom_pieces
    .map(s => s.exact_quote)
    .join(' ');

  // STAGE 2: Extract lightbulbs from wisdom scripts
  console.log('[VOICE-ENGINE] → Stage 2: Extract lightbulbs');
  const dummyVoiceMarkers = { prophetic_markers: [], power_words: [] };
  const stage2 = extractStage2Lightbulbs(reconstructedTeaching, dummyVoiceMarkers);

  // STAGE 3: Validate lightbulbs + create new ones + generate formats
  console.log('[VOICE-ENGINE] → Stage 3: Validate & produce');
  const stage3 = validateAndProduceLightbulbs(stage2.mini_teachings, dummyVoiceMarkers, stage1.main_revelation);

  console.log('[VOICE-ENGINE] Complete');

  return {
    stage1,
    stage2,
    stage3,
  };
}
