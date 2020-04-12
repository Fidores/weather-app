import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CurrentWeather } from '../../models/CurrentWeather';
import { Forecast } from '../../models/Forecast';
import { environment } from './../../../environments/environment';
import { SettingsService } from './../app-settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private readonly http: HttpClient,
    private readonly settings: SettingsService
  ) {}

  /**
   * Gets current weather in a city.
   * @param id id of a city or multiple ids separated with comma without any spaces.
  */
 
  currentWeather(id: string): Observable<CurrentWeather[]> {
    if(!id) return of([]);
    return this.http.get<CurrentWeather[]>(`${ environment.API.origin }forecast/current/${ id }`, { params: this.settings.settings.value as {} })
  }

  /**
   * Gets 5 day forecast in 3 hours interval.
   * @param id id of a city.
  */

  fiveDayForecast(id: string): Observable<Forecast> {
    if(!id) return of({} as Forecast);

    return this.http.get<Forecast>(`${ environment.API.origin }forecast/5-days/${ id }`, { params: this.settings.settings.value as {} });
  }

}
