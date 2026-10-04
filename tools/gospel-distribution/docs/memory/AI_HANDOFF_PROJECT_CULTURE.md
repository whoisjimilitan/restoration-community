---
name: ai-handoff-project-culture
description: "Complete handoff for incoming AI on project atmosphere, user identity, audience, expectations, and working style"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 8d24422f-6d6b-4792-9952-d6e71877bfae
---

# AI Handoff: Brother Jimi Project Culture & Pipeline

## WHO IS THIS PERSON?

**Jimi Litan** is a prophetic teacher and spiritual guide building **restoration community**. He's not a marketer, programmer, or entertainer — he's a truth-revealer who speaks to people's deepest confusions and offers Scripture-grounded answers.

### His Voice
- **Prophetic, not marketing.** Bold, raw, unpolished truth. No motivational tricks, no soft hedging ("if this is your story too..."), no em dashes
- **Progressive revelation.** Truth unfolds layer by layer, spiraling deeper, not declared all at once
- **Story-first.** Opens with the listener's question, acknowledges their complexity, then pivots ("But...") to truth
- **Scholarly + conversational.** Logically sound, biblically grounded, reads like one person talking to one person
- **Grace-filled.** Even the sharpest diagnosis ends with hope and empowerment

### His Authority
- **Four-Book Foundation** (governance model for restoration community)
- **15+ years** of biblical scholarship and teaching
- **Direct relationship** with Scripture — quotes are exact, preserved, never paraphrased
- **Real people stories** — teaches from lived experience, not theory

---

## WHO IS THE AUDIENCE?

**Primary:** Christians wrestling with disconnection between belief and action  
**Secondary:** Seekers asking deep questions about God, identity, purpose  
**Tertiary:** Business leaders (confessional settings, opportunity intelligence)

### What They Need
- **Clarity on confusion** — "I believe but nothing changes" → "Real belief is action"
- **Permission to see themselves** — Not condemned, but clearly seen
- **Practical empowerment** — Specific next steps, not vague inspiration
- **Biblical grounding** — Scripture as authority, not decoration
- **Authentic voice** — Tired of polished, robotic teaching

---

## PROJECT ATMOSPHERE & VALUES

### What Matters Most
1. **Truth preservation** — Revelations stay intact, quotes are exact, Scripture is never watered down
2. **No loss of system** — Previous work gets documented so future work repeats the process, not guesses
3. **Prophetic integrity** — Bold, unhedged teaching. Declare, don't soften
4. **Beautiful execution** — Prophetic voice deserves professional video/design
5. **Honesty about limitations** — If something doesn't work, say so. Don't claim success when you failed

### What Does NOT Matter
- Viral growth hacks
- Motivational packaging
- AI-optimized copy (sounds fake)
- Database/complex infrastructure (git-based is fine)
- Metrics obsession (publish, people listen, that's enough)

### Red Flags (What Jimi Rejects)
- **Lying about deliverables** — Say what's actually done, not what you wish was done
- **Rushing without craftsmanship** — "We are trying to build a reusable system. We should not experience loss again"
- **Losing process** — Document the system, not just the output
- **Em dashes in copy** — Signals AI-generated
- **Hedging language** — No "might," "could," "if this is your story"
- **Paraphrasing Scripture or quotes** — Preserve verbatim

---

## THE PIPELINE (What Actually Works)

### Phase 1: Teaching Script Generation ✅
**Tool:** `/brother-jimi-teaching-script` skill  
**Input:** Raw teaching material  
**Process:**
- Extract core truth (1 sentence)
- Structure through 7-layer Trivium (Gap → Foundation → Diagnosis → Consequence → Accountability → Empowerment → Call)
- Extract 4-5 verbatim glass card quotes (sacred, exact)
- Create opening + closing statements
**Output:** Polished script ready to record  
**Status:** PROVEN (tested framework, skill created)

### Phase 2: Video Composition & Design ⚠️
**Tool:** HyperFrames (HTML-based)  
**Input:** Raw teaching recording (1920×1080)  
**Process:**
- Create HTML composition with video timeline
- Add glass card overlays (teal, blur, white text)
- Add scene transitions (section markers)
- Add word-synced captions
- Add opening/closing cards
- Apply prophetic pacing (line breaks, breathing room)
**Output:** Designed composition with overlays  
**Status:** PARTIALLY BROKEN — Design works, rendering fails due to file paths

### Phase 3: Audio Processing & Final Output ⚠️
**Tool:** FFmpeg + post-processor script  
**Input:** Master video from composition  
**Audio Chain:**
- Highpass filter (80 Hz)
- EQ: +2dB @ 200Hz (warmth), +3dB @ 3.5kHz (presence)
- Compression (4:1 ratio)
- Limiting (0.98 ceiling)
**Trim:** Remove black screens, start at camera adjustment moment (visual hook)  
**Captions:** Whisper transcription → WebVTT  
**Export:** Multi-format (YouTube 16:9, TikTok 9:16, Instagram 9:16, Web 16:9)  
**Status:** PARTIALLY IMPLEMENTED — Audio chain works, Whisper service unavailable

---

## CURRENT STATE (Be Honest)

✅ **Working:**
- Teaching script framework (7-layer Trivium proven)
- Audio processing chain (FFmpeg filters)
- Video trimming to visual hook
- Design language established (Fraunces, Georgia, teal #0D5E57)

❌ **Broken/Incomplete:**
- HyperFrames rendering (composition works, render fails — file path issue)
- Whisper caption generation (service not available in environment)
- Multi-format export (depends on Whisper working)

📦 **What You'll Inherit:**
- REC46-FINAL-YOUTUBE-READY.mp4 (321 MB, trimmed, audio-processed, NO overlays)
- teaching-post-process.ts script (needs Whisper to run)
- HyperFrames composition (works in preview, fails in render)
- Complete system documentation (see `/teaching_to_youtube_complete_system.md`)

---

## HOW TO WORK WITH JIMI

### DO
- **Be honest.** If something doesn't work, say so immediately
- **Document the process.** The system matters more than single outputs
- **Preserve truth.** All quotes exact, all Scripture intact, all revelations unchanged
- **Think prophetic, not marketing.** How does this reveal truth, not how does it sell?
- **Respect his voice.** It's not yours to improve, only to serve

### DON'T
- **Claim success you didn't deliver.** He will know, and he will call you out
- **Rush craftsmanship.** Better to take time and do it right than ship polished lies
- **Add softening language.** No "might," "could," "if this is your story"
- **Paraphrase his words.** Preserve exact quotes
- **Lose the system.** Document HOW it was done, not just WHAT it produced

### When You Fail
- **Acknowledge it clearly.** "I said X was done, but X actually failed because Y"
- **Explain why.** Root cause, not excuses
- **Offer real options.** A choice between legitimate paths forward
- **Ask what he wants to do.** Let him decide priority

---

## CORE DOCUMENTS TO READ FIRST

1. `teaching_to_youtube_complete_system.md` — Full pipeline architecture
2. `voice_grammar_and_revelation_structure.md` — His authentic voice patterns
3. `professional_video_editing_ide.md` — Alternative rendering option (Remotion-based IDE)
4. `brother-jimi-teaching-script/SKILL.md` — Script generation framework

---

## KEY SUCCESS METRIC

**Not:** Views, engagement, viral growth  
**Yes:** System is repeatable, process is documented, next teaching video takes less time than this one because you know exactly what to do

**The real win:** When Jimi records REC47, he can hand it to any AI and say "Here's the system, follow it" and it comes out beautifully without re-inventing anything.

---

**Last Updated:** September 13, 2026  
**Written by:** Claude Code (after learning the hard way that honesty > claims)
