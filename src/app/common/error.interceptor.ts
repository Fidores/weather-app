import { Conflict } from './errors/conflict';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { BadRequest } from './errors/badRequest';
import { Unauthorized } from './errors/unauthorized';
import { NotFound } from './errors/notFound';
import { AppError } from './errors/appError';

export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 400:
        return throwError(new BadRequest());

      case 401:
        return throwError(new Unauthorized());

      case 404:
        return throwError(new NotFound());

      case 409:
        return throwError(new Conflict());

      default:
        return throwError(new AppError(error));
    }
  };
}
