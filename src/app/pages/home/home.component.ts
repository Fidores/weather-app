import { CitiesService } from './../../services/cities/cities.service';
import { WeatherService } from './../../services/weather/weather.service';
import { slideInEntrance } from './../../animations';
import { MainHeaderService } from './../../services/main-header/main-header.service';
import { Component, OnInit } from '@angular/core';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ ...slideInEntrance ]
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly header: MainHeaderService,
    private readonly weather: WeatherService,
    private readonly _cities: CitiesService
  ) { }

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  sliderConfig: SwiperConfigInterface = {
    freeMode: true,
    spaceBetween: 30,
    slidesPerView: 'auto'
  }
  cities: CurrentWeather[];

  ngOnInit() {
    
    this.header.setTitle(new Date().toLocaleDateString('pl-PL', { month: 'long', day: 'numeric', year: 'numeric'}).toUpperCase());

    this._cities.getCitiesIds().pipe(switchMap(cities => this.weather.currentWeather(cities.join(',')))).subscribe(cities => this.cities = cities);

  }

}
