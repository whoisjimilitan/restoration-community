---
name: teaching_to_youtube_complete_system
description: "Complete reusable teaching-to-YouTube video production system (Sept 12, 2026) — preserves entire pipeline to prevent loss"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8d24422f-6d6b-4792-9952-d6e71877bfae
---

# Teaching-to-YouTube Video Production System

**Status**: v1.0 production-ready (REC46 proven workflow)
**Created**: September 12, 2026
**Purpose**: Reusable, loss-proof system for turning raw teaching videos into polished YouTube-ready content

## Complete System Overview

The system consists of three interconnected phases:

1. **Teaching Script Generation** (input: raw teaching content)
2. **Video Editing & Composition** (input: recording + script)
3. **Audio Processing & Final Output** (input: edited composition)

---

## Phase 1: Teaching Script Generation

**Skill**: `/brother-jimi-teaching-script`

### Input
- Raw teaching material (notes, transcript, outline, or topic)
- Core truth to unveil (one sentence that underlies everything)

### The 7-Layer Trivium Framework

Every teaching flows through these layers (may spiral, not sequential):

1. **THE GAP** — Recognition of complexity/problem statement
   - Example (REC46): "You believe in God... but your life hasn't changed"
   - Purpose: Validate the listener's confusion

2. **THE FOUNDATION** — Core truth/organizing principle
   - Example (REC46): "Real belief is action. When you truly believe, you do it."
   - Purpose: Give them the framework they'll return to

3. **THE DIAGNOSIS** — Why they're stuck/the real problem
   - Example (REC46): "We are hearers, not doers. The wise man is the DOER of the Word."
   - Purpose: Help them see what they've been missing

4. **THE CONSEQUENCE** — Cost of not changing/what's at stake
   - Example (REC46): "If you don't practice the Word, you cannot bring Jesus on the scene"
   - Purpose: Create urgency without shame

5. **THE ACCOUNTABILITY** — Personal application/the mirror
   - Example (REC46): "What has God said that you are acting on? What are you finding difficult to act upon?"
   - Purpose: Move them from observer to participant

6. **THE EMPOWERMENT** — Hope/solution available now
   - Example (REC46): "You have the Holy Spirit as your wisdom. He's your power."
   - Purpose: Replace shame with power

7. **THE CALL** — Action/what to do now
   - Example (REC46): "Be a doer of the Word. Get to know Jesus by doing what He says."
   - Purpose: Bridge from understanding to transformation

### Output
- **Opening Card**: Question or tension the teaching resolves
  - REC46 example: "What's the gap? Between what you believe and what you live."
- **Full Script**: Organized through 7 layers, formatted for reading/recording
- **Glass Card Quotes**: 4-5 verbatim statements (one per layer, distributed)
  - Sacred — must be exact quotes from speaker
  - Become visual overlays in the composition
  - Used in video at emotional peaks

### Key Rules
- Never soften the truth
- Preserve all verbatim statements
- Stay scholarly (logic sound, biblically grounded)
- Keep it speakable (natural conversation flow)
- Always offer grace/empowerment (end with a door open to hope)

### Success Criteria
- Core truth unmistakable (one sentence)
- All seven layers present and in order
- Verbatim quotes preserved and placed naturally
- Reads like one person speaking to one person
- Listener can articulate: Here's what I didn't see. Here's what I need to do.

---

## Phase 2: Video Editing & Composition

**Primary Tool**: HyperFrames (HTML-based video composition)
**Source**: Single raw video recording (e.g., phone camera, high-res)

### Step 1: Prepare Raw Video
- Upscale or downscale to 1920x1080p if needed
- Ensure audio is clean or plan processing
- Duration: typically 8-12 minutes of teaching

### Step 2: Create HyperFrames Composition

**File Structure**:
```
apps/remotion/videos/ministry/rec46/
├── index.html          # Main composition (DOM + timing)
├── rec46_source.mov    # Raw teaching video
└── audio/              # Optional: audio files
```

**Core Composition Elements** (from REC46 working version):

```html
<!-- Video source: 1920x1080 @ 30fps, 728 seconds total duration -->
<video data-start="0" data-duration="728" src="rec46_source.mov"></video>

<!-- Opening Card: Visual hook setup (black screen, no text card—removed in final) -->
<!-- Camera touch moment is the true visual hook (no intro needed) -->

<!-- Glass Card Overlays: Appear AFTER quotes are spoken -->
<!-- Teal backdrop-filter blur at bottom of screen, white text center -->
<div data-start="314" data-duration="4" class="glass-card">
  "It is the Word dwelling in you which is equivalent to Christ personally being in you."
</div>

<!-- Scene Transitions: Teal-labeled section markers -->
<div data-start="420" data-duration="2" class="section-transition">
  Gap → Foundation
</div>

<!-- Full Captions: Timed to sync with speech -->
<!-- Currently: embedded in video or handled via YouTube auto-captions -->

<!-- Closing Card: Declares the CALL (specific action) -->
<div data-start="720" data-duration="8" class="closing-card">
  You know the gap. Act on what God has said.
</div>
```

**Styling** (matches site design language):
- Font: Fraunces (display), Georgia (body)
- Colors: Teal accent (#0D5E57), white text, dark background
- Spacing: Prophetic voice breathing room (line breaks control pacing)
- Opacity: Glass cards start at opacity 0, reveal at moment

**Key Timing Principles**:
- Glass cards appear AFTER the quote is spoken (user correction: overlap causes distraction)
- Transitions happen at natural breath moments (not mid-sentence)
- Closing card appears late enough for natural conclusion (not jarring)
- Duration must remain locked throughout (no re-encoding, no frame loss)

### Step 3: Render the Composition
```bash
cd apps/remotion/videos/ministry/rec46/
npx hyperframes render --quality high --output rec46_polished.mp4
```

**Render settings**:
- Quality: high (for final delivery)
- Format: H.264 video codec, AAC audio codec
- Duration from render log is source of truth (compare to composition duration)
- File size typically 700-800 MB before audio processing

### Step 4: Quality Checks
- Compare render duration to composition duration
- Verify all glass cards are visible and properly timed
- Check that captions sync with speech
- Confirm no frame drops or visual artifacts

---

## Phase 3: Audio Processing & Final Output

**Tool**: FFmpeg (command-line audio/video processing)

### Audio Processing Chain (Applied to Rendered Composition)

The human voice in teaching videos typically needs:

1. **High-Pass Filter** (remove rumble, wind, low-frequency equipment noise)
   ```
   highpass=f=80
   ```
   - Cutoff: 80 Hz
   - Effect: Cleaner, less muddy voice

2. **Equalizer Boosts** (add warmth and presence)
   ```
   equalizer=f=200:t=h:width=100:g=2   # Warmth boost at 200 Hz
   equalizer=f=3500:t=h:width=100:g=3  # Presence boost at 3.5 kHz
   ```
   - 200 Hz: Adds body/warmth to voice
   - 3.5 kHz: Adds presence/clarity (people understand better)

3. **Compressor** (level out volume variations)
   ```
   acompressor=threshold=0.04:ratio=4:attack=5:release=50
   ```
   - Threshold: 0.04 (start compressing when signal hits 4% of max)
   - Ratio: 4:1 (reduce loud parts by 4x)
   - Attack: 5ms (respond quickly to peaks)
   - Release: 50ms (gradually back off after peak)

4. **Limiter** (protect against clipping/distortion)
   ```
   alimiter=limit=0.98
   ```
   - Limit: 0.98 (absolute ceiling at 98% to prevent distortion)

**Applied as Single Audio Filter Chain**:
```bash
ffmpeg -i composition.mp4 \
  -af "highpass=f=80, \
       equalizer=f=200:t=h:width=100:g=2, \
       equalizer=f=3500:t=h:width=100:g=3, \
       acompressor=threshold=0.04:ratio=4:attack=5:release=50, \
       alimiter=limit=0.98" \
  -c:v copy -c:a aac -b:a 192k \
  output.mp4
```

**WARNING (Learned Hard Way — 2026-08-22)**:
- Even a single clean EQ pass can break perceived A/V sync
- All automated checks (ffprobe duration, frame count, sample count) report it as fine
- User's ear is the only reliable detector
- **Mitigation**: If sync feels off after audio processing, remove the EQ first before investigating anything else
- **Safest path**: Ship with unprocessed original audio over risking sync for warmth/leveling

### Trimming for Visual Hook

**Critical Rule**: Camera touch is the visual hook, not a text card

1. Identify when camera touch occurs in raw video (in REC46: ~14 seconds in)
2. Trim to start ~10 seconds before full touch visibility (gives context)
3. **Do NOT** include any black screen before the touch — it defeats the visual hook
4. **If black screen remains**, overlay opening text directly on video (see Step 5)

**REC46 Example**:
- Raw video: 773 seconds, black screen at start covering camera touch
- Trimmed from 10-second mark: removes black, visual hook now visible at frame 0
- Result: 763 seconds, clean opening with immediate visual engagement

### Step 5: Add Opening Text Overlay (Optional)

If the teaching needs an on-screen opening statement/question:

**Text Content**: The GAP question from script opening
- REC46: "What's the gap? Between what you believe and what you live."
- Duration: 3-4 seconds
- Style: White text, centered, large (60-80pt), simple sans-serif or Georgia

**Method**: Overlay image on first 3 seconds
```bash
ffmpeg -i rec46_trimmed.mp4 \
  -i opening_frame.png \
  -filter_complex "[0:v][1:v]overlay=0:0:enable='between(t,0,3)'[v];[v]scale=1920:1080[vout]" \
  -map "[vout]" -map "0:a" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 192k \
  -y rec46_with_opening.mp4
```

**Design Notes**:
- Text appears on top of video, not as separate pre-title card
- Black background for text if overlay behind camera moment
- Teal or white font to match site design language

### Step 6: Add Captions (YouTube Level)

**Current Status**: REC46-FINAL-YOUTUBE-READY.mp4 uploaded without continuous captions

**Options**:
1. **YouTube Auto-Captions** (easiest, acceptable quality)
   - Upload video → YouTube generates captions automatically
   - Edit/refine in YouTube Studio if needed
   - No additional file processing required

2. **Burned-in Subtitles** (requires SRT file)
   - Create SRT file with timestamps and dialogue
   - Burn to video using FFmpeg (more complex)
   - Permanent, visible regardless of player settings

3. **Soft Captions** (best for accessibility)
   - Upload SRT alongside video
   - Users can toggle captions on/off
   - YouTube Studio supports direct SRT upload

**Recommendation**: Use YouTube auto-captions (free, fast, good enough for ministry content)

### Final Output File Specification

**REC46-FINAL-YOUTUBE-READY.mp4** (Production Target):
- Duration: 763 seconds (12:43)
- Resolution: 1920 x 1080 @ 30fps
- Video Codec: H.264 (libx264)
- Audio Codec: AAC, 192 kbps stereo, 48 kHz
- File Size: ~308 MB
- Contains:
  - Glass cards at 5:14, 7:03, 10:50 (moments when quotes are spoken)
  - Leveled and EQ'd audio (highpass 80Hz, +2dB@200Hz, +3dB@3.5kHz, compression 4:1, limiting)
  - Trimmed to start with visual hook (camera touch), no black screen
  - Optional: Opening text overlay "What's the gap?"

---

## Publishing to YouTube

### File to Upload
- `REC46-FINAL-YOUTUBE-READY.mp4` (or variant with opening text overlay)

### YouTube Metadata
- **Title**: "What Believing Actually Demands" (or the teaching title)
- **Description**: Teaching summary + link to /daily page on brotherjimi.com
- **Tags**: faith, obedience, action, teaching, Brother Jimi
- **Captions**: Enable YouTube auto-captions (generated automatically)
- **Thumbnail**: Use `/brother-jimi-youtube-assets` skill
  - Tag: EPISODE 04 (or episode number)
  - Hook: Pull specific quote from glass cards (e.g., "Real belief is action.")

### Checklist Before Upload
- [ ] Audio levels stable throughout (no sudden peaks or dropouts)
- [ ] Video sync verified by watching (especially back half for drift)
- [ ] Opening visual hook is first frame (no black screen)
- [ ] All glass cards are visible and readable
- [ ] Final duration matches expectations (~12-15 minutes typical)
- [ ] File size reasonable (~300-400 MB for 12-minute video)
- [ ] Thumbnail created and on-brand
- [ ] Title matches the core truth being taught

---

## Complete File Inventory (REC46 Working Example)

```
~/Desktop/
├── REC46-FINAL.mp4                    # Original working version (no audio EQ)
├── REC46-FINAL-YOUTUBE-READY.mp4      # Final output ready to upload (308 MB)
├── REC46-FINAL-WITH-OPENING-TEXT.mp4  # Alternative with opening text overlay

apps/remotion/videos/ministry/rec46/
├── index.html                         # HyperFrames composition (working version)
├── rec46_source.mov                   # Raw teaching video (phone camera)
└── (other working drafts deleted to free disk space)
```

---

## Known Issues & Workarounds

### 1. Audio/Video Sync Can Break After EQ Processing
- **Issue**: Even a clean, single-pass EQ filter can misalign sync (discovered 2026-08-22)
- **Detection**: Only user's ear can catch it (automated checks fail)
- **Mitigation**: Always listen to back half of video after adding audio filters
- **Safest fix**: Remove the EQ, keep original audio

### 2. HyperFrames Composition Rendering Path Issues
- **Issue**: File paths in composition work in preview but fail in render (forceScreenshot=true)
- **Workaround**: Use pre-rendered output from morning work rather than rebuilding from composition

### 3. Disk Space Fills Quickly
- **Issue**: Multiple render attempts + intermediate files = 2-3 GB consumed
- **Mitigation**: Delete intermediate files (rec46_polished.mp4, rec46_trimmed_base.mp4, etc.)
- **Keep**: Only the final working output and the composition source

### 4. FFmpeg Drawtext Filter May Not Be Available
- **Issue**: Some FFmpeg builds don't include text rendering
- **Workaround**: Create text as image (PIL/ImageMagick), overlay with filter_complex

---

## Repeating This Process for Future Teachings (REC47, REC48, etc.)

### Minimal Steps to Reproduce
1. Generate teaching script using `/brother-jimi-teaching-script` skill
2. Record teaching using that script as guide
3. Create HyperFrames composition (copy REC46's structure, update timings and quotes)
4. Render composition to MP4
5. Apply audio processing chain (same FFmpeg command, just change input/output filenames)
6. Trim to visual hook (identify camera moment, start ~10 seconds before)
7. Add opening text overlay (same method as REC46)
8. Upload to YouTube with auto-captions

### Time Investment
- Script generation: 30-60 min
- Recording: 15-30 min
- HyperFrames composition: 60-90 min (includes visual design, timing, testing)
- Rendering: 50+ min (depends on quality setting)
- Audio processing + trimming: 5-10 min
- YouTube upload + metadata: 5-10 min

**Total**: ~3-4 hours from raw content to YouTube-ready

---

## Design Language Standards (Locked In)

### Typography
- **Display/Headings**: Fraunces (serif, bold, elegant)
- **Body/Quotes**: Georgia (serif, readable)
- **Sans alternative**: System fonts (fallback only)

### Color Palette
- **Primary Accent**: Teal (#0D5E57)
- **Text**: White on dark, charcoal on light
- **Background**: Dark canvas (#1A1A18) for hero, light for body
- **Gradient**: Teal → charcoal, top-left to bottom-right (matches site hero)

### Motion & Effects
- **Glass Cards**: Teal backdrop-filter blur at bottom, opacity reveal
- **Transitions**: Teal-labeled section markers (clean, simple)
- **Captions**: White text, no styling, synced to speech
- **Visual Hook**: Camera moment or natural motion, never artifical intro

### Voice & Messaging
- **Never**: Em dashes, hedging language, motivational tricks
- **Always**: Bold, prophetic, truth-forward, grace-filled ending
- **Quote preservation**: Exact words from speaker, no paraphrasing

---

## Success Metrics

A teaching video succeeds when:

✅ All seven layers are unmistakably present
✅ Viewer can articulate the gap, foundation, and next action
✅ Glass card quotes are memorable and exact
✅ Audio is clear, leveled, and synced to lips
✅ Visual hook captures attention immediately
✅ Opening and closing align with the 7-layer arc
✅ Total duration fits YouTube feed (~12-15 min optimal)
✅ Thumbnail is on-brand and click-worthy
✅ Captions are accurate (auto or manual)

---

## References & Related Systems

- **Teaching Script Skill**: `/brother-jimi-teaching-script`
- **YouTube Assets Skill**: `/brother-jimi-youtube-assets` (thumbnails)
- **HyperFrames**: HTML-based video composition (motion, timing, design)
- **FFmpeg**: Command-line A/V processing (trimming, EQ, mixing)
- **Publishing**: Brother Jimi YouTube channel + /daily page on brotherjimi.com

---

**Version**: 1.0 (Production-Ready)
**Last Updated**: September 12, 2026
**System Tested**: REC46 complete teaching video (proof of concept)
**Next**: Document Teaching Engine → Recording → /daily page publishing flow
