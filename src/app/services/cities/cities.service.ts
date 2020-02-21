import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from 'src/app/models/City';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  queryCities(name: string): Observable<City[]> {
    if(!name) return of([]);
    return this.http.get<City[]>(`${ environment.weatherAPI.origin }cities?cityName=${ name }`);
  }

  saveCity(id: number): Observable<number[]> {
    const cities: number[] = JSON.parse(localStorage.getItem('cities')) || [];
    if(cities.includes(id) || cities.length === 20) return of(cities);
    
    cities.push(id);
    localStorage.setItem('cities', JSON.stringify(cities));

    return of(cities);
  }

  deleteCity(id: number): Observable<number[]> {
    const cities: number[] = JSON.parse(localStorage.getItem('cities')) || [];
    if(!cities.includes(id)) return of(cities);

    const cityIndex = cities.indexOf(id);
    cities.splice(cityIndex, 1);
    localStorage.setItem('cities', JSON.stringify(cities));

    return of(cities);
  }

  getCities(): Observable<number[]> {
    return of(JSON.parse(localStorage.getItem('cities'))) || of([]);
  }
  
}
