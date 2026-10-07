# UPDATE.md: install the design approved by Jimi on 7 October 2026

This replaces the whole front end. What's new:
- **Home:** Jimi's intro video and "What's heavy on your heart?", the reader's six questions, his
  hands holding the Bible (now open at Matthew 11, verse 28 highlighted) with "It's all in here.", the 6:00 letter, ninety mornings, "You'll have a
  brother." with "My story", "Pass it on." and "Are you in?". Warm "morning paper" colours.
- **Sharing:** one-tap rows (WhatsApp opens: send to a chat, post today's video to Status, post
  today's card to Status) on Home and Today.
- **Today:** a "Listen to Jimi read it" voice note player (shown only when there is one).
- **Receive Jesus:** "So Jesus paid the price." now uses 1 Peter 3:18; "Tell me. I'd love to welcome
  you to the family of God."
- **Welcome pages:** "Who came to mind?"; one voice ("I") throughout.
- **Home, calmer:** quiet questions (each becomes a link once its topic page exists), no lines between
  sections, an icon share row, and a hidden "From readers" section (see CLAUDE.md 3b).
- **Daily data:** `today.json` gains `statusVideo` and `voice`; `startedThisMonth` is gone.

Do these steps once, in order, exactly as written. Change, merge or "adapt" nothing. If a step
doesn't fit how the project is set up, **stop and ask Jimi**.

## Step 1. Save the current state
`git status`. Commit any uncommitted work first (including today's daily fill):
`Before 7 Oct design`.
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
3. Screenshots at 390px for Jimi: the top of `/`; the six questions and "It's all in here.";
   "Are you in?"; `/today` with the WhatsApp choices open; `/welcome`.
4. On `/`: tapping the video circle plays Jimi with sound; pausing shows his photo again. The
   6:00 notification opens the sample letter. The email forms still post to `/api/subscribe`.
5. Local test only: put any short MP4 in `statusVideo`, any image in `card` and any `.m4a` in
   `voice` in a local copy of `today.json`. The two Status choices and the voice player appear.
   Then put `today.json` back.
6. Show Jimi the `verify.py` output and the screenshots. Wait for his yes.

## Step 5. Go live
On Jimi's yes in this session: delete any test scripts you created, commit
(`Design of 7 Oct 2026, approved by Jimi`), push and deploy the way the site is already deployed.

## Step 6. From tomorrow
The daily fill now also makes the Status video and saves the voice note (CLAUDE.md section 3.3),
whenever Jimi has uploaded them in Notion. Ask Jimi where in Notion he will upload them before the
first time.

Do not switch to after-launch mode. Jimi has asked to keep the design lock on for now.
