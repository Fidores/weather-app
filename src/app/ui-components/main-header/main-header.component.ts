import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainHeaderService } from './../../services/main-header/main-header.service';
import { OverlayService } from './../../services/overlay/overlay.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faBars, faCog, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private readonly sideMenu: SideMenuService, 
    private readonly overlay: OverlayService,
    private readonly header: MainHeaderService,
    private readonly account: AccountService,
    private readonly router: Router
  ) { }

  @ViewChild('title', { static: true }) title: ElementRef<HTMLElement>;

  broadcastersSubscriptions: Subscription = new Subscription();
  faBars = faBars;
  faCog = faCog;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  ngOnInit() {
    this.broadcastersSubscriptions.add(this.header.changeTitleBroadcaster.subscribe(newTitle => this.title.nativeElement.innerText = newTitle));
  }

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
