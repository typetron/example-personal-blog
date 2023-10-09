import { DatabaseConfig } from '@Typetron/Framework'
import { SqliteDriver } from '@Typetron/Database'

export default new DatabaseConfig({
    entities: './Entities',
    synchronizeSchema: true,
    driver: process.env.DATABASE_DRIVER ?? 'sqlite',

    drivers: {
        sqlite: () => new SqliteDriver(process.env.DATABASE ?? 'database.sqlite'),
    }
})
