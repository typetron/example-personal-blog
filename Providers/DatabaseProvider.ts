import { Inject } from '@Typetron/Container';
import { Query } from '@Typetron/Database';
import { Connection } from '@Typetron/Database/Connection';
import { DatabaseConfig, Provider } from '@Typetron/Framework';

export class DatabaseProvider extends Provider {

    @Inject()
    databaseConfig: DatabaseConfig;

    async register() {
        if (this.databaseConfig.database) {
            Query.connection = new Connection(this.databaseConfig.database);
        }
    }
}
