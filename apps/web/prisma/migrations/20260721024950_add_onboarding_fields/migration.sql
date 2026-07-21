/*
  Warnings:

  - Made the column `displayName` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "countryRegion" TEXT,
ADD COLUMN     "covenantAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "covenantAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "preferredName" TEXT,
ADD COLUMN     "profilePhotoUrl" TEXT,
ADD COLUMN     "timeZone" TEXT,
ALTER COLUMN "displayName" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false;
