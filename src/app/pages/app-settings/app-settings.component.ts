import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {

  constructor() { }

  units: SelectOption[] = [
    { value: 'imperal', name: 'Fahrenheit' },
    { value: 'metric', name: 'Celsius' },
    { value: '', name: 'Kelvin' }
  ]

  settingsForm = new FormGroup({
    units: new FormControl('metric')
  });

  ngOnInit() {
  }

}
