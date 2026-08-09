/**
 * Content Generation Pipeline (Task 4)
 *
 * Takes a VoiceTheme and generates all 9 output formats:
 * 1. Daily Letter
 * 2. Social Post
 * 3. Micro Insight
 * 4. Devotional
 * 5. Article Excerpt
 * 6. Short Video Script
 * 7. Long Video Script
 * 8. Podcast Moment
 * 9. Email (subject + body)
 *
 * Each format maintains Brother Jimi's authentic prophetic voice
 * and centers on the identity choice being made.
 */

import { VoiceTheme } from "./voice-extraction";

export interface ContentOutputs {
  dailyLetter: string; // 2-3 paragraphs + signature
  socialPost: string; // 140-280 chars, viral-ready
  microInsight: string; // 1-2 sentences, quotable
  devotional: string; // 3-4 sentences, reflective
  articleExcerpt: string; // 500-800 words, deep
  shortVideoScript: string; // 30-60 sec (TikTok/Reels)
  longVideoScript: string; // 5-10 min (YouTube)
  podcastMoment: string; // 90-120 sec audio clip
  email: {
    subject: string; // Email subject line
    body: string; // Email body (newsletter)
  };
}

/**
 * Generate Daily Letter (2-3 paragraphs + signature)
 *
 * Structure: question → revelation → contrast → closing signature
 * Tone: Personal, pastoral, conversational
 * Length: 200-300 words
 */
function generateDailyLetter(theme: VoiceTheme): string {
  const { callToIdentity, revelation, contrast, examples } = theme;
  const firstExample = examples[0] || "This truth will reshape your understanding.";

  return `Dear Friend,

${callToIdentity}

${revelation} This is not a small thing. This is the foundation of everything you're about to become.

${contrast} This matters because your identity is being formed right now, in this very moment. ${firstExample}

Here's what I know to be true: The person you're choosing to be is more powerful than the circumstances around you. The lie whispers that you're stuck, but the truth is louder.

Step into who you're being called to be.

In His grip,
Brother Jimi`;
}

/**
 * Generate Social Post (140-280 chars, viral-ready)
 *
 * Structure: Identity question + revelation + CTA
 * Tone: Punchy, direct, quotable
 * Length: ≤280 characters
 */
function generateSocialPost(theme: VoiceTheme): string {
  const { callToIdentity, revelation } = theme;
  // Extract the core question (e.g., "Are you TRUTH or LIES?")
  const questionCore = callToIdentity.split("?")[0] + "?";

  const post = `${questionCore}\n\n${revelation}\n\nYou're not choosing this circumstance. You're choosing who you become inside it.`;

  // Ensure it fits within 280 chars
  if (post.length > 280) {
    return `${questionCore}\n\n${revelation.substring(0, 100)}...\n\nChoose yourself.`;
  }

  return post;
}

/**
 * Generate Micro Insight (1-2 sentences, quotable)
 *
 * Structure: Core truth in quotable format
 * Tone: Poetic, memorable, shareable
 * Length: 1-2 sentences
 */
function generateMicroInsight(theme: VoiceTheme): string {
  const { revelation } = theme;
  return `"${revelation} This changes everything when you believe it about yourself."`;
}

/**
 * Generate Devotional (3-4 sentences, reflective)
 *
 * Structure: Truth → Contrast → Challenge
 * Tone: Thoughtful, introspective, encouraging
 * Length: 3-4 sentences
 */
function generateDevotional(theme: VoiceTheme): string {
  const { revelation, contrast, examples } = theme;
  const firstExample = examples[0] || "This shift happens when you choose differently.";

  return `${revelation} The lie says you have no choice, but that's the deception talking. ${contrast.split("The truth: ")[1] || "You are choosing a different path."} ${firstExample}`;
}

/**
 * Generate Article Excerpt (500-800 words, deep)
 *
 * Structure: Title → Truth → Contrast → Application → Closing
 * Tone: Pastoral, theological, practical
 * Format: Markdown with headers
 */
function generateArticleExcerpt(theme: VoiceTheme): string {
  const { identity, revelation, contrast, examples, scriptural } = theme;
  const header = identity.label;
  const firstExample = examples[0] || "";
  const secondExample = examples[1] || "";
  const thirdExample = examples[2] || "";

  return `# ${header}

## The Truth You Need to See

${revelation}

This is not rhetorical. This is not inspirational fluff meant to make you feel better for a moment. This is the axis around which your entire life rotates.

When you believe this about yourself, everything changes. Not your circumstances—those may stay exactly the same. What changes is how you respond. What transforms is who you are *becoming* in the middle of it.

## The Lie You've Been Believing

${contrast}

The lie is insidious because it sounds reasonable. It whispers that you're helpless. It tells you that your past determines your future. It convinces you that one failure means you're a failure.

But here's what's true: You are not the sum of your mistakes. You are not defined by what was done to you. You are not determined by what you've already chosen.

## What This Actually Means

${firstExample}

${secondExample}

${thirdExample || "Every single day, you get to choose again. Not through willpower. Not through positive thinking. Through repentance. Through turning. Through identifying who you actually want to be and then being that person."}

## The Invitation

This is not a suggestion. This is an invitation to your own freedom.

The person you're becoming is already calling to you. Not tomorrow. Not when circumstances change. Right now.

${scriptural ? `\n> ${scriptural}\n` : ""}

What choice are you making today?`;
}

/**
 * Generate Short Video Script (30-60 sec, TikTok/Reels)
 *
 * Structure: Hook → Revelation → Contrast → CTA
 * Tone: Direct, conversational, urgent
 * Format: Timestamped with on-screen text notes
 */
function generateShortVideoScript(theme: VoiceTheme): string {
  const { callToIdentity, revelation, contrast } = theme;
  const question = callToIdentity.split("?")[0];

  return `[0:00-0:05] HOOK
[TEXT ON SCREEN: "${question}"]
[BROTHER JIMI, looking directly at camera]
"This question might change everything."

[0:05-0:20] REVELATION
"${revelation}"
[TEXT ON SCREEN: "The Revelation"]

[0:20-0:40] CONTRAST
"The lie is that you're stuck. But the truth?
${contrast.split("The truth: ")[1] || "You're becoming someone new right now."}"
[TEXT ON SCREEN: "You get to choose."]

[0:40-0:60] CTA
"So here's what I want you to do: Right now, in this moment—not tomorrow, not when things change—choose.
[TEXT ON SCREEN: "Choose yourself."]
What are you choosing to believe about who you are?"

[END]`;
}

/**
 * Generate Long Video Script (5-10 min, YouTube)
 *
 * Structure: Hook → Setup → Story → Contrast → Application → CTA → Closing
 * Tone: Teaching, pastoral, deep
 * Format: Detailed scene notes with timing
 */
function generateLongVideoScript(theme: VoiceTheme): string {
  const { identity, revelation, contrast, examples, callToIdentity, scriptural } = theme;
  const firstExample = examples[0] || "";
  const secondExample = examples[1] || "";
  const thirdExample = examples[2] || "";

  return `# ${identity.label} — Full Teaching

## [0:00-1:00] HOOK & INTRO

[BROTHER JIMI in study setting, warm lighting]

"If you've been wondering whether change is actually possible for you, this teaching is designed for that exact question. We're going to look at what it means to step out of the lie you've been living and into who you're actually choosing to be.

[TEXT ON SCREEN: "${callToIdentity}"]

Stay with me."

## [1:00-3:00] SETUP & CONTEXT

[Walking through simple set]

"For years, people asked me the same question. They'd say, 'Brother Jimi, how do I know if I'm really changing? How do I know if this is real?' And every single time, I realized they were asking the wrong question.

They weren't asking 'Am I changing?' They were really asking, 'Who am I choosing to be?'

${revelation}

That's not just a statement. That's a declaration about identity."

## [3:00-5:30] REVELATION & TEACHING

[Sitting, engaged teaching posture]

"Here's what most people miss: ${firstExample}

${secondExample}

${thirdExample || "This is why the lie is so dangerous. It convinces you that you're a victim of your circumstances rather than the author of your response to them."}

[TEXT ON SCREEN: Breaking down the concept]

When you understand this, everything shifts. Not because your situation changes. Because *you* change how you show up inside your situation."

## [5:30-7:00] THE CONTRAST

[Leaning forward, direct]

"Let me be clear about what's happening. ${contrast}

The person you're becoming is completely incompatible with the life you've been living. That's not a problem. That's actually good news.

[TEXT ON SCREEN: "The lie vs. The truth"]

Because it means you don't have to stay where you are. You don't have to believe what you've been believing. You don't have to keep choosing what you've been choosing."

## [7:00-8:30] SCRIPTURAL GROUNDING & APPLICATION

[Holding Bible or speaking from memory]

${scriptural ? `"${scriptural}\n\n` : ""}

Now let me tell you what this means practically. In your marriage—it means you show up as the person you're choosing to be, not as the wounded version of yourself.

In your work—it means you work with integrity, not bitterness.

In your relationships—it means you pursue reconciliation, not isolation.

In your own heart—it means you forgive, not fester in resentment."

## [8:30-9:30] CALL TO IDENTITY & CTA

[Direct to camera]

"So here's what I'm asking you to do: Don't wait. Don't think about it tomorrow. Don't say 'I'll start next week.'

Right now—in this moment—choose.

${callToIdentity}

And if you're ready to go deeper with this, if you want to understand how this identity choice transforms every area of your life, comment below. Let me know you're in. Let me know you're choosing."

## [9:30-10:00] CLOSING

[Warm, pastoral tone]

"You're not choosing this circumstance. But you are choosing who you become inside it. And that person—the one you're becoming—that person is more powerful than anything against you.

I'll see you next time."

[END]`;
}

/**
 * Generate Podcast Moment (90-120 sec audio clip)
 *
 * Structure: Dialogue-style scripted content
 * Tone: Conversational, intimate, audio-natural
 * Format: Speaker labels + natural conversation
 */
function generatePodcastMoment(theme: VoiceTheme): string {
  const { revelation, contrast, callToIdentity, examples } = theme;
  const firstExample = examples[0] || "This changes when you choose differently.";

  return `# Podcast Moment - 90-120 Seconds

BROTHER JIMI:
"I want to ask you something, and I want you to actually sit with this. ${callToIdentity}

Because here's what I know: ${revelation}

[Brief pause for impact]

The lie sounds so reasonable, right? It says you're stuck. It says your past is your future. It says one failure means you're a failure. But that's not the truth."

[Natural pause - let listeners sit]

BROTHER JIMI (continuing):
"The truth is this: ${contrast.split("The truth: ")[1] || "You're not determined by your circumstances."} ${firstExample}

This isn't about positive thinking. This isn't about ignoring reality. This is about recognizing that you have a choice in who you become—even when you don't have a choice about what's happening around you.

[Slight pause]

So I'm asking you: Are you going to keep believing the lie? Or are you going to step into who you're actually choosing to be?

Because the person you're becoming is already calling. The question is—are you listening?"

[END - ~110 seconds when read naturally]`;
}

/**
 * Generate Email (subject + body in newsletter format)
 *
 * Structure: Subject + warm greeting + truth + challenge + signature
 * Tone: Personal, pastoral, invitational
 * Format: Plain text email with P.S.
 */
function generateEmail(theme: VoiceTheme): { subject: string; body: string } {
  const { revelation, contrast, callToIdentity, examples, identity } = theme;
  const firstExample = examples[0] || "";

  const subject = `Here's who you're choosing to be — ${identity.label}`;

  const body = `Hello Friend,

I've been thinking about something, and I wanted to write to you about it.

${revelation}

This might sound simple, but I want you to really sit with this. Because what it means is that you're not as stuck as you think you are. You're not as defined by your past as the lie tells you. You're not as powerless as it feels.

${contrast}

Here's what changed for me: ${firstExample}

${examples[1] || "I realized that I wasn't responsible for my circumstances, but I was completely responsible for who I became inside them."}

The invitation right now is simple: ${callToIdentity}

This isn't a question for tomorrow. This isn't something you think about and come back to. This is for right now. In this moment. Who are you choosing?

I'd love to hear about it. Reply to this email and tell me—what identity are you stepping into? What lie are you refusing to believe anymore?

You're not alone in this.

In His grip,
Brother Jimi

P.S. — The person you're becoming is more powerful than anything against you. Believe it. And then live like you believe it.`;

  return { subject, body };
}

/**
 * Main generator: Produce all 9 output formats from a VoiceTheme
 *
 * @param theme - The VoiceTheme (output from Task 3)
 * @returns ContentOutputs with all 9 formats
 */
export function generateAllOutputs(theme: VoiceTheme): ContentOutputs {
  return {
    dailyLetter: generateDailyLetter(theme),
    socialPost: generateSocialPost(theme),
    microInsight: generateMicroInsight(theme),
    devotional: generateDevotional(theme),
    articleExcerpt: generateArticleExcerpt(theme),
    shortVideoScript: generateShortVideoScript(theme),
    longVideoScript: generateLongVideoScript(theme),
    podcastMoment: generatePodcastMoment(theme),
    email: generateEmail(theme)
  };
}

/**
 * Individual export functions for granular usage
 * (Useful if you want to generate just one format)
 */
export const formatters = {
  generateDailyLetter,
  generateSocialPost,
  generateMicroInsight,
  generateDevotional,
  generateArticleExcerpt,
  generateShortVideoScript,
  generateLongVideoScript,
  generatePodcastMoment,
  generateEmail
};
