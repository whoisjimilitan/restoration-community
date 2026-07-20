# Restoration Community Web Platform

The web application for the Restoration Community platform, built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ (or PostgreSQL-compatible service)
- npm or yarn

### Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

Update `.env.local` with your database URL and other configuration.

3. Set up the database:

```bash
npx prisma migrate dev --name init
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Architecture

The application follows the High-Level Technical Architecture defined in `governance/architecture/high-level-technical-architecture.md`.

Key directories:

- `src/app` - Next.js App Router pages and layouts
- `src/components` - Reusable React components
- `src/lib` - Shared utilities and helpers
- `src/styles` - Global and component styles
- `prisma` - Database schema and migrations

## Database

The platform uses PostgreSQL with Prisma ORM.

Database schema is defined in `prisma/schema.prisma`.

Migrations are managed automatically through `npx prisma migrate`.

## Styling

The application uses Tailwind CSS for styling.

Tailwind configuration is in `tailwind.config.ts`.

## Testing

Tests are located alongside their source files with a `.test.ts` or `.test.tsx` extension.

Run tests with `npm run test`.

## Deployment

Deployment is handled through GitHub Actions.

See `.github/workflows/ci.yml` for CI/CD configuration.

Specific deployment targets (Vercel, AWS, etc.) are configured separately.
