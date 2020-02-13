import { OverlayService } from './../../services/overlay/overlay.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { fade } from 'src/app/animations';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [ fade ]
})
export class OverlayComponent implements OnInit, OnDestroy {

  constructor(private readonly overlay: OverlayService) { }

  broadcastersSubscriptions: Subscription = new Subscription();
  isOpened: boolean = false;

  ngOnInit() {
    this.broadcastersSubscriptions.add(this.overlay.openOverlayBroadcaster.subscribe(() => this.isOpened = true));
    this.broadcastersSubscriptions.add(this.overlay.closeOverlayBroadcaster.subscribe(() => this.isOpened = false));
    this.broadcastersSubscriptions.add(this.overlay.toggleOverlayBroadcaster.subscribe(() => this.isOpened = !this.isOpened));
  }

  ngOnDestroy() {
    this.broadcastersSubscriptions.unsubscribe();
  }

  broadcastClickOnOverlay() {
    this.overlay.clickOnOverlayBroadcaster.next();
  }

}
