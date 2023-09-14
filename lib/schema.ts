import {
  pgTable,
  pgEnum,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
  serial,
  index,
  doublePrecision,
  pgView,
  QueryBuilder,
} from "drizzle-orm/pg-core";

import { relations, sql } from "drizzle-orm";
export const keyStatus = pgEnum("key_status", [
  "expired",
  "invalid",
  "valid",
  "default",
]);
export const keyType = pgEnum("key_type", [
  "stream_xchacha20",
  "secretstream",
  "secretbox",
  "kdf",
  "generichash",
  "shorthash",
  "auth",
  "hmacsha256",
  "hmacsha512",
  "aead-det",
  "aead-ietf",
]);
export const factorStatus = pgEnum("factor_status", ["verified", "unverified"]);
export const factorType = pgEnum("factor_type", ["webauthn", "totp"]);
export const aalLevel = pgEnum("aal_level", ["aal3", "aal2", "aal1"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "plain",
  "s256",
]);
export const roles = pgEnum("Roles", [
  "USER",
  "ADMIN",
  "SUPERVISOR",
  "SUPERADMIN",
]);
export const status = pgEnum("Status", [
  "DELETED",
  "SUSPENDED",
  "ACTIVE",
  "INACTIVE",
]);

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  checksum: varchar("checksum", { length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text("logs"),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const adminProfile = pgTable(
  "adminProfile",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    nik: integer("nik").notNull(),
    phoneNumber: text("phoneNumber"),
    createdAt: timestamp("createdAt", {
      precision: 3,
      mode: "string",
    }).defaultNow(),
    userId: integer("userId").notNull(),
  },
  (table) => {
    return {
      nikKey: uniqueIndex("adminProfile_nik_key").on(table.nik),
      userIdKey: uniqueIndex("adminProfile_userId_key").on(table.userId),
    };
  }
);

export const userAttendance = pgTable(
  "userAttendance",
  {
    id: serial("id").primaryKey().notNull(),
    checkInTime: timestamp("checkInTime", {
      precision: 6,
      withTimezone: true,
      mode: "string",
    }).notNull(),
    checkOutTime: timestamp("checkOutTime", {
      precision: 6,
      withTimezone: true,
      mode: "string",
    }),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    photo: text("photo"),
    otLocation: text("otLocation"),
    userId: integer("userId").notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("userAttendance_userId_idx").on(table.userId),
    };
  }
);

export const salesProfile = pgTable(
  "salesProfile",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    kcontact: text("kcontact").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    createdAt: timestamp("createdAt", {
      precision: 3,
      mode: "string",
    }).defaultNow(),
    userId: integer("userId").notNull(),
    superVisorProfileId: integer("superVisorProfileId"),
    agency: text("agency").notNull(),
    branch: text("branch").notNull(),
    status: status("status"),
  },
  (table) => {
    return {
      kcontactKey: uniqueIndex("salesProfile_kcontact_key").on(table.kcontact),
      userIdKey: uniqueIndex("salesProfile_userId_key").on(table.userId),
      superVisorProfileIdIdx: index("salesProfile_superVisorProfileId_idx").on(
        table.superVisorProfileId
      ),
    };
  }
);

export const user = pgTable(
  "User",
  {
    id: serial("id").primaryKey().notNull(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    avatarUrl: text("avatarUrl"),
    role: roles("role").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      usernameKey: uniqueIndex("User_username_key").on(table.username),
    };
  }
);

export const superVisorProfile = pgTable(
  "superVisorProfile",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    kcontact: text("kcontact").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    createdAt: timestamp("createdAt", {
      precision: 3,
      mode: "string",
    }).defaultNow(),
    userId: integer("userId").notNull(),
    agency: text("agency").notNull(),
    branch: text("branch").notNull(),
    status: status("status"),
  },
  (table) => {
    return {
      kcontactKey: uniqueIndex("superVisorProfile_kcontact_key").on(
        table.kcontact
      ),
      userIdKey: uniqueIndex("superVisorProfile_userId_key").on(table.userId),
    };
  }
);

export const dailyReport = pgTable(
  "dailyReport",
  {
    id: serial("id").primaryKey().notNull(),
    visitorCount: integer("visitorCount").notNull(),
    journal: text("journal").notNull(),
    userId: integer("userId"),
  },
  (table) => {
    return {
      userIdIdx: index("dailyReport_userId_idx").on(table.userId),
    };
  }
);

export const superAdminProfile = pgTable(
  "superAdminProfile",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    phoneNumber: integer("phoneNumber").notNull(),
    userId: integer("userId").notNull(),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("superAdminProfile_userId_key").on(table.userId),
    };
  }
);

export const visitorReport = pgTable(
  "visitorReport",
  {
    id: serial("id").primaryKey().notNull(),
    visitorName: text("visitorName").notNull(),
    visitorPhone: text("visitorPhone").notNull(),
    visitorAddress: text("visitorAddress").notNull(),
    visitorNeeds: text("visitorNeeds").notNull(),
    visitorDealing: text("visitorDealing").notNull(),
    visitorTrackId: text("visitorTrackId"),
    createdAt: timestamp("createdAt", {
      precision: 3,
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    userId: integer("userId"),
  },
  (table) => {
    return {
      userIdIdx: index("visitorReport_userId_idx").on(table.userId),
    };
  }
);

export const usersRelations = relations(user, ({ many }) => ({
  salesProfile: many(salesProfile),
  superVisorProfile: many(superVisorProfile),
}));

export const supervisorUserRelations = relations(
  superVisorProfile,
  ({ one }) => ({
    user: one(user, {
      fields: [superVisorProfile.userId],
      references: [user.id],
    }),
  })
);

export const salesUserRelations = relations(salesProfile, ({ one }) => ({
  user: one(user, {
    fields: [salesProfile.userId],
    references: [user.id],
  }),
}));