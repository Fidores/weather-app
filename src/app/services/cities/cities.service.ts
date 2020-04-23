import { map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from 'src/app/models/City';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { handleError } from 'src/app/common/errors/handleError';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  
  
  constructor(
    private readonly http: HttpClient
    ) { }
    
  env = environment;

  findCity(name: string): Observable<City[]> {
    if(!name) return of([]);
    return this.http.get<City[]>(`${ environment.API.origin }cities?cityName=${ name }`);
  }

  saveCity(id: number): Observable<number[]> {
    return this.http.post<City[]>(`${ this.env.API.origin }users/me/saved-cities/`, { id })
      .pipe(map(cities => cities.map(city => city.id)), catchError(handleError));
  }

  deleteCity(id: number): Observable<number[]> {
    return this.http.delete<City[]>(`${ this.env.API.origin }users/me/saved-cities/${ id }`)
      .pipe(map(cities => cities.map(city => city.id)), catchError(handleError));
  }

  getCitiesIds(): Observable<number[]> {
    return this.http.get<City[]>(`${ this.env.API.origin }users/me/saved-cities/`)
      .pipe(map(cities => cities.map(city => city.id)), catchError(handleError));
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${ this.env.API.origin }users/me/saved-cities/`)
      .pipe(catchError(handleError));
  }
  
}
