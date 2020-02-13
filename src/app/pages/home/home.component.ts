import { WeatherService } from './../../services/weather/weather.service';
import { slideInEntrance } from './../../animations';
import { MainHeaderService } from './../../services/main-header/main-header.service';
import { Component, OnInit } from '@angular/core';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CurrentWeather } from 'src/app/models/CurrentWeather';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ ...slideInEntrance ]
})
export class HomeComponent implements OnInit {

  constructor(private readonly header: MainHeaderService, private readonly weather: WeatherService) { }

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  sliderConfig: SwiperConfigInterface = {
    freeMode: true,
    spaceBetween: 30,
    slidesPerView: 'auto'
  }
  isLoading = true;
  cities: CurrentWeather[];

  ngOnInit() {
    
    this.header.setTitle(new Date().toLocaleDateString('pl-PL', { month: 'long', day: 'numeric', year: 'numeric'}).toUpperCase());

    this.weather.currentWeather('769250,4736286').subscribe(cities => {
      this.cities = cities;
      this.isLoading = false;
    });

  }

}
