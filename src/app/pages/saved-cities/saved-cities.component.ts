import { City } from './../../models/City';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CitiesService } from 'src/app/services/cities/cities.service';

@Component({
  templateUrl: './saved-cities.component.html',
  styleUrls: ['./saved-cities.component.scss']
})
export class SavedCitiesComponent implements OnInit {

  constructor(
    private readonly cities: CitiesService
  ) { }

  cities$: Observable<City[]>;

  ngOnInit() {
    this.cities$ = this.cities.getCities();
  }

  deleteCity(id: number) {
    this.cities.deleteCity(id).subscribe();
  }

}
