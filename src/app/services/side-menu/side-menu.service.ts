import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  constructor() { }

  openMenuBroadcaster: Subject<null> = new Subject();
  closeMenuBroadcaster: Subject<null> = new Subject();
  toggleMenuBroadcaster: Subject<null> = new Subject();

  /**
   * Opens the side menu
   */
  openMenu(): void {
    this.openMenuBroadcaster.next();
  }

  /**
   * Closes the side menu
   */
  closeMenu(): void {
    this.closeMenuBroadcaster.next();
  }

  /**
   * Triggers the side menu.
   */
  toggleMenu(): void {
    this.toggleMenuBroadcaster.next();
  }

}
