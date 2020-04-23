import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';

import { AppError } from './../../common/errors/appError';
import { BadRequest } from './../../common/errors/badRequest';
import { User } from './../../models/User';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private readonly account: AccountService,
    private readonly router: Router
  ) { }

  user = {
    email: 'john@gmail.com',
    password: 'mypassword'
  };
  error: boolean = false;

  onSubmit() {
    this.account.login(this.user.email, this.user.password).pipe(take(1)).subscribe(this.onSuccessfulLogin.bind(this), this.onUnsuccessfulLogin.bind(this));
  }

  private onSuccessfulLogin(user: User) {
    const redirectRoute = sessionStorage.getItem('redirectTo') ? [sessionStorage.getItem('redirectTo')] : ['/'];
    this.error = false;
    this.router.navigate(redirectRoute).then(() => sessionStorage.removeItem('redirectTo'));
  }

  private onUnsuccessfulLogin(err: AppError) {
    if(err instanceof BadRequest) 
      this.error = true;
      
    else throw err;
  }

}
