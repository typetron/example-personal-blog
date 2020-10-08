import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'App/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appAuth]'
})
export class AuthDirective implements OnDestroy {

    destroy$ = new Subject();

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) {
        this.authService.token$
            .pipe(takeUntil(this.destroy$))
            .subscribe((token) => {
                if (token) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

}
