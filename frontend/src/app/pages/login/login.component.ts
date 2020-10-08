import { Component, OnInit } from '@angular/core';
import { FormBuilder } from 'App/utils';
import { AuthService } from 'App/services/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from 'Data/LoginForm';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form = FormBuilder.build(LoginForm);

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    async submit() {
        await this.authService.login(this.form.value);
        await this.router.navigate(['']);

    }
}
