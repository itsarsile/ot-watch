-- DropIndex
DROP INDEX "visitorReport_salesProfileId_idx";

-- DropIndex
DROP INDEX "visitorReport_superVisorProfileId_idx";

-- AlterTable
ALTER TABLE "visitorReport" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE INDEX "visitorReport_userId_idx" ON "visitorReport"("userId");
