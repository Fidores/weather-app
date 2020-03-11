import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';
import { OverlayService } from './../../services/overlay/overlay.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuComponent } from './side-menu.component';
import { By } from '@angular/platform-browser';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SideMenuComponent
      ],
      imports: [
        FontAwesomeModule,
        NoopAnimationsModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show side menu if isOpened property is set to true', done => {
    const de = fixture.debugElement.query(By.css('.side-menu'));
    const el: HTMLElement = de.nativeElement;

    component.isOpened = true;
    fixture.detectChanges();

    expect(el.getBoundingClientRect().left).toBeGreaterThanOrEqual(0);
    done();
  });

  it('should hide side menu if isOpened property is set to false', done => {
    const de = fixture.debugElement.query(By.css('.side-menu'));
    const el: HTMLElement = de.nativeElement;

    component.isOpened = false;
    fixture.detectChanges();

    expect(el.getBoundingClientRect().left).toBeLessThan(0);
    done();
  });

  it('should call close menu if button was clicked', done => {
    const de = fixture.debugElement.query(By.css('.side-menu__close-menu'));
    const el: HTMLElement = de.nativeElement;
    const spy = spyOn(component, 'closeMenu');

    el.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
    done();
  });

  describe('broadcastersSubscriptions', () => {

    it('should set isOpened property to false whenever service requests to close the menu', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(SideMenuService);
      
      component.isOpened = true;
      sideMenuService.closeMenuBroadcaster.subscribe(() => {
        expect(component.isOpened).toBeFalsy();
        done();
      });

      sideMenuService.closeMenuBroadcaster.next();
    });

    it('should set isOpened property to true whenever service requests to open the menu', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(SideMenuService);
      
      component.isOpened = false;
      sideMenuService.openMenuBroadcaster.subscribe(() => {
        expect(component.isOpened).toBeTruthy();
        done();
      });

      sideMenuService.openMenuBroadcaster.next();
    });

    it('should toggle isOpened property whenever service requests to toggle the menu', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(SideMenuService);
      
      component.isOpened = false;
      sideMenuService.toggleMenuBroadcaster.subscribe(() => {
        expect(component.isOpened).toBeTruthy();
        done();
      });

      sideMenuService.toggleMenuBroadcaster.next();
    });

    it('should call closeMenu if user clicked on the overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(component, 'closeMenu');

      overlayService.clickOnOverlayBroadcaster.subscribe(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });

      overlayService.clickOnOverlayBroadcaster.next();
    });

  });

  describe('closeMenu', () => {

    it('should set isOpened property to false', done => {
      component.isOpened = true;

      component.closeMenu();

      expect(component.isOpened).toBeFalsy();
      done();
    });

    it('should request to close the overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService, 'closeOverlay');

      component.closeMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('ngOnDestroy', () => {

    it('should unsubscribe from all broadcasters subscriptions', done => {
      const spy = spyOn(component.subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('ngOnInit', () => {

    it('should subscribe to close menu requests', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(SideMenuService);
      const spy = spyOn(sideMenuService.closeMenuBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should subscribe to open menu requests', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(SideMenuService);
      const spy = spyOn(sideMenuService.openMenuBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should subscribe to toggle menu requests', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(SideMenuService);
      const spy = spyOn(sideMenuService.toggleMenuBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should subscribe to clicks on overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.clickOnOverlayBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

});
