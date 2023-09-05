/*
  Warnings:

  - You are about to drop the column `salesProfileId` on the `dailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `superVisorProfileId` on the `dailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `salesProfileId` on the `userAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `superVisorProfileId` on the `userAttendance` table. All the data in the column will be lost.
  - Added the required column `userId` to the `userAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "dailyReport_salesProfileId_idx";

-- DropIndex
DROP INDEX "dailyReport_superVisorProfileId_idx";

-- DropIndex
DROP INDEX "userAttendance_salesProfileId_idx";

-- DropIndex
DROP INDEX "userAttendance_superVisorProfileId_idx";

-- AlterTable
ALTER TABLE "dailyReport" DROP COLUMN "salesProfileId",
DROP COLUMN "superVisorProfileId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "userAttendance" DROP COLUMN "salesProfileId",
DROP COLUMN "superVisorProfileId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "dailyReport_userId_idx" ON "dailyReport"("userId");

-- CreateIndex
CREATE INDEX "userAttendance_userId_idx" ON "userAttendance"("userId");
