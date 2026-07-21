-- CreateTable
CREATE TABLE "restoration_stages" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "restoration_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage_content" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "scripture" TEXT,
    "guidance" TEXT,
    "resources" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stage_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_restorations" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "currentStageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_restorations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage_transitions" (
    "id" SERIAL NOT NULL,
    "userRestorationId" INTEGER NOT NULL,
    "fromStageId" INTEGER NOT NULL,
    "toStageId" INTEGER NOT NULL,
    "transitionedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transitionedById" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_transitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage_reflections" (
    "id" SERIAL NOT NULL,
    "userRestorationId" INTEGER NOT NULL,
    "stageId" INTEGER NOT NULL,
    "reflection" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stage_reflections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restoration_stages_key_key" ON "restoration_stages"("key");

-- CreateIndex
CREATE UNIQUE INDEX "restoration_stages_sequence_key" ON "restoration_stages"("sequence");

-- CreateIndex
CREATE INDEX "restoration_stages_sequence_idx" ON "restoration_stages"("sequence");

-- CreateIndex
CREATE UNIQUE INDEX "stage_content_stageId_key" ON "stage_content"("stageId");

-- CreateIndex
CREATE UNIQUE INDEX "user_restorations_userId_key" ON "user_restorations"("userId");

-- CreateIndex
CREATE INDEX "stage_transitions_userRestorationId_idx" ON "stage_transitions"("userRestorationId");

-- CreateIndex
CREATE INDEX "stage_transitions_transitionedAt_idx" ON "stage_transitions"("transitionedAt");

-- CreateIndex
CREATE INDEX "stage_reflections_userRestorationId_idx" ON "stage_reflections"("userRestorationId");

-- CreateIndex
CREATE INDEX "stage_reflections_stageId_idx" ON "stage_reflections"("stageId");

-- AddForeignKey
ALTER TABLE "stage_content" ADD CONSTRAINT "stage_content_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "restoration_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_restorations" ADD CONSTRAINT "user_restorations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_restorations" ADD CONSTRAINT "user_restorations_currentStageId_fkey" FOREIGN KEY ("currentStageId") REFERENCES "restoration_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_transitions" ADD CONSTRAINT "stage_transitions_userRestorationId_fkey" FOREIGN KEY ("userRestorationId") REFERENCES "user_restorations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_transitions" ADD CONSTRAINT "stage_transitions_fromStageId_fkey" FOREIGN KEY ("fromStageId") REFERENCES "restoration_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_transitions" ADD CONSTRAINT "stage_transitions_toStageId_fkey" FOREIGN KEY ("toStageId") REFERENCES "restoration_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_transitions" ADD CONSTRAINT "stage_transitions_transitionedById_fkey" FOREIGN KEY ("transitionedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_reflections" ADD CONSTRAINT "stage_reflections_userRestorationId_fkey" FOREIGN KEY ("userRestorationId") REFERENCES "user_restorations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_reflections" ADD CONSTRAINT "stage_reflections_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "restoration_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
