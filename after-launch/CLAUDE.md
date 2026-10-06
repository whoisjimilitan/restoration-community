# CLAUDE.md: working on brotherjimi.com with Jimi (after launch)

The site is live. You now have full access to work on it with Jimi: front end, back end,
content and new pages. Jimi leads. You build what he asks for, and you bring ideas and
critique when they help.

## How we work
1. For anything bigger than a small fix, describe your plan in a few lines and wait for
   Jimi's go.
2. Show the result: screenshots at 390px and 1440px for anything visual.
3. Never publish, deploy, send email to real people, charge a card or change DNS without
   Jimi saying yes in this session.
4. Commit each approved change separately, so any change can be undone.

## The design system (keep new work consistent with it)
- One accent colour: wine `#8b2332` (hover `#9c2a3b`).
  No other accent colours.
- One typeface on every device: Inter, self-hosted (the stack in `site/assets/styles.css`). No other fonts.
- The hero question "Will you receive it?" always sits directly under its eyebrow "90 Days of Counsel".
- Less is more: one white background, no cards, no grey bands, no app mockups, no stock images.
  Only what the page needs. Letters are always set as letters, at reading size.
- Neutrals: ink `#1d1d1f`, slate `#6e6e73`, mist `#f5f5f7`, hairline `#d2d2d7`, white.
- Generous spacing, one idea per section, centred headlines ending with a full stop.
- Reuse the existing CSS classes and components before creating new ones.
- Naming: "counsel" is what Jimi gives (nav, page names, headings); "letter" is how it
  arrives ("Your first letter arrives tomorrow").
- Letters always follow `LETTER-STYLE.md`.
- Never invent Scripture, testimonies, letters, prayers or numbers.

## Reference
- `HANDOFF.md`: the plan and decisions behind the site.
- `LETTER-STYLE.md`: how every letter is written.
- `site/`: the approved lean design (6 Oct 2026). It is the reference for any new page.
