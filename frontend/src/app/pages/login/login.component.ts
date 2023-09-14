import { Component } from '@angular/core'
// import { FormBuilder } from 'App/utils';
import { AuthService } from 'App/services/auth.service'
import { Router } from '@angular/router'
import { LoginForm } from 'Data/LoginForm'
import { FormBuilder } from 'App/utils'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form = FormBuilder.build(LoginForm)

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    async submit() {
        await this.authService.login(this.form.value as LoginForm)
        await this.router.navigate([''])
    }
}
