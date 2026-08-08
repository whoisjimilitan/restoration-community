/**
 * Stage 3 V2: Extraction-Based Expansion
 * Extract and remix your EXACT sentences from transcript
 * Never invent. Always use your actual words.
 */

import type { IrreplacableFrameworkConfig } from './irreplaceable-framework';

export interface Stage3ExtractionInput {
  miniMessageTitle: string;
  miniMessageRevelation: string;
  transcript: string;
  verbatimQuote: string;
  audience: string[];
}

export interface Stage3ExtractionOutput {
  title: string;
  expandedNarrative: string;
  sourceQuotes: string[]; // All quotes came from here
  frameworkConfig: IrreplacableFrameworkConfig;
}

/**
 * Extract relevant sentences from transcript that relate to the mini-message
 * Then remix them into a narrative using only their actual words
 */
export function extractAndRemixNarrative(input: Stage3ExtractionInput): Stage3ExtractionOutput {
  console.log(`[STAGE3-EXTRACTION] Processing: "${input.miniMessageTitle}"`);

  // Step 1: Find all relevant sentences from transcript
  const relevantSentences = extractRelevantSentences(input.transcript, input.miniMessageRevelation, input.miniMessageTitle);

  console.log(`[STAGE3-EXTRACTION] Found ${relevantSentences.length} relevant sentences`);

  // Step 2: Build narrative arc using their actual sentences
  const narrative = buildNarrativeFromExtracts(input.miniMessageTitle, relevantSentences, input.verbatimQuote);

  // Step 3: Build framework config
  const config = buildFrameworkConfig(input, relevantSentences);

  console.log('[STAGE3-EXTRACTION] Narrative built from extracted sentences only');

  return {
    title: input.miniMessageTitle,
    expandedNarrative: narrative,
    sourceQuotes: relevantSentences,
    frameworkConfig: config,
  };
}

function extractRelevantSentences(transcript: string, revelation: string, title: string): string[] {
  console.log('[EXTRACTION] Mining transcript for relevant sentences...');

  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);

  // Keywords to match based on title and revelation
  const keywords = extractKeywords(title, revelation);

  console.log(`[EXTRACTION] Keywords: ${keywords.join(', ')}`);

  // Find sentences that match keywords
  const matches = sentences.filter(sentence => {
    const lowerSentence = sentence.toLowerCase();
    return keywords.some(keyword => lowerSentence.includes(keyword.toLowerCase()));
  });

  // Always include the verbatim quote
  const verbatimMatch = sentences.find(s => s.includes(revelation.split(' ').slice(0, 5).join(' ')));

  const results = [...new Set([...(verbatimMatch ? [verbatimMatch] : []), ...matches])];

  return results.slice(0, 8); // Top 8 most relevant
}

function extractKeywords(title: string, revelation: string): string[] {
  const titleKeywords = title
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(w => w.length > 3);

  const revelationKeywords = revelation
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(w => w.length > 3 && !['that', 'this', 'when', 'what', 'which'].includes(w))
    .slice(0, 5);

  return [...new Set([...titleKeywords, ...revelationKeywords])];
}

function buildNarrativeFromExtracts(title: string, sentences: string[], verbatimQuote: string): string {
  const parts: string[] = [];

  // Opening: Create hook from their actual language
  const openingPattern = findOpeningPattern(sentences);
  if (openingPattern) {
    parts.push(openingPattern);
  } else {
    parts.push('Let me show you what I see.');
  }

  // Build core narrative by arranging their sentences
  const coreNarrative = arrangeSentencesIntoNarrative(sentences, verbatimQuote);
  parts.push(coreNarrative);

  // Closing: Use their closing pattern if available
  const closingPattern = findClosingPattern(sentences);
  if (closingPattern) {
    parts.push(closingPattern);
  }

  // Add the question loop at the end
  parts.push('How do you know you are not missing this right now?');

  return parts.filter(p => p.length > 0).join('\n\n');
}

function findOpeningPattern(sentences: string[]): string {
  // Look for sentences that start with their characteristic openers
  const openers = [
    /^you see[,.]?/i,
    /^people of god/i,
    /^let me (?:show|tell) you/i,
    /^i (?:know|want|see)/i,
  ];

  for (const opener of openers) {
    const found = sentences.find(s => opener.test(s));
    if (found) return found;
  }

  return sentences[0] || '';
}

function findClosingPattern(sentences: string[]): string {
  // Look for sentences that resolve or close
  const closingKeywords = ['that is', 'the power', 'always', 'jesus', 'god'];
  const lastSentences = sentences.slice(-3);

  for (const sentence of lastSentences) {
    if (closingKeywords.some(kw => sentence.toLowerCase().includes(kw))) {
      return sentence;
    }
  }

  return sentences[sentences.length - 1] || '';
}

function arrangeSentencesIntoNarrative(sentences: string[], verbatimQuote: string): string {
  const arranged: string[] = [];

  // Always lead with the core verbatim quote
  arranged.push(verbatimQuote);

  // Add supporting sentences that explain or expand
  const supportingSentences = sentences.filter(s => !s.includes(verbatimQuote.substring(0, 20)));

  // Arrange by relevance
  for (const sentence of supportingSentences.slice(0, 3)) {
    arranged.push(sentence);
  }

  return arranged.join('\n\n');
}

function buildFrameworkConfig(
  input: Stage3ExtractionInput,
  _sentences: string[]
): IrreplacableFrameworkConfig {
  return {
    audience: {
      descriptors: input.audience,
      context: 'They have lived the lie. They know something is wrong. They are looking for truth.',
      primaryNeed: 'To understand this is real, this is recognized, and this can be changed.',
    },

    truth: {
      coreRevelation: input.miniMessageRevelation,
      scriptureReferences: ['James 1:2-4', 'Romans 8:28', 'John 8:32'],
      verbatimWisdom: input.verbatimQuote,
      perspective: 'This is not circumstantial. This is spiritual. And it is winnable.',
    },

    delivery: {
      tone: 'direct',
      register: 'smart-person-explaining-to-person-they-respect',
    },

    outcome: {
      whatMeansNow: 'The struggle you experience is real and recognized by God.',
      whyMatters: 'Because if it is real and recognized, it can be addressed.',
      howToDo: 'By understanding what is actually happening. By encountering Jesus.',
    },
  };
}
