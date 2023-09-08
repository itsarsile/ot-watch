/*
  Warnings:

  - You are about to drop the column `salesProfileId` on the `visitorReport` table. All the data in the column will be lost.
  - You are about to drop the column `superVisorProfileId` on the `visitorReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "visitorReport" DROP COLUMN "salesProfileId",
DROP COLUMN "superVisorProfileId";
