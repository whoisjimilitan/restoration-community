import { FormatOutput, VerbatimElement } from './types';
import { GuardRails } from '../voice/guardrails';
import { applyTriviumRefinement } from '../voice/trivium-voice-applier';

export function generateAllFormats(
  refinedTranscript: string,
  verbatimHighlights: VerbatimElement[],
  guardrails: GuardRails
): FormatOutput[] {
  const formats: FormatOutput[] = [];
  const formatTypes: FormatOutput['format'][] = [
    'article', 'email', 'facebook', 'twitter', 'instagram', 'podcast', 'video'
  ];

  for (const format of formatTypes) {
    formats.push(generateFormat(refinedTranscript, format, guardrails, verbatimHighlights));
  }

  return formats;
}

export function generateFormat(
  refinedTranscript: string,
  format: FormatOutput['format'],
  guardrails: GuardRails,
  verbatimHighlights: VerbatimElement[] = []
): FormatOutput {
  switch (format) {
    case 'article':
      return generateArticle(refinedTranscript, verbatimHighlights);
    case 'email':
      return generateEmail(refinedTranscript, verbatimHighlights);
    case 'facebook':
      return generateFacebook(refinedTranscript, verbatimHighlights);
    case 'twitter':
      return generateTwitter(refinedTranscript, verbatimHighlights);
    case 'instagram':
      return generateInstagram(refinedTranscript, verbatimHighlights);
    case 'podcast':
      return generatePodcast(refinedTranscript, verbatimHighlights);
    case 'video':
      return generateVideo(refinedTranscript, verbatimHighlights);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

function generateArticle(transcript: string, verbatims: VerbatimElement[]): FormatOutput {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  const hook = verbatims.find(v => v.strength === 'high')?.text || sentences[0];

  return {
    format: 'article',
    content: `# ${sentences[0]}\n\n${sentences.slice(1).join('. ')}.`,
    hooks: [hook],
    call_to_action: 'Consider how this truth applies to your life today.',
  };
}

function generateEmail(transcript: string, verbatims: VerbatimElement[]): FormatOutput {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  const topHook = verbatims.find(v => v.strength === 'high')?.text || sentences[0];

  return {
    format: 'email',
    content: `Hi there,\n\nI wanted to share something that changed my perspective.\n\n${topHook}\n\n${sentences.slice(1, 3).join(' ')}\n\nThis might be exactly what you need to hear.\n\nIn truth,\n[Your Name]`,
    hooks: [topHook],
    call_to_action: 'Reply and let me know how this resonates with you.',
  };
}

function generateFacebook(transcript: string, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.substring(0, 100);
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  return {
    format: 'facebook',
    content: `${topHook}\n\n${sentences.slice(1, 3).join('\n\n')}\n\n#Truth #Revelation #Faith`,
    hooks: [topHook],
    call_to_action: 'What do you think? Share your thoughts in the comments.',
  };
}

function generateTwitter(transcript: string, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.split(/[.!?]+/)[0];
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  const tweets = [
    `Tweet 1:\n${topHook}`,
    `Tweet 2:\n${sentences[1] || 'Truth often inverts what the world teaches.'}`,
    `Tweet 3:\nThe question is not whether this is true. The question is whether you will act on it.`,
  ];

  return {
    format: 'twitter',
    content: tweets.join('\n\n'),
    hooks: [topHook],
    call_to_action: 'RT if this resonates with you.',
  };
}

function generateInstagram(transcript: string, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.split(/[.!?]+/)[0];
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  return {
    format: 'instagram',
    content: `${topHook}\n\n${sentences[1] || ''}\n\n.\n.\n.\n#Faith #Truth #Revelation #Transformed`,
    hooks: [topHook],
    call_to_action: 'Save this. Share it. Live it.',
  };
}

function generatePodcast(transcript: string, verbatims: VerbatimElement[]): FormatOutput {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  return {
    format: 'podcast',
    content: `[INTRO]\n${sentences[0]}\n\n[TEACHING]\n${sentences.slice(1, -1).join('\n\n')}\n\n[CLOSING]\n${sentences[sentences.length - 1]}`,
    hooks: [sentences[0]],
    call_to_action: 'Subscribe and leave a review.',
  };
}

function generateVideo(transcript: string, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.split(/[.!?]+/)[0];

  return {
    format: 'video',
    content: `[OPEN - 0:00-0:03]\n[Direct eye contact]\n${topHook}\n\n[BODY - 0:03-0:45]\n${transcript.substring(0, 500)}...\n\n[CLOSE - 0:45-1:00]\n[Pause]\nThe question is: will you act on this truth?\n\n[NOTES: Simple bg, direct eye contact, deliberate pacing]`,
    hooks: [topHook],
    call_to_action: 'Watch in full. Share it.',
  };
}
