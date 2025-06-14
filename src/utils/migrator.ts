
import { drizzle } from 'drizzle-orm/d1';
import { migrate } from 'drizzle-orm/d1/migrator';
import { getCloudflareBindings } from './cloudflare-bindings';

export const migrator = async () => {
    const bindings = await getCloudflareBindings();

    const db = drizzle(bindings.DB);

    console.log('Migrating database...');
    await migrate(db, { migrationsFolder: './src/migrations' });
    console.log('Database migrated successfully');
}