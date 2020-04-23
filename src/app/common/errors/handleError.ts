import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { BadRequest } from './badRequest';
import { Unauthorized } from './unauthorized';
import { AppError } from './appError';
import { NotFound } from './notFound';

export const handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
        case 400:
          return throwError(new BadRequest())
          
        case 401: 
          return throwError(new Unauthorized())

        case 404:
          return throwError(new NotFound)
      
        default:
          return throwError(new AppError(error));
    }
}