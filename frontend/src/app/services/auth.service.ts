import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoginForm } from 'Data/LoginForm';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token$ = new BehaviorSubject<string | undefined>(undefined);

    constructor(private http: HttpClient) {
        this.token$.next(localStorage.getItem('token'));
    }

    async login(loginForm: LoginForm) {
        const {token} = await this.http.post<{token: string}>('api/login', loginForm).toPromise();
        localStorage.setItem('token', token);
        this.token$.next(token);
    }

    logout() {
        localStorage.removeItem('token');
        this.token$.next(undefined);
    }
}
