import { User } from './../../models/User';
import { AccountService } from './../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { faCogs, faUsersCog, faCity } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor() { }

  faCogs = faCogs;
  faUsersCog = faUsersCog;
  faCity = faCity;

  user: User;

  ngOnInit() {
  }

}
