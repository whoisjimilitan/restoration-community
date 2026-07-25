-- Email Verification Tokens
CREATE TABLE email_verification_tokens (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX email_verification_tokens_email_idx ON email_verification_tokens(email);
CREATE INDEX email_verification_tokens_expiresAt_idx ON email_verification_tokens("expiresAt");

-- Users
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  "emailVerified" TIMESTAMP(3),
  password TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'VISITOR',
  "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Profiles
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "displayName" TEXT NOT NULL,
  "preferredName" TEXT,
  "countryRegion" TEXT,
  "timeZone" TEXT,
  bio TEXT,
  "profilePhotoUrl" TEXT,
  "covenantAccepted" BOOLEAN NOT NULL DEFAULT false,
  "covenantAcceptedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Sessions
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  expires TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Accounts
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(provider, "providerAccountId")
);

-- Restoration Stages
CREATE TABLE restoration_stages (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sequence INTEGER NOT NULL UNIQUE
);

CREATE INDEX restoration_stages_sequence_idx ON restoration_stages(sequence);

-- Stage Content
CREATE TABLE stage_content (
  id SERIAL PRIMARY KEY,
  "stageId" INTEGER NOT NULL UNIQUE,
  description TEXT NOT NULL,
  scripture TEXT,
  guidance TEXT,
  resources JSONB,
  version INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "publishedAt" TIMESTAMP(3),
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("stageId") REFERENCES restoration_stages(id) ON DELETE CASCADE
);

-- User Restorations
CREATE TABLE user_restorations (
  id SERIAL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "currentStageId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY ("currentStageId") REFERENCES restoration_stages(id)
);

-- Stage Transitions
CREATE TABLE stage_transitions (
  id SERIAL PRIMARY KEY,
  "userRestorationId" INTEGER NOT NULL,
  "fromStageId" INTEGER NOT NULL,
  "toStageId" INTEGER NOT NULL,
  "transitionedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "transitionedById" TEXT,
  reason TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userRestorationId") REFERENCES user_restorations(id) ON DELETE CASCADE,
  FOREIGN KEY ("fromStageId") REFERENCES restoration_stages(id),
  FOREIGN KEY ("toStageId") REFERENCES restoration_stages(id),
  FOREIGN KEY ("transitionedById") REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX stage_transitions_userRestorationId_idx ON stage_transitions("userRestorationId");
CREATE INDEX stage_transitions_transitionedAt_idx ON stage_transitions("transitionedAt");

-- Stage Reflections
CREATE TABLE stage_reflections (
  id SERIAL PRIMARY KEY,
  "userRestorationId" INTEGER NOT NULL,
  "stageId" INTEGER NOT NULL,
  reflection TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("userRestorationId") REFERENCES user_restorations(id) ON DELETE CASCADE,
  FOREIGN KEY ("stageId") REFERENCES restoration_stages(id)
);

CREATE INDEX stage_reflections_userRestorationId_idx ON stage_reflections("userRestorationId");
CREATE INDEX stage_reflections_stageId_idx ON stage_reflections("stageId");

-- Resource Categories
CREATE TABLE resource_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Resources
CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  type TEXT NOT NULL,
  content TEXT,
  "scriptureReference" TEXT,
  url TEXT,
  "videoUrl" TEXT,
  "videoDuration" INTEGER,
  "categoryId" TEXT,
  author TEXT,
  source TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  "isDraft" BOOLEAN NOT NULL DEFAULT true,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "isRetired" BOOLEAN NOT NULL DEFAULT false,
  "retiredAt" TIMESTAMP(3),
  "createdById" TEXT,
  "approvedById" TEXT,
  "approvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("categoryId") REFERENCES resource_categories(id) ON DELETE SET NULL,
  FOREIGN KEY ("createdById") REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY ("approvedById") REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX resources_type_idx ON resources(type);
CREATE INDEX resources_isDraft_idx ON resources("isDraft");
CREATE INDEX resources_isPublished_idx ON resources("isPublished");

-- Stage Resources
CREATE TABLE stage_resources (
  id TEXT PRIMARY KEY,
  "stageId" INTEGER NOT NULL,
  "resourceId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isRequired" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("stageId") REFERENCES restoration_stages(id) ON DELETE CASCADE,
  FOREIGN KEY ("resourceId") REFERENCES resources(id) ON DELETE CASCADE,
  UNIQUE("stageId", "resourceId")
);

CREATE INDEX stage_resources_stageId_idx ON stage_resources("stageId");
CREATE INDEX stage_resources_resourceId_idx ON stage_resources("resourceId");
