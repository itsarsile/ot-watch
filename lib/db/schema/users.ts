import {int, mysqlEnum, mysqlTable, serial, text, varchar} from "drizzle-orm/mysql-core";


export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 256}),
    username: varchar('username', {length: 256}),
    avatar: text('avatar_url'),
    role: mysqlEnum('role', ['super', 'admin', 'user']),
    password: varchar('password', {length: 256})
})

export const adminProfile = mysqlTable('admin_profile', {
    id: int('id').primaryKey(),
    nik: int('nik').unique(),
    userId: int('user_id').notNull().references(() => users.id),

})

export const salesProfile = mysqlTable('sales_profile', {
    id: int('id').primaryKey(),
    kcontact: int('k_contact').unique(),
    userId: int('user_id').notNull().references(() => users.id),
})