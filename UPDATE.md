# UPDATE.md: install the design approved by Jimi on 12 October 2026

This package replaces the whole front end. It includes everything from the 10 October install (described
further down), so install it whether or not 10 October is already live. Run `python3 site/verify.py` first.

New on 12 October:
- **Hero voice note** (HANDOFF section 1, Hero). Jimi's photo in the wine ring now plays a short voice note,
  not a video: a light travels round the ring until it is first played, a pill shows ▶ and the length, and
  while it plays the ring fills and bars round it move with his voice. `site/images/jimi-intro.*` and the
  hero video are gone. The clip in the package is a **placeholder** (an older voice note). When Jimi sends his
  15–20 second welcome, run `python3 tools/set-welcome-voice.py <file>` and then `python3 site/verify.py`.
  Tell Jimi before launch if the placeholder is still there.
- **The answer**: "It's all in here." is now **Jesus said, "I will give you rest."** with MATTHEW 11:28 under it,
  and the yellow marker sweeps "rest." after verse 28 is marked in the Bible.
- **Brother screen**: "A brother, not a brand."
- **Under the hero signup**: "Free · Leave anytime".
- **Dawn screen**: "In your inbox when you wake." **Ninety mornings**: "Read it. Do what it says. Watch what changes." **Brother screen**: "Walk it with me. Reply to any letter. I'll write back." **Brother screen door**: "Have you received Jesus? Receive Him ›".
- **Welcome page** rebuilt: one job (confirm), the reader's own address, an Open-mailbox button, then Day 1 in the 90 dots. No share or prayer form there. The dock drops "Start Day 1" on both welcome pages.
- **Partner**: "The harvest is the Lord's." on its own line under the mission sentence.
- **HANDOFF** has new sections 7b (promises the site makes, each to be made true and tested) and 7c (the 90-day
  arc, inside the letters only), plus question-led titles for topic pages (9a) and "every video links to its
  own day's page" (9-pre). **PIPELINE**: a voice note every day; video when Jimi can, batched weekly.

Deploy only after Jimi says yes in your session and has seen screenshots.

---

## Earlier: the 10 October install (still included)

This replaces the whole front end again. It includes everything since the last install, so it
replaces `brotherjimi-title.zip` and `brotherjimi-today.zip` (if you already installed either, that's
fine: this goes over the top).

What's new:
- **"Today" everywhere** (top bar, footer, dock). Homepage tab title: `Free counsel from the Bible · Brother Jimi`.
- **The counsel page.** `/today` is always the newest counsel, and every day keeps its own page.
  It asks for one thing, the email: Jimi's video as the cover (topic, date with the year, the
  Question), the full share row, then the letter with its first two paragraphs readable and the rest
  blurred behind "Read the rest in your inbox." and **Send it**. Then "More counsel on {topic}".
  New slots: `topic`, `question`. `date` now includes the year ("6 October 2026"). New file:
  `site/today/archive.json`. Signing up there must send that letter at once (CLAUDE.md section 3.1).
- **Captions on Jimi's videos:** a new locked template, `site/design/status-captions.html`. His exact
  spoken words appear a few at a time on the Status video (CLAUDE.md section 3.3).
- **Receive Jesus:** one message per screen as people scroll down; the one in the middle is clear, the
  others fade back. No connecting lines. Each verse is shown under its truth. New wording: "Before you decide,
  know this.", "So Jesus paid the price for your sin by His death on the cross, and rose again." (1 Corinthians 15:3–4), "If you believe this, pray this with me".
- **Home:** a quiet label, "Maybe you're asking", above the six notes; "Before your day begins."; "Read it. Do
  what the Word says."; the "Pass it on." section is gone (sharing now happens where people are moved:
  the sample letter's Amen, every Today video, Welcome), all as the one-tap icon row.
- **`/pray`** ("Let's pray."): a private prayer box anyone can use, no signup, linked from the footer as
  "Prayer". The homepage keeps one doorway only: "Never received Jesus? Receive Him ›".
- **Urgent prayer calls:** after a prayer is sent, people can leave a number (WhatsApp ticked by default)
  so Jimi can call. Back end: CLAUDE.md section 3.1. Notion Prayers gains Phone and WhatsApp.
- **`/beliefs`** ("What I believe", footer link) and the mission as Partner's opening line.
- **`/privacy`**: a new locked page (what's kept, why, how to have it removed, the NIV notice).
- **One type scale** across every page (display, page title, section, sub, body) and more breathing room.
- **Homepage video circle:** a soft wine ripple and a breathing play button until it has been played.
- **Full screen** for Jimi's video on the homepage and in the dock (an expand button while it plays).
- **Breathing fixes** on Welcome and Today.
- **10 October wording:** every footer reads "© {year} Brother Jimi, a servant of Jesus Christ"; the homepage
  description starts with that line; Welcome-to-the-family asks people to read the letter, then confirm; "What I
  believe" opens with Jesus; Receive Jesus ends "I'd love to rejoice with you, and walk with you for 90 mornings."
- **Less is more (10 October):** one menu at a time (the dock steps aside while reading down and at the
  footer); a two-line centred footer (Prayer · What I believe · Partner · Privacy); no label over the six notes,
  which drift in; ninety quiet dots on their own screen; the Bible scene in three beats (notes alone, the Bible rises and takes them in, "It's all in here." centred); one thin line from Day 1 to Day 90 instead of ninety dots; one photo
  of Jimi; headlines rise gently into place; the homepage is six full screens with quiet marks on the left showing where you are; "Ninety mornings.", "You'll have a brother." and "Are you in?" each fill one screen (no snapping). Receive Jesus: one truth per screen with its reference (tap to read
  the verse), "But / So / Now" in wine, four quiet steps on the edge, no verse after the prayer; "I'd love to rejoice with you, and walk with you for 90 mornings."
- **Hero video (10 October):** Jimi's own recording, colour-matched to his photo, replaces the stand-in (`site/images/jimi-intro.webm`, with `jimi-intro.mp4` as the fallback).
- **"Today" dot (10 October):** a small wine dot beside "Today" in the top bar when there is counsel the visitor
  hasn't opened; opening /today clears it until the next one (remembered only in the visitor's browser).
- **Type (10 October): two voices.** Albert Sans for every word Jimi says; Libre Caslon Text italic for Scripture
  only. Three new font files in `site/assets/fonts/`; the lock now covers 27 files (12 October).
- **New file `PIPELINE.md`:** the weekly counsel pipeline. Read it fully, but **do not build it yet** (Step 7).

Do these steps once, in order, exactly as written. Change, merge or "adapt" nothing. If a step
doesn't fit how the project is set up, **stop and ask Jimi**.

## Step 1. Save the current state
`git status`. Commit any uncommitted work first (`Before counsel pages`). Note today's letter: the
inner content of every `data-slot` element in `site/today/index.html`, and `site/today/today.json`.

## Step 2. Replace the front end
1. Delete the project's `site/images/` folder, then copy every file in `brotherjimi-lean/site/` over
   `site/`, **except** `site/assets/config.js` (keep the project's own) and `site/today/YYYY-MM-DD/`
   folders (keep every past day). Use full destination paths.
2. Copy `CLAUDE.md`, `HANDOFF.md`, `UPDATE.md`, `PIPELINE.md`, `LETTER-STYLE.md`, the `after-launch/`
   folder and `.claude/settings.json` into the project root, replacing the old ones.

## Step 3. Today's letter
1. If today's letter is still "The voice you'll hear first" (6 October), leave the new page exactly
   as it comes: its Question and Topic are already set and approved.
2. If a newer approved letter is live, refill `subject`, `date` and `body` exactly as you noted, and
   draft its `question` and `topic` as `PIPELINE.md` section 3.4 says, and write `date` with the year.
   Show Jimi those lines and wait for his yes before Step 6.
3. Write `site/today/today.json` with the keys in CLAUDE.md section 3.3 (now including `question`,
   `topic`, `topicLabel`; `dateLabel` with the year). Leave `site/today/archive.json` as `[]` for now.
4. Run the `prebuild` copy so `public/` matches `site/`.

## Step 4. Favicon (back end, no locked file changes)
Report the status of `/favicon.ico` and `/images/favicon.png` on the live site. If the Next.js project
serves a `favicon.ico` that is not Jimi's face (for example `app/favicon.ico`), replace it with one
made from `site/images/favicon.png` (32×32 and 16×16, image unchanged). If there is none, add one the
same way. Touch no HTML.

## Step 5. Check (test data only; send nothing to real people)
1. `python3 site/verify.py` must print `Design lock OK: all 27 files match the approved design.`
   Run it on the `public/` copy too.
2. No page scrolls sideways at 320px. `/today/archive.json` `/privacy`, `/beliefs` and `/pray` return 200. A test prayer
   from `/pray` reaches the Notion Prayers database (test text only), then a
   test number on the next step is added to that same row and Jimi gets the CALL email.
3. On `/today` at 390px: the topic, date and Question; the share row (the WhatsApp icon opens the
   three choices); the letter with two readable paragraphs, the rest blurred, and "Send it".
   A test signup from `/today` (test address only) lands on `/welcome?letter`, which says today's
   letter follows straight away.
4. Local test only: put any MP4 in `statusVideo` in a local copy of `today.json`. The upright video
   appears with the topic and Question on it (they fade when it plays), and "Listen to Jimi" does not. Remove it and put any `.m4a`
   in `voice`: "Listen to Jimi" appears. Put `today.json` back.
5. Screenshots at 390px for Jimi: the top of `/`; the top of `/today`; the letter and "Send it";
   `/start` on its first screen and on the prayer.

## Step 6. Go live
Show Jimi the `verify.py` output, the screenshots and the favicon findings. On his yes in this session:
delete any test scripts, commit (`Counsel pages, approved by Jimi 10 Oct`), push and deploy.

## Step 7. Wire up the pipeline so it runs on its own
1. Read `PIPELINE.md` from start to finish.
2. **Propose first** (section 8): where the runs will happen and what that costs each month, how each
   key will be kept, and the build steps in order. List exactly what you need from Jimi (section 9)
   and how you'll walk him through each click. Wait for his go.
3. Build it with the dry-run switch **on**.
4. Run one full dry-run week and show Jimi the nine "Done means" checks in section 8.
5. Switch the dry run off only when Jimi says yes in a live session.

Do not switch to after-launch mode. Jimi has asked to keep the design lock on for now.
