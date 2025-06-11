import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((err: HttpErrorResponse, retryCount) => {
            if (err.status === 429 && retryCount < 5) {
              const retryAfterSec = Number(err.headers.get('Retry-After')) || 1;
              return timer(retryAfterSec * 1000);
            }
            return throwError(() => err);
          })
        )
      )
    );
  }
}