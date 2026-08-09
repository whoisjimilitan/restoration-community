/**
 * MASTERPROMPT-INTEGRATED FORMATS
 * Proven format structures + Graham/Kane/Clara standards
 * - Correct, Precise, Novel, Useful, Deliverable
 * - Hook that challenges assumptions
 * - Verbatim wisdom preserved
 * - Specific proof
 * - Emotional high + action call
 * - Loop question for reflection
 */

import type { ExtractedMessage } from './message-extractor';

export interface MasterpromptOutputs {
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

export function generateMasterpromptFormats(msg: ExtractedMessage, fullTranscript: string): MasterpromptOutputs {
  return {
    twitterThread: twitterThread(msg),
    linkedinPost: linkedinPost(msg),
    instagramCarousel: instagramCarousel(msg),
    facebookPost: facebookPost(msg),
    shortVideoScript: shortVideoScript(msg),
    youtubeOutline: youtubeOutline(msg),
    emailNewsletter: emailNewsletter(msg),
    podcastSummary: podcastSummary(msg),
    audioClips: audioClips(msg),
    socialCarousel: socialCarousel(msg),
  };
}

function twitterThread(msg: ExtractedMessage): string {
  return `Tweet 1:
Most people think one decision changes everything. That's the lie.

Tweet 2:
${msg.coreRevelation}.

Tweet 3:
Here's what actually happens: ${msg.mechanism}

Tweet 4:
If you miss this, you stay in a loop. Same patterns. Same confusion. Different calendar.

Tweet 5:
You already know this intellectually. The question is whether you're living it.

Tweet 6:
Every morning brings a choice. Sunday's decision means nothing on Monday at dawn.

Tweet 7:
That's not depressing. That's liberating. Power isn't in a past moment. It's in the next one.

Tweet 8:
When you understand this, ${msg.transformation}

Tweet 9:
Not as theory. As lived reality.

Tweet 10:
What are you actually choosing today? That's the only decision that matters.

#Faith #Transformation #DailyChoice`;
}

function linkedinPost(msg: ExtractedMessage): string {
  return `A belief I held for years turned out to be incomplete.

I thought spiritual growth was determined by a single decision. The prayer. The commitment. The moment everything changes.

But that's not how it works.

${msg.coreRevelation}.

Here's why this matters professionally: You can't lead from a foundation you're not actively maintaining. Leadership, faith, integrity—these aren't inherited from past choices. They're chosen daily.

${msg.mechanism}

Most professionals understand this intellectually. Few live it consistently. The gap between what you believe and what you practice creates friction, confusion, and wasted energy.

${msg.transformation}

The question isn't what you decided years ago. The question is what you're deciding today—in the moments when no one's watching, when you're tired, when the easier path is available.

That choice determines everything.

#Leadership #PersonalGrowth #Integrity #Authenticity #Faith`;
}

function instagramCarousel(msg: ExtractedMessage): string {
  return `SLIDE 1 - THE ASSUMPTION
Headline: "One Decision Changes Everything"
• We're taught this is enough
• We build our faith on this
• Then we wonder why nothing changes
• One moment can't carry you

---

SLIDE 2 - THE REALITY
Headline: "${msg.coreRevelation}"
Nothing more needed. This is the revelation.

---

SLIDE 3 - HOW IT WORKS
Headline: "The Mechanism"
${msg.mechanism}

This is the part nobody talks about.

---

SLIDE 4 - THE COST
Headline: "If You Don't Understand This"
${msg.cost}

Stuck. Confused. Wondering why faith isn't working.

---

SLIDE 5 - THE DAILY CHOICE
Headline: "Every Morning Is New"
• Yesterday's decision doesn't matter
• Today's choice is everything
• This is where power lives
• Not in the past. In the now.

---

SLIDE 6 - THE FREEDOM
Headline: "What Changes"
${msg.transformation}

Not eventually. Now.

---

SLIDE 7 - YOUR QUESTION
Headline: "The Only Decision That Matters"
What are you choosing today?

#Faith #DailyChoice #Transformation #Spirituality #Growth #Authenticity #Trust`;
}

function facebookPost(msg: ExtractedMessage): string {
  return `You made a commitment years ago. You meant it.

But something still feels off.

Here's what nobody tells you: ${msg.coreRevelation}.

${msg.mechanism}

Most people feel stuck here. They wonder why their faith isn't translating to actual change. They keep waiting for that past decision to carry them forward.

It can't.

${msg.transformation}

The question isn't what you decided years ago. The question is what you're deciding today.

Read the full teaching: [LINK]`;
}

function shortVideoScript(msg: ExtractedMessage): string {
  return `[OPEN - 0-2 seconds]
[ON-SCREEN TEXT: "The Assumption"]
Most people think one decision changes everything.

[PAUSE - 1 second]

[REVEAL - 2-8 seconds]
[ON-SCREEN TEXT: "The Truth"]
${msg.coreRevelation}.

[PROOF - 8-15 seconds]
[ON-SCREEN TEXT: "How It Works"]
${msg.mechanism}

[TRANSFORMATION - 15-25 seconds]
[ON-SCREEN TEXT: "What Changes"]
${msg.transformation}

[CLOSE - 25-30 seconds]
[ON-SCREEN TEXT: "Your Question"]
What are you choosing today?

[VISUAL NOTES]
- Keep backgrounds minimal and clean
- Text appears one line at a time
- No music—just natural speaking voice
- Natural eye contact with camera`;
}

function youtubeOutline(msg: ExtractedMessage): string {
  return `TITLE: "Why Your Faith Feels Stuck (And How to Fix It)"

INTRO (45 seconds):
Hook: "${msg.hookFormula.includes('Conviction') ? 'Most believers misunderstand how spiritual growth actually works.' : 'I spent years getting this wrong.'}"
What you'll learn: The single mechanism that determines whether your faith translates to actual change
Why it matters: This isn't theory—it's about whether your daily reality matches your beliefs
Visual: Simple title, direct eye contact

SECTION 1: THE ASSUMPTION (1:30-3:00)
Setup: We're taught that one decision changes everything
Reality: That belief leaves most people confused
The problem: ${msg.cost}
Visual: Footage of daily moments (waking up, choosing, struggling)
Proof: Real-life examples from the teaching

SECTION 2: THE REVELATION (3:00-5:00)
Statement: ${msg.coreRevelation}
Mechanism: ${msg.mechanism}
Why it's true: Because this is how choice actually works
Visual: Animated explanation of daily choice
Real consequence: What changes when you understand this

SECTION 3: THE TRANSFORMATION (5:00-6:30)
What becomes possible: ${msg.transformation}
Not as promise. As mechanism.
How to apply: The specific daily practice
Visual: Before/after scenarios
Personal witness: Your own experience with this

CLOSE (6:30-7:00):
Call to action: Think about your own choices this week
Subscribe: For more on how faith translates to daily life
Visual: End screen with subscription button`;
}

function emailNewsletter(msg: ExtractedMessage): string {
  return `SUBJECT: The Single Thing That Determines Whether Your Faith Works

---

Hi there,

I want to share something that shifted how I understand spiritual life.

For years, I thought breakthrough was determined by a single moment. The prayer. The commitment. That was supposed to carry me.

But it didn't. And I couldn't figure out why.

Then I realized: ${msg.coreRevelation}.

${msg.mechanism}

Most people intellectually accept this. Few actually live it.

The cost is real: ${msg.cost}

But here's what's possible when you do understand it:

${msg.transformation}

Not as a promise. As a mechanism.

Not eventually. Starting today.

The question I'm sitting with, and I think you might be too:

What are you actually choosing today?

Not what you decided years ago.

Not what you believe intellectually.

What are you choosing right now?

That's the only thing that determines whether your faith works.

Reply with your thoughts. I'd like to know what you're seeing.

Best,
[Name]`;
}

function podcastSummary(msg: ExtractedMessage): string {
  return `EPISODE TITLE:
"Why One Decision Isn't Enough"

EPISODE DESCRIPTION (150-200 words):
You made a commitment to your faith years ago. You meant it completely. So why doesn't your daily life feel transformed?

In this episode, we explore the single mechanism that determines whether your spiritual commitment actually translates to change. We look at why most believers feel stuck, what actually creates transformation, and how to make this shift practical in your daily life.

This isn't theory about faith. This is about how choice actually works—and why understanding this changes everything.

Perfect for anyone who's ever wondered why their beliefs and their life don't quite match up.

KEY TAKEAWAYS:
1. One decision cannot carry you forward—daily choice is what matters
2. ${msg.mechanism}
3. ${msg.transformation}
4. Spiritual growth is determined by what you choose today, not what you believed yesterday
5. This shift turns faith from abstract to practical

WHO SHOULD LISTEN:
Anyone serious about their faith actually working in daily life. Anyone feeling the gap between what they believe and how they live.`;
}

function audioClips(msg: ExtractedMessage): string {
  return `CLIP 1 - THE CORE INSIGHT
TEXT: "${msg.coreRevelation}"
CONTEXT: The revelation that changes everything
USE: Podcast opener, social media audio, story-driven intro

---

CLIP 2 - THE MECHANISM
TEXT: "${msg.mechanism}"
CONTEXT: How change actually works in daily life
USE: Mid-episode explanation, insight reinforcement

---

CLIP 3 - THE COST
TEXT: "${msg.cost}"
CONTEXT: Why this matters and what's at stake
USE: Wake-up call, consequence reveal

---

CLIP 4 - THE TRANSFORMATION
TEXT: "${msg.transformation}"
CONTEXT: What becomes possible when understood
USE: Inspiring close, future-focused moment

---

CLIP 5 - THE QUESTION
TEXT: "What are you actually choosing today? That's the only decision that matters."
CONTEXT: Personal reflection challenge
USE: Episode close, call to personal action`;
}

function socialCarousel(msg: ExtractedMessage): string {
  return `SLIDE 1
Headline: "The Belief Most People Hold"
• One decision changed everything
• That moment should carry me
• So why do I still feel stuck?

---

SLIDE 2
Headline: "The Truth"
${msg.coreRevelation}

---

SLIDE 3
Headline: "How It Actually Works"
${msg.mechanism}

---

SLIDE 4
Headline: "Why Most People Miss This"
They're waiting for the past to carry them.
It can't.

---

SLIDE 5
Headline: "The Daily Reality"
• Every morning is a new choice
• Yesterday's decision means nothing
• Today's choice determines everything

---

SLIDE 6
Headline: "What Becomes Possible"
${msg.transformation}

---

SLIDE 7
Headline: "Your Question"
What are you choosing today?

That's the only thing that matters.`;
}
