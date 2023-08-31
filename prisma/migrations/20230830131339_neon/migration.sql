/*
  Warnings:

  - You are about to drop the `superProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "superProfile" DROP CONSTRAINT "superProfile_userId_fkey";

-- AlterTable
ALTER TABLE "salesProfile" ADD COLUMN     "superVisorProfileId" INTEGER;

-- AlterTable
ALTER TABLE "userAttendance" ADD COLUMN     "superVisorProfileId" INTEGER;

-- DropTable
DROP TABLE "superProfile";

-- CreateTable
CREATE TABLE "superVisorProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "kcontact" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "superVisorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "superAdminProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "superAdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superVisorProfile_kcontact_key" ON "superVisorProfile"("kcontact");

-- CreateIndex
CREATE UNIQUE INDEX "superVisorProfile_userId_key" ON "superVisorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "superAdminProfile_userId_key" ON "superAdminProfile"("userId");

-- AddForeignKey
ALTER TABLE "salesProfile" ADD CONSTRAINT "salesProfile_superVisorProfileId_fkey" FOREIGN KEY ("superVisorProfileId") REFERENCES "superVisorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superVisorProfile" ADD CONSTRAINT "superVisorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superAdminProfile" ADD CONSTRAINT "superAdminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAttendance" ADD CONSTRAINT "userAttendance_superVisorProfileId_fkey" FOREIGN KEY ("superVisorProfileId") REFERENCES "superVisorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
