---
type: operational-executable
id: INFRA-003
title: Production Database Operations
status: governance
version: 1.0
date: 2026-07-25
---

# INFRA-003: Production Database Operations

## Purpose

Establish explicit, repeatable procedures for production database changes.

Prevent "code deployed but database not updated" situations.

Document when migrations run, when seeds run, and who is responsible for each step.

---

## Problem Statement

Current state:
- Developer deploys code
- Developer knows: "run `prisma db seed` manually"
- Repository does NOT know: when this happens, by whom, in what order
- Result: High risk of forgotten steps during deployment

Future state:
- Adding prayer categories requires seed updates
- Adding resource libraries requires schema changes
- Adding mentor roles requires migrations
- Adding community groups requires data population
- Adding notifications requires configuration

Each requires different operations. Without documented procedures, each deployment becomes ad-hoc.

---

## Authority Chain

| Layer | Document | Reference |
|-------|----------|-----------|
| Ministry | Book Three, Chapter 5 (Technology as Service) | Technology exists to support ministry, not complicate it |
| Product | PRD 01.04 (Reliability & Operations) | Platform must be reliably deployable and operationally sound |
| Architecture | CLAUDE_PROJECT_GUIDE.md, Section 7 | Deployment instructions are permanent reference |
| Executable | INFRA-003 | This document |

---

## Scope

### In Scope
- Schema changes (migrations)
- Data population (seeds)
- Environment variable configuration
- Database connection verification
- Deployment checklist
- Rollback procedures
- Audit trail

### Out of Scope
- New deployment platforms
- Infrastructure provisioning
- Database backups (separate operational procedure)
- Performance tuning
- Security patching

---

## Database Operations Procedures

### 1. Schema Changes (Prisma Migrations)

**When:** New tables, columns, or constraints are needed

**Authority:** Prisma schema changes require governance review before implementation

#### Procedure
```bash
# Step 1: Update schema.prisma with governance approval
vim apps/web/prisma/schema.prisma
# Add/modify models and fields

# Step 2: Create migration locally
npx prisma migrate dev --name descriptive_change_name
# Example: npx prisma migrate dev --name add_mentor_role_table

# Step 3: Test migration (local database only)
npx prisma migrate reset  # Resets local DB and runs all migrations + seed
npm run dev  # Verify app still works

# Step 4: Commit migration
git add apps/web/prisma/migrations/
git commit -m "schema: Add mentor role table (EXECUTIVE: AUTH-XXX)"

# Step 5: Deploy
git push origin main
# Netlify triggers build

# Step 6: Run migration in production
# SSH into production environment:
cd apps/web
npx prisma migrate deploy

# Step 7: Verify migration
npx prisma db execute --stdin <<'EOF'
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
EOF
```

**Timeline:**
- Local: 2-3 minutes
- Production: ~30 seconds + verification

**Rollback:**
```bash
# If migration fails, rollback with:
npx prisma migrate resolve --rolled-back <migration_name>
# Then fix schema and create new migration
```

---

### 2. Data Population (Prisma Seeds)

**When:** Seeding initial data or updating existing seed content

**Authority:** Seed content must match governing ministry documents (e.g., Book Two for restoration stages)

#### Procedure
```bash
# Step 1: Update seed.ts with governance authority
vim apps/web/prisma/seed.ts
# Ensure all data matches authoritative source

# Step 2: Test seed locally
npx prisma db seed

# Expected output:
# [SEED] Starting restoration journey seed...
# [SEED] Created stage: Truth
# [SEED] Created content for: Truth
# ... (for all 7 stages or other data)
# [SEED] Restoration journey seed complete ✅

# Step 3: Verify seed data in local database
npx prisma studio  # Opens DB browser at localhost:5555

# Step 4: Commit seed
git add apps/web/prisma/seed.ts
git commit -m "data: Populate canonical restoration stages (EXECUTIVE: JOURNEY-001)"

# Step 5: Deploy
git push origin main
# Netlify triggers build

# Step 6: Run seed in production
# SSH into production environment:
cd apps/web
export DATABASE_URL="[production-connection-string]"
npx prisma db seed

# Expected output should match local run exactly
```

**Timeline:**
- Local: 30 seconds
- Production: ~10 seconds + verification

**Verification:**
```bash
# Query seed results
npx tsx -e "
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const stages = await prisma.restorationStage.findMany({
  include: { content: true },
  orderBy: { sequence: 'asc' }
});
console.log('Seeded stages:');
stages.forEach(s => console.log(\`  \${s.sequence}. \${s.name} - \${s.content?.scripture}\`));
await prisma.\$disconnect();
"
```

---

### 3. Environment Configuration

**When:** Deploying to production for first time or changing hosting provider

**Location:** Production environment, NOT in code

#### Variables Required
```bash
DATABASE_URL=postgresql://user:password@host:port/dbname
NEXTAUTH_SECRET=<generate-random-secret>
NEXTAUTH_URL=https://production.domain.com
NEXT_PUBLIC_APP_URL=https://production.domain.com
NODE_ENV=production
```

#### Procedure (Netlify Example)
```
1. Go to https://app.netlify.com/sites/[your-site]/settings/env
2. Add each environment variable (do NOT commit to .env.local)
3. Verify: Deploy triggers, app loads, no 500 errors
```

#### Verification
```bash
# Test connection from production environment:
psql $DATABASE_URL -c "SELECT 1;"
# Expected: (1 row with value 1)
```

---

## Deployment Checklist

### Before Every Production Deployment

- [ ] Code is on main branch and committed
- [ ] CI/CD pipeline passes (lint, test, build)
- [ ] Prisma schema is finalized (no uncommitted changes)
- [ ] All migrations are in `apps/web/prisma/migrations/`
- [ ] Seed file reflects authoritative governance documents

### After Deployment to Production

- [ ] Code is deployed to hosting (Netlify status shows green)
- [ ] Environment variables are set correctly
- [ ] Web app loads without errors (check homepage)
- [ ] **Schema migrations are applied** (if any):
  ```bash
  npx prisma migrate deploy
  ```
- [ ] **Seed data is applied** (if seed.ts changed):
  ```bash
  npx prisma db seed
  ```
- [ ] Database queries return expected data:
  ```bash
  npx prisma studio  # Browse and verify data visually
  ```

---

## Responsibility Matrix

| Step | Owner | Approval | Verification |
|------|-------|----------|--------------|
| Schema design | Developer | Ministry authority | Build passes |
| Migration testing | Developer | N/A | Local DB migration succeeds |
| Seed content | Developer | Governing document | Content matches source exactly |
| Code deployment | CI/CD | Build system | Netlify shows green |
| **Migration execution** | **Operations/Developer** | **N/A** | **Migration succeeds** |
| **Seed execution** | **Operations/Developer** | **N/A** | **Data verified** |
| Verification | Developer | N/A | Queries return correct data |

---

## Common Scenarios

### Scenario 1: Adding New Restoration Stage

**Trigger:** Ministry decides to add new stage (hypothetical)

```bash
# 1. Update schema
vim apps/web/prisma/schema.prisma
# No change needed — stages are data, not schema

# 2. Update seed
vim apps/web/prisma/seed.ts
# Add new stage to RESTORATION_STAGES array with canonical text

# 3. Test
npx prisma db seed
npx prisma studio

# 4. Commit
git commit -m "data: Add new restoration stage (EXECUTABLE: XXX)"
git push origin main

# 5. Production
# After Netlify deployment:
npx prisma db seed
# Verify with query
```

### Scenario 2: Adding Prayer Category Table

**Trigger:** Feature requires new table

```bash
# 1. Update schema
vim apps/web/prisma/schema.prisma
# Add PrayerCategory model with name, description, etc.

# 2. Create migration
npx prisma migrate dev --name add_prayer_categories

# 3. Seed initial categories
vim apps/web/prisma/seed.ts
# Add categories to seed

# 4. Test
npx prisma db seed
npm run dev

# 5. Commit both migration and seed
git add apps/web/prisma/migrations/
git add apps/web/prisma/seed.ts
git commit -m "schema: Add prayer categories table with seed data (EXECUTABLE: XXX)"
git push origin main

# 6. Production
# After Netlify deployment:
npx prisma migrate deploy
npx prisma db seed
# Verify tables and data exist
```

### Scenario 3: Updating Existing Stage Content

**Trigger:** Ministry revises stage description (e.g., Book Two updated)

```bash
# 1. Only seed changes — schema unchanged
vim apps/web/prisma/seed.ts
# Update stage description to match new Book Two text

# 2. Test
npx prisma db seed

# 3. Commit
git commit -m "data: Update restoration stage content per Book Two revision (EXECUTABLE: XXX)"
git push origin main

# 4. Production
# After Netlify deployment:
npx prisma db seed
# Upsert updates existing stages with new content
```

---

## Troubleshooting

### Migration fails in production

**Symptom:** `npx prisma migrate deploy` exits with error

**Diagnosis:**
```bash
# Check migration status
npx prisma migrate status

# Output shows which migrations succeeded/failed
# Look for: Migration already applied, conflict with existing data, constraint violations
```

**Recovery:**
```bash
# If migration failed partway through:
npx prisma migrate resolve --rolled-back migration_name

# Fix the issue in schema.prisma
# Create new migration
npx prisma migrate dev --name fix_issue

# Test locally
npx prisma migrate reset

# Deploy new migration
git push origin main
npx prisma migrate deploy
```

### Seed fails in production

**Symptom:** `npx prisma db seed` exits with error

**Diagnosis:**
```bash
# Check database connection
psql $DATABASE_URL -c "SELECT 1;"

# Check if tables exist
npx prisma studio

# Read error message carefully — usually indicates:
# - Constraint violation
# - Missing foreign key
# - Data type mismatch
```

**Recovery:**
```bash
# Do NOT delete data. Instead:
# 1. Fix seed.ts to match existing data
# 2. Or manually insert missing data via psql
# 3. Test locally first:
npx prisma migrate reset
npx prisma db seed

# 4. Deploy fix
git commit -m "fix: Correct seed to match production data"
git push origin main
npx prisma db seed
```

### New environment variables not recognized

**Symptom:** App crashes with "DATABASE_URL is undefined"

**Diagnosis:**
```bash
# Check that variables are set in hosting platform
# For Netlify: https://app.netlify.com/sites/[site]/settings/env

# In production environment, verify:
echo $DATABASE_URL
# Should print connection string, not blank
```

**Recovery:**
```bash
# 1. Set missing variables in hosting platform
# 2. Redeploy (or trigger rebuild)
# 3. Verify in browser: should load without errors
```

---

## Audit Trail

Every production database change should be documented:

| Date | Operation | Migration/Seed | Result | Verified By |
|------|-----------|----------------|--------|------------|
| 2026-07-25 | Seed | JOURNEY-001 (canonical stages) | 7 stages + content | [Name] |
| 2026-07-25 | Verify | Query stage_content | Data matches Book Two | [Name] |
| [Date] | [Type] | [Executable] | [Result] | [Person] |

---

## Related Documents

- `CLAUDE_PROJECT_GUIDE.md` — Section 7 (Deployment Instructions)
- `apps/web/prisma/schema.prisma` — Current database schema
- `apps/web/prisma/seed.ts` — Seed data source of truth
- `apps/web/prisma/migrations/` — All historical schema changes

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-25 | Initial operational procedure documentation |

---

## Next Steps

1. **Immediately:** Apply JOURNEY-001 seed to production using procedures in Section 2
2. **Before next feature:** Update this document with any lessons learned
3. **Ongoing:** Add new scenarios as they occur (add prayer categories, mentor roles, etc.)

This document is the permanent reference for database operations. It is NOT aspirational. It is operational.

Every deployment follows these procedures.
