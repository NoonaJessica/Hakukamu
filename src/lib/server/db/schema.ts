import { randomUUID } from 'crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const user = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  age: integer('age')
});

export const jobApplication = sqliteTable('job_application', {
	id: integer('id').primaryKey({ autoIncrement: true }),

	company: text('company').notNull(),
	role: text('role').notNull(),

	status: text('status')
		.$type<'LAHETETTY' | 'HAASTATTELU' | 'TARJOUS' | 'HYLATTY'>()
		.notNull()
		.default('LAHETETTY'),

	notes: text('notes'),
	url: text('url'),

createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
updatedAt: integer('updated_at').notNull().default(sql`(unixepoch())`),
});