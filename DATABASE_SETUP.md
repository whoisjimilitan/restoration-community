# Database Setup — Local Development

This document describes how to set up and run the PostgreSQL database for local development of the Restoration Community platform.

---

## **Prerequisites**

- Docker and Docker Compose installed and running
- Node.js 18+ and npm installed
- Git repository cloned

---

## **Quick Start**

### **1. Start PostgreSQL (Docker)**

From the repository root:

```bash
docker-compose up -d
```

This starts a PostgreSQL container with:
- **Username:** `restoration_user`
- **Password:** `restoration_password`
- **Database:** `restoration_community`
- **Port:** `5432` (localhost)
- **Connection String:** `postgresql://restoration_user:restoration_password@localhost:5432/restoration_community`

The database will persist in a Docker volume (`postgres_data`).

### **2. Verify Connection**

Check that the database is ready:

```bash
docker-compose ps
```

Output should show `postgres` container with status `running`.

Wait for healthcheck to pass (may take 10-15 seconds):

```bash
docker-compose logs postgres | grep "database system is ready"
```

### **3. Apply Prisma Migrations**

From `apps/web/` directory:

```bash
cd apps/web
npx prisma migrate dev
```

This will:
- Apply pending migrations
- Generate Prisma Client
- Create all required database tables

### **4. Start Development Server**

```bash
npm run dev
```

Application will be available at `http://localhost:3000`.

---

## **Database Structure**

After migrations, the database contains:

**Core Tables (AUTH-001):**
- `users` — User accounts with email, password, firstName, lastName
- `email_verification_tokens` — Email verification tokens (24-hour expiry)
- `sessions` — Auth.js session data
- `accounts` — OAuth provider data (for future use)
- `profiles` — User profile/ministry data

**Restoration Journey Tables:**
- `restoration_stages` — Seven stages of restoration
- `stage_content` — Teaching material for each stage
- `user_restorations` — User's current stage and progress
- `stage_transitions` — History of stage progressions
- `stage_reflections` — User reflections at each stage

**Content Tables:**
- `resources` — Scripture, teachings, prayers, assignments, etc.
- `resource_categories` — Resource categorization
- `stage_resources` — Mapping resources to stages

---

## **Common Commands**

### **View Database Status**

```bash
docker-compose ps
```

### **Stop PostgreSQL**

```bash
docker-compose down
```

(Data persists in the volume)

### **Restart PostgreSQL**

```bash
docker-compose restart
```

### **Reset Database (Delete All Data)**

```bash
docker-compose down -v
docker-compose up -d
npx prisma migrate dev
```

**Warning:** This deletes all data. Use only for development.

### **Run Prisma Studio (GUI Database Browser)**

```bash
cd apps/web
npx prisma studio
```

Opens `http://localhost:5555` with an interactive database viewer.

### **View Logs**

```bash
docker-compose logs postgres
```

### **Connect Directly with psql**

If you have PostgreSQL client tools installed:

```bash
psql postgresql://restoration_user:restoration_password@localhost:5432/restoration_community
```

---

## **Environment Variables**

The `.env.local` file in `apps/web/` contains:

```
DATABASE_URL="postgresql://restoration_user:restoration_password@localhost:5432/restoration_community"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development-secret-change-in-production"
NODE_ENV="development"
```

**Do not commit `.env.local` to Git.** It contains local credentials.

---

## **Troubleshooting**

### **"database connection refused"**

The database container may not be running or ready.

```bash
docker-compose up -d
docker-compose logs postgres
```

Wait 10-15 seconds for the healthcheck to pass.

### **"relation does not exist"**

Migrations have not been applied.

```bash
npx prisma migrate dev
```

### **Port 5432 Already in Use**

Another PostgreSQL instance is using port 5432. Either:

1. Stop the other instance, or
2. Edit `docker-compose.yml` and change the port mapping:
   ```yaml
   ports:
     - "5433:5432"  # Use 5433 instead
   ```
   Then update `DATABASE_URL` accordingly.

### **Permission Denied on Docker Socket**

Ensure Docker daemon is running and your user has permission.

On Linux, you may need to add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```

Then log out and back in.

---

## **Development Workflow**

1. **Start database:** `docker-compose up -d`
2. **Apply migrations:** `npx prisma migrate dev` (in `apps/web/`)
3. **Start server:** `npm run dev` (in `apps/web/`)
4. **Make changes:** Edit code, server hot-reloads
5. **Stop server:** Ctrl+C
6. **Stop database:** `docker-compose down`

---

## **Production Notes**

This setup is for local development only.

For production, you will need:
- A managed PostgreSQL service (AWS RDS, Cloud SQL, Neon, etc.)
- Proper environment variable management
- Backup and recovery procedures
- Connection pooling
- SSL/TLS encryption

These will be addressed in separate infrastructure documentation.

---

**Last Updated:** 2026-07-25  
**Status:** Active  
**Relevant Executable:** INFRA-001
