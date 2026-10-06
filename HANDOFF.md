# brotherjimi.com — Build Handoff for Claude Code

> **Status (6 Oct 2026):** the front end is the **lean design**, finished and locked in `site/`.
> `site/` itself is the design source of truth: layout, copy, colours, type and spacing. There is no
> separate design file any more. Build only the back end described below. Run `python3 site/verify.py`
> after every step. See `CLAUDE.md`. Topic pages (section 9a) and language pages need an approved
> design before they are built.

---

## 1. Locked decisions

| Topic | Decision | Why |
|---|---|---|
| Purpose | A counsel and discipleship space where people who want to hear from God draw nearer to Him. | Every page and message serves this. |
| Hero | Type only, no image. Eyebrow "90 Days of Counsel", headline "Will you receive it?", then "To help you draw near to God." / "Free, from Brother Jimi.", the email box ("Start Day 1") and "Your first letter arrives tomorrow at 6:00 AM." "It" means the counsel, so the eyebrow must always sit directly above the headline. Never tie "free" to a time limit. | The question asks for an answer, and the email box is the answer. It means receiving the letters, receiving the word (James 1:21), and for some, receiving Christ (made explicit on /start). The purpose (drawing near to God) is on the first screen; the whole verse closes the page. |
| Hero image | **Removed** (6 Oct 2026). Do not bring it back or add any other image to the hero. | It repeated the headline less clearly and pushed the signup below the fold. |
| "Receive Jesus" | Lives on its own page, /start. Never above the signup form. | Subscribing is not salvation. Believers who want to go deeper must also feel invited. |
| Source wording | "Counsel from Scripture", never "counsel from Jesus". | A message about Scripture is a brother's counsel, not God's voice. |
| Daily content | One short letter each morning from Version C of /teach, written like a mentor typing to one person, with its proof text. | The homepage shows a real letter, set as a letter at reading size. |
| Homepage letter | Fixed sample: "The wall you didn't see". It is hidden behind a 6:00 AM notification ("Mail · Brother Jimi · The wall you didn't see"). Tapping it grows the notification into the full letter, labelled "Sample letter · 90 Days of Counsel"; Close shrinks it back. "I'll do this today" at the end reveals "Amen. Your first letter can be waiting tomorrow at 6:00 AM." with the email box. It never changes daily. | The page stays clean, visitors feel the morning instead of reading about it, and the moment of commitment is the moment of signup. |
| Stages | **Internal only.** Readers never see stages or phases. The team groups readers by engagement. | Avoids a self-help feel. Growth is God's work. The team watches and responds. |
| Money | Stripe monthly partnership only. Never on the homepage. Asked once in the Day 30 email. | No funnel on the spiritual journey. |
| Two tracks | The Journey: 90 days of Version C, each reader starting at their own Day 1. Today: one public letter per day at /today, feeding videos. | Each track does one job. |
| Video hook | "Have you read your Bible today?" opens videos and is the Today email subject line. | Questions stop the scroll. A homepage must welcome. |

---

## 2. Brand mark

- **Wordmark:** "Brother Jimi" in solid ink (#1d1d1f), Inter bold (700), letter-spacing -0.025em, one line. No full stop, no icon. (Chosen 6 Oct 2026.)
- **Signature:** pending. Jimi may supply his real handwritten signature later; that is a design change he must approve. Until then the sign-off is typed.
- **Icon / favicon:** "BJ" in a dark circle.
- **Jimi's photo** (`jimi-avatar.jpg`, circle-cropped, facing the camera, not mirrored) is used only
  where a person is speaking: the email sender avatar and the "Brother Jimi" byline under each letter's title.

## 2b. Routes

| Route | Contents |
|---|---|
| `/` | One story on a white page. (1) The question: "90 Days of Counsel / Will you receive it? / To help you draw near to God. / Free, from Brother Jimi." with signup. (2) "Every morning / Counsel for the day ahead. / A short letter at 6:00 AM, backed with Scripture." then "Tomorrow 6:00" and the notification that opens the sample letter (see Homepage letter). (3) The commitment: "Ninety mornings. / Starting at your own Day 1. Read it slowly. Do what it says. Don't skip a morning." with 90 dots, Day 1 (tomorrow) in wine. No stages or phases. (4) The person: Jimi's photo, "You're not alone. / Reply to any morning letter. A real person reads it, prays for you, and writes back." and "Never received Jesus? Start here ›". (5) The promise: "Your part. His promise. / Draw near to God and He will draw near to you. / James 4:8" with signup and "Always free, for everyone…". Naming rule: "counsel" is what Jimi gives; "letter" is how it arrives. |
| `/today` | **Dynamic:** "Today's Counsel · {date}", today's approved letter set as a letter (subject, photo and name, body, P.S.), then "Who needs this today?" (copy link + WhatsApp) and signup. Where every video, quote card and share link points. |
| `/start` | Receive Jesus: four short steps with Scripture, a prayer, then "Did you pray this today?" with email. Tag these signups `received` and notify the team immediately. **Have a pastor review the wording before launch.** |
| `/welcome?received` | Shown only after "I prayed today" on /start. "Welcome to the family." plus a letter from Jimi ("Before your first letter"), which is also sent immediately as their first email. Jimi's direct address is jimi@brotherjimi.com (set up this mailbox before launch). |
| `/welcome` | After signup: "Check your inbox", then two quiet asks in one column: a private prayer request box, and "Who else needs this?" (WhatsApp + copy link). |
| `/partner` | From the Day 30 email and footer only. $10 / $25 / $50 / $100 / Other monthly via Stripe Checkout (`mode: subscription`). Pray and share offered as equal alternatives. |
| `/privacy` | A plain page in the same style. Include the NIV and NKJV copyright notices and the contact address jimi@brotherjimi.com. **James 4:8 on the homepage is NKJV. Every other Scripture on the site and in every letter is NIV**, the Bible Jimi reads. |
| Contact | No page. The footer link "Contact" opens an email to jimi@brotherjimi.com. |

Support `?ref=<code>` on every route and save it with the signup.

---

## 3. Email automation

```
Signup (double opt-in) → tag: journey  (+ tag: received if from /start)
Day 1 … Day 90: one Version C email per morning at 6:00 AM (local time if the platform allows)
Every email: reply-to is a monitored inbox; one WhatsApp "send to one person" link;
             "Someone sent you this? Start your own Day 1 → brotherjimi.com" at the top
Day 30 email: the partnership invitation (pray, share, or give) → /partner.
              Suppress for readers tagged: partner
After Day 90: remove tag journey, add tag today → receives the daily Today letter
Stripe webhooks → add/remove tag: partner
```

Use a platform with per-subscriber sequences, tags, engagement data and webhooks
(e.g. Kit, MailerLite, Beehiiv). **Confirm current features before choosing.** Substack can't run per-subscriber sequences.
**Platform chosen: MailerLite.** Authenticate the sending domain (SPF, DKIM, DMARC) **before building the
sequences**, so no letter is ever sent from an unauthenticated domain. It is a DNS change: Jimi says yes first.

---

## 4. Internal engagement groups (never shown to readers)

Track per reader: opens, link clicks, replies, prayer requests, shares (via `?ref=`).

| Group | Rule (adjust as you learn) | Team action |
|---|---|---|
| New | Days 1–29 | Pray. Answer every reply personally; the site promises a written reply. |
| Engaged at Day 30 | Opened most emails **and** replied, prayed or shared at least once | Personal call to encourage them. |
| The fold | Engaged readers the team sees Christ working in | Invited into the inner circle: missions, serving, carrying the word. |
| Quiet | Few opens for 14 days | One gentle "still here for you" email. Never shame. |
| Received | Signed up from /start | Contact within 48 hours. |

Build this as tags plus a simple weekly report (CSV or Notion view) the team reviews every Monday.

---

## 5. Content data (Notion)

| Field | Notes |
|---|---|
| Track | Journey / Today |
| Day | 1–90 for Journey |
| Publish date | Today letters |
| Subject | Per LETTER-STYLE.md |
| Body | One letter, 120–200 words, per LETTER-STYLE.md |
| Scripture | Proof text reference (NIV) |
| Shareable line | The closing line, under 15 words |
| Notes | Anything added beyond Jimi's raw message, for approval |
| Quote card | 1080×1350 image |
| Reel | VERSION B link |
| Status | Draft / Approved / Published |

### Prayers (Notion, private)
A second Notion database, **Prayers**, shared with no one but Jimi: Prayer (text), Received (date and time),
Email (if known), Status (New / Prayed / Replied). `/api/prayer` saves each request there and emails it to
Jimi straight away. No Supabase, Firebase or other database: Notion is already the back office.

Notion file URLs expire after about an hour. Copy images to the site's own storage and
cache content (static build or ISR). Never read Notion live on each page view.

---

## 6. Daily pipeline

Every Journey letter is written to `LETTER-STYLE.md` before it reaches Jimi for approval.


Source → /preach → /teach (Version A letter for /today, Version B reel, Version C counsel)
→ approval email to whoisjimi.today@gmail.com → **nothing publishes without approval** →
Notion → site rebuild (/today slots) + email send. Verify each social platform's publishing access before
automating. Where it isn't available, the approval email includes the reel, card and caption ready to post by hand.

---

## 7. Build order

Done: MailerLite chosen, Notion letters database, `/api/subscribe`, Stripe `checkout.session.completed`.

1. Install the lean front end (UPDATE.md). Lock passes; Jimi approves screenshots; deploy on his yes.
2. Daily fill: the /today slots from the approved Today letter.
3. `/api/prayer`: save to the Notion Prayers database + email Jimi.
4. Sending domain in MailerLite (SPF, DKIM, DMARC). DNS change: Jimi's yes first.
5. Journey sequence Days 1–90 in MailerLite, built from approved Notion letters only. Missing days are
   TODO placeholders, set **not to send**, and listed for Jimi. Claude Code never writes a letter.
   Day 30 ask, and graduation to Today after Day 90.
6. `/api/checkout` returns `{url}`; Stripe webhooks for `customer.subscription.updated` and `.deleted`
   (remove tag `partner` when a subscription ends).
7. `received` alert to Jimi within minutes of an "I prayed today" signup.
8. Engagement tags + weekly report.
9. End-to-end test: sign up, run Days 1, 30 and 90 by hand, give $1, cancel, sign up from /start, send a prayer.

Not built: an admin dashboard. Notion is where letters and prayers are managed; MailerLite is where subscribers are seen.

---

## 8. Details to keep exactly

- Wine (#8b2332, hover #9c2a3b) is the only accent colour. It is used for buttons, links and focus rings. No Apple blue, no gold, no yellow. Scripture references are small grey capitals.
- One typeface on every device: Inter, self-hosted in `site/assets/fonts/` (OFL licence) and preloaded. It comes first in the font list because Android and Chrome replace the system-font names with their own fonts. No other fonts.
- One white background on every page. No grey bands, no app mockups, no images except Jimi's photo. The only raised objects are the homepage notification and the letter sheet it opens.
- Stripe Checkout branding (Stripe → Settings → Branding): brand colour and accent colour both `#8B2332`, background white.
- Footer: "© {year} Brother Jimi · Your email is never shared." then Today's Counsel, Start Here, Partner, Privacy, Contact.
- Every page was checked at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 and 1920px wide and with a phone held sideways: no sideways scroll, no text under 12px, tap targets at least 40px.
- Emails are plain, personal letters (one letter per morning, typed like a mentor to one person), not designed newsletters.
- Mobile first. Test at 375, 768 and 1440px. No horizontal scroll. Lighthouse Accessibility ≥ 95.
- The letter on `/today` is sample content until the first daily fill. The homepage letter is fixed.
- Not legal advice: confirm how gifts should be received, receipted and reported where the ministry is based.

## 9. Generated pages (the "Cities we serve" pattern)

One template, many pages, generated from Notion. Every generated page must be true and backed by real content.

### 9a. Topic pages: build now
- Route: `/counsel/<slug>` (e.g. `/counsel/forgiveness`). One page per topic that has **at least one approved letter**.
- Source: a `Topic` field (multi-select) on every Notion letter row. Starting topics, from Jimi's quote sets: Forgiveness, Hearing God's voice, Faith over fear, The power of your words, Spiritual battles, Character, Your thoughts, Purpose, Prayer, Freedom from sin.
- Page template (same design system as /today): eyebrow "Counsel on", headline the topic name, one sentence in Jimi's voice, the best letter on that topic set as a letter, 2 to 4 key verses for the topic (quoted exactly, one translation), other letters on the topic as short links, then "A letter like this, every morning." signup.
- SEO: unique `<title>` ("Bible verses and counsel on forgiveness | Brother Jimi"), meta description, canonical URL, Open Graph image = the letter's quote card, included in the sitemap.
- **Discovery is through search, not the homepage.** Topic pages are not listed on the homepage or in the footer (they will grow into the hundreds). When `/counsel` exists, the footer gets one link, "All Counsel" (a design change Jimi approves), to `/counsel`: a simple index of every published topic, alphabetical, with search once it passes ~30 topics. Every topic page is in the sitemap.
- Never generate filler copy. If a topic has no approved letter, it has no page.

### 9b. Language pages: only when a language's letters exist
- Same generator and template, under `/<lang>/` (e.g. `/fr/`, `/fr/counsel/<slug>`), switched on per language only after that language's Journey letters are human-translated and approved.
- Adds a "Read in" list in the footer, generated from switched-on languages only.

## 10. Languages (after launch, not at launch)

Launch in English only. Prepare now so a second language is a content task, not a rebuild:

- Capture `language` on every signup (default `en`; prefill from the browser language).
- Add a `Language` field to every Notion letter row, and a per-language Journey sequence in the email platform.
- Route by path: `/fr/`, `/tw/`, etc. Each page has `<html lang>` and `hreflang` links.
- Each language quotes a licensed Bible translation in that language (never machine-translate Scripture).
- Every letter is translated by a fluent, believing human and approved by Jimi before it sends. Machine translation may be used for a first draft only.
- Choose the first extra language from data: visitor countries and browser languages in analytics, plus replies asking for it.
- Do not add a translate widget; it breaks the design and mistranslates Scripture.
