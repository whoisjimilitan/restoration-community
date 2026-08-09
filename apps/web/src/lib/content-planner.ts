/**
 * CONTENT PLANNER
 * Plans how to adapt a message for each format
 */

import type { ExtractedMessage } from './message-extractor';

export interface FormatPlan {
  format: string;
  tone: string;
  length: string;
  objective: string;
  structure: string;
  cta: string;
  keyElements: string[];
}

export interface ContentPlan {
  dailyLetter: FormatPlan;
  socialPost: FormatPlan;
  microInsight: FormatPlan;
  devotional: FormatPlan;
  articleExcerpt: FormatPlan;
  shortVideoScript: FormatPlan;
  longVideoScript: FormatPlan;
  podcastMoment: FormatPlan;
  email: FormatPlan;
}

export function planContent(message: ExtractedMessage): ContentPlan {
  return {
    dailyLetter: planDailyLetter(message),
    socialPost: planSocialPost(message),
    microInsight: planMicroInsight(message),
    devotional: planDevotional(message),
    articleExcerpt: planArticle(message),
    shortVideoScript: planShortVideo(message),
    longVideoScript: planLongVideo(message),
    podcastMoment: planPodcast(message),
    email: planEmail(message),
  };
}

function planDailyLetter(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'dailyLetter',
    tone: 'Intimate, personal, action-oriented',
    length: '150-200 words',
    objective: 'Give reader something to sit with throughout their day',
    structure: 'Greeting → Core idea → Practical moment → Why it matters → Call to sit with it',
    cta: 'Reflect on how this applies to your day',
    keyElements: [msg.coreRevelation, msg.mechanism, 'specific daily moment'],
  };
}

function planSocialPost(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'socialPost',
    tone: 'Punchy, shareable, stops the scroll',
    length: '50-280 characters',
    objective: 'Get likes, shares, comments',
    structure: 'Hook statement (one sentence max)',
    cta: 'Click link in bio / Share this',
    keyElements: [msg.hookFormula, msg.coreRevelation],
  };
}

function planMicroInsight(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'microInsight',
    tone: 'Clear, quotable, revelation-focused',
    length: '1 powerful sentence',
    objective: 'Be memorable enough to memorize',
    structure: 'Single declarative statement',
    cta: 'Sit with this truth',
    keyElements: [msg.coreRevelation],
  };
}

function planDevotional(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'devotional',
    tone: 'Contemplative, reflective, inviting inner work',
    length: '100-150 words',
    objective: 'Invite reader into their own discovery',
    structure: 'Opening truth → Brief exploration → Reflective question → Invitation',
    cta: 'Pray about what you\'re hearing',
    keyElements: [msg.coreRevelation, msg.mechanism, 'personal reflection question'],
  };
}

function planArticle(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'articleExcerpt',
    tone: 'Authoritative, educational, structured',
    length: '300-400 words',
    objective: 'Teach deeply and establish expertise',
    structure: 'Title → Core truth → How it works → Why it matters → Application → Close',
    cta: 'Read the full article / Subscribe for more',
    keyElements: [msg.coreRevelation, msg.mechanism, msg.cost, msg.transformation],
  };
}

function planShortVideo(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'shortVideoScript',
    tone: 'Visual, paced, dramatic pauses',
    length: '30-60 seconds (100-150 words)',
    objective: 'Hook in first 3 seconds, land the idea, create curiosity',
    structure: 'Hook [PAUSE] Revelation [PAUSE] Proof [PAUSE] Call to action',
    cta: 'Full teaching in bio',
    keyElements: [msg.hookFormula, msg.coreRevelation, 'moment or story'],
  };
}

function planLongVideo(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'longVideoScript',
    tone: 'Narrative, journey-driven, building',
    length: '3-8 minutes (600-1200 words)',
    objective: 'Take viewer on complete transformation arc',
    structure: 'Hook → Story/Problem → Revelation → Mechanism → Proof → Cost → Transformation → Call',
    cta: 'Subscribe, comment what resonates, share with someone who needs this',
    keyElements: [msg.hookFormula, msg.coreRevelation, msg.mechanism, msg.cost, msg.transformation],
  };
}

function planPodcast(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'podcastMoment',
    tone: 'Conversational, authoritative, story-driven',
    length: '1-2 minutes (200-300 words)',
    objective: 'Create quotable moment, establish thought leadership',
    structure: 'Setup → Story or example → Insight → Why it matters → Reflection',
    cta: 'Listen to the full episode / Follow the podcast',
    keyElements: [msg.coreRevelation, 'real-life example', msg.mechanism],
  };
}

function planEmail(msg: ExtractedMessage): FormatPlan {
  return {
    format: 'email',
    tone: 'Personal, warm, specific',
    length: '150-250 words',
    objective: 'Build relationship, deliver value, move to action',
    structure: 'Personal greeting → Why I\'m sharing this → Core idea → What it means → Specific ask',
    cta: 'Reply with your thoughts / Click to read full piece',
    keyElements: [msg.coreRevelation, msg.mechanism, 'specific invitation'],
  };
}
