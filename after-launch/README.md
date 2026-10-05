# After launch: give Claude Code full access

**Easiest:** tell Claude Code "The site is live. Switch to after-launch mode." It runs
`after-launch/go-live.py`, you approve the permission prompt, then start a new session.

**Or do it by hand:**

1. Replace `CLAUDE.md` (in the main project folder) with `after-launch/CLAUDE.md`.
2. Replace `.claude/settings.json` with `after-launch/settings.json`.
3. Optional: delete `site/verify.py` and `site/design-lock.json`. The lock is no longer needed.
4. Start a new Claude Code session so it reads the new rules.

Claude Code can then edit anything on the site with you. It will still ask before pushing
to GitHub or deploying.
