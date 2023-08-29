DO $$ BEGIN
 CREATE TYPE "Roles" AS ENUM('USER', 'ADMIN', 'SUPER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"avatarUrl" text,
	"role" "Roles" NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adminProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"nik" integer NOT NULL,
	"phoneNumber" text,
	"createdAt" timestamp(3) DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "salesProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"kcontact" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "superProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phoneNumber" integer NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAttendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"checkInTime" timestamp(3) NOT NULL,
	"checkOutTime" timestamp(3),
	"latitude" double precision,
	"longitude" double precision,
	"salesProfileId" integer,
	"photo" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "adminProfile_nik_key" ON "adminProfile" ("nik");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "adminProfile_userId_key" ON "adminProfile" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "salesProfile_kcontact_key" ON "salesProfile" ("kcontact");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "salesProfile_userId_key" ON "salesProfile" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "superProfile_userId_key" ON "superProfile" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adminProfile" ADD CONSTRAINT "adminProfile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "salesProfile" ADD CONSTRAINT "salesProfile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "superProfile" ADD CONSTRAINT "superProfile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAttendance" ADD CONSTRAINT "userAttendance_salesProfileId_salesProfile_id_fk" FOREIGN KEY ("salesProfileId") REFERENCES "salesProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
