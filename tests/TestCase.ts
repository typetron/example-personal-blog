import { TestCase as BaseTestCase } from '@Typetron/Testing/TestCase'
import { Application, AuthConfig } from '@Typetron/Framework'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { User } from 'App/Entities/User'
import { Crypt } from '@Typetron/Encryption'
import { Storage } from '../../../typetron/build/Storage'

dotenv.config({path: 'tests/.env.tests'})

export class TestCase extends BaseTestCase {

    async after() {
        await super.after()
        await this.app.get(Storage).delete(process.env.DATABASE as string)
    }

    async bootstrapApp() {
        return await Application.create(path.join(__dirname, '..'))
    }

    async createUser(overrides: Partial<User> = {}) {
        return await User.create({
            username: String.randomAlphaNum(10),
            email: String.randomAlphaNum(10),
            password: await this.app.get(Crypt).hash(String.randomAlphaNum(10), this.app.get(AuthConfig).saltRounds),
            ...overrides
        })
    }
}
