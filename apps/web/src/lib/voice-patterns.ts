/**
 * Brother Jimi's voice patterns for narrative expansion
 * Used to expand raw statements into conversational narratives
 */

export const VOICE_PATTERNS = {
  opening: [
    'I know this because I lived it.',
    'I know what this looks like because I have been there.',
    'Let me tell you what I see happen with',
    'I am going to tell you what happens when',
    'I recognize this pattern because I walked through it.',
  ],

  acknowledgment: [
    'And you believe it because it makes sense.',
    'You believe it because everyone around you is doing it.',
    'You believe it because it sounds reasonable.',
    'And it seems like the only way.',
  ],

  turning: [
    'But then you are in it and',
    'But what you discover is',
    'But the reality is',
    'But here is what actually happens:',
  ],

  revelation: [
    'This is not a choice problem.',
    'This is spiritual, not circumstantial.',
    'This is what most people miss.',
    'This is bondage disguised as freedom.',
    'This is the trap.',
  ],

  deepening: [
    'You have what it promised.',
    'You have the status, the money, the success.',
    'You have everything it said would bring peace.',
    'But peace is not there.',
  ],

  resolution: [
    'Then Jesus showed up.',
    'Then I encountered Jesus.',
    'Then everything changed.',
    'Then I met Him.',
  ],

  transformation: [
    'He did not give me a program.',
    'He did not offer advice.',
    'He did not make excuses go away.',
    'He broke the bondage.',
    'He set me free.',
  ],

  closing: [
    'The power is yours.',
    'That is who you are choosing to be.',
    'That is what freedom looks like.',
    'That is the difference.',
  ],
};

export function getVoicePattern(type: keyof typeof VOICE_PATTERNS): string[] {
  return VOICE_PATTERNS[type] || [];
}

export function selectRandomPattern(type: keyof typeof VOICE_PATTERNS): string {
  const patterns = getVoicePattern(type);
  if (patterns.length === 0) return '';
  return patterns[Math.floor(Math.random() * patterns.length)];
}

export function buildNarrativeStructure(
  statement: string,
  context?: string
): string {
  const opening = selectRandomPattern('opening');
  const acknowledgment = selectRandomPattern('acknowledgment');
  const turning = selectRandomPattern('turning');
  const revelation = selectRandomPattern('revelation');
  const deepening = selectRandomPattern('deepening');
  const resolution = selectRandomPattern('resolution');
  const transformation = selectRandomPattern('transformation');
  const closing = selectRandomPattern('closing');

  return `${opening}

${statement}

${acknowledgment}

${turning} it is the opposite of what was promised.

${deepening}

${revelation}

${resolution}

${transformation}

${closing}`;
}
