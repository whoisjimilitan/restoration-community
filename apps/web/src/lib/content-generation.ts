/**
 * Content Generation Pipeline
 *
 * Transforms a VoiceTheme into 9 polished, ready-to-use content formats.
 * Each format maintains Brother Jimi's prophetic voice:
 * - Identity-centered ("Here's who you're choosing to be")
 * - Transformation-focused (current state → future state)
 * - Call to recognition, not sales
 *
 * The 9 formats:
 * 1. Daily Letter (2-3 paragraphs + signature)
 * 2. Social Post (140-280 chars, viral-ready)
 * 3. Micro Insight (1-2 sentence quote)
 * 4. Devotional (3-4 sentences, reflective)
 * 5. Article Excerpt (500-800 words, deep)
 * 6. Short Video Script (30-60 sec, TikTok/Reels)
 * 7. Long Video Script (5-10 min, YouTube)
 * 8. Podcast Moment (90-120 sec audio clip)
 * 9. Email (subject + body newsletter format)
 */

import type { VoiceTheme } from "./voice-extraction";

/**
 * Main content output interface covering all 9 formats
 */
export interface ContentOutputs {
  dailyLetter: string;           // 2-3 paragraphs + signature
  socialPost: string;            // 140-280 chars, viral-ready
  microInsight: string;          // 1-2 sentences, quotable
  devotional: string;            // 3-4 sentences, reflective
  articleExcerpt: string;        // 500-800 words, deep (markdown)
  shortVideoScript: string;      // 30-60 sec (TikTok/Reels)
  longVideoScript: string;       // 5-10 min (YouTube)
  podcastMoment: string;         // 90-120 sec audio clip (dialogue)
  email: {
    subject: string;             // Email subject line
    body: string;                // Email body (newsletter)
  };
}

/**
 * Format 1: Daily Letter
 * 2-3 paragraphs with personal question → revelation → contrast → closing signature
 */
function generateDailyLetter(theme: VoiceTheme): string {
  const { coreMessage, revelation, contrast, callToIdentity } =
    theme;

  return `${callToIdentity}

${revelation} This is not about what you've done. This is about who you're choosing to become.

${contrast}

${coreMessage}

Here's the thing: every decision you make today is a vote for one version of yourself or another. You're not stuck in yesterday. You're standing at a crossroads, and you have the power to choose right now.

Consider one area of your life where you've been living the lie. What if today was the day you stopped? What if today was the day you chose differently?

The choice is yours. Always has been. Always will be.

With faith,
Brother Jimi`;
}

/**
 * Format 2: Social Post
 * Under 280 characters, includes identity question + revelation + call-to-recognition
 * Designed to stop the scroll and spark recognition
 */
function generateSocialPost(theme: VoiceTheme): string {
  const { revelation, callToIdentity } = theme;

  // Craft a concise post that includes the question and revelation
  const post = `${callToIdentity}

${revelation.substring(0, 80)}${revelation.length > 80 ? "..." : ""}

Here's who you're choosing to be.`;

  // Ensure it's under 280 chars; trim revelation if needed
  if (post.length > 280) {
    return `${callToIdentity}

${revelation.substring(0, 50)}...

Here's who you're choosing to be.`;
  }

  return post;
}

/**
 * Format 3: Micro Insight
 * 1-2 sentences, highly quotable and shareable
 * Stands alone without context
 */
function generateMicroInsight(theme: VoiceTheme): string {
  const { coreMessage, revelation } = theme;
  return `${revelation} ${coreMessage}`;
}

/**
 * Format 4: Devotional
 * 3-4 sentences, reflective and challenging
 * Encourages personal reflection and action
 */
function generateDevotional(theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, callToIdentity } = theme;

  return `${callToIdentity}

${revelation}

${contrast}

The transformation from lie to truth isn't one big moment—it's a thousand small decisions. Every time you choose transparency instead of hiding, every time you choose to move instead of staying stuck, every time you choose to build instead of destroy, you're voting for your true self.

${coreMessage} What one choice will you make today that aligns with who you're becoming?`;
}

/**
 * Format 5: Article Excerpt
 * 500-800 words, deep exploration in markdown format
 * Structured: Truth You Need to See → Contrast → What This Means → Call to Action
 */
function generateArticleExcerpt(theme: VoiceTheme): string {
  const { identity, revelation, contrast, coreMessage, examples } = theme;

  let article = `# ${identity.label}

## The Truth You Need to See

${revelation}

When we look at our lives, we see the evidence of every choice we've ever made. We see the relationships we've built or destroyed. We see the trust we've earned or broken. We see the progress we've made or the patterns we're stuck in.

But here's what most of us miss: we're not seeing consequences. We're seeing *identity*.

Every outcome in your life is not punishment for your past. It's the natural result of who you've been *choosing to be*.

## The Contrast

${contrast}

Most of us have been told a lie so many times we stopped questioning it. The lie is subtle, seductive, and it's everywhere. It whispers in the moments when you're most vulnerable: *You can't change. You're stuck. This is who you are.*

But that's not who you are. That's who you've been *practicing* being.

The truth is harder to hear because it demands something of you. The truth says: *You have the power to change. You have the power to choose differently. You have the power to become someone new—starting today.*

## What This Means

When you finally stop believing the lie about yourself, everything changes.

${examples.length > 0 ? `${examples.map((ex) => `- ${ex}`).join("\n")}\n` : ""}

The examples are everywhere once you start looking. They're in the testimony of the man who stopped running and finally faced what he'd done. They're in the woman who admitted her addiction instead of hiding it. They're in the family that chose reconciliation instead of bitterness. They're in the person who stopped faking and started building.

They chose. And their lives transformed.

## The Choice Is Yours

${coreMessage}

This isn't about striving harder or trying harder or believing harder. This is about a fundamental shift in how you see yourself. It's about understanding that transformation isn't something that *happens to you*. It's something you *choose*.

You don't get to choose your past. You don't get to choose what's been done to you or what you've done to others. But you get to choose *this moment*. And the next one. And the one after that.

Every choice is a vote for who you want to become.

So what will you choose today?`;

  return article;
}

/**
 * Format 6: Short Video Script
 * 30-60 seconds, TikTok/Reels style with timestamps and on-screen text notes
 * Format includes timing markers and stage directions
 */
function generateShortVideoScript(theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, identity } = theme;

  return `[OPENING - 0:00-0:03]
[TEXT ON SCREEN: "${identity.label}"]
[BROTHER JIMI LOOKS DIRECTLY AT CAMERA]

"${identity.question}"

[PAUSE - 0:03-0:05]
[TEXT ON SCREEN: "Here's the truth:"]
[CUT TO MOTION GRAPHICS: Lie vs Truth]

[BODY - 0:05-0:45]
[VOICEOVER] "${revelation}"

[TRANSITION WITH TEXT: "The lie:" then "The truth:"]
[GRAPHICS SHOW CONTRAST]

${contrast}

[BOTTOM TEXT: "You're choosing this"]

[CLOSING - 0:45-0:60]
[TEXT ON SCREEN: "${coreMessage}"]
[BROTHER JIMI BACK ON CAMERA]

"What will you choose today?"

[TEXT ON SCREEN: "Here's who you're choosing to be. @restorationcommunity"]`;
}

/**
 * Format 7: Long Video Script
 * 5-10 minutes, YouTube format with clear sections and natural pacing
 * Structured: HOOK → SETUP → STORY → CONTRAST → TRANSFORMATION PATH → CTA → CLOSING
 */
function generateLongVideoScript(theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, callToIdentity, examples } =
    theme;

  return `[LONG VIDEO SCRIPT - YOUTUBE]
[Runtime: 5-10 minutes]

========================================
HOOK (0:00-0:30)
========================================
[BROTHER JIMI SITS ON STOOL]

"I'm going to ask you a question, and I need you to answer it honestly.

${callToIdentity}

Because how you answer that question determines everything about your life. Not what you've done. Not what's been done to you. But who you're choosing to be."

[PAUSE]

"Stay with me. This will change something."

========================================
SETUP (0:30-2:00)
========================================
[WALK THROUGH SPACE]

"We've all been taught to believe something false about ourselves. We've been told:

'You're broken.'
'You're stuck.'
'You're defined by your past.'
'You can't change.'

And so we live with the shame of that lie. We organize our entire lives around it. We make choices based on it. We tell ourselves stories based on it.

But what if the lie is just that? A lie?"

[STOP]

"I want to tell you something that will either free you or it will make you angry. Probably both.

${revelation}

That's not a statement. That's an invitation."

========================================
CONTRAST SECTION (2:00-4:00)
========================================
[SIT DOWN DIRECTLY WITH CAMERA]

"${contrast}

Most people never look at that contrast. They just live with the fog. But when you see the lie and the truth side by side, everything becomes clear.

The lie wants you to stay the same. The truth demands that you change."

${examples.length > 0 ? `[STAND, SLOW WALK]

"Let me tell you what this looks like in real life.

${examples.map((ex) => `${ex.trim()}`).join("\n\n")}"` : ""}

========================================
THE TRANSFORMATION PATH (4:00-7:00)
========================================
[BACK TO CAMERA, DELIBERATE ENERGY]

"Here's what you need to know about transformation:

It's not one big moment. It's a thousand small decisions.

It's not about getting better. It's about becoming different.

It's not about striving. It's about choosing.

Every morning you wake up and choose what you'll believe about yourself. Every time you face a decision, you choose who you're voting for. Every conversation you have, you're either reinforcing the lie or stepping into the truth.

And here's the beautiful part: you can start right now. Not tomorrow. Not after you've cleaned up your past. Not after you've read another book or listened to another message.

Right now.

In this moment.

${coreMessage}"

========================================
CALL TO ACTION (7:00-8:30)
========================================
[LOOK DIRECTLY AT CAMERA, SINCERE AND DIRECT]

"So let me ask you something different.

Not 'Are you a truth-teller or a liar?' That's the question I asked at the start.

The real question is: 'Who do you want to become, and are you willing to choose that person, one decision at a time?'

Because that's all this is. A series of choices. Tiny choices. Unglamorous choices. Boring choices. Choices nobody's watching. Choices that nobody will applaud.

But choices that transform your life.

If you're ready to start choosing differently, if you're ready to step away from the lie and into the truth, I want to hear from you. Come join us. We're building a community of people who are choosing to become who they're meant to be."

========================================
CLOSING (8:30-10:00)
========================================
[BROTHER JIMI STANDS]

"This isn't the end of the conversation. This is the beginning of your choosing.

Subscribe. Tell someone who needs to hear this. And most importantly: choose.

Choose truth today. Choose to own your reality today. Choose to build instead of destroy today. Choose to serve instead of hide today.

Here's who you're choosing to be.

I'll see you next time."

[TEXT ON SCREEN: "Subscribe. Choose Different. @restorationcommunity"]`;
}

/**
 * Format 8: Podcast Moment
 * 90-120 seconds, written as dialogue/monologue for audio
 * Includes natural speech patterns and breathing cues
 */
function generatePodcastMoment(theme: VoiceTheme): string {
  const { revelation, contrast, coreMessage, callToIdentity } = theme;

  return `[PODCAST MOMENT - 90-120 SECONDS]
[AUDIO FORMAT: Spoken dialogue]

========================================

[INTRODUCTION - 0:00-0:10]

"Welcome back. I'm Brother Jimi, and today we're talking about something that might be hard to hear. But I promise it will be worth it."

[NATURAL PAUSE]

========================================

[CORE MESSAGE - 0:10-0:45]

"${callToIdentity}

That's not a trick question. That's the foundation of everything.

${revelation}

${contrast}"

[BREATHING PAUSE - 1-2 seconds]

========================================

[REFLECTION - 0:45-1:15]

"Most of us have been living inside the lie for so long, we've forgotten there's a truth. But here's what I know:

You don't have to stay there. You don't have to keep practicing being that version of yourself. You can choose differently, starting right now. Starting with this conversation. Starting with this moment."

[SLIGHT EMOTIONAL LIFT]

"${coreMessage}"

[PAUSE FOR IMPACT - 2-3 seconds]

========================================

[CLOSE - 1:15-2:00]

"This is the invitation I'm giving you. Not to be perfect. Not to get your life together. But to start choosing who you actually want to become.

If that resonates with you, if you're ready to have that conversation, reach out. We're here.

Thanks for listening. I'll see you next time."

[END THEME MUSIC FADE]`;
}

/**
 * Format 9: Email Newsletter
 * Subject line + body with opening, revelation, contrast, examples, call-to-recognition, and P.S.
 */
function generateEmail(theme: VoiceTheme): { subject: string; body: string } {
  const { identity, revelation, contrast, coreMessage, examples } = theme;

  const subject = identity.label;

  const body = `Hello,

I've been thinking about something, and I wanted to share it with you directly.

${revelation}

Here's what I mean by that.

---

**${contrast}**

Most of us live with the lie for so long that it becomes invisible. We stop questioning it. We stop fighting it. We just organize our entire lives around the assumption that the lie is true.

But what if it's not?

${
  examples.length > 0
    ? `What I'm seeing in this community is real, everyday transformation. I'm seeing:

${examples.map((ex) => `• ${ex.substring(0, 100)}${ex.length > 100 ? "..." : ""}`).join("\n")}

These aren't dramatic conversions. They're ordinary people making extraordinary choices.`
    : "The examples are quiet. They're not flashy. They're people choosing differently, one decision at a time."
}

---

**The Invitation**

${coreMessage}

This isn't about becoming someone else. This is about becoming who you actually are underneath the lies you've been believing about yourself.

It starts with a choice. Then another. Then another.

You're capable of this. I believe in you.

Let's go,

Brother Jimi

---

P.S. — If you're ready to have this conversation deeper, reply to this email. I read every single one, and I want to hear your story.`;

  return { subject, body };
}

/**
 * Main function: Generate all 9 content formats from a VoiceTheme
 *
 * Takes the VoiceTheme (from Task 3: voice extraction) and produces
 * all 9 polished, ready-to-use content formats that maintain Brother Jimi's
 * authentic prophetic voice and identity-centered approach.
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
 * Helper function to get character count for validation
 */
export function getSocialPostCharCount(content: string): number {
  return content.length;
}

/**
 * Helper function to extract timing information from video scripts
 */
export function getVideoScriptTimings(script: string): { start: string; end: string }[] {
  const timingPattern = /\[([0-9]{1,2}:[0-9]{2})-([0-9]{1,2}:[0-9]{2})\]/g;
  const timings: { start: string; end: string }[] = [];
  let match;

  while ((match = timingPattern.exec(script)) !== null) {
    timings.push({
      start: match[1],
      end: match[2]
    });
  }

  return timings;
}
