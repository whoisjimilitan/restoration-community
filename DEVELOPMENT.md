# Development Guide

This document explains how to develop the Restoration Community platform.

## Repository Structure

```
restoration-community/
├── governance/              # Governance documents
│   ├── engineering/         # Engineering principles and standards
│   ├── requirements/        # Platform requirements baseline
│   ├── product/             # Product requirements document
│   ├── architecture/        # Technical architecture
│   └── adr/                 # Architecture decision records
├── apps/
│   └── web/                 # Next.js web application
├── packages/                # Shared packages (if needed)
├── infrastructure/          # Deployment and infrastructure code
├── scripts/                 # Utility scripts
├── docs/                    # Documentation
└── .github/
    └── workflows/           # CI/CD pipelines
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ (local or remote)
- Git

### Initial Setup

1. Clone the repository:

```bash
git clone https://github.com/whoisjimilitan/restoration-community.git
cd restoration-community
```

2. Install dependencies:

```bash
npm install
```

3. Navigate to the web app and set up environment:

```bash
cd apps/web
cp .env.example .env.local
```

Update `.env.local` with your database URL:

```
DATABASE_URL="postgresql://user:password@localhost:5432/restoration_community"
```

4. Set up the database:

```bash
npx prisma migrate dev --name init
```

5. Start development:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Development Workflow

### Running the Application

From the monorepo root:

```bash
npm run dev
```

This starts the Next.js development server at `http://localhost:3000`.

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm run test
```

### Formatting

```bash
npm run format
```

## Database Migrations

When you modify `prisma/schema.prisma`, create a migration:

```bash
cd apps/web
npx prisma migrate dev --name describe_your_change
```

This creates a migration file and applies it to your local database.

## Governance Documents

Before implementing features, review:

1. **Engineering Constitution** (`governance/engineering/engineering-constitution.md`) - How engineering is practiced
2. **Requirements Baseline** (`governance/requirements/requirements-baseline.md`) - Platform capabilities
3. **Product Requirements Document** (`governance/product/product-requirements.md`) - Feature specifications
4. **High-Level Technical Architecture** (`governance/architecture/high-level-technical-architecture.md`) - System organization

## Architecture Decision Records (ADRs)

For significant architectural decisions, create an ADR:

1. Create a new file in `governance/adr/` named `ADR-NNN-decision-title.md`
2. Follow the ADR format
3. Include the problem, alternatives, decision, and rationale
4. Reference in commit messages: "Implements ADR-NNN"

Example ADR template:

```markdown
# ADR-NNN: Decision Title

## Status
Proposed | Accepted | Deprecated | Superseded

## Context
Describe the issue or requirement.

## Decision
Explain the decision made.

## Consequences
What are the implications of this decision?

## Alternatives Considered
What other options were evaluated?
```

## Code Standards

Standards will emerge from practice. Currently:

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- React best practices

As patterns emerge, document them in `governance/adr/`.

## Committing Changes

Commit messages should reference governance documents where relevant:

```
feat: Implement user authentication

- Adds Auth0 integration
- Implements session management
- Validates against PRD 04.01 (Identity & Authentication)

Implements ADR-001
```

## Deployment

See `infrastructure/` for deployment configuration.

Deployments are automated through GitHub Actions on push to main.

## Troubleshooting

### Database Connection Issues

Verify `DATABASE_URL` in `.env.local` is correct and the database is running.

### Port Already in Use

If port 3000 is already in use, set `PORT` environment variable:

```bash
PORT=3001 npm run dev
```

### Build Failures

Run the full build pipeline:

```bash
npm run lint
npm run test
npm run build
```

Fix any TypeScript or linting errors before committing.

## Questions?

Refer to governance documents in `governance/` for design decisions and requirements.

Check existing ADRs in `governance/adr/` for patterns and rationale.
