import { pgTable, pgEnum, varchar, timestamp, text, integer, uniqueIndex, foreignKey, serial, doublePrecision } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const Roles = pgEnum("Roles", ['USER', 'ADMIN', 'SUPER'])


// export const _prisma_migrations = pgTable("_prisma_migrations", {
// 	id: varchar("id", { length: 36 }).primaryKey().notNull(),
// 	checksum: varchar("checksum", { length: 64 }).notNull(),
// 	finished_at: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
// 	migration_name: varchar("migration_name", { length: 255 }).notNull(),
// 	logs: text("logs"),
// 	rolled_back_at: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
// 	started_at: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
// 	applied_steps_count: integer("applied_steps_count").default(0).notNull(),
// });

export const adminProfile = pgTable("adminProfile", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	nik: integer("nik").notNull(),
	phoneNumber: text("phoneNumber"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow(),
	userId: integer("userId").notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		nik_key: uniqueIndex("adminProfile_nik_key").on(table.nik),
		userId_key: uniqueIndex("adminProfile_userId_key").on(table.userId),
	}
});

export const User = pgTable("User", {
	id: serial("id").primaryKey().notNull(),
	username: text("username").notNull(),
	password: text("password").notNull(),
	avatarUrl: text("avatarUrl"),
	role: Roles("role").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		username_key: uniqueIndex("User_username_key").on(table.username),
	}
});

export const superProfile = pgTable("superProfile", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	phoneNumber: integer("phoneNumber").notNull(),
	userId: integer("userId").notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		userId_key: uniqueIndex("superProfile_userId_key").on(table.userId),
	}
});

export const userAttendance = pgTable("userAttendance", {
	id: serial("id").primaryKey().notNull(),
	checkInTime: timestamp("checkInTime", { precision: 3, mode: 'string' }).notNull(),
	checkOutTime: timestamp("checkOutTime", { precision: 3, mode: 'string' }),
	latitude: doublePrecision("latitude"),
	longitude: doublePrecision("longitude"),
	salesProfileId: integer("salesProfileId").references(() => salesProfile.id, { onDelete: "set null", onUpdate: "cascade" } ),
	photo: text("photo"),
});

export const salesProfile = pgTable("salesProfile", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	kcontact: text("kcontact").notNull(),
	phoneNumber: text("phoneNumber").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow(),
	userId: integer("userId").notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		kcontact_key: uniqueIndex("salesProfile_kcontact_key").on(table.kcontact),
		userId_key: uniqueIndex("salesProfile_userId_key").on(table.userId),
	}
});