import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  openOverlayBroadcaster: Subject<null> = new Subject();
  closeOverlayBroadcaster: Subject<null> = new Subject();
  toggleOverlayBroadcaster: Subject<null> = new Subject();
  clickOnOverlayBroadcaster: Subject<null> = new Subject();

  openOverlay(): void {
    this.openOverlayBroadcaster.next();
  }

  closeOverlay(): void {
    this.closeOverlayBroadcaster.next();
  }

  toggleOverlay(): void {
    this.toggleOverlayBroadcaster.next();
  }
}
