import { AccountService } from './services/account/account.service';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainHeaderService } from './services/main-header/main-header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private readonly router: Router, 
    private readonly header: MainHeaderService,
    private readonly account: AccountService){}

  ngOnInit() {
    // Clean up header title after every route change. Its purpose is to reduce need for OnDestroy interface.
    this.router.events.subscribe(() => this.header.setTitle(''));

    // Add polish locale
    registerLocaleData(localePl);

    // Initialize user
    this.account.loadUser().subscribe();
  }  

}
