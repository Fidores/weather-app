import { formatIconName } from '../../helpers/formatIconName';
import { Period } from '../../models/Forecast';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'small-weather-card',
  templateUrl: './small-weather-card.component.html',
  styleUrls: ['./small-weather-card.component.scss'],
})
export class SmallWeatherCardComponent implements OnInit {
  constructor() {}

  @Input('period') period: Period;

  ngOnInit() {}
}
