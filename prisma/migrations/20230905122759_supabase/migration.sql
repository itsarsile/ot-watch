-- CreateTable
CREATE TABLE "visitorReport" (
    "id" SERIAL NOT NULL,
    "visitorName" TEXT NOT NULL,
    "visitorPhone" TEXT NOT NULL,
    "visitorAddress" TEXT NOT NULL,
    "visitorNeeds" TEXT NOT NULL,
    "visitorDealing" TEXT NOT NULL,
    "visitorTrackId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAttendanceId" INTEGER,

    CONSTRAINT "visitorReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visitorReport_userAttendanceId_idx" ON "visitorReport"("userAttendanceId");
