import { fade } from './../../animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';

import { User, UpdateUser } from './../../models/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  animations: [ fade ]
})
export class AccountSettingsComponent implements OnInit, OnDestroy {

  constructor(
    private readonly account: AccountService
  ) { }

  subscriptions: Subscription = new Subscription();
  user: User;
  displaySuccessNotification: boolean = false;

  updateUser() {
    const user: UpdateUser = {
      name: this.user.name,
      email: this.user.email
    }

    this.account.updateUser(user).subscribe(this.onSuccessfulUpdate.bind(this), this.onErrorUpdate.bind(this));
  }

  ngOnInit() {
    this.subscriptions.add(this.account.user.subscribe(user => this.user = user));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private onSuccessfulUpdate(user: User) {
    this.displaySuccessNotification = true;
    setTimeout(() => this.displaySuccessNotification = false, 2000);
  }

  private onErrorUpdate(err: HttpErrorResponse) {
    
  }

}
