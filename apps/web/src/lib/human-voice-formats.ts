/**
 * HUMAN VOICE FORMATS
 * Uses digested teaching + verbatim preservation + Human Writing OS
 * Every format prioritizes your actual voice and reasoning
 */

import type { DigestedTeaching } from './teaching-digester';
import { filterThroughHumanOS } from './human-writing-os';

export interface HumanVoiceOutputs {
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

export function generateHumanVoiceFormats(
  teaching: DigestedTeaching
): HumanVoiceOutputs {
  return {
    twitterThread: generateTwitterThread(teaching),
    linkedinPost: generateLinkedInPost(teaching),
    instagramCarousel: generateInstagramCarousel(teaching),
    facebookPost: generateFacebookPost(teaching),
    shortVideoScript: generateShortVideoScript(teaching),
    youtubeOutline: generateYouTubeOutline(teaching),
    emailNewsletter: generateEmailNewsletter(teaching),
    podcastSummary: generatePodcastSummary(teaching),
    audioClips: generateAudioClips(teaching),
    socialCarousel: generateSocialCarousel(teaching),
  };
}

function generateTwitterThread(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
Tweet 1:
Most people miss this about how change actually works.

Tweet 2:
${verbatim}

Tweet 3:
Here's the mechanism. ${teaching.mechanism}

Tweet 4:
The cost if you don't see it: ${teaching.cost}

Tweet 5:
Every single day this choice shows up. Not in theory. In your actual life.

Tweet 6:
Sunday's decision can't carry you to Monday. That's not pessimism. That's how it works.

Tweet 7:
Power doesn't live in the past moment. It lives in the one you're making right now.

Tweet 8:
What becomes possible when you understand this? ${teaching.transformation}

Tweet 9:
Not as motivation. As lived reality.

Tweet 10:
What are you choosing today?
  `);
}

function generateLinkedInPost(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  const text = `I had this wrong for years.

I thought spiritual breakthrough was a single moment. The prayer. The commitment. That should carry you.

But here's what I realized: ${verbatim}

Here's how it actually works: ${teaching.mechanism}

Why this matters for how you lead: You can't build anything on a foundation you're not actively choosing every day. Leadership, integrity, peace—these aren't inherited from past moments. They're decided in the present.

Most people I know understand this intellectually. They nod. They agree. But living it is different.

The cost if you don't see this: ${teaching.cost}

When you actually understand it though? ${teaching.transformation}

The question isn't what you committed to years ago. The question is what you're choosing right now—in the moments when nobody's watching, when you're tired, when the easier path is available.

That choice determines everything.`;

  return filterThroughHumanOS(text);
}

function generateInstagramCarousel(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
SLIDE 1
The Assumption
We're taught one decision changes everything. That should be enough.

Then we wonder why it isn't.

---

SLIDE 2
The Revelation
${verbatim}

---

SLIDE 3
How It Actually Works
${teaching.mechanism}

This is what most people miss.

---

SLIDE 4
The Cost
If you don't understand this:
${teaching.cost}

---

SLIDE 5
The Daily Reality
Every morning brings the same choice.
Not "did I decide once?"
But "am I choosing now?"

That's where power actually lives.

---

SLIDE 6
What Becomes Possible
${teaching.transformation}

Not eventually. Starting today.

---

SLIDE 7
Your Question
What are you choosing today?

That's the only decision that matters.
  `);
}

function generateFacebookPost(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
You made a commitment to your faith. You meant it completely.

So why doesn't your daily life feel transformed?

Here's what I learned: ${verbatim}

${teaching.mechanism}

Most people feel stuck here. They made the decision. They said yes. They meant it.

But they're wondering why the transformation hasn't automatically followed.

It hasn't because transformation doesn't work on autopilot.

${teaching.cost}

But here's what's possible when you understand this: ${teaching.transformation}

Not someday. Starting right now.

The question isn't whether you decided years ago. The question is what you're deciding today.
  `);
}

function generateShortVideoScript(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
[OPEN - 0-2 seconds]
[Direct eye contact]
Most people get this completely wrong.

[PAUSE - 1 second]

[REVEAL - 2-8 seconds]
[Lean in slightly]
${verbatim}

[MECHANISM - 8-15 seconds]
[Slow, deliberate]
${teaching.mechanism}

This is where real transformation happens. Not in the memory of a past moment. In the choice you're making right now.

[TRANSFORMATION - 15-25 seconds]
[On camera, speaking plainly]
When you understand this, ${teaching.transformation}

[CLOSE - 25-30 seconds]
[Direct address]
What are you choosing today?

[VISUAL NOTES]
Keep backgrounds simple. No distracting graphics.
Your face and words are enough.
Natural speaking. No performance.
  `);
}

function generateYouTubeOutline(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
TITLE: "Why Your Faith Feels Stuck (And What Actually Changes It)"

INTRO (45 seconds):
Hook: "I spent years getting this wrong."
What you'll learn: The single thing that determines whether your faith translates to actual change
Why it matters: This isn't abstract theology. This is about your daily life matching your beliefs.

SECTION 1: THE PROBLEM (1:30-3:00)
Current belief: One decision is enough
Reality: Most believers feel stuck
Why: ${teaching.cost}

Real-life moment: Show the gap between Sunday belief and Monday morning
Visuals: Footage of daily moments (waking up, choosing, struggling)

SECTION 2: THE REVELATION (3:00-5:00)
Central insight: ${verbatim}

Deeper understanding: ${teaching.mechanism}

Why it's true: Walk through the logic. Show your reasoning.
Proof: Examples from real life

Visuals: Simple graphics showing the difference between "one-time decision" thinking and "daily choice" reality

SECTION 3: THE TRANSFORMATION (5:00-6:30)
What becomes possible: ${teaching.transformation}

Not as promise. As mechanism.

How to apply it: The specific daily practice
Real consequence: What you'll notice changing

Visuals: Before/after scenarios or personal witness

CLOSE (6:30-7:00):
Don't just ask for a subscribe.
Ask for application. "What choice are you going to make differently this week?"
End with the question, not the pitch.
  `);
}

function generateEmailNewsletter(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
SUBJECT LINE: I got this wrong for years

---

Hi there,

I want to share something that shifted how I understand spiritual life.

For a long time, I thought breakthrough was determined by a single moment. The prayer. The commitment. The decision. That was supposed to carry everything forward.

But it didn't.

Then I realized: ${verbatim}

${teaching.mechanism}

I think most people get this. Intellectually, it makes sense. But living it is different.

The cost of not understanding this is real: ${teaching.cost}

But here's what's possible when you do understand it:

${teaching.transformation}

Not as motivation. As actual lived reality.

Not eventually. Starting today.

The question I keep sitting with is this: What are you actually choosing today? Not what you decided years ago. Not what you intellectually believe. What are you choosing right now?

That answer changes everything.

I'd like to know what you're seeing.

Best,
[Your name]
  `);
}

function generatePodcastSummary(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
EPISODE TITLE:
"Why One Decision Isn't Enough"

EPISODE DESCRIPTION:
You made a commitment to your faith. You meant it. So why doesn't your life feel transformed?

In this episode, we explore the mechanism that most believers miss: the understanding that spiritual breakthrough isn't a one-time event. It's a daily choice. We walk through what's actually at stake, how change actually works, and what becomes possible when you understand this.

This isn't theory. This is about the gap between what you believe on Sunday and what you actually live on Monday morning.

KEY TAKEAWAYS:
1. One decision cannot carry you forward. Daily choice is what determines transformation.
2. ${teaching.mechanism}
3. ${teaching.cost}
4. ${teaching.transformation}
5. Power doesn't live in the past. It lives in the choice you're making right now.

WHO SHOULD LISTEN:
Anyone who's ever wondered why their faith isn't translating to actual change. Anyone feeling the gap between their beliefs and their life. Anyone serious about living what they say they believe.
  `);
}

function generateAudioClips(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
CLIP 1: THE CORE INSIGHT
"${verbatim}"
CONTEXT: The revelation that changes everything
USE: Podcast opening, social audio, story opener

---

CLIP 2: THE MECHANISM
"${teaching.mechanism}"
CONTEXT: How change actually works
USE: Mid-episode insight, reinforcement

---

CLIP 3: THE COST
"${teaching.cost}"
CONTEXT: What's at stake if you don't understand this
USE: Wake-up call, consequence moment

---

CLIP 4: THE TRANSFORMATION
"${teaching.transformation}"
CONTEXT: What becomes possible
USE: Inspiring close, future-focused moment

---

CLIP 5: THE QUESTION
"What are you choosing today? That's the decision that matters."
CONTEXT: Personal reflection challenge
USE: Episode close, call to personal action
  `);
}

function generateSocialCarousel(teaching: DigestedTeaching): string {
  const verbatim = teaching.keyPhrases[0] || teaching.revelation;

  return filterThroughHumanOS(`
SLIDE 1
The Lie We Believe
One decision changes everything.
That should be enough.
So why isn't it?

---

SLIDE 2
The Truth
${verbatim}

---

SLIDE 3
How It Works
${teaching.mechanism}

---

SLIDE 4
What's At Stake
If you don't understand this:
${teaching.cost}

---

SLIDE 5
The Daily Reality
Every morning is a fresh choice.
Not "did I decide once?"
But "am I choosing now?"

---

SLIDE 6
What Becomes Possible
${teaching.transformation}

---

SLIDE 7
Your Question
What are you choosing today?

That's the only decision that matters.
  `);
}
