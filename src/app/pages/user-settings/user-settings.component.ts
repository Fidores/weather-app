import { Component, OnInit } from '@angular/core';
import { faCogs, faUsersCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor() { }

  faCogs = faCogs;
  faUsersCog = faUsersCog;

  ngOnInit() {
  }

}
