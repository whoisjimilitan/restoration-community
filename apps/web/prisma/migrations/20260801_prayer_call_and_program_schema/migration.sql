-- CreateTable prayer_calls
CREATE TABLE "prayer_calls" (
    "id" TEXT NOT NULL,
    "brotherJimiId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "scheduledTime" TIMESTAMP(3) NOT NULL,
    "wherebyRoomUrl" TEXT,
    "recordingUrl" TEXT,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prayer_calls_pkey" PRIMARY KEY ("id")
);

-- CreateTable programs
CREATE TABLE "programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "targetSize" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planning',
    "facilitatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable program_participants
CREATE TABLE "program_participants" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sponsorId" TEXT,
    "mentorId" TEXT,
    "attendanceStatus" TEXT NOT NULL DEFAULT 'registered',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "program_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable sponsors
CREATE TABLE "sponsors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "amount" INTEGER NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable facilitators
CREATE TABLE "facilitators" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readyToCoFacilitate" BOOLEAN NOT NULL DEFAULT false,
    "coFacilitationsCount" INTEGER NOT NULL DEFAULT 0,
    "mentorCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facilitators_pkey" PRIMARY KEY ("id")
);

-- CreateTable testimony_videos
CREATE TABLE "testimony_videos" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "beforeVideoUrl" TEXT NOT NULL,
    "afterVideoUrl" TEXT NOT NULL,
    "youtubeUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimony_videos_pkey" PRIMARY KEY ("id")
);

-- AlterTable user_restorations (add optional fields for program, sponsor, mentor)
ALTER TABLE "user_restorations" ADD COLUMN "programId" TEXT,
ADD COLUMN "sponsorId" TEXT,
ADD COLUMN "mentorId" TEXT;

-- CreateIndex
CREATE INDEX "prayer_calls_status_idx" ON "prayer_calls"("status");

-- CreateIndex
CREATE INDEX "prayer_calls_scheduledTime_idx" ON "prayer_calls"("scheduledTime");

-- CreateIndex
CREATE INDEX "prayer_calls_brotherJimiId_idx" ON "prayer_calls"("brotherJimiId");

-- CreateIndex
CREATE INDEX "prayer_calls_userId_idx" ON "prayer_calls"("userId");

-- CreateIndex
CREATE INDEX "programs_status_idx" ON "programs"("status");

-- CreateIndex
CREATE INDEX "programs_facilitatorId_idx" ON "programs"("facilitatorId");

-- CreateIndex
CREATE INDEX "programs_startDate_idx" ON "programs"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "program_participants_programId_userId_key" ON "program_participants"("programId", "userId");

-- CreateIndex
CREATE INDEX "program_participants_programId_idx" ON "program_participants"("programId");

-- CreateIndex
CREATE INDEX "program_participants_userId_idx" ON "program_participants"("userId");

-- CreateIndex
CREATE INDEX "program_participants_attendanceStatus_idx" ON "program_participants"("attendanceStatus");

-- CreateIndex
CREATE UNIQUE INDEX "sponsors_email_key" ON "sponsors"("email");

-- CreateIndex
CREATE INDEX "sponsors_paymentStatus_idx" ON "sponsors"("paymentStatus");

-- CreateIndex
CREATE INDEX "sponsors_email_idx" ON "sponsors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "facilitators_userId_key" ON "facilitators"("userId");

-- CreateIndex
CREATE INDEX "facilitators_readyToCoFacilitate_idx" ON "facilitators"("readyToCoFacilitate");

-- CreateIndex
CREATE INDEX "testimony_videos_status_idx" ON "testimony_videos"("status");

-- CreateIndex
CREATE INDEX "testimony_videos_participantId_idx" ON "testimony_videos"("participantId");

-- AddForeignKey
ALTER TABLE "prayer_calls" ADD CONSTRAINT "prayer_calls_brotherJimiId_fkey" FOREIGN KEY ("brotherJimiId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prayer_calls" ADD CONSTRAINT "prayer_calls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_facilitatorId_fkey" FOREIGN KEY ("facilitatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_participants" ADD CONSTRAINT "program_participants_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_participants" ADD CONSTRAINT "program_participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_participants" ADD CONSTRAINT "program_participants_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "sponsors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_participants" ADD CONSTRAINT "program_participants_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facilitators" ADD CONSTRAINT "facilitators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimony_videos" ADD CONSTRAINT "testimony_videos_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
