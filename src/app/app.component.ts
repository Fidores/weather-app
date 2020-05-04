import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

import { SpriteInjector } from './common/spriteInjector';
import { AccountService } from './services/account/account.service';
import { SettingsService } from './services/app-settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: SpriteInjector, useClass: SpriteInjector }],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly account: AccountService,
    private readonly settings: SettingsService,
    private readonly sprites: SpriteInjector
  ) {}

  ngOnInit() {
    // Add polish locale
    registerLocaleData(localePl);

    if (this.account.isLoggedIn) {
      concat(this.settings.init(), this.account.loadUser()).subscribe();
    }

    // Add weather icon pack as a sprite.
    this.sprites.inject('../assets/icons/weather-icons/sprite.svg');
  }
}
