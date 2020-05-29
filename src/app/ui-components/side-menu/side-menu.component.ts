import { User } from './../../models/User';
import { AccountService } from './../../services/account/account.service';
import {
  trigger,
  transition,
  state,
  style,
  animate,
} from '@angular/animations';
import { OverlayService } from './../../services/overlay/overlay.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';
import { Subscription, Observable } from 'rxjs';
import {
  faBars,
  faHome,
  faPlusSquare,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('sideMenuAnimation', [
      state('closed', style({ transform: 'translateX(-100%)' })),
      state('opened', style({ transform: 'translateX(0%)' })),

      transition('opened <=> closed', animate(200)),
    ]),
  ],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  constructor(
    private readonly sideMenu: SideMenuService,
    private readonly overlay: OverlayService,
    private readonly router: Router,
    private readonly account: AccountService
  ) {}

  isOpened: boolean = false;
  subscriptions: Subscription = new Subscription();
  user$: Observable<User> = this.account.user;

  faBars = faBars;
  faHome = faHome;
  faPlusSquare = faPlusSquare;
  faCog = faCog;

  ngOnInit() {
    this.subscriptions.add(
      this.sideMenu.closeMenuBroadcaster.subscribe(
        () => (this.isOpened = false)
      )
    );
    this.subscriptions.add(
      this.sideMenu.openMenuBroadcaster.subscribe(() => (this.isOpened = true))
    );
    this.subscriptions.add(
      this.sideMenu.toggleMenuBroadcaster.subscribe(
        () => (this.isOpened = !this.isOpened)
      )
    );
    this.subscriptions.add(
      this.overlay.clickOnOverlayBroadcaster.subscribe(() => this.closeMenu())
    );
    this.subscriptions.add(
      this.router.events.subscribe(() => this.closeMenu())
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  closeMenu() {
    this.isOpened = false;
    this.overlay.closeOverlay();
  }

  isLoggedIn(): boolean {
    return this.account.isLoggedIn;
  }
}
