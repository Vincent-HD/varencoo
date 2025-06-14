import { Kyselify } from 'drizzle-orm/kysely';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Insertable, Selectable, Updateable } from 'kysely';

export const streetSchema = sqliteTable('street', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull().unique(),
});

export type StreetKysely = Kyselify<typeof streetSchema>
export type Street = Selectable<StreetKysely>
export type NewStreet = Insertable<StreetKysely>
export type StreetUpdate = Updateable<StreetKysely>