import { CitiesService } from './../../services/cities/cities.service';
import { debounceTime } from 'rxjs/operators';
import { City } from './../../models/City';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit, OnDestroy {

  constructor(
    private readonly cities: CitiesService,
    private readonly router: Router
  ) { }

  queriedCities: City[];
  queryCitiesSubscription: Subscription;
  isLoading: boolean = false;

  @ViewChild('searchBox', { static: true }) searchBox: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.queryCitiesSubscription = fromEvent(this.searchBox.nativeElement, 'input')
      .pipe(debounceTime(400))
      .subscribe(($event: Event) => {

        this.isLoading = true;
        this.searchForCity($event.target['value']);

      });
  }

  ngOnDestroy() {
    this.queryCitiesSubscription.unsubscribe();
  }

  searchForCity(name: string) {
    this.cities.queryCities(name).subscribe(cities => {

      this.queriedCities = cities;
      this.isLoading = false;

    });
  }

  addCity(id: number) {
    this.cities.saveCity(id).subscribe(() => this.router.navigate(['/']));
  }

}
