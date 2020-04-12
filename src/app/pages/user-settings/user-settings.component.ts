import { Component } from '@angular/core';
import { faCity, faCogs, faUsersCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {

  constructor() { }

  faCogs = faCogs;
  faUsersCog = faUsersCog;
  faCity = faCity;

}