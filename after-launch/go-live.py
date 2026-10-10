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

print("Switched to after-launch mode:")
print("  - CLAUDE.md replaced with the after-launch version")
print("  - .claude/settings.json replaced: you may now edit the whole site with Jimi")
print("  - the design lock stays as a check (python3 site/verify.py); re-lock only after Jimi approves a change")
print("Start a new Claude Code session so the new CLAUDE.md is loaded.")
