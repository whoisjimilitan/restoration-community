# brotherjimi.com — Build Handoff for Claude Code

> **Status:** the front end is finished and locked in `site/` (pixel-checked against `brotherjimi.html`).
> Build only the back end described below. Run `python3 site/verify.py` after every step. See `CLAUDE.md`.
> Topic pages (section 9a) and language pages need an approved design before they are built.

`brotherjimi.html` is the design source of truth: layout, copy, colors, type and spacing.
It contains five views that become five routes. Before shipping, remove the dark
"Preview" switcher and set `PREVIEW = false`.

---

## 1. Locked decisions

| Topic | Decision | Why |
|---|---|---|
| Purpose | A counsel and discipleship space where people who want to hear from God draw nearer to Him. | Every page and message serves this. |
| Hero | Kicker "The 90-Day Journey". Headline "Draw near to God." (James 4:8, NKJV) Subline "Daily counsel from Scripture, shared by Brother Jimi." Then "Free. One letter each morning for 90 days." Never tie "free" to a time limit; it reads as a trial. | Answers what this is, what you get, and who shares it, without overclaiming. |
| Hero image | Hands holding a burgundy Bible open at James 4, verse 8 "Draw near to God and He will draw near to you" highlighted in yellow. Contained (max 860px), soft fade at the bottom and sides so the arms melt into the white page. The signup bar sits below it, never over it. | The headline is the highlighted verse. The image is AI-generated; two garbled lines were re-set in clean type. If it is ever regenerated, check every line of print before use. |
| "Receive Jesus" | Lives on its own page, /start. Never above the signup form. | Subscribing is not salvation. Believers who want to go deeper must also feel invited. |
| Source wording | "Counsel from Scripture", never "counsel from Jesus". | A message about Scripture is a brother's counsel, not God's voice. |
| Daily content | One short letter each morning from Version C of /teach, written like a mentor typing to one person, with its proof text. | The homepage shows a real letter in a mail app. |
| Stages | **Internal only.** Readers never see stages or phases. The team groups readers by engagement. | Avoids a self-help feel. Growth is God's work. The team watches and responds. |
| Money | Stripe monthly partnership only. Never on the homepage. Asked once in the Day 30 email. | No funnel on the spiritual journey. |
| Two tracks | The Journey: 90 days of Version C, each reader starting at their own Day 1. Today: one public letter per day at /today, feeding videos. | Each track does one job. |
| Video hook | "Have you read your Bible today?" opens videos and is the Today email subject line. | Questions stop the scroll. A homepage must welcome. |

---

## 2. Brand mark

- **Wordmark:** option C. "Brother" in quiet grey (#86868b), "Jimi" in ink (#1d1d1f), system font,
  semibold, on one line. Stacked version ("Brother" over "Jimi") for square spaces such as video corners and profile images.
- **Signature:** pending. Jimi will supply his real handwritten signature; it goes under "Your brother," on /today. Until then the sign-off is typed.
- **Icon / favicon:** "BJ" in a dark circle.
- **Jimi's photo** (`jimi-avatar.jpg`, circle-cropped, facing the camera, not mirrored) is used only
  where a person is speaking: the email sender avatar and the byline on /today.

## 2b. Routes

| Route | Contents |
|---|---|
| `/` | Hero with the held Bible and signup → "Counsel for the day ahead" (the letter "The wall you didn't see", shown in a mail-app mockup) → "You're not alone." (Reply to any morning letter. A real person reads it, prays for you, and writes back.) (a reply window addressed to Brother Jimi) + "Never received Jesus? Start here" → closing promise: eyebrow "His promise to you", headline "He will draw near to you." (the second half of James 4:8, NKJV, which the hero headline opens; never label it "Jesus says", because James wrote it) with signup. Naming rule: "counsel" is what Jimi gives (nav, page names, headings: "Today's Counsel"); "letter" is how it arrives (delivery lines: "Your first letter arrives tomorrow"). |
| `/today` | **Dynamic:** today's approved letter shown in the same mail window as the homepage (avatar, sender, subject, body, P.S.), at real email size. Then share (WhatsApp + copy link) and signup. Where every video, quote card and share link points. |
| `/start` | Receive Jesus: four short steps with Scripture, a prayer, then "Did you pray this today?" with email. Tag these signups `received` and notify the team immediately. **Have a pastor review the wording before launch.** |
| `/welcome?received` | Shown only after "I prayed today" on /start. "Welcome to the family." plus a letter from Jimi ("Before your first letter"), which is also sent immediately as their first email. Jimi's direct address is jimi@brotherjimi.com (set up this mailbox before launch). |
| `/welcome` | After signup: "Check your inbox", private prayer request box, "Who else needs this?" WhatsApp share. |
| `/partner` | From the Day 30 email and footer only. $10 / $25 / $50 / $100 / Other monthly via Stripe Checkout (`mode: subscription`). Pray and share offered as equal alternatives. |
| `/privacy`, `/contact` | Plain pages in the same style. Include the NIV and NKJV copyright notices. **James 4:8 on the homepage (hero, headline, closer) is NKJV. Every other Scripture on the site and in every letter is NIV**, the Bible Jimi reads. |

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
Authenticate the sending domain (SPF, DKIM, DMARC) before the first send.

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

Notion file URLs expire after about an hour. Copy images to the site's own storage and
cache content (static build or ISR). Never read Notion live on each page view.

---

## 6. Daily pipeline

Every Journey letter is written to `LETTER-STYLE.md` before it reaches Jimi for approval.


Source → /preach → /teach (Version A letter for /today, Version B reel, Version C counsel)
→ approval email to whoisjimi.today@gmail.com → **nothing publishes without approval** →
Notion → site rebuild + email send. Verify each social platform's publishing access before
automating. Where it isn't available, the approval email includes the reel, card and caption ready to post by hand.

---

## 7. Build order

1. Choose the email platform (sequences, tags, engagement data, webhooks).
2. Produce and approve Journey Days 1–30 before launch. Keep a two-week buffer after that.
3. Notion database.
4. Site routes from `brotherjimi.html`.
5. Email automation + domain authentication.
6. Stripe Checkout + webhooks.
7. Engagement tags + weekly report.
8. End-to-end test: sign up, run Days 1, 30 and 90 by hand, give $1, cancel, sign up from /start.
9. Launch with the first video pointing to /today.

---

## 8. Details to keep exactly

- Wine (#8b2332, hover #9c2a3b) is the only accent color, taken from the burgundy cover of the Bible in the hero. It is used for buttons, links and focus rings. No Apple blue, no gold. Scripture references are set in slate grey. The only yellow is the highlighter mark inside the hero photo.
- One typeface: the Apple system font on every page. The only serif is the printed text inside the hero Bible image.
- Emails are plain, personal letters (one letter per morning, typed like a mentor to one person), not designed newsletters. Keep the mail-app mockup on `/` showing exactly what arrives.
- Mobile first. Test at 375, 768 and 1440px. No horizontal scroll. Lighthouse Accessibility ≥ 95.
- Replace sample content: the letter on `/today`, the sender name/address/avatar in the mail mockup.
- In `brotherjimi.html` the Start Here view is named `start-here` (because `#start` is the hero anchor). On the live site its route is `/start`.
- The hero is `bible-hero.jpg` (1672×941). Keep it contained (max 860px, so headline, Bible and signup all fit on the first screen of a 1440×900 laptop) with the soft edge fade from `.photo` in `brotherjimi.html`. Do not make it full-bleed, and keep the signup bar below it.
- Not legal advice: confirm how gifts should be received, receipted and reported where the ministry is based.

## 9. Generated pages (the "Cities we serve" pattern)

One template, many pages, generated from Notion. Every generated page must be true and backed by real content.

### 9a. Topic pages: build now
- Route: `/counsel/<slug>` (e.g. `/counsel/forgiveness`). One page per topic that has **at least one approved letter**.
- Source: a `Topic` field (multi-select) on every Notion letter row. Starting topics, from Jimi's quote sets: Forgiveness, Hearing God's voice, Faith over fear, The power of your words, Spiritual battles, Character, Your thoughts, Purpose, Prayer, Freedom from sin.
- Page template (same design system as /today): eyebrow "Counsel on", headline the topic name, one sentence in Jimi's voice, the best letter on that topic shown in the mail window, 2 to 4 key verses for the topic (quoted exactly, one translation), other letters on the topic as short links, then "A letter like this, every morning." signup.
- SEO: unique `<title>` ("Bible verses and counsel on forgiveness | Brother Jimi"), meta description, canonical URL, Open Graph image = the letter's quote card, included in the sitemap.
- **Discovery is through search, not the homepage.** Topic pages are not listed on the homepage or in the footer (they will grow into the hundreds). The footer has one link, "All Counsel", to `/counsel`: a simple index of every published topic, alphabetical, with search once it passes ~30 topics. Every topic page is in the sitemap.
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
