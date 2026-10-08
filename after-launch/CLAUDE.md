# CLAUDE.md: working on brotherjimi.com with Jimi (after launch)

The site is live. You now work on all of it with Jimi: front end, back end, content and new
pages. Jimi leads. You build what he asks for, and you bring ideas and honest critique when
they help. The approved design (6 October 2026) is the standard every change is held to.

## 1. How we work
1. For anything bigger than a small fix, describe your plan in a few lines (the exact files)
   and wait for Jimi's "go".
2. Show the result before it ships: screenshots at 390px and 1440px for anything visual.
3. Never publish, deploy, push, send email to real people, charge a card or change DNS without
   Jimi saying yes in this session.
4. Commit each approved change separately, so any change can be undone.
5. Never invent Scripture, testimonies, letters, prayers or numbers. Missing content becomes a
   TODO and a note to Jimi. You never write letters; they come approved from Notion.

## 2. The design lock stays, as a seatbelt
`site/verify.py` still checks the approved front end. It no longer blocks you; it tells you and
Jimi exactly what changed.
- Run `python3 site/verify.py` before every commit and paste its output in your report.
- The daily fill (section 4) must always pass it. If it fails after a daily fill, you changed
  something you shouldn't have: undo it.
- When Jimi asks for a design change: make it, show him the screenshots and the `verify.py`
  output (which lists the changed files). Only after he says yes to that change, run
  `python3 site/verify.py --lock` and commit the change and the lock together.
- Never run `--lock` to make a failure go away.

## 3. The design system (keep every change consistent with it)
- Read `site/` first. It is the reference for any new page: reuse its CSS classes and
  components before creating new ones.
- One accent colour: wine `#8b2332` (hover `#9c2a3b`) on a warm "morning paper" ground: paper
  `#fbf7f0`, band `#f3ece1`, ink `#231b17`, slate `#6d625b`, hairline `#e9e0d3`. Letters sit on
  white, like paper. No other colours.
- One typeface on every device: Inter, self-hosted (`site/assets/fonts`). No other fonts.
- Less is more: one idea per section, generous spacing, short lines. Never add scripts,
  analytics, cookie bars, chat or translate widgets, pop-ups, frameworks or minifiers.
- The homepage story is fixed, in this order: Jimi's intro video and "Bring it to Jesus." (the hero
  does only this) → the reader's six questions as notes, carried into Jimi's hands holding the Bible
  (highlighter on Matthew 11:28) → "It's all in here." → "Every morning at dawn." (the phone and the
  sample letter) → "Ninety mornings. / Read it. Do what it says." → "You'll have a brother." →
  "Pass it on." → "Are you in? / Your Day 1 is tomorrow." Never promise a clock time in the wording. Don't add, remove or reorder sections
  without Jimi.
- The hero photo is Jimi's own hands. Never crop, compress, retouch or replace
  `images/bible-hero.jpg` or `images/bible-hero-2x.jpg`.
- Scripture: NIV everywhere, except the printed pages in the hands photo, which are KJV.
- Letters are always shown as real emails, at reading size, and follow `LETTER-STYLE.md`.
- Naming: "counsel" is what Jimi gives (nav, page names, headings); "letter" is how it arrives.
  Always "Brother Jimi", never "BJ".
- The monthly counter shows only the real MailerLite number, and only from 50 up. Never
  estimate, round up, seed or invent it.

## 4. Every day and every week
1. **Today's Counsel, every day,** from the approved Notion letter (Track = Today, Publish date =
   today, Status = Approved). Each morning, before 6:00 AM Ghana time:
   - In `site/today/index.html` change only the inner content of `data-slot="subject"`,
     `data-slot="body"` and `data-slot="date"` (the letter's date, e.g. `Tuesday 6 October`).
     The homepage letter is fixed. Never change it.
   - The body uses exactly this markup and nothing else:
     ```html
     <p>A paragraph.</p>
     <p class="vs">“The verse, word for word.” <cite>Book 1:1</cite></p>
     <p class="sign">Your brother,<br>Jimi</p>
     <p class="ps">P.S. …</p>
     ```
   - Write `site/today/today.json` (the only other file you fill daily) with exactly these keys:
     `date` (YYYY-MM-DD), `dateLabel` ("Tuesday 6 October"), `subject`, `line` (the shareable line),
     `url` (`/today/YYYY-MM-DD`), `video` (path to today's video, or `""` if there is none),
     `poster` (path to the video's still image, or `/images/jimi-avatar.jpg`).
     `card`: today's WhatsApp Status card (see below), or `""`.
     `statusVideo`: today's Status video (see below), or `""`.
     `voice`: today's voice note of Jimi reading the letter (see below), or `""`.
     Any key left `""` simply hides that item on the site (the Today bubble, the "Post to your
     Status" choices, the "Listen to Jimi read it" player). That is correct. Never fill one with
     anything Jimi didn't give you.
   - Save the filled page as a permanent copy at `/today/YYYY-MM-DD/index.html`. In that copy only,
     set `og:title` to the subject, `og:description` to the shareable line and `og:url` to the
     permanent address. Never delete or change a past day's copy.
   - Today's video (uploaded by Jimi in Notion): make it square, 480×480, H.264 MP4, no larger
     than 3 MB, with a still image (`.jpg`) from its first second as the poster. Never add music,
     text or effects to this round version.
   - Today's Status video, made from the same video as Jimi uploaded it (vertical 9:16):
     scale to 576×1024, H.264 MP4, no larger than 3 MB. Lay `site/design/status-nametag.html`
     (rendered as a transparent PNG) over the whole video, and add `site/design/status-endcard.html`
     (rendered as a PNG) as the last 3 seconds, silent. Nothing else: no music, effects or other
     text. Captions only when Jimi supplies the exact words in Notion. Save it as
     `/today/YYYY-MM-DD/status.mp4` and put that path in `today.json` → `statusVideo`.
   - Today's voice note (uploaded by Jimi in Notion, him reading the letter): AAC `.m4a`, mono,
     64 kbps, no larger than 3 MB, never edited beyond trimming silence at the start and end. Save it
     as `/today/YYYY-MM-DD/voice.m4a` and put that path in `today.json` → `voice`.
   - Today's Status card: render `site/design/status-card.html` with only `{{dateLabel}}` and
     `{{line}}` replaced (HTML-escaped) at exactly 1080×1920, save it as
     `/today/YYYY-MM-DD/card.png`, and put that path in `today.json` → `card`. Change nothing else
     in the template. Show Jimi the first one before publishing it.
   - Run `python3 site/verify.py` before publishing. If there is no approved letter for today,
     leave yesterday's in place and email Jimi.
2. **Measure, weekly, in plain words for Jimi:** visitors, signups (and visitors → signups),
   arrivals from shared links (`?ref=share`), prayers received. No analytics scripts on the site:
   read these from the server logs, MailerLite and Notion.

## 5. Reference
- `HANDOFF.md`: the plan and decisions behind the site (email automation, Notion, payments,
  engagement groups, build order).
- `LETTER-STYLE.md`: how every letter is written.
- `site/`: the approved design. `site/verify.py`: what has changed since Jimi last approved it.
