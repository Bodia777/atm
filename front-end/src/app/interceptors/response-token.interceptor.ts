import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import { Injectable } from '@angular/core';
import { AuthCRUDServiceService } from '../services/auth-crudservice.service';

@Injectable()
export class ResponseTokenInterceptor implements HttpInterceptor {
    private loginAge: number;

    constructor(private localStorageService: LocalStorageService, private authCrudService: AuthCRUDServiceService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('InterceptRequest', req);
        return next.handle(req)
        .pipe(
            tap((event) => {
                if (event.type === HttpEventType.Response) {
                    this.userIsAuthenticated(event);
                }
            })
        );
    }

    private userIsAuthenticated(response: HttpResponse<any>): void {
        if (response.headers.get('Login-Age')) {
          this.loginAge = +response.headers.get('Login-Age');
          const loginDate = new Date(new Date().getTime() + this.loginAge);
          this.localStorageService.setTokenDate(this.loginAge, loginDate);
          this.authCrudService.isAuthenticated = true;
        } else {
            if (this.authCrudService.isAuthenticated && this.localStorageService.tokenAgeChecker) {
                const loginDate = new Date(new Date().getTime() + this.loginAge);
                this.localStorageService.setTokenDate(this.loginAge, loginDate);
            }
        }
      }

}
