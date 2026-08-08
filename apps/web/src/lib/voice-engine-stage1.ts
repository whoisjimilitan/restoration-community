/**
 * STAGE 1: EXTRACT WISDOM PIECES (SIMPLIFIED)
 * Extract core wisdom from transcript without complex TRIVIUM assessment
 */

export interface Stage1Output {
  title: string;
  main_revelation: string;
  wisdom_pieces: any[];
  speaker_tone: string;
}

export function extractStage1CoreTeaching(transcript: string): Stage1Output {
  console.log('[STAGE1] Extracting wisdom pieces...');

  // Extract title
  const titleMatch = transcript.match(/(?:title|message|today).*?["']([^"']+)["']/i) ||
                     transcript.match(/this leads me to the title.*?["']([^"']+)["']/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Teaching';

  // Split into sentences
  const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);

  // Find main revelation
  const mainRevelation = sentences[0] || 'Core teaching';

  // Extract 3-5 wisdom pieces (quotable statements with revelation)
  const wisdomPieces = sentences
    .filter((s, idx) => idx > 0 && idx < Math.min(8, sentences.length))
    .slice(0, 5)
    .map((quote, idx) => ({
      id: idx + 1,
      exact_quote: quote,
      claim: extractClaim(quote),
      premises: [],
      conclusion: extractConclusion(quote),
      validity_assessment: {
        structure: 'Valid',
        logical_flow: 'Follows logically',
        structure_valid: true,
      },
      premise_assessments: [],
      presentation: {
        analytical_viewer: `This is true: ${quote}`,
        resistant_viewer: `Consider this: ${quote}`,
        accepting_viewer: `You're right to think about this: ${quote}`,
      },
      strongest_case: quote,
      reflective_question: generateQuestion(quote),
      reflective_statement: generateStatement(quote),
    }));

  console.log(`[STAGE1] Extracted ${wisdomPieces.length} wisdom pieces`);

  return {
    title,
    main_revelation: mainRevelation,
    wisdom_pieces: wisdomPieces,
    speaker_tone: 'prophetic, powerful, intimate',
  };
}

function extractClaim(quote: string): string {
  // Get first 15-20 words as claim
  const words = quote.split(' ');
  return words.slice(0, Math.min(8, words.length)).join(' ');
}

function extractConclusion(quote: string): string {
  // Last 8-10 words as conclusion
  const words = quote.split(' ');
  return words.slice(Math.max(0, words.length - 6)).join(' ');
}

function generateQuestion(quote: string): string {
  const questions = [
    `What if you took this seriously: "${quote.substring(0, 40)}..."?`,
    `How would your life change if this were true: "${quote.substring(0, 40)}..."?`,
    `What does this reveal about how you're living: "${quote.substring(0, 40)}..."?`,
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

function generateStatement(quote: string): string {
  return `This is the truth: ${quote}`;
}
