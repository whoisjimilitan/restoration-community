#!/usr/bin/env python3
"""Switch this project from 'build mode' (locked) to 'after launch' (full access).

Run from the project folder:  python3 after-launch/go-live.py
Only run this when Jimi says the site is live and asks for the switch.
"""
import pathlib, shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
KIT = ROOT / "after-launch"

shutil.copyfile(KIT / "CLAUDE.md", ROOT / "CLAUDE.md")
(ROOT / ".claude").mkdir(exist_ok=True)
shutil.copyfile(KIT / "settings.json", ROOT / ".claude" / "settings.json")
for f in ("site/verify.py", "site/design-lock.json"):
    p = ROOT / f
    if p.exists():
        p.unlink()

print("Switched to after-launch mode:")
print("  - CLAUDE.md replaced with the after-launch version")
print("  - .claude/settings.json replaced: design locks removed")
print("  - design lock removed (site/verify.py, site/design-lock.json)")
print("Start a new Claude Code session so the new CLAUDE.md is loaded.")
