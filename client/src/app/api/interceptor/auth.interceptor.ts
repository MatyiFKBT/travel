import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: UserService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.isLoggedIn) {
            const authorizedRequest = request.clone({
                headers: new HttpHeaders({
                    Authorization: `Bearer ${this.authService.token}`,
                }),
            });
            return next.handle(authorizedRequest);
        } else {
            return next.handle(request);
        }
    }
}
