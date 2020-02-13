import { trigger, transition, state, style, animate } from '@angular/animations';
import { OverlayService } from './../../services/overlay/overlay.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';
import { Subscription } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('sideMenuAnimation', [

      state('closed', style({ transform: 'translateX(-100%)' })),
      state('opened', style({ transform: 'translateX(0%)' })),
      
      transition('opened <=> closed', animate(200))

    ])
  ]
})
export class SideMenuComponent implements OnInit, OnDestroy {

  constructor(private readonly sideMenu: SideMenuService, private readonly overlay: OverlayService) { }

  isOpened: boolean = false;
  broadcastersSubscription: Subscription = new Subscription();

  faBars = faBars;

  ngOnInit() {
    this.broadcastersSubscription.add(this.sideMenu.closeMenuBroadcaster.subscribe(() => this.isOpened = false));
    this.broadcastersSubscription.add(this.sideMenu.openMenuBroadcaster.subscribe(() => this.isOpened = true));
    this.broadcastersSubscription.add(this.sideMenu.toggleMenuBroadcaster.subscribe(() => this.isOpened = !this.isOpened));
    this.broadcastersSubscription.add(this.overlay.clickOnOverlayBroadcaster.subscribe(() => this.closeMenu()));
  }

  ngOnDestroy() {
    this.broadcastersSubscription.unsubscribe();
  }

  closeMenu() {
    this.isOpened = false;
    this.overlay.closeOverlay();
  }

}
