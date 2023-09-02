-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INACTIVE', 'ACTIVE', 'SUSPENDED', 'DELETED');

-- AlterTable
ALTER TABLE "salesProfile" ADD COLUMN     "status" "Status";

-- AlterTable
ALTER TABLE "superVisorProfile" ADD COLUMN     "status" "Status";
