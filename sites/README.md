# Brother Jimi — Receive Jesus

Premium, minimalist website for a 90-day free Jesus mentorship. Built with Next.js, Tailwind CSS (Apple design system), and Notion API.

## Pages

- **Home** (`/`) — Hero with email signup, latest reflection, all reflections archive
- **Journey** (`/journey/[day]`) — Individual reflection pages (Days 1–90), pulls from Notion
- **Partner** (`/partner`) — Day 30+ gentle partnership ask with Stripe form

## Design System

- **Apple-inspired aesthetic** — White gallery, extreme whitespace (90px section gaps), flat design (no shadows)
- **Tailwind CSS v4** — Full design system with colors, typography, spacing
- **Fonts** — Fraunces (serif) for headings, Inter (sans) for body
- **Accent Color** — Deep gold, deep sage, or deep burgundy (configurable)
- **Palette** — 9 neutrals (white to ink), plus apple-blue, pricing-blue, launch-orange

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
cp .env.local.example .env.local
```

3. Add your Notion API key and database ID:
```
NOTION_API_KEY=your_key_here
NOTION_DATABASE_ID=3efb5217e90e8067b776f1d90ac77dd6
```

4. Run dev server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Build & Deploy

```bash
npm run build
npm start
```

Deploy to Vercel (brotherjiminew project):
```bash
vercel deploy
```

## Content Source

All reflections pull from Notion database:
- **Database ID:** `3efb5217e90e8067b776f1d90ac77dd6`
- **Fields:** Name, Title, Raw Quote, Version A, Version B, Version C, Quotable, Scripture, Status, Date Created
- **Current content:** 3 reflections (Day 1, 2, 3)

## Key Files

- `app/page.tsx` — Homepage
- `app/journey/[day]/page.tsx` — Journey page template
- `app/partner/page.tsx` — Partnership page
- `lib/notion.ts` — Notion API utilities
- `app/api/notion/reflection/route.ts` — API route to fetch reflections
- `tailwind.config.js` — Tailwind design tokens
- `app/globals.css` — Global styles + component classes
- `app/layout.tsx` — Root layout with metadata

## TODO

- [ ] Connect Substack API for email integration
- [ ] Implement Stripe for partnership payments
- [ ] Add analytics
- [ ] Set up CI/CD pipeline
- [ ] Domain SSL certificate
- [ ] Email sender configuration

## Message

**"Receive Jesus. Start discovering who you are in Him."**

No mention of "90 days" — just the journey. Free mentorship Days 1–90. Gentle partnership ask at Day 30 (still free if declined). Commission at Day 90 (become carriers).

---

**Built with premium, minimal design. All glory to Jesus.**