# UPDATE.md: install the final homepage design (approved by Jimi, 6 Oct 2026)

This replaces the lean design that is live now. It adds the moment of receiving (the phone at
6:00), the Today bubble with Jimi's daily video, sharing, a page for every day, and link-preview
cards. Do these steps once, in order, exactly as written. Change, merge or "adapt" nothing. If a
step doesn't fit how the project is set up, **stop and ask Jimi**.

## Step 1. Save the current state
`git status`. Commit any uncommitted work first: `Before final homepage design`.

## Step 2. Replace the front end
1. Copy every file in this update's `site/` folder over the project's `site/` folder, **except
   `site/assets/config.js`** (keep the project's own).
2. `site/today/today.json` is new. Copy it as it is; from tomorrow you fill it each morning
   (CLAUDE.md section 3.3). Its `video` is empty, so the face in the dock simply links to /today
   until Jimi's first video. That is correct.
3. New images: `site/images/og.jpg` (link-preview card), `site/images/favicon.png` and `site/images/apple-touch-icon.png` (Jimi's face as the site icon). Delete `site/images/icon.svg` if it exists.
4. Keep all back-end code. Keep the `prebuild` copy of `site/` into `public/` and run it now.
5. Serve `site/404.html` as the site's not-found page (in Next.js: copy it to `public/404.html`, which the `prebuild` copy already does, or add `pages/404.js` that returns that file unchanged). Then in `next.config.js`, add one rewrite to the existing list so each day's permanent page works:
   `/today/:date` → `/today/:date/index.html`. Change nothing else.

## Step 3. Replace the rule files
Copy `CLAUDE.md`, `HANDOFF.md`, `LETTER-STYLE.md`, `UPDATE.md`, `.claude/settings.json` and the
`after-launch/` folder into the project root, replacing the old ones.

## Step 4. Check (send nothing to real people; test data only)
1. `python3 site/verify.py` must print: `Design lock OK: all 16 files match the approved design.`
2. Each of `/`, `/today`, `/start`, `/welcome`, `/welcome/received`, `/partner` sends byte for byte
   the HTML in `site/`. `/today/today.json`, `/images/og.jpg`, `/images/favicon.png` and `/images/apple-touch-icon.png` return 200.
3. Screenshots of all six pages at 390px and 1440px wide, and no page scrolls sideways at 320px.
4. On `/` at 390px:
   - the phone shows 5:59, the dawn rises, it turns 6:00 and the notification arrives (about 3 s);
   - tapping the notification opens the letter; "I'll do this today" shows "Amen", **Send this to
     someone** and the email box;
   - the email box in the floating bar posts to `/api/subscribe` and goes to `/welcome`.
5. Test the dock locally only: on `/` it is hidden at the top and rises once the signup bar has
   scrolled away. Put any short MP4 path in a local copy of `today.json`: the face gets a wine
   ring and tapping it plays the round video. Then put
   `today.json` back exactly as shipped.
6. On `/today`: "Write to Jimi" posts to `/api/prayer`; "I'll do this today" shows the share button.
7. Show Jimi the `verify.py` output and the screenshots. Wait for his yes.

## Step 5. Go live
On Jimi's yes in this session: commit (`Final homepage design, approved by Jimi 6 Oct 2026`),
push and deploy the way the site is already deployed. Open the live `/` and `/today` and confirm
they match the screenshots.

## Step 6. Tell Jimi to start a new Claude Code session
Then continue with HANDOFF.md section 7, step 2 (the daily fill), with a short plan first.
