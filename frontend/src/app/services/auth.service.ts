import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, lastValueFrom } from 'rxjs'
import { LoginForm } from 'Data/LoginForm'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token$ = new BehaviorSubject<string>(localStorage.getItem('token') ?? '')

    constructor(private router: Router, private http: HttpClient) {
        this.token$.subscribe(token => {
            if (token) {
                localStorage.setItem('token', token)
            } else {
                localStorage.removeItem('token')
            }
        })
    }

    async login(loginForm: LoginForm) {
        const {token} = await lastValueFrom(this.http.post<{token: string}>('api/login', loginForm))
        this.token$.next(token)
    }

    logout() {
        this.token$.next('')
        this.router.navigateByUrl('/')
    }
}
