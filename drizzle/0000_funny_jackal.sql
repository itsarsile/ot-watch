-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "Roles" AS ENUM('USER', 'ADMIN', 'SUPER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"avatarUrl" text NOT NULL,
	"role" "Roles" NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adminProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"nik" integer NOT NULL,
	"phoneNumber" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "salesProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"kcontact" text NOT NULL,
	"phoneNumber" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "adminProfile_nik_key" ON "adminProfile" ("nik");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "adminProfile_userId_key" ON "adminProfile" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "salesProfile_kcontact_key" ON "salesProfile" ("kcontact");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "salesProfile_userId_key" ON "salesProfile" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "superProfile_userId_key" ON "superProfile" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adminProfile" ADD CONSTRAINT "adminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "salesProfile" ADD CONSTRAINT "salesProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "superProfile" ADD CONSTRAINT "superProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/