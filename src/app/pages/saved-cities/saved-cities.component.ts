import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from 'src/app/models/City';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './saved-cities.component.html',
  styleUrls: ['./saved-cities.component.scss']
})
export class SavedCitiesComponent implements OnInit, OnDestroy {

  constructor(
    private readonly _cities: CitiesService
  ) { }

  faTrashAlt = faTrashAlt;
  subscriptions: Subscription = new Subscription();
  cities: City[];

  ngOnInit() {
    this.subscriptions.add(this._cities.getCities().subscribe(cities => this.cities = cities));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  deleteCity(id: number) {
    const cityIndex = this.cities.findIndex(city => city.id === id);
    this.cities.splice(cityIndex, 1);

    this._cities.deleteCity(id).subscribe();
  }

}
