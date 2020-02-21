import { CitiesService } from './../../services/cities/cities.service';
import { throttleTime } from 'rxjs/operators';
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

  @ViewChild('searchBox', { static: true }) searchBox: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.queryCitiesSubscription = fromEvent(this.searchBox.nativeElement, 'input').pipe(throttleTime(300)).subscribe(this.searchForCity.bind(this));
  }

  ngOnDestroy() {
    this.queryCitiesSubscription.unsubscribe();
  }

  searchForCity($event: Event) {
    const input = $event.target as HTMLInputElement;
    this.cities.queryCities(input.value).subscribe(cities => this.queriedCities = cities);
  }

  addCity(id: number) {
    this.cities.saveCity(id).subscribe(() => this.router.navigate(['/']));
  }

}
