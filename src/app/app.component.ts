import { SettingsService } from './services/app-settings/settings.service';
import { AccountService } from 'src/app/services/account/account.service';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly account: AccountService,
    private readonly settings: SettingsService
  ) {}

  ngOnInit() {
    // Add polish locale
    registerLocaleData(localePl);

    if (this.account.isLoggedIn) {
      concat(this.settings.init(), this.account.init()).subscribe();
    }
  }
}
