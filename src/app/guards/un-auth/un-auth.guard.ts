import { AccountService } from 'src/app/services/account/account.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

/** Prevents unauthenticated users from accesssing the route */

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private readonly account: AccountService,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.account.isLoggedIn) {
      this.router.navigate(['/login']);
      sessionStorage.setItem('redirectTo', state.url);
    }
    return this.account.isLoggedIn;
  }
}
