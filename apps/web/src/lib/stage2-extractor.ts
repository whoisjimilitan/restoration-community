/**
 * Stage 2: Extract and reframe mini-messages from transcript
 * Mines transcript for distinct teachings, extracts exact quotes, generates fresh titles
 */

export interface MiniMessage {
  title: string;
  revelation: string;
  primaryQuotable: string;
  supportingQuotes: string[];
  angle: string;
}

export interface Stage2Output {
  miniMessages: MiniMessage[];
}

export function extractStage2MiniMessages(transcript: string): Stage2Output {
  console.log('[STAGE2] Mining transcript for mini-messages...');

  const miniMessages: MiniMessage[] = [];

  // Define message themes to look for
  const themes = [
    {
      pattern: /grace|comes by grace|work of righteousness|labour|struggling/i,
      title: 'When Grace Ends Your Struggle',
      angle: 'Grace stops the labor',
      revelationKeywords: ['grace', 'labour', 'struggling', 'ends'],
    },
    {
      pattern: /money|position|have everything|enjoying|lack contentment|possessions/i,
      title: 'Why Having Everything Can Leave You Empty',
      angle: 'Circumstance is not contentment',
      revelationKeywords: ['money', 'position', 'everything', 'lack'],
    },
    {
      pattern: /sees beyond|beyond position|beyond money|beyond pleasure|spiritual/i,
      title: 'Contentment Sees Beyond',
      angle: 'True contentment transcends circumstance',
      revelationKeywords: ['beyond', 'position', 'spiritual', 'contentment'],
    },
    {
      pattern: /no one|without god|cannot be|only god|god almighty/i,
      title: 'No One Without God',
      angle: 'Independence is an illusion',
      revelationKeywords: ['without god', 'no one', 'only', 'god'],
    },
    {
      pattern: /war going on|devil.*stolen|take back|lost possessions|recover/i,
      title: 'The War for Your Possessions',
      angle: 'Spiritual warfare is real and winnable',
      revelationKeywords: ['war', 'devil', 'stolen', 'recover', 'possessions'],
    },
    {
      pattern: /encounter.*jesus|jesus showed|jesus is|jesus christ|savior/i,
      title: 'Encounter Changes Everything',
      angle: 'Meeting Jesus rewrites your story',
      revelationKeywords: ['encounter', 'jesus', 'changed', 'life'],
    },
    {
      pattern: /unchangeable events|fasting and prayer|do not lose heart|strengthen|determination/i,
      title: 'When Prayer Can\'t Change It',
      angle: 'God uses unchangeable events for purpose',
      revelationKeywords: ['unchangeable', 'events', 'strengthen', 'purpose'],
    },
    {
      pattern: /faithful|god is faithful|recover.*all|claim back|faithful is/i,
      title: 'Faithful God, Full Recovery',
      angle: 'God\'s faithfulness secures your restoration',
      revelationKeywords: ['faithful', 'god', 'recovery', 'restore'],
    },
  ];

  // Extract relevant sentences from transcript
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 15);

  // For each theme, find matching sentences
  for (const theme of themes) {
    const matchingSentences: string[] = [];

    for (const sentence of sentences) {
      if (theme.pattern.test(sentence)) {
        matchingSentences.push(sentence.trim());
      }
    }

    // If we found relevant sentences for this theme, create a mini-message
    if (matchingSentences.length > 0) {
      // Identify the PRIMARY quotable (the most memorable line)
      const primaryQuotable = identifyPrimaryQuotable(matchingSentences, theme.revelationKeywords);

      // Get supporting quotes (other relevant sentences)
      const supportingQuotes = matchingSentences
        .filter(q => q !== primaryQuotable)
        .slice(0, 2);

      // Find the revelation (core truth for this mini-message)
      const revelation = extractRevelationFromQuotes([primaryQuotable, ...supportingQuotes], theme.revelationKeywords);

      miniMessages.push({
        title: theme.title,
        revelation,
        primaryQuotable,
        supportingQuotes,
        angle: theme.angle,
      });
    }
  }

  console.log(`[STAGE2] Found ${miniMessages.length} distinct messages`);

  return {
    miniMessages,
  };
}

function identifyPrimaryQuotable(quotes: string[], keywords: string[]): string {
  if (quotes.length === 0) return '';

  let bestQuote = quotes[0];
  let maxScore = 0;

  for (const quote of quotes) {
    let score = 0;

    // Quotability scoring
    if (quote.length > 30 && quote.length < 200) score += 3; // Optimal quotable length
    if (/^[A-Z].*[.!?]$/.test(quote)) score += 2; // Complete, capitalized sentence
    if (/\byou\b|\bI\b|\bwe\b/.test(quote)) score += 1; // Personal pronouns
    if (/(?:is|comes|will|must|cannot|can|does)\s+/.test(quote)) score += 2; // Strong verb patterns

    // Keyword relevance
    const keywordMatch = keywords.filter(kw => quote.toLowerCase().includes(kw)).length;
    score += keywordMatch * 2;

    // Theological/transformational weight
    if (/grace|faith|god|jesus|truth|freedom|transform|restore|power|spirit/i.test(quote)) {
      score += 2;
    }

    if (score > maxScore) {
      maxScore = score;
      bestQuote = quote;
    }
  }

  return bestQuote.trim();
}

function extractRevelationFromQuotes(quotes: string[], keywords: string[]): string {
  // Find the sentence that contains the most revelation keywords
  let bestQuote = quotes[0];
  let maxKeywords = 0;

  for (const quote of quotes) {
    const count = keywords.filter(kw => quote.toLowerCase().includes(kw)).length;
    if (count > maxKeywords) {
      maxKeywords = count;
      bestQuote = quote;
    }
  }

  return bestQuote.trim();
}
