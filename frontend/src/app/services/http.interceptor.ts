import { Injectable } from '@angular/core'
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor as BaseHttpInterceptor,
    HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class HttpInterceptor implements BaseHttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 422) {
                    const errors = Object.values(errorResponse.error.message)
                        .flatMap(item => Object.values(item as object)).join('\n')
                    alert(`Form errors: \n${errors}`)
                } else {
                    if (errorResponse.error.message) {
                        alert(errorResponse.error.message)
                    }else{
                        if (errorResponse.error.error) {
                            alert(errorResponse.error.error)
                        } else {
                            alert(errorResponse.error)
                        }
                    }
                }

                return new Observable<HttpEvent<any>>()
            })
        )
    }
}
