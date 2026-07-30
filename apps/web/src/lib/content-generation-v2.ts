/**
 * Content Generation Pipeline v2
 *
 * Creates content across all 9 formats applying the 5-part framework:
 * 1. Conversational Entry — natural opening that sounds like Brother Jimi
 * 2. Frame Intention — counsel/advise/uplift/enlighten/educate
 * 3. Bold Voice — raw, prophetic, authentic
 * 4. Natural Cadence — short sentences, staccato phrasing, thinking out loud
 * 5. Weight — every word earns its place
 *
 * The v2 pipeline integrates Tasks 1-3:
 * - Frame selection (Task 1)
 * - Conversational entries (Task 2)
 * - Voice guardrails (Task 3)
 *
 * This is the new canonical content pipeline. The original generateAllOutputs()
 * is now deprecated but maintained for backward compatibility.
 */

import { selectFrameForContent, type Frame } from './frame-selection';
import { generateConversationalEntry } from './conversational-entries';
import { validateBrotherJimiVoice, type VoiceValidationResult } from './voice-guardrails';
import type { VoiceTheme } from './voice-extraction';

export interface GenerationInputV2 {
  theme: VoiceTheme;
  identityChoice: number;
  contentIndex: number;
}

export interface ContentOutputV2 {
  dailyLetter: string;
  socialPost: string;
  microInsight: string;
  devotional: string;
  article: string;
  shortVideo: string;
  longVideo: string;
  podcastMoment: string;
  email: string;
  frame: Frame;
  conversationalEntry: string;
  voiceValidation: VoiceValidationResult;
}

/**
 * Main pipeline: Generate all 9 outputs with integrated 5-part framework
 *
 * Process:
 * 1. Select frame based on identityChoice + contentIndex rotation
 * 2. Generate conversational entry for that frame
 * 3. Generate all 9 formats, each starting with entry + frame intention
 * 4. Validate voice on primary output (daily letter)
 * 5. Return complete output set with metadata
 *
 * Every format applies: [Entry] + [Frame] + [Voice] + [Cadence] + [Weight]
 */
export function generateAllOutputsV2(input: GenerationInputV2): ContentOutputV2 {
  const { theme, identityChoice, contentIndex } = input;

  // Step 1: Select frame for this content piece
  const frame = selectFrameForContent(identityChoice, contentIndex);

  // Step 2: Generate conversational entry
  const conversationalEntry = generateConversationalEntry(frame, theme, identityChoice);

  // Step 3: Generate all 9 formats
  const dailyLetter = generateDailyLetterV2(conversationalEntry, frame, theme);
  const socialPost = generateSocialPostV2(conversationalEntry, frame, theme);
  const microInsight = generateMicroInsightV2(conversationalEntry, frame, theme);
  const devotional = generateDevotionalV2(conversationalEntry, frame, theme);
  const article = generateArticleV2(conversationalEntry, frame, theme);
  const shortVideo = generateShortVideoV2(conversationalEntry, frame, theme);
  const longVideo = generateLongVideoV2(conversationalEntry, frame, theme);
  const podcastMoment = generatePodcastMomentV2(conversationalEntry, frame, theme);
  const email = generateEmailV2(conversationalEntry, frame, theme);

  // Step 4: Validate voice on daily letter (primary output)
  const voiceValidation = validateBrotherJimiVoice(dailyLetter);

  // Step 5: Return all outputs
  return {
    dailyLetter,
    socialPost,
    microInsight,
    devotional,
    article,
    shortVideo,
    longVideo,
    podcastMoment,
    email,
    frame,
    conversationalEntry,
    voiceValidation,
  };
}

// ============================================================================
// Format-Specific Generators
// ============================================================================

/**
 * Format 1: Daily Letter (2-3 paragraphs)
 * Opens with conversational entry, frames the message, uses short bold sentences
 */
function generateDailyLetterV2(entry: string, frame: Frame, theme: VoiceTheme): string {
  const frameContext = getFrameContext(frame);
  const { revelation, contrast, coreMessage, examples } = theme;

  const opening = `${entry} ${frameContext}`;

  const body = `${revelation}

This isn't about what you've done. This is about who you're choosing right now.

${contrast}

${coreMessage}`;

  const closing = `${examples[0] ? examples[0] : 'Every choice matters. Every moment is a new chance.'}

The power is yours. Always has been. Always will be.

With faith,
Brother Jimi`;

  return `${opening}\n\n${body}\n\n${closing}`;
}

/**
 * Format 2: Social Post (<280 chars)
 * Hooks with question, delivers revelation, calls to recognition
 */
function generateSocialPostV2(entry: string, _frame: Frame, theme: VoiceTheme): string {
  const { callToIdentity, revelation } = theme;

  const firstLine = entry.split('.')[0];
  const revealTruncated = revelation.substring(0, 100);
  const post = `${firstLine}. ${callToIdentity}\n\n${revealTruncated}...`;

  if (post.length > 280) {
    return `${firstLine}. ${callToIdentity.substring(0, 80)}...`;
  }

  return post;
}

/**
 * Format 3: Micro Insight (1-2 sentences)
 * Pure distillation of frame + revelation
 */
function generateMicroInsightV2(_entry: string, _frame: Frame, theme: VoiceTheme): string {
  const { revelation, coreMessage } = theme;
  return `${revelation} ${coreMessage}`;
}

/**
 * Format 4: Devotional (3-4 sentences)
 * Starts with entry, frames as reflection, meditative but direct
 */
function generateDevotionalV2(entry: string, _frame: Frame, theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, callToIdentity } = theme;

  return `${entry}

${callToIdentity}

${revelation}

${contrast}

The transformation from lie to truth isn't one big moment. It's a thousand small decisions. Every time you choose differently, you're voting for your true self.

${coreMessage} What one choice will you make today?`;
}

/**
 * Format 5: Article (500-800 words)
 * Opens with entry + frame setup, structured sections, natural cadence maintained
 */
function generateArticleV2(entry: string, frame: Frame, theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, examples } = theme;
  const frameDesc = getFrameDescription(frame);

  const header = `# ${entry}\n\n${frameDesc}\n\n`;

  const truthSection = `## The Truth You Need to See\n\n${revelation}

When we look at our lives, we see the evidence of every choice we've made. We see relationships built or destroyed. We see trust earned or broken. We see progress made or patterns we're stuck in.

But here's what most miss: we're not seeing consequences. We're seeing identity.

Every outcome in your life is the result of who you've been choosing to be.\n\n`;

  const contrastSection = `## The Contrast\n\n${contrast}

Most of us have been told a lie so many times we stopped questioning it. The lie is subtle. Seductive. Everywhere.

It whispers: "You can't change. You're stuck. This is who you are."

But that's not who you are. That's who you've been practicing being.\n\n`;

  const examplesSection = examples.length > 0
    ? `## What This Looks Like\n\n${examples.map(ex => `• ${ex}`).join('\n')}\n\n`
    : '';

  const closing = `## Your Choice\n\n${coreMessage}

Transformation isn't something that happens to you. It's something you choose.

You don't get to choose your past. But you get to choose this moment. And the next. And the one after that.

So what will you choose today?`;

  return `${header}${truthSection}${contrastSection}${examplesSection}${closing}`;
}

/**
 * Format 6: Short Video Script (30-60 sec)
 * Conversational entry as opening line, frame informs pacing
 */
function generateShortVideoV2(entry: string, _frame: Frame, theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, callToIdentity } = theme;

  return `[OPENING - 0:00-0:05]
[BROTHER JIMI LOOKS DIRECTLY AT CAMERA]

"${entry}"

[PAUSE]

"${callToIdentity}"

[0:05-0:45]
[TEXT: "Here's the reality:"]

"${revelation}"

[BRIEF PAUSE]

"${contrast}"

[TEXT ON SCREEN: "${coreMessage}"]

[CLOSING - 0:45-0:60]

"What will you choose?"

[TEXT: "@restorationcommunity"]`;
}

/**
 * Format 7: Long Video Script (5-10 min)
 * Conversational entry sets tone, frame guides narrative arc
 */
function generateLongVideoV2(entry: string, _frame: Frame, theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, callToIdentity, examples } = theme;

  return `[LONG VIDEO SCRIPT - 5-10 MINUTES]

========================================
HOOK (0:00-0:30)
========================================
[BROTHER JIMI SITS ON STOOL, DIRECT]

"${entry}

${callToIdentity}

Because how you answer that determines everything about your life."

[PAUSE]

"Stay with me. This will change something."

========================================
REVELATION (0:30-3:00)
========================================
[WALK THROUGH SPACE]

"${revelation}

I want to tell you something that will either free you or make you angry.

${contrast}"

========================================
EXAMPLES (3:00-6:00)
========================================
[SIT DOWN, DELIBERATE]

"Let me show you what this looks like in real life.

${examples.map((ex, i) => `${i + 1}. ${ex}`).join('\n\n')}"

========================================
TRANSFORMATION PATH (6:00-8:00)
========================================
[LOOK DIRECTLY AT CAMERA]

"Here's what you need to know:

Transformation is not one big moment. It's a thousand small decisions.

It's not about getting better. It's about becoming different.

It's not about striving. It's about choosing.

Right now. In this moment.

${coreMessage}"

========================================
CALL TO ACTION (8:00-9:30)
========================================
[STAND, SINCERE]

"So here's my question: Who do you want to become?

And are you willing to choose that person, one decision at a time?

If you're ready, come join us. We're building a community of people who are choosing to become who they're meant to be.

Subscribe. Choose. Transform."

[TEXT: "@restorationcommunity"]`;
}

/**
 * Format 8: Podcast Moment (90-120 sec)
 * Conversational entry, frame as framing device, audio-optimized pacing
 */
function generatePodcastMomentV2(entry: string, _frame: Frame, theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, callToIdentity } = theme;

  return `[PODCAST MOMENT - 90-120 SECONDS]

[INTRO - 0:00-0:15]

"Welcome back. I'm Brother Jimi. Today we're talking about something that might be hard to hear.

${entry}"

[NATURAL PAUSE]

========================================

[CORE - 0:15-0:50]

"${callToIdentity}

${revelation}

${contrast}"

[BREATHING PAUSE - 2 seconds]

========================================

[REFLECTION - 0:50-1:45]

"Most of us have been living inside the lie for so long, we've forgotten there's a truth.

But here's what I know: You don't have to stay there. You can choose differently. Starting right now. Starting with this moment.

${coreMessage}"

[SLIGHT EMOTIONAL LIFT]

[PAUSE - 2-3 seconds]

========================================

[CLOSE - 1:45-2:00]

"If that resonates, if you're ready to have this conversation, reach out.

We're here.

Thanks for listening."

[END THEME MUSIC FADE]`;
}

/**
 * Format 9: Email
 * Subject distills frame + insight
 * Body: entry → development → clear ask
 */
function generateEmailV2(entry: string, frame: Frame, theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, examples } = theme;
  const frameDesc = getFrameDescription(frame);

  const subject = `${frameDesc}: ${revelation.substring(0, 50)}...`;

  const body = `Hello,

I wanted to share something that's been on my mind.

${entry}

${revelation}

Here's what I mean by that.

---

**${contrast}**

Most of us live with the lie for so long that it becomes invisible. We stop questioning it. We just organize our entire lives around it.

But what if it's not true?

${
  examples.length > 0
    ? `What I'm seeing in this community is real transformation:

${examples.map(ex => `• ${ex.substring(0, 100)}${ex.length > 100 ? '...' : ''}`).join('\n')}`
    : 'The examples are quiet. Ordinary people making extraordinary choices.'
}

---

**The Invitation**

${coreMessage}

This isn't about becoming someone else. It's about becoming who you actually are underneath the lies.

It starts with a choice. Then another. Then another.

You're capable of this. I believe in you.

Let's go,

Brother Jimi

---

P.S. — If you're ready to have this conversation deeper, reply to this email. I read every single one.`;

  return `Subject: ${subject}\n\n${body}`;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get frame context — a one-liner that situates the message
 */
function getFrameContext(frame: Frame): string {
  const contexts: Record<Frame, string> = {
    counsel: 'Here\'s what I see happening.',
    advise: 'Here\'s what you need to understand.',
    uplift: 'Here\'s what I know about you.',
    enlighten: 'Here\'s the truth nobody\'s saying.',
    educate: 'Here\'s how this actually works.',
  };
  return contexts[frame];
}

/**
 * Get frame description for use in article headers
 */
function getFrameDescription(frame: Frame): string {
  const descriptions: Record<Frame, string> = {
    counsel: 'Observation: What\'s Actually Happening',
    advise: 'Direction: What You Need to Know',
    uplift: 'Strength: What\'s True About You',
    enlighten: 'Truth: What Others Miss',
    educate: 'Understanding: How This Works',
  };
  return descriptions[frame];
}
