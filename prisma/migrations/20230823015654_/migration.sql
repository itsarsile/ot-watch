-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPER', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nik" INTEGER NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "adminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "kcontact" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "salesProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "superProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "superProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfile_nik_key" ON "adminProfile"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfile_userId_key" ON "adminProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "salesProfile_kcontact_key" ON "salesProfile"("kcontact");

-- CreateIndex
CREATE UNIQUE INDEX "salesProfile_userId_key" ON "salesProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "superProfile_userId_key" ON "superProfile"("userId");

-- AddForeignKey
ALTER TABLE "adminProfile" ADD CONSTRAINT "adminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesProfile" ADD CONSTRAINT "salesProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superProfile" ADD CONSTRAINT "superProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
