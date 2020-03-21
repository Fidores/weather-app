import { fade } from './../../animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';

import { User } from './../../models/User';

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
    this.displaySuccessNotification = true;
    setTimeout(() => this.displaySuccessNotification = false, 2000);
  }

  ngOnInit() {
    this.subscriptions.add(this.account.user.subscribe(user => this.user = user ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
