/* tslint:disable:no-default-export */
import { DatabaseConfig } from '@Typetron/Framework'
import { SqliteDriver } from '@Typetron/Database'

export default new DatabaseConfig({
    entities: './Entities',
    synchronizeSchema: true,
    driver: process.env.databaseDriver ?? 'sqlite',

    drivers: {
        sqlite: () => new SqliteDriver(process.env.database ?? 'database.sqlite'),
    }
})
