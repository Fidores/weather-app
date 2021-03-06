import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { slideInEntrance } from 'src/app/animations';

import { Forecast } from '../../models/Forecast';
import { formatIllustrationName } from './../../helpers/formatIllustationName';
import { CurrentWeather, Icon } from './../../models/CurrentWeather';
import { WeatherService } from './../../services/weather/weather.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

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

  isNightTimeIcon(id: Icon): boolean {
    return id.endsWith('n');
  }
}
