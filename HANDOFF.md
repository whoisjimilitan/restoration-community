# brotherjimi.com — Build Handoff for Claude Code

> **Status (7 Oct 2026):** the front end is the **design approved on 7 October**, finished and locked in `site/`.
> `site/` itself is the design source of truth: layout, copy, colours, type and spacing. There is no
> separate design file any more. Build only the back end described below. Run `python3 site/verify.py`
> after every step. See `CLAUDE.md`. Topic pages (section 9a) and language pages need an approved
> design before they are built.

---

## 1. Locked decisions

| Topic | Decision | Why |
|---|---|---|
| Purpose | A counsel and discipleship space where people who want to hear from God draw nearer to Him. | Every page and message serves this. |
| Hero | Jimi's round intro video (`images/jimi-intro.mp4`; his photo shows until it is tapped, a soft wine ring pulses until it is played, pausing returns to the photo), then "What's heavy on your heart?", then "Receive a letter of counsel from the Bible, every morning for 90 days.", then the floating bar: "Your first letter arrives tomorrow at 6:00 AM. / From Brother Jimi." with the email box and "Start Day 1". | The visitor brings their own burden; the letter is how a brother helps with it. |
| The answer | Next section: the reader's own six questions, in their voice ("Can I forgive the one who hurt me?", "Is God speaking to me?", "Will fear always hold me back?", "Why can't I quiet my mind?", "What is my life really for?", "How do I find victory over lust?"), then **Jimi's hands holding out the Bible** rising gently into place, the highlighter sweeping Matthew 11:28, "Come unto me, all ye that labour and are heavy laden, and I will give you rest." (KJV, public domain; the pages are re-set exact KJV Matthew 11:1 to 12:11), which answers "What's heavy on your heart?", then "It's all in here." `bible-hero.jpg` (phones) and `bible-hero-2x.jpg` (large screens) are final: never crop, compress, retouch or replace them. | Burden first, then the Word, then the answer. |
| "Receive Jesus" | Lives on its own page, /start. Never above the signup form. | Subscribing is not salvation. Believers who want to go deeper must also feel invited. |
| Source wording | "Counsel from Scripture", never "counsel from Jesus". | A message about Scripture is a brother's counsel, not God's voice. |
| Daily content | One short letter each morning from Version C of /teach, written like a mentor typing to one person, with its proof text. | The homepage shows a real letter, set as a letter at reading size. |
| Homepage letter | Fixed sample: "The wall between you and God" (the title names God so the tone is set at once; the letter's closing line echoes it). Tapping the notification grows it into the full letter, labelled "Sample letter · 90 Days of Counsel"; Close shrinks it back. At the end, "I'll do this today" reveals "Amen. Who else needs this today?" with **Send this to someone**, then "And your first letter can be waiting tomorrow at 6:00 AM." with the email box. It never changes daily. | People share at the moment the letter lands, and the moment of commitment is also the moment of signup. |
| Today in the dock | The dock's first item is Jimi's face with "Today". When there is a video for the day (`/today/today.json`), the face gets a wine story ring and tapping it plays his short round video (progress ring around it), with the date, today's title and line, **Read today's letter** and **Send to someone**. With no video it simply goes to /today. | One object does two jobs: navigation and the daily face that builds trust. |
| Sharing | One-tap rows (WhatsApp · Facebook · X · Telegram · Copy link · More…) on the homepage ("Pass it on.") and on /today (top and after the letter). Tapping WhatsApp opens three choices: Send to a chat, Post today's video to your Status, Post today's card to your Status (the last two appear only when `today.json` has them). The text uses today's line: "This morning's letter from Brother Jimi: “{line}” Start your 90 mornings:" plus the link with `?ref=share`. Each day's letter has its own permanent page `/today/YYYY-MM-DD`. | Remove every step between "this helped me" and "I sent it". |
| Stages | **Internal only.** Readers never see stages or phases. The team groups readers by engagement. | Avoids a self-help feel. Growth is God's work. The team watches and responds. |
| Money | Stripe monthly partnership only. Never on the homepage. Asked once in the Day 30 email. | No funnel on the spiritual journey. |
| Two tracks | The Journey: 90 days of Version C, each reader starting at their own Day 1. Today: one public letter per day at /today, feeding videos. | Each track does one job. |
| Video hook | "Have you read your Bible today?" opens videos and is the Today email subject line. | Questions stop the scroll. A homepage must welcome. |

---

## 2. Brand mark

- **Wordmark:** "Brother Jimi" in solid ink (#1d1d1f), Inter bold (700), letter-spacing -0.025em, one line. No full stop, no icon. (Chosen 6 Oct 2026.)
- **Signature:** pending. Jimi may supply his real handwritten signature later; that is a design change he must approve. Until then the sign-off is typed.
- **Icon / favicon:** Jimi's face, circle-cropped (`/images/favicon.png`, `/images/apple-touch-icon.png`).
- **Navigation:** the top bar shows Jimi's face and "Brother Jimi" on the left (links home) and "Today's Counsel" on the right (frosted glass, sticky), so video viewers reach today's message from the first screen. All moving around happens in **the dock**: one floating dark-glass bar at the bottom centre of every page with Jimi's face + "Today", "Home", "Receive Jesus" (links to /start) and a wine "Start Day 1" pill. Under 400px wide, "Home" is hidden (the top bar links home). The current page is highlighted. On the homepage the dock rises into view only once the hero signup bar has scrolled away.
- **Colours:** warm "morning paper": paper `#fbf7f0`, band `#f3ece1`, ink `#231b17`, slate `#6d625b`, wine `#8b2332`. Letters sit on white. The 6:00 band runs from night to dawn.
- **Jimi's photo** (`jimi-avatar.jpg`, circle-cropped, facing the camera, not mirrored) is used only
  where a person is speaking: the email sender avatar and the "Brother Jimi" byline under each letter's title.

## 2b. Routes

| Route | Contents |
|---|---|
| `/` | (1) **The question** (hero). (2) **The answer**: the six questions, the Bible in Jimi's hands, "It's all in here." (3) **How it reaches you**, dawn band: "Every morning at 6:00." and the phone: 5:59 turns 6:00 and the notification arrives; a soft tap ripple shows it opens; tapping it opens the sample letter "The wall between you and God", with "I'll do this today" → Amen, share, signup. (4) **"Ninety mornings."** / "Read it. Do what it says.", 90 dots, and the titles of approved letters drifting by. (5) **"You'll have a brother."** / "Reply to any letter. I read it, pray for you, and write back.", the "My story" pill (Jimi's two sentences) and the button "Never received Jesus? Start here ›". (6) **"Pass it on."** (7) **"Are you in?"** / "Commit to ninety mornings of counsel. Your Day 1 is tomorrow." and the signup. No counter. |
| `/today` | **Dynamic:** the share row, "Today's Counsel · {date}", the letter **shown as a real email** (subject, sender row, "Listen to Jimi read it" when there is a voice note, the text, verse, sign-off, P.S., Reply and Forward), "Who needs this today?" with the share row, then "A letter like this, every morning." and the signup. Jimi's round video for the day sits above when there is one. |
| `/start` | One message per screen, on one path down to the prayer. First screen: "Receive Jesus." / "It's the most important decision you'll ever make." (nothing else). Then four truths, each alone on its own screen with only its reference as a small wine pill; tapping the pill opens the verse (NIV) beneath it: read as one story: "God loves you." (John 3:16) / "But sin keeps you from Him." (Romans 3:23) / "So Jesus paid the price." (1 Peter 3:18) / "Now receive Him by faith." (John 1:12, "to all who did receive him… he gave the right to become children of God", which leads to "Welcome to the family"). Each truth rises gently into view as you scroll (none with reduced motion). A thin wine line with a dot at each truth joins them and runs into the prayer, set in white on the dawn band, with Romans 10:9 as a pill beneath it (declare "Jesus is Lord", believe God raised him from the dead). Then "Did you pray this today? / Tell me. I'd love to welcome you to the family of God." with email and "I prayed today". Tag these signups `received` and notify Jimi immediately. **Have a pastor review the wording before launch.** |
| `/welcome?received` | Shown only after "I prayed today" on /start. "Welcome to the family." plus a letter from Jimi ("Before your first letter"), which is also sent immediately as their first email. Jimi's direct address is jimi@brotherjimi.com (set up this mailbox before launch). |
| `/welcome` | After signup: "You're in / Check your inbox.", then "Who came to mind? / Someone you know needs this too. Send them their Day 1." (copy link + WhatsApp), then the private prayer request box ("I'll pray with you"). |
| `/partner` | From the Day 30 email and footer only. $10 / $25 / $50 / $100 / Other monthly via Stripe Checkout (`mode: subscription`). Pray and share offered as equal alternatives. |
| `/privacy` | A plain page in the same style. Include the NIV copyright notice and the contact address jimi@brotherjimi.com. **The Bible pages in the homepage photo are KJV (public domain). Every other Scripture on the site and in every letter is NIV**, the Bible Jimi reads. |
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

### What every email looks like (the product itself)
Each morning's email must look exactly like the letter on the site: a personal letter, not a newsletter.
- From: **Brother Jimi** `<jimi@brotherjimi.com>`; reply-to the same monitored address.
- Subject: the letter's subject, nothing added (no "Day 12:", no emoji, no brackets).
- Body: plain, left-aligned text in the reader's own email font, 16px, normal line spacing. No banner, logo, header image, colours, buttons, columns or boxes. The verse is an ordinary paragraph in quotation marks (italic is fine) with its reference straight after. Sign-off "Your brother,<br>Jimi" and the P.S. exactly as written.
- After the letter, one quiet grey line: **Read on the web · Send to someone · Unsubscribe** (web = the day's permanent page; Send to someone = a WhatsApp link to it with `?ref=share`).
- Test every template in Gmail (Android and web), Apple Mail (iPhone) and Outlook before the first send, and show Jimi screenshots.

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
| Video | Jimi's short morning video for the day (Today track): portrait or square, 30–60 seconds, recorded on his phone |

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
2. Daily fill (CLAUDE.md section 3.3): the /today slots, `today/today.json`, the permanent day page with its own preview card, and the day's video made small for mobile data.
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

10. Weekly numbers for Jimi: visitors, signups, arrivals from shared links, prayers.
11. WhatsApp Status card (designed and locked: `site/design/status-card.html`): each morning a 1080×1920 image of the day's line with Jimi's face, the date and brotherjimi.com. It travels with every Forward / Send this to someone on phones that can share images, ready for WhatsApp Status. No extra button.

Not built: an admin dashboard. Notion is where letters and prayers are managed; MailerLite is where subscribers are seen.

---

## 8. Details to keep exactly

- Wine (#8b2332, hover #9c2a3b) is the only accent colour. It is used for buttons, links and focus rings. No Apple blue, no gold, no yellow. Scripture references are small grey capitals.
- One typeface on every device: Inter, self-hosted in `site/assets/fonts/` (OFL licence) and preloaded. It comes first in the font list because Android and Chrome replace the system-font names with their own fonts. No other fonts.
- Homepage rhythm: white hero, dark dawn band (Ninety mornings), soft grey band (#f5f5f7, the person), white promise. Other pages stay white. No images except Jimi's photo; the phone is drawn in CSS.
- Stripe Checkout branding (Stripe → Settings → Branding): brand colour and accent colour both `#8B2332`, background white.
- Footer: "© {year} Brother Jimi · Your email is never shared." then Today's Counsel, Receive Jesus, Partner, Privacy, Contact.
- Every page was checked at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 and 1920px wide and with a phone held sideways: no sideways scroll, no text under 12px, tap targets at least 40px.
- Emails are plain, personal letters (one letter per morning, typed like a mentor to one person), not designed newsletters.
- On the site, every letter (homepage sample, /today, /welcome/received) is shown as a real email. The homepage sample has no Reply/Forward buttons: its one path is "I'll do this today" → share → signup, at real email sizes: no indented or bordered quotes, no small grey P.S., no magazine headings. What people see on the site is what arrives in their inbox.
- Mobile first. Test at 375, 768 and 1440px. No horizontal scroll. Lighthouse Accessibility ≥ 95.
- The letter on `/today` is sample content until the first daily fill. The homepage letter is fixed.
- Not legal advice: confirm how gifts should be received, receipted and reported where the ministry is based.

## 9. Generated pages (the "Cities we serve" pattern)

One template, many pages, generated from Notion. Every generated page must be true and backed by real content.

### 9-pre. Every day's letter is a page search engines can find
- Each day's page `/today/YYYY-MM-DD` keeps the letter's own subject on the page, but its `<title>` and description are written for what people search: `<title>{Subject}: counsel on {Topic} from the Bible | Brother Jimi</title>` and the description is the shareable line. Example: "The wall between you and God: counsel on forgiveness from the Bible | Brother Jimi".
- Every day page and topic page goes into `sitemap.xml` the morning it is published. Each day page carries `Article` structured data (headline, date, author Brother Jimi).
- All past letters stay online forever. They are the archive that `/counsel` (9a) lists by topic.

### 9a. Topic pages: build now
- Route: `/counsel/<slug>` (e.g. `/counsel/forgiveness`). One page per topic that has **at least one approved letter**.
- Source: a `Topic` field (multi-select) on every Notion letter row. Starting topics (Jimi, 7 Oct): Forgiveness, Hearing God's voice, Faith over fear, The power of your words, The value of character, Your thoughts and mind, Your purpose, Freedom from lust.
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
