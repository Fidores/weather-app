import { AccountService } from 'src/app/services/account/account.service';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly account: AccountService) {}

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    if (!this.account.isLoggedIn) return next.handle(req);

    const token = this.account.getAuthToken();
    const newReq = req.clone({
      setHeaders: {
        'X-AUTH-TOKEN': token,
      },
    });

    return next.handle(newReq);
  }
}
