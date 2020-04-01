import { Component, OnInit } from '@angular/core';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { switchMap } from 'rxjs/operators';
import { CurrentWeather } from 'src/app/models/CurrentWeather';

import { slideInEntrance } from './../../animations';
import { CitiesService } from './../../services/cities/cities.service';
import { WeatherService } from './../../services/weather/weather.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ ...slideInEntrance ]
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly weather: WeatherService,
    private readonly _cities: CitiesService
  ) { }

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  sliderConfig: SwiperConfigInterface = {
    freeMode: true,
    spaceBetween: 30,
    slidesPerView: 'auto',
    mousewheel: true
  }
  cities: CurrentWeather[];

  ngOnInit() {
    
    this._cities.getCitiesIds().pipe(switchMap(cities => this.weather.currentWeather(cities.join(',')))).subscribe(cities => this.cities = cities);

  }

}
