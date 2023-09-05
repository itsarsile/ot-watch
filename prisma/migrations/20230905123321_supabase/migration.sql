-- CreateTable
CREATE TABLE "dailyReport" (
    "id" SERIAL NOT NULL,
    "visitorCount" INTEGER NOT NULL,
    "journal" TEXT NOT NULL,
    "salesProfileId" INTEGER,
    "superVisorProfileId" INTEGER,

    CONSTRAINT "dailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "dailyReport_salesProfileId_idx" ON "dailyReport"("salesProfileId");

-- CreateIndex
CREATE INDEX "dailyReport_superVisorProfileId_idx" ON "dailyReport"("superVisorProfileId");
