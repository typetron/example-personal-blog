import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'
import { TestCase } from '../../TestCase'
import { Http } from '@Typetron/Router/Http'
import { User } from 'App/Models/User'
import { User as UserEntity } from 'App/Entities/User'

@suite
class AuthControllerTest extends TestCase {

    @test
    async register() {
        await UserEntity.truncate()
        const response = await this.post<User>('api.register', {
            email: 'testuser@test.com',
            password: 'password',
            passwordConfirmation: 'password'
        })

        expect(response.status).to.be.equals(Http.Status.OK)
        expect(response.body.email).to.be.equals('testuser@test.com')
    }

    @test
    async login() {
        const response = await this.post<{token: string}>('api.login', {
            email: 'testuser@test.com',
            password: 'password'
        })

        expect(response.status).to.be.equals(Http.Status.OK)
        expect(response.body.token).not.to.be.null
    }
}
