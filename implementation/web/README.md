# Restoration Community Web Platform

A Next.js web application for the Restoration Community—a Christian peer support and reintegration community for people leaving cybercrime and pursuing honest work and living.

## Quick Start

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Git

### Installation

```bash
cd implementation/web
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## Project Structure

```
app/
  ├── layout.tsx         # Root layout with metadata
  ├── page.tsx           # Landing page
  └── globals.css        # Global Tailwind + custom styles

components/
  ├── HeroSection.tsx    # Hero section component
  └── FourPillarsSection.tsx  # Four pillars section

tailwind.config.js       # Tailwind CSS configuration with semantic colors
postcss.config.js        # PostCSS configuration for Tailwind
tsconfig.json            # TypeScript configuration
next.config.js           # Next.js configuration
package.json             # Dependencies and scripts
```

## Governance

This application is built according to the Restoration Community governance documents:

- **Book One**: The Community Manual
- **Book Two**: The Restoration Journey
- **Book Three**: The Digital Community Platform
- **Book Four**: The Platform Blueprint
- **Engineering Charter**: Technical governance and principles

Every design and implementation decision traces back to these documents.

## Design System

### Colors (Semantic)

- `rc-teal` (#0F766E) — Action, promise, hope, growth
- `rc-charcoal` (#202124) — Truth, substance, reliability
- `rc-warm-gray` (#8B8680) — Support, context
- `rc-medium-gray` (#555555) — Secondary content
- `rc-cream` (#F5F3F0) — Breathing room
- `rc-cream-light` (#FAFAF9) — Soft background

### Typography

- **Serif (Georgia)**: Headlines, titles (emotional impact)
- **Sans-serif (System)**: Body text, supporting content (readable, human)

### Spacing

- Hero sections use generous spacing (trust, not pressure)
- Cards have clear visual hierarchy
- Whitespace is a design element

## Development Guidelines

1. **Always trace to governance**: Every feature should connect to Books 1-4
2. **Simple and readable**: Clarity beats cleverness
3. **Human language**: Write as if speaking to an intelligent person
4. **Accessible**: Support diverse abilities and devices
5. **Tested**: Build features that work, then test them

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Restoration Community Governance](/governance/)

## License

Restoration Community © 2026
