import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Add polish locale
    registerLocaleData(localePl);
  }
}
