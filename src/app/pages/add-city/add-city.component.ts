import { BadRequest } from './../../common/errors/badRequest';
import { Conflict } from './../../common/errors/conflict';
import { CitiesService } from './../../services/cities/cities.service';
import { debounceTime, take } from 'rxjs/operators';
import { City } from './../../models/City';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit, OnDestroy {
  constructor(
    private readonly cities: CitiesService,
    private readonly router: Router,
    private readonly notifications: ToastrService
  ) {}

  queriedCities: City[];
  subscriptions: Subscription = new Subscription();
  isLoading: boolean = false;

  @ViewChild('searchBox', { static: true }) searchBox: ElementRef<
    HTMLInputElement
  >;

  ngOnInit() {
    this.subscriptions.add(
      fromEvent(this.searchBox.nativeElement, 'input')
        .pipe(debounceTime(400))
        .subscribe(($event: Event) => {
          this.isLoading = true;
          this.searchForCity($event.target['value']);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  searchForCity(name: string) {
    this.cities
      .findCity(name)
      .pipe(take(1))
      .subscribe(cities => {
        this.queriedCities = cities;
        this.isLoading = false;
      });
  }

  addCity(id: number) {
    this.cities
      .saveCity(id)
      .pipe(take(1))
      .subscribe(
        () => this.router.navigate(['/']),
        err => {
          if (err instanceof Conflict)
            this.notifications.error('Miasto zapisano już wcześniej.');
          else if (err instanceof BadRequest)
            this.notifications.error('Wykorzystano limit 20 zapisanych miast.');
          else throw err;
        }
      );
  }
}
