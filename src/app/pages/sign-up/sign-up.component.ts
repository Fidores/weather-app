import { Conflict } from './../../common/errors/conflict';
import { Router } from '@angular/router';
import { User, UserPayload } from './../../models/User';
import { AccountService } from './../../services/account/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { matchFields } from 'src/app/common/validators/matchFields';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
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

  signUp() {
    const user: UserPayload = {
      name: this.signUpForm.get('name').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
    };

    this.account.signUp(user).subscribe(
      user => {
        const redirectTo = sessionStorage.getItem('redirectTo');
        this.router
          .navigate(redirectTo ? [redirectTo] : ['/'])
          .then(() => sessionStorage.removeItem('redirectTo'));
      },
      err => {
        if (err instanceof Conflict)
          this.notifications.error(
            'Konto z tym adresem email zostało już zarejestrowane w tym serwisie.',
            'Email w użyciu'
          );
        else throw err;
      }
    );
  }
}