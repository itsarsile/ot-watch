-- AlterTable
ALTER TABLE "userAttendance" ADD COLUMN     "otLocation" TEXT;

-- AddForeignKey
ALTER TABLE "adminProfile" ADD CONSTRAINT "adminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesProfile" ADD CONSTRAINT "salesProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesProfile" ADD CONSTRAINT "salesProfile_superVisorProfileId_fkey" FOREIGN KEY ("superVisorProfileId") REFERENCES "superVisorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superVisorProfile" ADD CONSTRAINT "superVisorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superAdminProfile" ADD CONSTRAINT "superAdminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAttendance" ADD CONSTRAINT "userAttendance_salesProfileId_fkey" FOREIGN KEY ("salesProfileId") REFERENCES "salesProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAttendance" ADD CONSTRAINT "userAttendance_superVisorProfileId_fkey" FOREIGN KEY ("superVisorProfileId") REFERENCES "superVisorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
