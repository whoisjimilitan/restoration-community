# Brother Jimi: final package (21 Nov 2026)

Jimi approves this deploy.

**Copy `index.html`, `accra/index.html` and `counsel/index.html` byte for byte.** Do not restyle, re-colour, reorder or rewrite anything. Any wording change goes through Jimi first. Read `DESIGN-RULES.md`: every page follows it.

**Only report something as done after you have checked it on the live site.**

## 1. Files

| From the zip | To the site |
|---|---|
| `index.html` | `/site/index.html` |
| `accra/index.html` | `/site/accra/index.html` |
| `counsel/index.html` | `/site/counsel/index.html` (replaces the old counsel page completely) |
| `images/film/` | `/site/images/film/` |
| `images/counsel/` | `/site/images/counsel/` (new) |
| `privacy/index.html` | `/site/privacy/index.html` (replaces the old privacy page completely) |
| `assets/cities.js` | `/site/assets/cities.js` (new: the list of City Encounters the homepage reads) |
| `video/brother-jimi-trailer.mp4` | `/site/video/brother-jimi-trailer.mp4` |
| `video/hero-loop.mp4` | `/site/video/hero-loop.mp4` (new: the homepage hero loop) |
| `partner/index.html` | `/site/partner/index.html` (replaces the archived partner page completely) |
| `images/partner/` | `/site/images/partner/` (new: the one photo on /partner) |
| `DESIGN-RULES.md` | `/site/DESIGN-RULES.md` |

- Remove `/site/images/film/accra-hero.jpg` if it exists.
- Use the existing `/assets/fonts/` and favicons.
- First, back up the current `/`, `/accra`, `/counsel` and `/privacy` to `/site/_archive/before-21nov/`.

## 2. What each page is

**`/`, the film (night)**
- **Hero:**
  - "A documentary"
  - BROTHER JIMI
  - His mother's words, credited "My mother's last words"
  - **Play trailer** and **Share**, side by side. Share uses the phone's share sheet, and copies the link on desktop.
  - The logline
- **"The story continues":** Accra Encounters Christ, then Continue. Nothing else.
- **Footer:** "Brother Jimi, a servant of Jesus Christ" (no copyright mark or year), then **Counsel** (links to /counsel) and **Privacy**.
- **No dividing lines and no share icons.**

**`/accra`, the live flyer (night breaking into daylight)**
- **Hero (night):**
  - Accra Encounters Christ
  - with Brother Jimi
  - Friday 11 December 2026
  - The Patmos Christian Retreat, Accra (opens Google Maps)
  - Hosted by The Patmos Church
  - "Entry is free."
- **The light:** a faint shaft of light crossed by a softer glow, drawn by `.hero::before` in CSS, top right of the hero. Copy it exactly; do not brighten it.
- **The transition:** `/images/film/dust-edge.jpg`. The night breaks into daylight through dust. No CSS gradient.
- **Prayer line:**
  - "For those who are sick, and anyone who needs deliverance, the Prayer Line Registration holds"
  - 1 to 7 December 2026
  - at Skylight Town Hall, Accra (opens Google Maps)
  - Daily, 10 a.m. to 4 p.m.
  - **One sentence as the countdown:** "Registration opens in N days." It becomes "Registration closes in N days." and then, on the last day, "Today is the last day of registration, until 4 p.m."
  - "Bring your medical report and any medical aids you use."
  - The promise: "A divine encounter with God awaits you on those days and on 11 December, through His Servant, Brother Jimi."
  - "Who is Brother Jimi?", linking to /
- **Form:**
  - "Coming for registration? Let us know."
  - The 1 to 10 chips, name, region and **Save My Place**
  - Save My Place opens WhatsApp to 447471605871 with the locked message.
- **Then:**
  - "One last step." then "I pressed send"
  - "Your place is saved.", with the Skylight details and hours and "Remind me: add to my calendar" (an .ics file)
- **Above the form:** an "IMPORTANT" label.
- **WhatsApp opens exactly once,** through a single link click with no fallback.
- **"Be an evangelist for Jesus.":**
  - One-tap icons: WhatsApp, Facebook, Telegram, X, Email and Copy link.
  - **Share the invitation:** the phone's share sheet. On desktop it copies the invitation.
  - **Post it to my WhatsApp Status:** builds a 1080x1920 flyer with the key art.
  - Text links: "Send it to my pastor" and "Print the A4 flyer"
  - One WhatsApp icon labelled "Daily counsel", linking to the Channel.
- **Footer:** "Brother Jimi, a servant of Jesus Christ" (no copyright mark or year), then **Counsel** and **Privacy**.
- **Wine is used only for the action on each screen.** No section lines and no stripes. The share icon row on /accra is approved by Jimi: keep it.
- **Testing:** add `?state=before`, `during`, `gap`, `today` or `after` to the URL to see each time state.

**`/counsel`, the morning message (daylight)**
- The page is the message exactly as it arrives on WhatsApp:
  - the letter's image (`/images/counsel/value-in-challenges-post.jpg`);
  - the letter, "There is value in challenges", ending on "Today, say:";
  - **Get tomorrow's message on WhatsApp**, linking to https://whatsapp.com/channel/0029VbCgjedBA1f6YQ0DvB3s;
  - "Every morning. Free."
- No header, no email field, no share row, no side panel and no date.
- The share image is `/images/counsel/value-in-challenges-og.jpg`.
- **This letter stays until Jimi replaces it.** To change the letter, replace the text and the two images. Name the images `<slug>-post.jpg` (1080x1350) and `<slug>-og.jpg` (1200x630).

**`/partner`, unlisted (night breaking into daylight)**
- **Jimi shares this link one person at a time. It must stay invisible:**
  - Never link to it from any page, menu, footer, sitemap or `cities.js`.
  - Keep its `<meta name="robots" content="noindex, nofollow, noarchive">`.
  - Also send the header `X-Robots-Tag: noindex, nofollow` for `/partner` in `vercel.json`.
  - Do not list it in `robots.txt` (that would advertise it).
  - If a sitemap exists, make sure `/partner` is not in it.
- Remove everything from the old partner page: Stripe, `/api/checkout`, the dock, the header and the amount buttons.
- **Give** opens https://useaccrue.com/pay/@iambrotherjimi (set once, in `window.PARTNER` at the top of the file).
- The next city (date and title) is read from `/assets/cities.js`, like the homepage.

## 3. Shared system (DESIGN-RULES.md)

- **Colours:**

  | Name | Value |
  |---|---|
  | night | #0b0a09 |
  | bone | #ece5d8 |
  | soft | #c9c0b1 |
  | paper | #f4efe6 |
  | ink-2 | #4a443c |
  | dim | #8f8678 |
  | wine | #8b2332 (the action only) |

- **Type:** Albert Sans. Libre Caslon italic is used only for the mother's quotation on /.
- **Footer on every page:** "Brother Jimi, a servant of Jesus Christ" (no copyright mark or year), where "Brother Jimi" links to / (except on /accra, where "Who is Brother Jimi?" is the only link home).

## 4. After an event, and the next city

- **Homepage:** "The story continues" reads `/assets/cities.js` and always points forward.
  - It shows the next city whose event has not ended.
  - If no next city is listed, it shows the last city as a record: "The story so far", "Thank you, Accra." and "See the day".
  - To announce a city, add it to `cities.js`, and copy `/accra/index.html` to `/<city>/index.html` with its CONFIG changed.
- **/accra after 12 December 2026** (state `after`) becomes the record of the day.
  - It shows "Thank you, Accra." followed by the photos from `CONFIG.records`, grouped as "The prayer line", "The people" and "The day". Every photo can be opened and downloaded.
  - It then shows the next city, from `CONFIG.next`. If there is none yet, it shows "The next city will be announced soon." with a link to the WhatsApp Channel.
  - Photos are gathered during the build-up. Put them in `/site/images/accra/records/`, compressed to about 1600px on the long side, and list each one in `CONFIG.records`.
  - The prayer line, the form and the share section disappear in this state.

## 5. Before you say it's done

1. Fix any caching first. A cold request must return the new pages.
2. Deploy, then check each of these on the **live** site, quoting the HTML:
   - a. `/` has Play trailer and Share side by side, no share-icon row, and footer links **Counsel** and **Privacy**.
   - b. `/accra` has no countdown boxes, a sentence starting "Registration opens in", and `dust-edge.jpg` under the hero.
   - c. `/accra` has no element using both `border-left` and wine.
   - d. `/counsel` has the image, the letter "There is value in challenges", the button "Get tomorrow's message on WhatsApp", and no email field.
   - e. `/privacy` has no header bar, and no email, MailerLite, Notion or Stripe lines.
   - g. `/partner` loads, Give opens the Accrue page, the HTML contains `noindex`, the response has `X-Robots-Tag: noindex`, and no other page links to `/partner`.
   - f. `/accra#state-after` shows "Thank you, Accra." and the next-city line. The homepage, checked with a date after 12 December, shows "The story so far".
3. Send 390px screenshots of all four pages, plus /accra after saving a place.
4. Only then run `verify.py --lock`, so it locks these files, and send the deployment URL.
