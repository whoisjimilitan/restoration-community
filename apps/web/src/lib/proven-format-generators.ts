/**
 * PROVEN FORMAT GENERATORS
 * Based on field-tested, high-performing prompt patterns
 * Each format has specific structural requirements that work
 */

import type { ExtractedMessage } from './message-extractor';

export interface ProvenOutputs {
  twitterThread: string;
  linkedinPost: string;
  instagramCarousel: string;
  facebookPost: string;
  shortVideoScript: string;
  youtubeOutline: string;
  emailNewsletter: string;
  podcastSummary: string;
  audioClips: string;
  socialCarousel: string;
}

export function generateProvenFormats(msg: ExtractedMessage, fullTranscript: string): ProvenOutputs {
  return {
    twitterThread: generateTwitterThread(msg, fullTranscript),
    linkedinPost: generateLinkedInPost(msg, fullTranscript),
    instagramCarousel: generateInstagramCarousel(msg, fullTranscript),
    facebookPost: generateFacebookPost(msg, fullTranscript),
    shortVideoScript: generateShortVideoScript(msg),
    youtubeOutline: generateYouTubeOutline(msg, fullTranscript),
    emailNewsletter: generateEmailNewsletter(msg, fullTranscript),
    podcastSummary: generatePodcastSummary(msg),
    audioClips: generateAudioClips(msg),
    socialCarousel: generateSocialCarousel(msg),
  };
}

/**
 * TWITTER THREAD (8-10 tweets)
 * Format: Concise, punchy, with emojis and clear progression
 */
function generateTwitterThread(msg: ExtractedMessage, fullTranscript: string): string {
  return `Tweet 1:
${msg.hookFormula.includes('Conviction') ? '❌' : '💡'} Most people misunderstand this fundamental truth about spiritual life. It's not what you think.

Tweet 2:
${msg.coreRevelation}

Tweet 3:
🔑 Here's the mechanism: ${msg.mechanism}

Tweet 4:
The cost of missing this? ${msg.cost}

Tweet 5:
📍 This shows up in your daily life. Every single day.

Tweet 6:
When you understand this, everything shifts.

Tweet 7:
${msg.transformation}

Tweet 8:
🧵 This isn't just theory. This is how actual spiritual breakthrough happens.

Tweet 9:
The question is: Will you apply this today? Or stay stuck?

Tweet 10:
Read the full teaching → [link]

#Faith #Spirituality #Transformation`;
}

/**
 * LINKEDIN POST (150-200 words)
 * Format: Professional, insight-focused, with hashtags and engagement question
 */
function generateLinkedInPost(msg: ExtractedMessage, fullTranscript: string): string {
  return `A misconception many professionals have about spiritual life:

They think it's a one-time decision.

${msg.coreRevelation}.

Here's what actually happens:

${msg.mechanism}

This matters because ${msg.cost}

The transformation available? ${msg.transformation}

For professionals specifically: This applies to your morning routine, your decision-making, your leadership, your peace under pressure.

Most people intellectually agree with this. Few actually live it.

The question for you: Which area of your life needs this shift most?

#Spirituality #Leadership #PersonalGrowth #MentalWellness #Faith`;
}

/**
 * INSTAGRAM CAROUSEL (5-7 captions)
 * Format: Visual tips, short captions, hashtags, overall caption
 */
function generateInstagramCarousel(msg: ExtractedMessage, fullTranscript: string): string {
  return `CAROUSEL SLIDE 1:
🎯 The Lie We Believe
"One decision changed everything"
• That's what we're told
• That's the story we like
• It feels complete
• But it's not how spiritual life actually works

---

SLIDE 2:
✅ The Truth
"Every day is a choice"
• Sunday's decision is reset Monday
• Each morning brings a new choice
• This is where real power lives
• Not in a past moment, but a present one

---

SLIDE 3:
⚡ The Mechanism
"Attention determines everything"
• What you focus on shapes your life
• Your focus shapes your peace
• Your peace shapes your decisions
• Your decisions shape your destiny

---

SLIDE 4:
💔 The Cost
Missing this means:
• Staying spiritually confused
• Wondering why nothing changes
• Feeling divided inside
• Never accessing real freedom

---

SLIDE 5:
🌟 The Transformation
When you get this right:
• Peace becomes independent
• Clarity replaces confusion
• Freedom becomes real
• Change becomes inevitable

---

SLIDE 6:
🔑 Your Next Step
Ask yourself:
"What am I giving my attention to today?"
"Is it moving me toward freedom or away from it?"

---

SLIDE 7:
OVERALL CAPTION:
This is the moment that changes everything. Not the past decision. Not the future promise. The one you make today.

#Spirituality #FaithJourney #PersonalTransformation #DailyChoice #SpiritualGrowth #InnerPeace #Mindfulness #SelfDiscovery`;
}

/**
 * FACEBOOK POST (100-150 words)
 * Format: Attention-grabbing, problem-focused, with emoji and CTA
 */
function generateFacebookPost(msg: ExtractedMessage, fullTranscript: string): string {
  return `💭 You Made A Decision Years Ago

You committed. You believed. You changed.

But something still feels off.

Here's why:

${msg.coreRevelation}.

${msg.mechanism}

Most people never make this connection. They think the initial decision should carry them forward.

It doesn't.

${msg.transformation}

👉 The question: Will you make today's choice consciously? Or will you let it happen by default?

Read the full teaching: [LINK]`;
}

/**
 * SHORT VIDEO SCRIPT (60 seconds, YouTube Shorts/TikTok)
 * Format: Hook, 3 points, visual suggestions, CTA
 */
function generateShortVideoScript(msg: ExtractedMessage): string {
  return `[HOOK - 0-3 seconds]
${msg.hookFormula.includes('Conviction') ? '"Most people get this wrong."' : '"Something I eventually understood."'}

[PAUSE - 1 second of silence]

[POINT 1 - 5-15 seconds]
[ON-SCREEN TEXT: "The Core Truth"]
${msg.coreRevelation}.

[POINT 2 - 15-30 seconds]
[ON-SCREEN TEXT: "How It Works"]
${msg.mechanism}

[POINT 3 - 30-50 seconds]
[ON-SCREEN TEXT: "What Changes"]
${msg.transformation}

[CLOSE - 50-60 seconds]
[ON-SCREEN TEXT: "The Question"]
"Are you ready to live this, or just believe it?"

[VISUAL SUGGESTIONS]
- Start with text overlay on simple background
- Slow pan or zoom for emphasis
- Bold text for key statements
- Minimal music, clear audio

[CTA]
Full teaching in bio 👆`;
}

/**
 * YOUTUBE OUTLINE (5-7 minutes)
 * Format: Title, hook, sections with bullet points, examples, visuals, CTA
 */
function generateYouTubeOutline(msg: ExtractedMessage, fullTranscript: string): string {
  return `TITLE: "${msg.hookFormula.includes('Conviction') ? 'Why Most People Miss This' : 'The Truth About Spiritual Life'}"

INTRO (30 seconds):
- Hook: ${msg.hookFormula.includes('Conviction') ? '"Most believers get this fundamentally wrong"' : '"I spent years misunderstanding this"'}
- What you'll learn: Why your spiritual life feels stuck and how to fix it
- Why it matters: This changes your actual lived experience, not just your beliefs
- Visual: Title card, keep it simple

SECTION 1: The Problem (1:00-1:45)
- Current belief: ${msg.cost}
- Why people feel stuck
- Real-life scenario from teaching
- Visuals: B-roll of daily moments (waking up, deciding, struggling)

SECTION 2: The Revelation (1:45-3:30)
- Core truth: ${msg.coreRevelation}
- Deeper context: ${msg.mechanism}
- Example from real life
- Proof or validation from the teaching
- Visuals: Animated text, diagram showing daily choice

SECTION 3: The Mechanism (3:30-5:00)
- How this actually works in practice
- Step-by-step breakdown
- Real consequences when understood
- Visuals: Screen recording of concept, simple graphics

SECTION 4: The Transformation (5:00-6:15)
- What changes when you apply this
- Specific life benefits
- Story or testimony
- Visuals: Montage of "before/after"

CLOSE (6:15-7:00)
- Call to action: Subscribe, visit website, read full teaching
- Visual: End screen with buttons`;
}

/**
 * EMAIL NEWSLETTER (200-300 words)
 * Format: Subject line, story opening, key points, CTA
 */
function generateEmailNewsletter(msg: ExtractedMessage, fullTranscript: string): string {
  return `SUBJECT: ${msg.hookFormula.includes('Conviction') ? 'Most people get this wrong' : 'The truth about spiritual life'}

---

Hi there,

I wanted to share something that's been on my mind.

For years, I thought spiritual breakthrough happened once. The prayer. The altar. The moment everything changed.

But then I realized something.

${msg.coreRevelation}.

Here's why this matters:

${msg.mechanism}

Most people never make this connection. They wonder why their spiritual life feels stuck, why they keep repeating the same patterns, why nothing seems to change.

It's not because the initial decision wasn't real.

It's because they haven't understood this daily piece.

When you get this right:

${msg.transformation}

Not eventually. Not someday.

Now. Today. In your actual life.

The question I want to leave you with: Are you giving your attention to what matters? Or are you letting it drift by default?

That's the real moment.

[LINK TO FULL TEACHING]

What are your thoughts?

Best,
[Your name]`;
}

/**
 * PODCAST SUMMARY (150-200 words)
 * Format: Episode description, key takeaways, title suggestion
 */
function generatePodcastSummary(msg: ExtractedMessage): string {
  return `EPISODE TITLE:
"Why Daily Choice Matters More Than Initial Commitment"

EPISODE DESCRIPTION:
In this episode, we explore a fundamental misunderstanding that keeps many believers stuck: the belief that spiritual life is determined by a single decision. We dive deep into why this thinking fails, what actually creates transformation, and how to apply this truth starting today. Perfect for anyone who's ever wondered why their spiritual life doesn't match their intentions.

KEY TAKEAWAYS:
1. Spiritual breakthrough is not a one-time event—it's a daily practice
2. The mechanism of real change is attention: what you focus on determines your life
3. Every morning brings a fresh choice, and that choice matters more than past decisions
4. Transformation happens in the small, invisible moments
5. Peace becomes possible only when you stop waiting for it and start choosing it

WHO SHOULD LISTEN:
Anyone feeling stuck in their spiritual journey, professionals seeking authentic growth, people wondering why their faith isn't translating to real life change.`;
}

/**
 * AUDIO CLIPS/SOUNDBITES (5 clips, under 60 seconds each)
 * Format: Exact text, suggested context, standalone appeal
 */
function generateAudioClips(msg: ExtractedMessage): string {
  return `CLIP 1 - "The Core Insight"
TEXT: "${msg.coreRevelation}"
CONTEXT: Opening hook for social media audio
USE: TikTok, Instagram Reels audio clip, podcast teaser

---

CLIP 2 - "The Mechanism"
TEXT: "${msg.mechanism}"
CONTEXT: Explaining how change actually works
USE: LinkedIn audio post, podcast highlight

---

CLIP 3 - "The Cost"
TEXT: "${msg.cost}"
CONTEXT: Wake-up call for listeners
USE: Podcast teaser, standalone short-form

---

CLIP 4 - "The Transformation"
TEXT: "${msg.transformation}"
CONTEXT: Inspiring outcome when understood
USE: Instagram Stories audio, motivation content

---

CLIP 5 - "The Challenge"
TEXT: "The question is not whether you believe this. The question is: will you live it today?"
CONTEXT: Personal challenge to listeners
USE: Call-to-action audio, podcast close`;
}

/**
 * SOCIAL CAROUSEL (7 slides)
 * Format: One key tip per slide, headlines, bullet points
 */
function generateSocialCarousel(msg: ExtractedMessage): string {
  return `SLIDE 1 - THE PROBLEM
Headline: "The Lie We Believe"
• One decision changes everything
• After that, it should be automatic
• But nothing changes
• We're confused why

---

SLIDE 2 - THE TRUTH
Headline: "What Actually Happens"
${msg.coreRevelation}

---

SLIDE 3 - THE MECHANISM
Headline: "How It Works"
${msg.mechanism}

---

SLIDE 4 - THE COST
Headline: "If You Miss This"
${msg.cost}

---

SLIDE 5 - THE DAILY REALITY
Headline: "The Real Moment"
• It's not the past decision
• It's today's choice
• Every single day
• That's where power lives

---

SLIDE 6 - THE TRANSFORMATION
Headline: "What Changes"
${msg.transformation}

---

SLIDE 7 - YOUR ACTION
Headline: "The Question for You"
"What am I giving my attention to today?"
That answer changes everything.`;
}
