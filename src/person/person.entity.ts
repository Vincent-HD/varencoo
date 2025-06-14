import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { locationSchema } from '../location/location.entity';
import { Insertable, Selectable, Updateable } from 'kysely';
import { Kyselify } from 'drizzle-orm/kysely';

export const personSchema = sqliteTable('person', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: text('slug').notNull().unique(),
    lastname: text('lastname').notNull(),
    firstname: text('firstname').notNull(),
    gender: text('gender').notNull(),
    locationId: text('location_id').notNull().references(() => locationSchema.id)
});


export type PersonKysely = Kyselify<typeof personSchema>
export type Person = Selectable<PersonKysely>
export type NewPerson = Insertable<PersonKysely>
export type PersonUpdate = Updateable<PersonKysely>