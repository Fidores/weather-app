import { User } from './../../models/User';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

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

  private onUnsuccessfulLogin(err: HttpErrorResponse) {
    this.error = true;
  }

}
