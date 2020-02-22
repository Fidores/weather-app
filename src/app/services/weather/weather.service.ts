import { Forecast } from '../../models/Forecast';
import { environment } from './../../../environments/environment';
import { CurrentWeather } from '../../models/CurrentWeather';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private readonly http: HttpClient
  ) {}

  /**
   * Gets current weather in a city.
   * @param id id of a city or multiple ids separated with comma without any spaces.
  */
 
  currentWeather(id: string): Observable<CurrentWeather[]> {
    if(!id) return of([]);
    return this.http.get<CurrentWeather[]>(`${ environment.weatherAPI.origin }forecast/current/${ id }`)
  }

  /**
   * Gets 5 day forecast in 3 hours interval.
   * @param id id of a city.
  */

  fiveDayForecast(id: string): Observable<Forecast> {
    if(!id) throw new Error('No id passed !');

    return this.http.get<Forecast>(`${ environment.weatherAPI.origin }forecast/5-days/${ id }`);
  }

}
