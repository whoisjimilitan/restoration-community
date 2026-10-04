---
name: teaching-video-edit-skill
description: "Complete reusable skill for editing teaching videos (glass cards, captions, closing screen, premium aesthetic)"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 8d24422f-6d6b-4792-9952-d6e71877bfae
---

## Teaching Video Edit Skill

**Location:** `/Users/jimilitan/.claude/skills/teaching-video-edit/SKILL.md`

**Purpose:** Codified workflow for editing Jimi's teaching videos with HyperFrames. Captures philosophy, workflow, technical specs, and decision-making framework so future recordings don't require re-specification.

### Core Philosophy

This is a **ministry edit, not a content edit.**
- Polished (intentional) → Invisible (no distraction) → Authentic (Jimi's voice clear) → Clean (message lands)
- Test: Does this serve the message or the production? If production → remove it.

### Key Standards

| Standard | Why |
|----------|-----|
| Glass cards at 6% opacity, captions at 15% | Visual hierarchy without competing colors |
| Mid-sentence caption appearance | Pulls viewer in; prevents reading ahead |
| No section titles ("The Gap", etc.) | Viewers shouldn't have to figure things out |
| Closing screen: premium gradient (not black) | Maintains brand feel; signals curation not shutdown |
| One color throughout (teal) | Consistency = intentionality |
| Exact transcript words (no paraphrasing) | Revelation fidelity; paraphrasing changes meaning |
| No flashy effects (zoom, tilt, glow) | Message is the effect; viewer forgets there's an editor |

### Workflow (10 Steps)

1. **Listen** → identify false starts, retakes, tangents
2. **FFmpeg** → produce clean cut file (surgical removal of noise)
3. **faster-whisper on CUT file** → word-level captions with accurate timestamps
4. **Pick 4 glass cards:** Foundation → Contrast → Confrontation (7s hold) → Call
5. **Pick 3 closing scriptures:** echoes call + theological root + echoes illustration
6. **Apply same glass aesthetic** (teal, 6%/15% opacity)
7. **Apply caption discipline** (mid-sentence, exact words, 4–6 word phrases)
8. **Build closing screen** (gradient background, two glass sections: TODAY'S QUESTION + FURTHER READING)
9. **Preview & adjust** until timing matches speech exactly
10. **Render** at delivery quality only after approval

### Troubleshooting Map

| Problem | Root | Fix |
|---------|------|-----|
| Captions too early | Whisper timestamp drift | Increase `data-start` by 0.5–1s; verify against actual speech |
| Glass card wraps 3+ lines | Content too long | Break into two cards or reduce font size (28px min) |
| Audio pops at cuts | Join point misaligned | Apply 0.1s crossfade at boundary |
| Closing feels abrupt | No breathing room | Slow fade-in (0.8s sine.inOut) and fade-out (0.5s) |
| Color too saturated | Opacity too high | Cards 6% → 4%, captions 15% → 12% |

### Template Application

Every future teaching video follows this same architecture:
- **Source varies** → Teaching content changes
- **Cut list varies** → Tangents/retakes are different
- **Glass card moments vary** → Teaching points are different
- **Closing scriptures vary** → Theological anchors are different
- **Everything else stays the same** → Philosophy, workflow, aesthetic, style

This means: **Next time I edit a teaching video, I already know what to do without re-specification.**

### Files

- Skill definition: `/Users/jimilitan/.claude/skills/teaching-video-edit/SKILL.md`
- Example implementation: `/Users/jimilitan/main-office/restoration-community/teaching-video/rec049/index.html`
- Reference: Brother Jimi's editing voice is [[Voice: No Motivational Tricks]] + [[Quotable Preservation Priority]] + [[Revelation Fidelity Constraint]]
