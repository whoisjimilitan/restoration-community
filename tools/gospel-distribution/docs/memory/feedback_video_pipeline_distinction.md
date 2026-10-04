---
name: feedback-video-pipeline-distinction
description: "pdf-trend-lab has two separate video systems — don't conflate the unused Remotion/FFmpegRenderer IDE with the clean-cut-sermon skill that's actually used"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6d4ec87b-33d2-432e-9ac4-58077e347890
---

In `pdf-trend-lab`, there are two unrelated video pipelines — do not treat them as the same thing:

1. **"Professional Video Editing IDE"** (`src/skills/` — VideoAnalyzer, EditEngine, Renderer, FFmpegRenderer, CaptionSkill, ExportSkill, React IDE UI; `.superpowers/sdd/professional-video-editing-ide-implementation`). A larger in-repo build with Remotion/FFmpeg backend churn (commit `2bab89f` etc, Aug 15 2026). **Not yet used for real output.**
2. **`clean-cut-sermon`** skill (`~/.claude/skills/clean-cut-sermon/SKILL.md`, global, v1.1). A standalone ffmpeg+faster-whisper pipeline invoked directly as a skill — word-level transcription, silence+motion+visual-presence-checked cuts, dip-to-black, separately-processed audio (EQ/compression + ducked piano bed), drift-safe remux. **This is what's actually been run** to produce real sermon edits for YouTube/social.

**Why:** Corrected 2026-08-22 after assistant assumed the in-repo IDE build was the active video workflow — it wasn't; the user has never used it. The real work happened via the global skill instead.

**How to apply:** When asked "did we do video editing work," check for `clean-cut-sermon` skill invocations / `videos/exports/` output first, not `src/skills/` IDE code. See [[project_brotherjimi_five_open_items]] for related YouTube channel work this output feeds into.
