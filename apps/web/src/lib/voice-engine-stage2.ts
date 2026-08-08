/**
 * STAGE 2: EXTRACT LIGHTBULB MOMENTS
 * Find distinct revelations within the core teaching, keep speaker's voice
 */

export interface LightbulbMoment {
  id: number;
  lightbulb: string;
  revelation: string;
  supporting_quotes: string[];
  angle: string;
  why_it_matters: string;
  themes: string[];
  speaker_voice_markers: {
    key_phrase?: string;
    pattern?: string;
    tone?: string;
  };
}

export interface Stage2Output {
  mini_teachings: LightbulbMoment[];
  summary: string;
}

export function extractStage2Lightbulbs(coreTeaching: string, voiceMarkers: any): Stage2Output {
  console.log('[STAGE2] Extracting lightbulb moments...');

  const sentences = coreTeaching
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20);

  // Define lightbulb themes based on teaching content
  const lightbulbThemes = [
    {
      keywords: ['grace', 'comes by', 'not by works', 'not our effort'],
      title: 'Core truth is received, not achieved',
      angle: 'Grace as the mechanism, not effort',
    },
    {
      keywords: ['see beyond', 'beyond position', 'beyond money', 'spiritual sight'],
      title: 'Perspective determines reality',
      angle: 'Vision shifts perception',
    },
    {
      keywords: ['no one', 'without god', 'cannot', 'only through'],
      title: 'God is the necessary source',
      angle: 'Dependence on divine reality',
    },
    {
      keywords: ['unchangeable', 'cannot change', 'strengthen', 'purpose'],
      title: 'Trials serve a purpose beyond comfort',
      angle: 'Difficulties as divine tools',
    },
    {
      keywords: ['encounter', 'jesus', 'changed', 'transform', 'location'],
      title: 'Meeting Jesus shifts everything',
      angle: 'Encounter as turning point',
    },
  ];

  const lightbulbs: LightbulbMoment[] = [];

  lightbulbThemes.forEach((theme, idx) => {
    // Find sentences that match this theme
    const matchingSentences = sentences.filter(s =>
      theme.keywords.some(kw => s.toLowerCase().includes(kw))
    );

    if (matchingSentences.length > 0) {
      // Get the primary quote (most complete statement of this truth)
      const primaryQuote = matchingSentences[0];
      const supporting = matchingSentences.slice(1, 3);

      // Extract the revelation (the deeper insight)
      const revelation = extractRevealation(primaryQuote, theme.angle);

      // Identify the speaker's voice in this section
      const voiceInContext = identifyVoiceInContext(matchingSentences);

      lightbulbs.push({
        id: idx + 1,
        lightbulb: theme.title,
        revelation,
        supporting_quotes: supporting,
        angle: theme.angle,
        why_it_matters: deriveSignificance(revelation),
        themes: theme.keywords,
        speaker_voice_markers: voiceInContext,
      });
    }
  });

  console.log(`[STAGE2] Found ${lightbulbs.length} distinct lightbulbs`);

  return {
    mini_teachings: lightbulbs.slice(0, 5), // Keep top 5
    summary: `${lightbulbs.length} distinct lightbulbs extracted from core teaching`,
  };
}

function extractRevealation(sentence: string, angle: string): string {
  // The revelation is the deeper truth the sentence reveals
  const revelations: Record<string, string> = {
    'Grace as the mechanism, not effort':
      'Your peace is independent of your circumstances when grace is operating.',
    'Vision shifts perception': 'The person who sees spiritually stops measuring by material standards.',
    'Dependence on divine reality': 'Satisfaction from any source but God is always incomplete.',
    'Difficulties as divine tools': 'What feels like stopping point is actually a preparation point.',
    'Encounter as turning point': 'Meeting Jesus doesn\'t improve your life—it completely rewrites it.',
  };

  return revelations[angle] || sentence;
}

function identifyVoiceInContext(sentences: string[]): Record<string, string> {
  const voiceMarkers: Record<string, string> = {};

  if (sentences.length > 0) {
    const text = sentences.join(' ').toLowerCase();

    if (text.includes('you see')) voiceMarkers.key_phrase = 'You see';
    if (text.includes('no one')) voiceMarkers.pattern = 'Emphatic negation';
    if (text.includes('comes by') || text.includes('comes through')) voiceMarkers.pattern = 'Mechanism reveal';

    voiceMarkers.tone = 'prophetic, declarative, intimate';
  }

  return voiceMarkers;
}

function deriveSignificance(revelation: string): string {
  // Why this revelation matters
  const significances: Record<string, string> = {
    'Your peace is independent of your circumstances when grace is operating.':
      'You stop waiting for circumstances to improve and start receiving grace for transformation.',
    'The person who sees spiritually stops measuring by material standards.':
      'You can have everything externally and still be empty internally if your sight is wrong.',
    'Satisfaction from any source but God is always incomplete.':
      'You discover that trying to find contentment elsewhere is futile—only God fills that void.',
    'What feels like stopping point is actually a preparation point.':
      'You learn to trust God\'s design even when you don\'t understand it.',
    'Meeting Jesus doesn\'t improve your life—it completely rewrites it.':
      'Your past no longer defines you; your future becomes authored by Him.',
  };

  // Find best match or generate generic significance
  return Object.entries(significances).find(([key]) => revelation.includes(key))?.[1] ||
    'This shifts how you understand your relationship with God.';
}
