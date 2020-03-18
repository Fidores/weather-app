import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly account: AccountService,
    private readonly router: Router
  ) { }

  user = {
    email: 'albert@domain.com',
    password: 'mypassword'
  };
  error: boolean = false;

  onSubmit() {
    this.account.login(this.user.email, this.user.password).subscribe(this.onSuccessfulLogin.bind(this), this.onUnsuccessfulLogin.bind(this));
  }

  ngOnInit() {
  }

  private onSuccessfulLogin(user) {
    console.log(user);
    this.error = false;
    this.router.navigate(['/']);
  }

  private onUnsuccessfulLogin(err: HttpErrorResponse) {
    this.error = true;
  }

}
