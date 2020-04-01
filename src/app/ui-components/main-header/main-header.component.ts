import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faCog, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';

import { OverlayService } from './../../services/overlay/overlay.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private readonly sideMenu: SideMenuService, 
    private readonly overlay: OverlayService,
    private readonly account: AccountService,
    private readonly router: Router
  ) { }

  broadcastersSubscriptions: Subscription = new Subscription();
  faBars = faBars;
  faCog = faCog;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  ngOnInit() {}

  logout() {
    this.account.logout();
    this.router.navigate(['/']);
  }

  openMenu() {
    this.sideMenu.openMenu();
    this.overlay.openOverlay();
  }
  
  get isLoggedIn(): boolean {
    return this.account.isLoggedIn;
  }
}
