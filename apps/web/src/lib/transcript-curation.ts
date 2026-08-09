/**
 * TRANSCRIPT CURATION ENGINE
 * Thins, reorders, and minimally bridges sentences for different platforms
 * Every word is from the original transcript
 */

import type { ExtractedSentence, CoreTruth } from './transcript-extraction';

export interface CuratedOutput {
  platform: 'tiktok' | 'youtube-short' | 'youtube-long' | 'interview' | 'email';
  curatedSentences: CuratedSentence[];
  bridges: BridgeAdded[];
  removedReasons: RemovedSentence[];
  estimatedLength: string;
  performanceNotes: string[];
}

export interface CuratedSentence {
  original: string;
  isVerbatim: boolean;
  index: number;
  purpose: string;
}

export interface BridgeAdded {
  position: 'after_sentence_' | 'before_sentence_';
  bridge: string;
  reason: string;
}

export interface RemovedSentence {
  text: string;
  reason: 'filler' | 'repetition' | 'tangent' | 'over_explanation';
}

// Remove sentences that don't earn their place
function thinTranscript(
  sentences: ExtractedSentence[]
): { kept: ExtractedSentence[]; removed: RemovedSentence[] } {
  const kept: ExtractedSentence[] = [];
  const removed: RemovedSentence[] = [];

  let lastCategory = '';

  for (const sent of sentences) {
    // Remove filler
    if (sent.strength === 'filler') {
      removed.push({ text: sent.text, reason: 'filler' });
      continue;
    }

    // Remove exact repetition
    if (kept.some((k) => k.text.toLowerCase() === sent.text.toLowerCase())) {
      removed.push({ text: sent.text, reason: 'repetition' });
      continue;
    }

    // Remove tangential stories (keep only first example)
    if (sent.category === 'story' && lastCategory === 'story') {
      removed.push({ text: sent.text, reason: 'tangent' });
      continue;
    }

    // Remove over-explanation (if explanation was already clear)
    if (
      sent.category === 'action' &&
      kept.length > 0 &&
      kept[kept.length - 1].category === 'action'
    ) {
      removed.push({ text: sent.text, reason: 'over_explanation' });
      continue;
    }

    kept.push(sent);
    lastCategory = sent.category;
  }

  return { kept, removed };
}

// Reorder sentences for platform psychology
function reorderForPlatform(
  sentences: ExtractedSentence[],
  platform: 'tiktok' | 'youtube-short' | 'youtube-long' | 'interview' | 'email'
): ExtractedSentence[] {
  const irreplaceable = sentences.filter((s) => s.strength === 'irreplaceable');
  const strong = sentences.filter((s) => s.strength === 'strong');
  const supporting = sentences.filter((s) => s.strength === 'supporting');

  switch (platform) {
    case 'tiktok':
      // Hook first, revelation second, proof/story, mirror, close
      return [
        ...irreplaceable.filter((s) => s.category === 'hook').slice(0, 1),
        ...irreplaceable.filter((s) => s.category !== 'hook').slice(0, 2),
        ...strong.filter((s) => s.category === 'story').slice(0, 1),
        ...strong.filter((s) => s.category === 'action').slice(0, 1),
        ...irreplaceable.filter((s) => s.category === 'loop').slice(0, 1),
      ];

    case 'youtube-short':
      // Setup, revelation with context, proof, application
      return [
        ...strong.filter((s) => s.category === 'hook').slice(0, 1),
        ...supporting.filter((s) => s.category === 'story').slice(0, 2),
        ...irreplaceable.slice(0, 2),
        ...strong.filter((s) => s.category === 'proof').slice(0, 1),
        ...strong.filter((s) => s.category === 'action').slice(0, 1),
      ];

    case 'youtube-long':
      // Full narrative arc
      return [
        ...strong.filter((s) => s.category === 'hook'),
        ...supporting.filter((s) => s.category === 'story'),
        ...irreplaceable,
        ...strong.filter((s) => s.category === 'proof'),
        ...strong.filter((s) => s.category === 'action'),
        ...supporting.filter((s) => s.category === 'loop'),
      ];

    case 'interview':
      // Direct, confident, no hesitation
      return [
        ...irreplaceable.slice(0, 1),
        ...strong.filter((s) => s.strength !== 'supporting'),
        ...supporting.filter((s) => s.category !== 'filler').slice(0, 3),
      ];

    case 'email':
      // Story first, then revelation, then action
      return [
        ...supporting.filter((s) => s.category === 'story').slice(0, 2),
        ...irreplaceable,
        ...strong.filter((s) => s.category === 'action'),
        ...irreplaceable.filter((s) => s.category === 'loop').slice(0, 1),
      ];

    default:
      return sentences;
  }
}

// Add minimal connecting words in brackets
function addMinimalBridges(sentences: ExtractedSentence[]): { sentences: string[]; bridges: BridgeAdded[] } {
  const output: string[] = [];
  const bridges: BridgeAdded[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const current = sentences[i];
    const next = sentences[i + 1];

    output.push(current.text);

    // Add bridge only if needed for flow
    if (next && needsBridge(current, next)) {
      const bridge = generateBridge(current.category, next.category);
      output.push(`[${bridge}]`);
      bridges.push({
        position: 'after_sentence_' as const,
        bridge,
        reason: `Connect ${current.category} to ${next.category}`,
      });
    }
  }

  return { sentences: output, bridges };
}

// Determine if bridge is needed
function needsBridge(current: ExtractedSentence, next: ExtractedSentence): boolean {
  const compatible: Record<string, string[]> = {
    hook: ['revelation', 'story'],
    revelation: ['proof', 'action', 'story'],
    proof: ['action', 'story'],
    action: ['loop', 'story'],
    story: ['revelation', 'action', 'loop'],
    loop: [],
  };

  return !compatible[current.category]?.includes(next.category);
}

// Generate minimal bridge words
function generateBridge(from: string, to: string): string {
  const bridges: Record<string, Record<string, string>> = {
    hook: {
      revelation: 'But here\'s what I realized:',
      story: 'Let me show you what I mean.',
      action: 'Here\'s the thing:',
    },
    revelation: {
      proof: 'Here\'s what Scripture says about this.',
      action: 'So what does this actually mean?',
      story: 'I learned this the hard way.',
    },
    proof: {
      action: 'And that changes everything.',
      story: 'I see this play out all the time.',
    },
    action: {
      loop: 'Now ask yourself this.',
      story: 'I remember when this finally clicked.',
    },
    story: {
      revelation: 'That\'s when I understood something.',
      action: 'And that\'s why this matters.',
      loop: 'So the question is...',
    },
  };

  return bridges[from]?.[to] || '';
}

// Estimate content length
function estimateLength(sentences: string[]): string {
  const wordCount = sentences.join(' ').split(/\s+/).length;
  const secondsPerWord = 0.4;
  const estimatedSeconds = Math.round(wordCount * secondsPerWord);

  if (estimatedSeconds < 60) return `${estimatedSeconds} seconds`;
  return `${Math.round(estimatedSeconds / 60)} min ${estimatedSeconds % 60} sec`;
}

// Generate performance notes for platform
function generatePerformanceNotes(platform: string, sentences: string[]): string[] {
  const notes: string[] = [];
  const text = sentences.join(' ');

  switch (platform) {
    case 'tiktok':
      if (text.split(/\s+/).length < 80) notes.push('✓ Short enough for quick scroll stop');
      if (/[.!?]\s+[A-Z]/.test(text)) notes.push('✓ Strong line breaks for rhythm');
      if (/most|many|don't/.test(text)) notes.push('✓ Identity tension present');
      break;

    case 'youtube-short':
      if (text.split(/\s+/).length > 100) notes.push('✓ Enough depth for platform');
      if (/because|when|this means/.test(text)) notes.push('✓ Mechanism explained');
      break;

    case 'youtube-long':
      if (text.split(/\s+/).length > 500) notes.push('✓ Narrative arc present');
      if (/story|example|learned/.test(text)) notes.push('✓ Personal authority evident');
      break;

    case 'interview':
      if (!/um|uh|like|kind of/.test(text)) notes.push('✓ Confident, direct delivery');
      if (/i|me|my/.test(text)) notes.push('✓ Authentic voice preserved');
      break;

    case 'email':
      if (/i|story|when/.test(text)) notes.push('✓ Personal and narrative');
      if (/means|do|apply/.test(text)) notes.push('✓ Actionable guidance included');
      break;
  }

  return notes;
}

// Main curation function
export function curateForPlatform(
  truth: CoreTruth,
  platform: 'tiktok' | 'youtube-short' | 'youtube-long' | 'interview' | 'email'
): CuratedOutput {
  // Step 1: Thin the transcript
  const { kept, removed } = thinTranscript(truth.sentences);

  // Step 2: Reorder for platform
  const reordered = reorderForPlatform(kept, platform);

  // Step 3: Add minimal bridges
  const { sentences, bridges } = addMinimalBridges(reordered);

  // Step 4: Generate notes
  const performanceNotes = generatePerformanceNotes(platform, sentences);

  return {
    platform,
    curatedSentences: reordered.map((s, idx) => ({
      original: s.text,
      isVerbatim: true,
      index: idx,
      purpose: s.category,
    })),
    bridges,
    removedReasons: removed,
    estimatedLength: estimateLength(sentences),
    performanceNotes,
  };
}
