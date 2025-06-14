import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { streetSchema } from "../street/street.entity";
import { Kyselify } from "drizzle-orm/kysely";
import { Insertable, Selectable, Updateable, } from "kysely";

export const locationSchema = sqliteTable('location', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    number: text('number').notNull().unique(),
    street: text('street').notNull().references(() => streetSchema.id)
});

export type LocationKysely = Kyselify<typeof locationSchema>
export type Location = Selectable<LocationKysely>
export type NewLocation = Insertable<LocationKysely>
export type LocationUpdate = Updateable<LocationKysely>
