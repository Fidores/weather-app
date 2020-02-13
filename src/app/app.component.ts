import { MainHeaderService } from './services/main-header/main-header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router, private readonly header: MainHeaderService){}

  ngOnInit() {
    // Clean up header title after every route change. Its purpose is to reduce need for OnDestroy interface.
    this.router.events.subscribe(() => this.header.setTitle(''));

    // Add polish locale
    registerLocaleData(localePl);
  }  

}
