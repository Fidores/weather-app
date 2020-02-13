import { Subscription } from 'rxjs';
import { MainHeaderService } from './../../services/main-header/main-header.service';
import { OverlayService } from './../../services/overlay/overlay.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private readonly sideMenu: SideMenuService, 
    private readonly overlay: OverlayService,
    private readonly header: MainHeaderService
  ) { }

  @ViewChild('title', { static: true }) title: ElementRef<HTMLElement>;
  
  broadcastersSubscriptions: Subscription = new Subscription();
  faBars = faBars;

  ngOnInit() {
    this.broadcastersSubscriptions.add(this.header.changeTitleBroadcaster.subscribe(newTitle => this.title.nativeElement.innerText = newTitle));
  }

  toggleMenu() {
    this.sideMenu.toggleMenu();
    this.overlay.openOverlay();
  }

}
