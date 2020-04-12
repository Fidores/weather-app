import { SettingsService } from './services/app-settings/settings.service';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component, OnInit } from '@angular/core';

import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private readonly account: AccountService,
    private readonly settings: SettingsService
  ){}

  ngOnInit() {

    // Add polish locale
    registerLocaleData(localePl);

    // Initialize user
    if(this.account.isLoggedIn) this.account.loadUser().subscribe();

    // Initialize settings
    if(this.account.isLoggedIn) this.settings.init().subscribe();
  }  

}
