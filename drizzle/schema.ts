import { pgTable, pgEnum, varchar, timestamp, text, integer, uniqueIndex, serial, index, doublePrecision } from "drizzle-orm/pg-core"

import { relations, sql } from "drizzle-orm"
export const key_status = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const key_type = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factor_status = pgEnum("factor_status", ['verified', 'unverified'])
export const factor_type = pgEnum("factor_type", ['webauthn', 'totp'])
export const aal_level = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const code_challenge_method = pgEnum("code_challenge_method", ['plain', 's256'])
export const Roles = pgEnum("Roles", ['USER', 'ADMIN', 'SUPERVISOR', 'SUPERADMIN'])
export const Status = pgEnum("Status", ['DELETED', 'SUSPENDED', 'ACTIVE', 'INACTIVE'])


export const _prisma_migrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finished_at: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migration_name: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolled_back_at: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	started_at: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	applied_steps_count: integer("applied_steps_count").default(0).notNull(),
});

export const adminProfile = pgTable("adminProfile", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	nik: integer("nik").notNull(),
	phoneNumber: text("phoneNumber"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow(),
	userId: integer("userId").notNull(),
},
(table) => {
	return {
		nik_key: uniqueIndex("adminProfile_nik_key").on(table.nik),
		userId_key: uniqueIndex("adminProfile_userId_key").on(table.userId),
	}
});

export const userAttendance = pgTable("userAttendance", {
	id: serial("id").primaryKey().notNull(),
	checkInTime: timestamp("checkInTime", { precision: 3, mode: 'string' }).notNull(),
	checkOutTime: timestamp("checkOutTime", { precision: 3, mode: 'string' }),
	latitude: doublePrecision("latitude"),
	longitude: doublePrecision("longitude"),
	salesProfileId: integer("salesProfileId"),
	photo: text("photo"),
	superVisorProfileId: integer("superVisorProfileId"),
	otLocation: text("otLocation"),
},
(table) => {
	return {
		salesProfileId_idx: index("userAttendance_salesProfileId_idx").on(table.salesProfileId),
		superVisorProfileId_idx: index("userAttendance_superVisorProfileId_idx").on(table.superVisorProfileId),
	}
});

export const salesProfile = pgTable("salesProfile", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	kcontact: text("kcontact").notNull(),
	phoneNumber: text("phoneNumber").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow(),
	userId: integer("userId").notNull(),
	superVisorProfileId: integer("superVisorProfileId"),
	agency: text("agency").notNull(),
	branch: text("branch").notNull(),
	status: Status("status"),
},
(table) => {
	return {
		kcontact_key: uniqueIndex("salesProfile_kcontact_key").on(table.kcontact),
		userId_key: uniqueIndex("salesProfile_userId_key").on(table.userId),
		superVisorProfileId_idx: index("salesProfile_superVisorProfileId_idx").on(table.superVisorProfileId),
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

export const superAdminProfile = pgTable("superAdminProfile", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	phoneNumber: integer("phoneNumber").notNull(),
	userId: integer("userId").notNull(),
},
(table) => {
	return {
		userId_key: uniqueIndex("superAdminProfile_userId_key").on(table.userId),
	}
});

export const superVisorProfile = pgTable("superVisorProfile", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	kcontact: text("kcontact").notNull(),
	phoneNumber: text("phoneNumber").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow(),
	userId: integer("userId").notNull(),
	agency: text("agency").notNull(),
	branch: text("branch").notNull(),
	status: Status("status"),
},
(table) => {
	return {
		kcontact_key: uniqueIndex("superVisorProfile_kcontact_key").on(table.kcontact),
		userId_key: uniqueIndex("superVisorProfile_userId_key").on(table.userId),
	}
});

export const usersRelations = relations(User, ({ many }) => ({
	salesProfile: many(salesProfile),
	superVisorProfile: many(superVisorProfile)
}))

export const supervisorUserRelations = relations(superVisorProfile, ({ one }) => ({
	user: one(User, {
		fields: [superVisorProfile.userId],
		references: [User.id]
	})
}))

export const salesUserRelations = relations(salesProfile, ({ one }) => ({
	user: one(User, {
		fields: [salesProfile.userId],
		references: [User.id]
	})
}))