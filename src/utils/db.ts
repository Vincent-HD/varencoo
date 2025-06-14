import { getCloudflareBindings } from "./cloudflare-bindings";
import { Kysely } from "kysely";
import { D1Dialect } from 'kysely-d1';
import { LocationKysely } from "../location/location.entity";
import { StreetKysely } from "../street/street.entity";
import { PersonKysely } from "../person/person.entity";

const bindings = await getCloudflareBindings();

interface Database {
    location: LocationKysely
    street: StreetKysely
    person: PersonKysely
}

const db = new Kysely<Database>({
    dialect: new D1Dialect({ database: bindings.DB })
})

export default db