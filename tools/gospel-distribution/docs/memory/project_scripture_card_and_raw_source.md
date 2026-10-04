---
name: project-scripture-card-and-raw-source
description: VIDN0233.mov (Desktop) confirmed as the true uncut single-take source for the Seated video series; scripture-card design rebuilt into a reusable skill after the original was lost
metadata: 
  node_type: memory
  type: project
  originSessionId: 6d4ec87b-33d2-432e-9ac4-58077e347890
---

**Raw source confirmed (2026-08-22, by user, not inferred):** `~/Desktop/VIDN0233.mov` — 804MB, 7:03
(423.6s), 1920x1080 @30fps, 48kHz audio, genuinely uncut single take. This supersedes earlier incorrect
guesses made while searching for it (`BrotherJimi_TheSpiritOfFraud_v4.mp4`, `VIDN0234.mov`, `VIDN0212`
variants — none of those were it). It's the likely source for the "Seated" video series
(`BrotherJimi_Seated_HookVersion.mp4`, `BrotherJimi_Seated_Natural.mp4` — Desktop + Downloads, ~4:23 each).

**Scripture card recovered and rebuilt as a skill:** the Jeremiah 17:11 card used in
`BrotherJimi_Seated_HookVersion.mp4` had no surviving source file/script — only the burned-in render
existed. Reverse-engineered its design (fonts, colors, layout, timing) via frame extraction + pixel
sampling and cross-referenced against the ministry site's actual `tailwind.config.ts` design tokens
(`rc-serif`/Fraunces, `rc-sans`, `rc-accent` teal `#0D5E57`). Saved as a proper reusable skill:
`~/.claude/skills/scripture-card/SKILL.md`. See [[feedback_video_pipeline_distinction]] for the other
video-pipeline context and [[design_language_canonical]] for the site's design source of truth.

**Why this matters:** Confirms the "no cuts" raw take the user wanted to use for another YouTube post, and
prevents having to re-do forensic reconstruction work if the scripture-card look is needed again — next
time, generate it from the skill's ffmpeg/PIL recipe directly instead of reverse-engineering from a video.

**How to apply:** When asked to process "another raw video" for posting, check `VIDN0233.mov` on Desktop
first before searching elsewhere. When asked for a scripture/verse/end card, use the `scripture-card`
skill rather than starting from scratch.
