import { formatIconName } from '../../helpers/formatIconName';
import { CurrentWeather } from './../../models/CurrentWeather';
import { Subscription } from 'rxjs';
import { Forecast } from '../../models/Forecast';
import { WeatherService } from './../../services/weather/weather.service';
import { MainHeaderService } from './../../services/main-header/main-header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { slideInEntrance } from 'src/app/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [ ...slideInEntrance ]
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private readonly header: MainHeaderService,
    private readonly weather: WeatherService,
    private readonly route: ActivatedRoute
  ) { }

  sliderConfig: SwiperConfigInterface = {
    freeMode: true,
    spaceBetween: 30,
    slidesPerView: 'auto'
  }

  subscriptions: Subscription = new Subscription();
  forecast: Forecast;
  currentWeather: CurrentWeather;
  formatIconName = formatIconName;

  ngOnInit() {
    this.header.setTitle(new Date().toLocaleDateString('pl-PL', { month: 'long', day: 'numeric', year: 'numeric'}).toUpperCase());
    this.subscriptions.add(this.weather.fiveDayForecast(this.route.snapshot.params.id).subscribe(forecast => this.forecast = forecast));
    this.subscriptions.add(this.weather.currentWeather(this.route.snapshot.params.id).subscribe(weather => this.currentWeather = weather[0]));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
