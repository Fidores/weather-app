import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from 'src/app/models/City';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private readonly http: HttpClient) {}

  findCity(name: string): Observable<City[]> {
    if (!name) return of([]);
    return this.http.get<City[]>(
      `${environment.API.origin}cities?cityName=${name}`
    );
  }

  saveCity(id: number): Observable<City[]> {
    return this.http.post<City[]>(
      `${environment.API.origin}users/me/saved-cities/`,
      { id }
    );
  }

  deleteCity(id: number): Observable<City[]> {
    return this.http.delete<City[]>(
      `${environment.API.origin}users/me/saved-cities/${id}`
    );
  }

  getCitiesIds(): Observable<number[]> {
    return this.http
      .get<City[]>(`${environment.API.origin}users/me/saved-cities/`)
      .pipe(map(cities => cities.map(city => city.id)));
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(
      `${environment.API.origin}users/me/saved-cities/`
    );
  }
}
