import { AccountService } from 'src/app/services/account/account.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AppSettings } from './../../models/AppSettings';
import { handleError } from 'src/app/common/errors/handleError';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private readonly http: HttpClient,
    private readonly account: AccountService
  ) { 

    // After user logs in, update settings.
    this.account.user.subscribe(user => {
      if(account.isLoggedIn) this.init().subscribe();
    });

  }

  private readonly _settings: BehaviorSubject<AppSettings> = new BehaviorSubject({} as AppSettings);

  /**
   * It's used to load settings locally.
  */

  init(): Observable<AppSettings> {
    console.log('Test')
    return this.http.get<AppSettings>(`${ environment.API.origin }users/me/settings`)
      .pipe(tap(appSettings => this._settings.next(appSettings)));
  }

  /**
   * It's used to change user's settings.
   * @param newSettings new settings to save. 
  */

  changeSettings(newSettings: AppSettings): Observable<AppSettings> {
    return this.http.patch<AppSettings>(`${ environment.API.origin }users/me/settings`, newSettings)
      .pipe(tap(appSettings => this._settings.next(appSettings)), catchError(handleError));
  }

  /**
   * Gets user's settings.
  */

  get settings(): BehaviorSubject<AppSettings> {
    return this._settings;
  }
}
