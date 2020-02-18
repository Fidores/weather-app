import { formatIconName } from './../../../helpers/formatIconName';
import { CurrentWeather } from '../../models/CurrentWeather';
import { Component, OnInit, Input } from '@angular/core';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  constructor() { }

  @Input('weather') weather: CurrentWeather;

  faSortUp = faSortUp;
  faSortDown = faSortDown;
  formatIconName = formatIconName;

  ngOnInit() {
  }

}
