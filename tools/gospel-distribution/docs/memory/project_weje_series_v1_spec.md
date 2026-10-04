---
name: weje-series-v1-spec
description: "Complete design, typography, and production spec for WEJE testimony series (established Episode 1). Canonical standards for future episodes."
metadata: 
  node_type: memory
  type: project
  originSessionId: 373ff6ef-11eb-43d2-886f-4e3de9af4be6
---

## WEJE Series v1.0 Canonical Spec (Episode 1 Baseline)

**Established:** Episode 1 production  
**Saved to:** `docs/WEJE_Series_Design_Spec.md` (authoritative source)  
**Skills created:** weje-vertical-shorts-generator, weje-episode-producer

## Key Standards

### Video Formats
- **Long-form:** 1920×1080 (16:9)
- **Shorts (TikTok/YT):** 1080×1920 (9:16 vertical—NOT 1:1 square)

### Typography (Canonical)
- **Font:** Fraunces serif (Google Fonts or `/scratchpad/Fraunces/static/Fraunces_72pt-Regular.ttf`)
- **Intro quotes:** 72pt Regular, `#FFFFFF` on `#0F0F0F`
- **Outro question:** 68pt Regular, center-aligned, vertically centered
- **CTA card:** 80pt Regular ("Subscribe\nLike\nShare")
- **TikTok overlays:** 96pt (question), 48pt (CTA)
- **Subtitles:** mov_text codec, embedded, offset 16.5s from start

### Colors
- **Background:** `#0F0F0F` (Cinematic Black—dark, immersive)
- **Text:** `#FFFFFF` (Pure White—high contrast)
- **No brand colors in intro/outro** (reserved for full-episode design)

### Timing Structure
- **Intro:** 0–16.5s (3 quotes, audio MUTED, hard cuts between cards)
- **Content:** 16.5s to ~(total−13s) (full original audio, UNMUTED)
- **Outro Question:** ~8s (audio MUTED, reflective)
- **CTA Card:** 5s final (audio MUTED, "Subscribe Like Share")

### Audio Rules
- Intro: MUTED (mystery moment, build anticipation)
- Content: UNMUTED (subject's voice, primary testimony)
- Outro: MUTED (reflective, let question sit)
- **Never extract/reattach audio** (keep bound to original video)

### LUT (Reflective Mood)
- Saturation: 0.85 (slight desaturation)
- Brightness: −0.05 (crush blacks slightly)
- Contrast: 1.1 (increase punch)
- Effect: Crushed blacks, warm midtones, cool highlights, contemplative vibe

### Intro Quotes (Fixed for Series)
1. "I had a father. A mother. A mind that learned easily."
2. "But something pushed me off every time. I never finished secondary school. Something kept pulling me away."
3. "What if I didn't choose this? What if something opened a door and entered?"

### Outro Question (Template)
"What did you have that your adversary or your own costly choices would have taken if not for God's grace?"
- Adjustable per episode (keep prophetic, reflective tone)

### TikTok Shorts Cropping
- **Strategy:** Intelligent center/side crop from 1920×1080 → 1080×1920
- **Crop math:** `crop=607:1080:[x_offset]:0,scale=1080:1920`
- **x_offset values:**
  - Centered subject: 656
  - Right-positioned (on bed): ~1100
  - Left-positioned: ~400
  - **Determine per-clip** by watching source video at clip start time

### Text Restrictions
- No em dashes (—) ever
- No abbreviations (spell out "you're" not "ur")
- Subtitles must not overlap with intro/outro text cards

## Build Pipeline (Reusable)

**Phase 1:** Extract clips + intelligent crop (TikTok shorts)
**Phase 2:** Add text overlays (Fraunces typography, timing control)
**Phase 3:** Embed subtitles (mov_text codec, SRT-based)
**For long-form:** Add intro/outro cards + LUT + subtitles

## Reference Files
- Design spec: `docs/WEJE_Series_Design_Spec.md`
- Skill templates:
  - `weje-vertical-shorts-generator/SKILL.md` (shorts with overlays)
  - `weje-episode-producer/SKILL.md` (full episode with intro/outro/LUT)
- Implementation scripts (Episode 1):
  - `BUILD_TIKTOK_FULLFRAME.py` (vertical shorts)
  - `BUILD_EPISODE1_FINAL2.py` (full episode)

## Why:**
All episodes must maintain visual consistency (typography, colors, audio design, pacing, mood). This is the canonical baseline. Future episodes adapt specs per content but never deviate from core standards (Fraunces, 9:16 vertical, black/white palette, muted intro/outro, reflective LUT).

## How to apply:**
For each future episode:
1. Refer to this spec for typography/colors/timing
2. Adapt intro quotes & outro question to episode theme
3. Measure subject positioning (x_offset) per TikTok clip
4. Use weje-vertical-shorts-generator skill for shorts
5. Use weje-episode-producer skill for long-form
6. Verify output matches design spec before upload
