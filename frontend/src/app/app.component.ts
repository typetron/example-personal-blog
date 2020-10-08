import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'App/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    selectedPage = '';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private authService: AuthService
    ) {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((event: NavigationEnd) => {
                this.selectedPage = event.url.split('/')[1];
            });
    }

    logout() {
        this.authService.logout();
    }
}
