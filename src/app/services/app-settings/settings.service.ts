import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AppSettings } from './../../models/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  private readonly _settings: BehaviorSubject<AppSettings> = new BehaviorSubject({} as AppSettings);

  /**
   * It's used to load settings locally. Should be called once at the beginning of app initialization.
  */

  init(): Observable<AppSettings> {
    return this.http.get<AppSettings>(`${ environment.API.origin }users/me/settings`).pipe(tap(appSettings => this._settings.next(appSettings)));
  }

  /**
   * It's used to change user's settings.
   * @param newSettings new settings to save. 
  */

  changeSettings(newSettings: AppSettings): Observable<AppSettings> {
    return this.http.patch<AppSettings>(`${ environment.API.origin }users/me/settings`, newSettings)
      .pipe(tap(appSettings => this._settings.next(appSettings)));
  }

  /**
   * Gets user's settings.
  */

  get settings(): BehaviorSubject<AppSettings> {
    return this._settings;
  }
}
