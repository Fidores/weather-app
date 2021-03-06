import { AppError } from './../../common/errors/appError';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchFields } from 'src/app/common/validators/matchFields';

import { Conflict } from './../../common/errors/conflict';
import { UserPayload, User } from './../../models/User';
import { AccountService } from './../../services/account/account.service';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private readonly account: AccountService,
    private readonly router: Router,
    private readonly notifications: ToastrService
  ) {}

  signUpForm = new FormGroup(
    {
      name: new FormControl('Jan'),
      email: new FormControl('jan@gmail.com'),
      password: new FormControl('mypassword'),
      confirmPassword: new FormControl('mypassword'),
    },
    matchFields('password', 'confirmPassword')
  );

  ngOnInit() {
    this.router.events
      .pipe(take(1))
      .subscribe(this.removeRedirectRoute.bind(this));
  }

  signUp() {
    const user: UserPayload = {
      name: this.signUpForm.get('name').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
    };

    this.account
      .signUp(user)
      .subscribe(
        this.onSuccessfulSignUp.bind(this),
        this.onUnsuccessfulSignUp.bind(this)
      );
  }

  private onSuccessfulSignUp(user: User) {
    const redirectTo = sessionStorage.getItem('redirectTo');
    this.router.navigate(redirectTo ? [redirectTo] : ['/']);
  }

  private onUnsuccessfulSignUp(error: AppError) {
    if (error instanceof Conflict)
      this.notifications.error(
        'Konto z tym adresem email zostało już zarejestrowane w tym serwisie.',
        'Email w użyciu'
      );
    else throw error;
  }

  private removeRedirectRoute($event: RouterEvent) {
    if ($event.url === '/login') return;

    sessionStorage.removeItem('redirectTo');
  }
}
