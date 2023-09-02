/*
  Warnings:

  - The values [SUPER] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `agency` to the `salesProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `salesProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agency` to the `superVisorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `superVisorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('SUPERADMIN', 'SUPERVISOR', 'ADMIN', 'USER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
COMMIT;

-- AlterTable
ALTER TABLE "salesProfile" ADD COLUMN     "agency" TEXT NOT NULL,
ADD COLUMN     "branch" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "superVisorProfile" ADD COLUMN     "agency" TEXT NOT NULL,
ADD COLUMN     "branch" TEXT NOT NULL;
