import { Controller, Post } from '@Typetron/Router'
import { RegisterForm } from 'App/Forms/RegisterForm'
import { User } from 'App/Entities/User'
import { User as UserModel } from 'App/Models/User'
import { LoginForm } from 'App/Forms/LoginForm'
import { Container, Inject } from '@Typetron/Container'
import { Auth } from '@Typetron/Framework/Auth'

@Controller('api')
export class AuthController {

    @Inject()
    auth: Auth

    @Post('register')
    async register(form: RegisterForm) {
        if ((await User.newQuery().count()) >= 1) {
            throw new Error('You are not allowed to register')
        }

        const user = await User.where('email', form.email).first()
        if (user) {
            throw new Error('User already exists')
        }

        if (form.password !== form.passwordConfirmation) {
            throw new Error('Passwords don\'t match')
        }

        return UserModel.from(this.auth.register(form.email, form.password))
    }

    @Post('login')
    async login(form: LoginForm) {
        return {
            token: await this.auth.login(form.email, form.password)
        }
    }
}
