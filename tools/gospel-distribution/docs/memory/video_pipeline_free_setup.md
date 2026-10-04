---
name: video-pipeline-free-setup
description: "Free HyperFrames video production pipeline with auto-cleanup and Google Drive backup (Sept 14, 2026)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8d24422f-6d6b-4792-9952-d6e71877bfae
---

# Video Pipeline: Free & Effective Setup

**Date Installed:** September 14, 2026

## Architecture (3 Layers)

### Layer 1: Local Render Cache (Auto-cleanup)
- **Location:** `~/.hyperframes-cache/`
- **Retention:** 7 days (older files auto-delete)
- **Schedule:** Daily 3 AM via cron
- **Script:** `~/.hyperframes-cleanup-cron.sh`
- **Logs:** `~/.hyperframes-cleanup.log`

### Layer 2: Google Drive (Backups)
- **Setup:** One-time auth required (`python3 ~/.hyperframes-drive-upload.py --auth`)
- **Upload script:** `~/.hyperframes-drive-upload.py <source_dir> <folder_name>`
- **Credentials:** `~/.hyperframes-drive-creds.json` (requires manual setup at Google Cloud Console)
- **Storage:** User's free 15GB Google Drive tier

### Layer 3: Git + Restoration-community
- **Sources:** Tracked in git repo
- **Scripts/configs:** Version controlled
- **Documentation:** `restoration-community/VIDEO_PIPELINE.md`

## Key Files

| File | Purpose |
|------|---------|
| `~/.hyperframes-cleanup-cron.sh` | Daily cleanup script |
| `~/.hyperframes-drive-upload.py` | Google Drive uploader |
| `~/.zshrc` | Environment vars (HYPERFRAMES_CACHE_DIR, etc.) |
| `restoration-community/VIDEO_PIPELINE.md` | Complete setup guide |

## Environment Setup

```bash
export HYPERFRAMES_CACHE_DIR="$HOME/.hyperframes-cache"
export HYPERFRAMES_OUTPUT_DIR="$HOME/.hyperframes-cache"
```

(Auto-loaded from ~/.zshrc)

## Disk Space Behavior

- **Before:** 1.3 GB used up locally in <2 weeks
- **After:** ~0 GB persistent (auto-cleans every 7 days)
- **Peak usage:** ~50GB during active rendering (temporary)
- **Never runs out:** Cleanup runs automatically

## Google Drive Setup (One-time)

When ready to enable Drive backups:

```bash
# 1. Go to https://console.cloud.google.com/apis/credentials
# 2. Create OAuth 2.0 Client ID (Desktop app)
# 3. Download to ~/.hyperframes-drive-creds.json
# 4. Run:
python3 ~/.hyperframes-drive-upload.py --auth
# 5. Grant permission in browser
```

Then use:
```bash
python3 ~/.hyperframes-drive-upload.py ~/.hyperframes-cache/exports "HyperFrames Exports"
```

## Status

✅ Auto-cleanup installed and running
✅ Environment variables configured
✅ Google Drive upload script ready (awaiting user auth)
✅ Cron job set up (3 AM daily)

## Why This Works

- **Free:** No paid services (just Google Drive free tier)
- **Automatic:** Runs without user intervention
- **Effective:** Keeps disk clean while preserving finals
- **Recoverable:** Failed renders can re-run; finals backed up
- **Scalable:** Works for any number of projects

## Next: Graphify Integration

The restoration-community graphify graph is being built in background (Sep 14, 2026). Once complete, future conversations can query the graph instead of manually exploring the codebase, saving tokens.

**Graph status:** Check `restoration-community/graphify-out/GRAPH_REPORT.md` when ready.
