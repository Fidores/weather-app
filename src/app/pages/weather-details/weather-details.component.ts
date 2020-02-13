import { Forecast } from '../../models/Forecast';
import { WeatherService } from './../../services/weather/weather.service';
import { MainHeaderService } from './../../services/main-header/main-header.service';
import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { slideInEntrance } from 'src/app/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [ ...slideInEntrance ]
})
export class WeatherDetailsComponent implements OnInit {

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

  forecast: Forecast;

  ngOnInit() {
    this.header.setTitle(new Date().toLocaleDateString('pl-PL', { month: 'long', day: 'numeric', year: 'numeric'}).toUpperCase());
    this.weather.fiveDayForecast(this.route.snapshot.params.id).subscribe(forecast => this.forecast = forecast);
  }

}
