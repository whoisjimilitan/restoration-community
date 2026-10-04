---
name: deletion-safety-first
description: Never delete files without explicit confirmation; only safe temporary caches
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0d6ab5d8-23c1-404f-bb7e-4ec306fa661b
---

**Rule:** Never delete files or run cleanup commands without explicit user confirmation first. Only delete definitively safe, temporary, regenerable caches (browser cache, npm cache). Never touch system directories, app support files, or Library contents without asking.

**Why:** Deleting the wrong things can break the entire system and destroy irreplaceable data. The Library folder contains critical preferences, credentials, and app data.

**How to apply:** 
- Before ANY rm/delete command: ask which specific files/folders and confirm the user wants it deleted
- Suggest cleanup targets, don't execute them
- Only execute if user explicitly says "yes, delete X"
- Stick to proven safe categories: browser caches, build artifacts (Xcode DerivedData), package manager caches
- When in doubt, ask
