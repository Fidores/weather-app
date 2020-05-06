import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { Subscription } from 'rxjs';
import { slideInEntrance } from 'src/app/animations';

import { formatIconName } from '../../helpers/formatIconName';
import { Forecast } from '../../models/Forecast';
import { formatIllustrationName } from './../../helpers/formatIllustationName';
import { CurrentWeather } from './../../models/CurrentWeather';
import { WeatherService } from './../../services/weather/weather.service';

@Component({
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [...slideInEntrance],
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private readonly weather: WeatherService,
    private readonly route: ActivatedRoute
  ) {}

  sliderConfig: SwiperConfigInterface = {
    freeMode: true,
    spaceBetween: 30,
    slidesPerView: 'auto',
  };

  subscriptions: Subscription = new Subscription();
  forecast: Forecast;
  currentWeather: CurrentWeather;
  formatIconName = formatIconName;
  formatIllustrationName = formatIllustrationName;

  ngOnInit() {
    this.subscriptions.add(
      this.weather
        .fiveDaysForecast(this.route.snapshot.params.id)
        .subscribe(forecast => (this.forecast = forecast))
    );
    this.subscriptions.add(
      this.weather
        .currentWeather(this.route.snapshot.params.id)
        .subscribe(weather => (this.currentWeather = weather[0]))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
