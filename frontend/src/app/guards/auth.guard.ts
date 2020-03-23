import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'App/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    async canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.token$.getValue()) {
            return true;
        } else {
            return await this.router.navigate(['/']);
        }
    }

}
