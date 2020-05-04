import { AccountService } from './../../services/account/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { switchMap } from 'rxjs/operators';
import { CurrentWeather } from 'src/app/models/CurrentWeather';

import { slideInEntrance } from './../../animations';
import { CitiesService } from './../../services/cities/cities.service';
import { WeatherService } from './../../services/weather/weather.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [...slideInEntrance],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private readonly weather: WeatherService,
    private readonly _cities: CitiesService,
    private readonly account: AccountService
  ) {}

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  subscriptions: Subscription = new Subscription();
  sliderConfig: SwiperConfigInterface = {
    freeMode: true,
    spaceBetween: 30,
    slidesPerView: 'auto',
    mousewheel: true,
  };
  cities: CurrentWeather[];

  ngOnInit() {
    if (this.isLoggedIn)
      this.subscriptions.add(
        this._cities
          .getCitiesIds()
          .pipe(
            switchMap(cities => this.weather.currentWeather(cities.join(',')))
          )
          .subscribe(cities => (this.cities = cities))
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get isLoggedIn(): boolean {
    return this.account.isLoggedIn;
  }
}
