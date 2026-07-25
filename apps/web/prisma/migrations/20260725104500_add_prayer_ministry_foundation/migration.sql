-- CreateEnum for PrayerStatus
CREATE TYPE "PrayerStatus" AS ENUM ('SUBMITTED', 'RECEIVED', 'IN_PRAYER', 'FOLLOW_UP_REQUIRED', 'COMPLETED');

-- CreateTable prayer_requests
-- Private prayer request submitted by participant to Brother Jimi's prayer ministry
CREATE TABLE "prayer_requests" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "PrayerStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prayer_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable prayer_warriors
-- Approved prayer ministry servants (invisible to participants)
CREATE TABLE "prayer_warriors" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prayer_warriors_pkey" PRIMARY KEY ("id")
);

-- CreateTable prayer_assignments
-- Assignment of prayer warriors to specific prayer requests
CREATE TABLE "prayer_assignments" (
    "id" TEXT NOT NULL,
    "prayerRequestId" TEXT NOT NULL,
    "prayerWarriorId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prayer_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable prayer_responses
-- Record that prayer ministry action occurred (not prayer content or effectiveness)
CREATE TABLE "prayer_responses" (
    "id" TEXT NOT NULL,
    "prayerRequestId" TEXT NOT NULL,
    "recordedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prayer_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex for prayer_requests
CREATE INDEX "prayer_requests_participantId_idx" ON "prayer_requests"("participantId");
CREATE INDEX "prayer_requests_status_idx" ON "prayer_requests"("status");
CREATE INDEX "prayer_requests_createdAt_idx" ON "prayer_requests"("createdAt");

-- CreateIndex for prayer_warriors
CREATE UNIQUE INDEX "prayer_warriors_userId_key" ON "prayer_warriors"("userId");
CREATE INDEX "prayer_warriors_approved_idx" ON "prayer_warriors"("approved");

-- CreateIndex for prayer_assignments
CREATE UNIQUE INDEX "prayer_assignments_prayerRequestId_prayerWarriorId_key" ON "prayer_assignments"("prayerRequestId", "prayerWarriorId");
CREATE INDEX "prayer_assignments_prayerRequestId_idx" ON "prayer_assignments"("prayerRequestId");
CREATE INDEX "prayer_assignments_prayerWarriorId_idx" ON "prayer_assignments"("prayerWarriorId");

-- CreateIndex for prayer_responses
CREATE INDEX "prayer_responses_prayerRequestId_idx" ON "prayer_responses"("prayerRequestId");
CREATE INDEX "prayer_responses_recordedById_idx" ON "prayer_responses"("recordedById");
CREATE INDEX "prayer_responses_createdAt_idx" ON "prayer_responses"("createdAt");

-- AddForeignKey for prayer_requests
ALTER TABLE "prayer_requests" ADD CONSTRAINT "prayer_requests_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey for prayer_warriors
ALTER TABLE "prayer_warriors" ADD CONSTRAINT "prayer_warriors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey for prayer_assignments
ALTER TABLE "prayer_assignments" ADD CONSTRAINT "prayer_assignments_prayerRequestId_fkey" FOREIGN KEY ("prayerRequestId") REFERENCES "prayer_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "prayer_assignments" ADD CONSTRAINT "prayer_assignments_prayerWarriorId_fkey" FOREIGN KEY ("prayerWarriorId") REFERENCES "prayer_warriors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey for prayer_responses
ALTER TABLE "prayer_responses" ADD CONSTRAINT "prayer_responses_prayerRequestId_fkey" FOREIGN KEY ("prayerRequestId") REFERENCES "prayer_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "prayer_responses" ADD CONSTRAINT "prayer_responses_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
