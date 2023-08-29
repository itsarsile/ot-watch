-- CreateTable
CREATE TABLE "userAttendance" (
    "id" SERIAL NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL,
    "checkOutTime" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "salesProfileId" INTEGER,

    CONSTRAINT "userAttendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userAttendance" ADD CONSTRAINT "userAttendance_salesProfileId_fkey" FOREIGN KEY ("salesProfileId") REFERENCES "salesProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
