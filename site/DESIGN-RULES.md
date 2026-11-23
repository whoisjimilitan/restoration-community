# Brother Jimi: design rules (the anti-slop rulebook)

Every page, every change. If a choice can't be defended with a reason specific to *this* ministry, it doesn't ship.

## 1. The idea everything serves

The site moves from darkness into light, the way Jimi's life did.

- **The film (/)** is night.
- **The event (/accra)** begins in night and opens into daylight.
- **Daily counsel and the rest** are daylight.

Colour carries the story. It is never decoration.

## 2. Colour

| Name | Value | Use |
|---|---|---|
| night | `#0b0a09` | dark backgrounds, and text on light pages |
| bone | `#ece5d8` | text on night |
| soft | `#c9c0b1` | secondary text on night |
| paper | `#f4efe6` | daylight background |
| field | `#fbf8f2` | form fields |
| ink-2 | `#4a443c` | secondary text on paper |
| dim | `#8f8678` | footnotes on both |
| line | `#e2dacd` | form borders only |
| band | `#ebe3d5` | the ground where people act: the form on /accra, the giving on /partner |

- **No accent colour.** The site uses only the film's own colours. Buttons are the film's buttons, like Play trailer: bone on night, night on daylight. One button per screen is the primary.
- **band** (`#ebe3d5`) is the ground for the place where people act: the form and the steps on /accra, the steps on each letter, and the giving on /partner. Nowhere else.
- **Never use pure black or pure white.** Grey text on a coloured background takes a shade of that background's own hue.
- **No gradients that are only decoration.** A transition between night and day must look like light, using the film's own dust and grain, not a CSS fade.

## 3. Type

- **Albert Sans for everything you read about or act on.** Libre Caslon is a real person speaking, and only that: his mother's words on /, Brother Jimi's own words on /accra, and each counsel letter (upright for his words, italic for the verse).
- **Counsel pictures are type cards, not photos:** the night, the faint shaft of light, the title in Caslon, the dust edge, Brother Jimi and brotherjimi.com/counsel. Three per letter: post (1080x1350), status (1080x1920), og (1200x630). A real photo of his own may replace one on a day it belongs.
- **Four levels, separated by weight and space, not size alone:**

  | Level | Weight | Size |
  |---|---|---|
  | Title | 300 | large |
  | Heading | 400 | 26px |
  | Body | 400 | 17px |
  | Small | — | 14 to 15px |

- **Uppercase tracked labels are rationed: at most one per screen.** A label must name something the heading can't. If the heading already says it, delete the label.
- **No word in a heading may be styled differently "for taste".**

## 4. Layout

- **Left-aligned, one column, asymmetric.** Nothing is centred except a full-screen title card.
- **No cards, boxes or bordered containers,** except form fields. To test: remove the border. If nothing breaks, it wasn't a card.
- **No decorative left stripes.**
- **No hairline rules between sections.** Sections are separated by space, and the space varies with meaning: a big pause before a new chapter, a small one inside a thought.
- **The primary element on each screen is bigger and heavier.** Everything else recedes.
- **Moments get a screen; everything else gets rhythm.** What you *watch* (a title, a story beat, Jimi's word) holds its own screen. What you *read* or *do* (a letter, a form, the steps) flows, separated by two spaces only: a **cut** between chapters and a **breath** inside a thought.
- **Weight marks what matters, never colour.** On every page the moments that carry the story are set larger, and the rest speaks quietly. On / the prayer ("My mother died praying for me") and its answer ("Then one night… Jesus Christ met me") are set alike, and only the answer stands in the light. In a letter, the opening line and the line before "Today, say:" carry the weight.
- **A letter is set like a book: one rhythm from the line.** Lines at 1.6. A breath (half a line) between paragraphs; a pause (one full line) around the verse, before the closing line and before "Today, say:". No other gaps. No indents and no justified text on a phone, so short key lines still stand alone.

## 5. Copy

- **Say each thing once per page.** If a heading says it, the line under it doesn't.
- **The 30% test:** cut 30% of the words. If the page improves, keep the cut.
- **Every line has to pass three tests:**
  - Would Jimi say it out loud, in his own words?
  - Is it in plain English?
  - Does it name Christ, not the ministry, as the one who acts?
- **No marketing verbs** (unlock, discover, transform, journey, elevate). **No section titles that merely describe** ("Share the story", "Learn more").

## 6. Images and media

- **Only real images of Jimi.** No stock crowds, no generated miracles, no invented testimonies, and no illustration pretending to be photography.
- **One signature image: the key art** (the shadow dissolving into light). It is the brand mark, and every page has at most one image.
- **Image test:** if the first screen works without the image, either make the image dominant or remove it.

## 7. Motion

- **One moment per page, and it must mean something.** Animate transform and opacity only, with slow deceleration, never bounce. Respect reduced motion.
- **No fade-ins on scroll, no ticking for drama, no parallax.** The single exception is the story on /: as you scroll, the line leaving the screen dims to a shadow and the line arriving takes the screen, because the past giving way is the story itself. CSS only, off for reduced motion, and older phones see the lines still.
- **A countdown shows days.** Seconds appear only on the final day.

## 8. Controls

- **One primary button per screen.** Everything else is a text link or a native control.
- **Steps lead one at a time.** Every step looks like a button, but only the next one to do is in night. Done steps turn to paper with a tick and the night moves on.
- **Sharing uses the phone's own share sheet,** with a copy-link fallback. The exceptions are the share rows on /accra and under each letter's steps: one-tap icons are kept there by Jimi's choice. Nowhere else.
- **Design the unhappy paths:** errors, "WhatsApp didn't open", "registration has closed", "the event has passed". Each gets one plain sentence.

## 9. Litmus tests before anything ships

1. **Identity:** could this screen belong to another church or another event? If so, add the one detail only Jimi has.
2. **Squint:** blur your eyes. Exactly one thing should stand out per screen.
3. **Phone:** check it at 390px, outdoors brightness, one thumb.
4. **Read-aloud:** read every line aloud. Anything that sounds like an app or an ad is rewritten.
5. **Removal:** for every element, ask whether anyone would miss it. If no one would, it goes.
