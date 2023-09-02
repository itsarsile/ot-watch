-- DropForeignKey
ALTER TABLE "adminProfile" DROP CONSTRAINT "adminProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "salesProfile" DROP CONSTRAINT "salesProfile_superVisorProfileId_fkey";

-- DropForeignKey
ALTER TABLE "salesProfile" DROP CONSTRAINT "salesProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "superAdminProfile" DROP CONSTRAINT "superAdminProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "superVisorProfile" DROP CONSTRAINT "superVisorProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "userAttendance" DROP CONSTRAINT "userAttendance_salesProfileId_fkey";

-- DropForeignKey
ALTER TABLE "userAttendance" DROP CONSTRAINT "userAttendance_superVisorProfileId_fkey";
