/*
  Warnings:

  - You are about to drop the column `userAttendanceId` on the `visitorReport` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "visitorReport_userAttendanceId_idx";

-- AlterTable
ALTER TABLE "userAttendance" ALTER COLUMN "checkInTime" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "checkOutTime" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "visitorReport" DROP COLUMN "userAttendanceId",
ADD COLUMN     "salesProfileId" INTEGER,
ADD COLUMN     "superVisorProfileId" INTEGER;

-- CreateIndex
CREATE INDEX "visitorReport_salesProfileId_idx" ON "visitorReport"("salesProfileId");

-- CreateIndex
CREATE INDEX "visitorReport_superVisorProfileId_idx" ON "visitorReport"("superVisorProfileId");
