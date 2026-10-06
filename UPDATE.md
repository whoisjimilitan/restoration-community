# UPDATE.md: Start Here story and "Receive Jesus" label (approved by Jimi, 6 Oct 2026)

What changes on the site:
- **Start Here reads as one story:** "God loves you." / "But sin keeps you from Him." /
  "So Jesus paid the price." / "Now receive Him by faith." Under the prayer form:
  "Tell us. We'll welcome you into the family of God."
- **The menu label "Start Here" becomes "Receive Jesus"** in the dock and the footer of every
  page, so it is never confused with "Start Day 1". The address stays `/start`. On phones under
  400px wide the dock hides "Home" (the top bar already links home) so it fits.

Do these steps once, in order, exactly as written. Change, merge or "adapt" nothing.

## Step 1. Save the current state
`git status`. Commit any uncommitted work first (including today's daily fill):
`Before Receive Jesus label update`.

## Step 2. Copy exactly these files from `brotherjimi-lean/` over the project's own
Use the full destination path for every file (for example
`cp brotherjimi-lean/site/welcome/received/index.html site/welcome/received/index.html`).
- `site/index.html`
- `site/start/index.html`
- `site/welcome/index.html`
- `site/welcome/received/index.html`
- `site/partner/index.html`
- `site/404.html`
- `site/assets/styles.css`
- `site/design-lock.json`
- `HANDOFF.md` and `UPDATE.md`

## Step 3. Today's page: do NOT copy it
`site/today/index.html` holds today's letter, so don't overwrite it. Instead, in the project's own
`site/today/index.html`, change exactly two things and nothing else:
1. In the dock: `<a class="dk-link" href="/start">Start Here</a>` becomes
   `<a class="dk-link" href="/start">Receive Jesus</a>`
2. In the footer: `<a href="/start">Start Here</a>` becomes `<a href="/start">Receive Jesus</a>`

Leave past days' pages (`site/today/YYYY-MM-DD/`), `today.json` and `config.js` as they are.
Then run the `prebuild` copy so `public/` matches `site/`.

## Step 4. Check
1. `python3 site/verify.py` must print `Design lock OK: all 18 files match the approved design.`
   (If `today/index.html` fails, the two edits in Step 3 differ by a character: compare them with
   `brotherjimi-lean/site/today/index.html`, outside the `data-slot` parts.)
2. `/today` still shows today's letter, not the sample.
3. Screenshots at 390px for Jimi: `/start` "But sin keeps you from Him." screen with the dock
   visible (showing "Receive Jesus"), and the bottom of `/start` ("Tell us. We'll welcome you into
   the family of God."). Also the dock at 360px wide: it must fit inside the screen.
4. Wait for Jimi's yes. Then delete any test scripts you created, commit
   (`Start Here as one story; menu label Receive Jesus`), push and deploy.

Do not switch to after-launch mode. Jimi has asked to keep the design lock on for now.
