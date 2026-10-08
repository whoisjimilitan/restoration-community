# UPDATE.md: install the design approved by Jimi on 8 October 2026

This replaces the whole front end. What's new since the 7 October package:
- **Hero:** "Bring it to Jesus." / "Receive counsel from the Bible, every morning for 90 days." and
  the signup. Nothing else.
- **The answer:** the six questions are now folded notes; as you scroll they are carried into Jimi's
  hands holding the Bible and land on Matthew 11:28, then "It's all in here." New questions and
  slugs (CLAUDE.md 3b): `breaking-cycles` replaces `your-thoughts-and-mind`.
- **Breathing:** more space under Welcome's opening; the prayer request box is centred; no stray
  line above "Who needs this today?" on Today.
- **No clock times in the wording:** "Every morning at dawn.", "tomorrow morning" (the send time
  stays 6:00 AM).
- **"Ninety mornings." / "Read it. Do what it says."**, "Never received Jesus? Receive Him ›",
  "Are you in? / Your Day 1 is tomorrow."
- **Link previews:** new `images/og.jpg` and descriptions: "Bring it to Jesus."
Everything else (sharing, Today, Receive Jesus, Welcome, Partner, daily data) is as in the 7 October
package.

Do these steps once, in order, exactly as written. Change, merge or "adapt" nothing. If a step
doesn't fit how the project is set up, **stop and ask Jimi**.

## Step 1. Save the current state
`git status`. Commit any uncommitted work first (including today's daily fill):
`Before 8 Oct design`.
Note today's letter: the inner content of the `data-slot` elements in `site/today/index.html`, and
`site/today/today.json`. You will put them back in Step 3.

## Step 2. Replace the front end
1. Delete the project's `site/images/` folder, then copy every file in `brotherjimi-lean/site/` over
   `site/`, **except** `site/assets/config.js` (keep the project's own) and
   `site/today/YYYY-MM-DD/` folders (keep every past day). Use full destination paths.
2. Copy `CLAUDE.md`, `HANDOFF.md`, `UPDATE.md`, `LETTER-STYLE.md`, the `after-launch/` folder and
   `.claude/settings.json` into the project root, replacing the old ones.

## Step 3. Put today's letter back
1. In the new `site/today/index.html`, refill only the inner content of `data-slot="subject"`,
   `data-slot="body"` and `data-slot="date"` with today's letter, exactly as you noted in Step 1.
2. Write `site/today/today.json` with today's values and the keys in CLAUDE.md section 3.3:
   `date, dateLabel, subject, line, url, video, poster, card, statusVideo, voice`. Use `""` for
   `statusVideo` and `voice` until Jimi uploads them. Do not keep `startedThisMonth`.
3. Run the `prebuild` copy so `public/` matches `site/`.

## Step 4. Check (test data only; send nothing to real people)
1. `python3 site/verify.py` must print `Design lock OK: all 21 files match the approved design.`
   Run it on the `public/` copy too.
2. `/images/jimi-intro.mp4`, `/images/bible-hero.jpg`, `/images/bible-hero-2x.jpg`,
   `/today/today.json`, `/voices.json` return 200 (`/counsel/index.json` may be 404 until a topic page exists; that is fine). No page scrolls sideways at 320px.
3. Screenshots at 390px for Jimi: the top of `/`; the six notes, then mid-scroll as they go into the
   Bible, then "It's all in here."; the same at 1366×768 (everything must fit on screen);
   "Are you in?"; `/today` with the WhatsApp choices open; `/welcome`.
4. On `/`: tapping the video circle plays Jimi with sound; pausing shows his photo again. The
   phone notification opens the sample letter. The email forms still post to `/api/subscribe`.
5. Local test only: put any short MP4 in `statusVideo`, any image in `card` and any `.m4a` in
   `voice` in a local copy of `today.json`. The two Status choices and the voice player appear.
   Then put `today.json` back.
6. Show Jimi the `verify.py` output and the screenshots. Wait for his yes.

## Step 5. Go live
On Jimi's yes in this session: delete any test scripts you created, commit
(`Design of 8 Oct 2026, approved by Jimi`), push and deploy the way the site is already deployed.

## Step 6. From tomorrow
The daily fill now also makes the Status video and saves the voice note (CLAUDE.md section 3.3),
whenever Jimi has uploaded them in Notion. Ask Jimi where in Notion he will upload them before the
first time.

Do not switch to after-launch mode. Jimi has asked to keep the design lock on for now.
