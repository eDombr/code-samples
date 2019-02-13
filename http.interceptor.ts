import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private router: Router) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (!token) {
      return next.handle(req);
    }

    const request = token ? req.clone({
      headers: req.headers.set('Authorization', token)
    }) : req;

    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.authService.logOut();
            this.router.navigate(['/notlogin']);

            return Observable.of(null);
          }
        })
      );
  }
}
