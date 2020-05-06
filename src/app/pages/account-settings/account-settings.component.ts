import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';

import { fade } from './../../animations';
import { UpdateUser, User } from './../../models/User';

@Component({
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  animations: [fade],
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  constructor(
    private readonly account: AccountService,
    private readonly notifications: ToastrService
  ) {}

  subscriptions: Subscription = new Subscription();
  user: User;

  updateUser() {
    const user: UpdateUser = {
      name: this.user.name,
      email: this.user.email,
    };

    this.account
      .updateUser(user)
      .pipe(take(1))
      .subscribe(this.onSuccessfulUpdate.bind(this));
  }

  ngOnInit() {
    this.subscriptions.add(
      this.account.user.subscribe(user => (this.user = user))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private onSuccessfulUpdate(user: User) {
    this.notifications.success('Dane zostały zmienione poprawnie.');
  }
}
