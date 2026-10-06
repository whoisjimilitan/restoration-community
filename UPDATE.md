# UPDATE.md: Start Here and small text fixes (approved by Jimi, 6 Oct 2026)

What changes on the site:
- **Home:** "Ninety mornings." now reads "Read it. Do what it says." ("Don't skip a day." removed).
- **Start Here:** "Receive Jesus." / "It's the most important decision you'll ever make." (the tag
  "If you haven't yet" is removed). One truth per screen; each shows only its reference, and
  tapping it opens the verse. The fourth truth is now John 1:12. Romans 10:9 sits under the prayer.
- **Welcome (after praying):** "Give it the next 30 days and don't skip a morning." becomes
  "Give God ninety mornings." (the journey is 90 days).
- The after-launch kit is updated to match the live site (only used when Jimi asks to switch).

Do these steps once, in order, exactly as written. Change, merge or "adapt" nothing.

## Step 1. Save the current state
`git status`. Commit any uncommitted work first (including today's daily fill):
`Before Start Here update`.

## Step 2. Copy exactly these files from `brotherjimi-lean/` over the project's own
- `site/index.html`
- `site/start/index.html`
- `site/welcome/received/index.html`
- `site/assets/styles.css`
- `site/design-lock.json`
- `after-launch/` (the whole folder)
- `HANDOFF.md` and `UPDATE.md`

**Do not copy anything else.** In particular, keep the project's own `site/today/index.html`,
`site/today/today.json`, `site/today/YYYY-MM-DD/` pages and `site/assets/config.js`: they hold
today's letter and your settings. Then run the `prebuild` copy so `public/` matches `site/`.

## Step 3. Check
1. `python3 site/verify.py` must print `Design lock OK: all 18 files match the approved design.`
2. Screenshots at 390px for Jimi:
   - `/start`: the first screen ("Receive Jesus." and the decision line, nothing above it);
     the "God loves you." screen with the John 3:16 pill tapped open; the prayer with the
     Romans 10:9 pill under it.
   - `/`: the "Ninety mornings." section.
3. On `/start`, "I prayed today" still posts to `/api/subscribe` with `source: "received"`.
4. Wait for Jimi's yes. Then commit (`Start Here: one truth per screen, John 1:12, Romans 10:9`),
   push and deploy the way the site is already deployed.

Do not switch to after-launch mode. Jimi has asked to keep the design lock on for now.
