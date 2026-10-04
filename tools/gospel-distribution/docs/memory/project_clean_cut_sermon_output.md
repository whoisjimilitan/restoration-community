---
name: project-clean-cut-sermon-output
description: "Status of the clean-cut-sermon skill run on VIDN0212-mixed.mp4 — multi-platform exports produced, uncommitted, feeds the YouTube channel overhaul"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6d4ec87b-33d2-432e-9ac4-58077e347890
---

Ran the [[feedback_video_pipeline_distinction|clean-cut-sermon]] skill on `videos/sermons/VIDN0212-mixed.mp4` (raw source, Aug 14 2026 13:19) in `pdf-trend-lab`.

Output (Aug 15 2026 02:25, all currently **untracked/uncommitted** in git):
- `videos/exports/master.mp4` — full cleaned edit
- `videos/exports/exports/youtube-*.mp4`
- `videos/exports/exports/instagram-feed-*.mp4`
- `videos/exports/exports/instagram-reels-*.mp4`
- `videos/exports/exports/tiktok-*.mp4`
- `videos/exports/exports/web-*.mp4`

**Why:** This is the source content intended for the @brotherjimi YouTube channel overhaul tracked in [[project_brotherjimi_five_open_items]] (item #1 — banner/description/bio-link cleanup, unlisting the old low-view video).

**How to apply:** Before starting new video edits, check whether this output was already reviewed/published — don't re-run the skill from scratch on the same source. If these files are still untracked next session, ask whether they should be committed, moved elsewhere, or are just local review copies (large binaries — mind repo size before committing).
