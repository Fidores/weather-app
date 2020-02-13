import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayService } from './../../services/overlay/overlay.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayComponent } from './overlay.component';
import { By } from '@angular/platform-browser';

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayComponent ],
      imports: [ BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the overlay if isOpened property is set to true', done => {
    component.isOpened = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.overlay'));
    const el: HTMLElement = de.nativeElement;
  
    expect(el).toBeTruthy();
    done();
  });

  it('should hide the overlay if isOpened property is set to false', done => {
    component.isOpened = false;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.overlay'));
  
    expect(de).toBeFalsy();
    done();
  });

  it('should call broadcastClickOnOverlay whenever the overlay is clicked', () => {
    component.isOpened = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.overlay'));
    const el: HTMLElement = de.nativeElement;
    const spy = spyOn(component, 'broadcastClickOnOverlay');

    el.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });

  describe('broadcastersSubscriptions', () => {

    it('should set isOpened property to true whenever the service requests to open the overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);

      component.isOpened = false;
      overlayService.openOverlayBroadcaster.subscribe(() => {
        expect(component.isOpened).toBeTruthy();
        done();
      });

      overlayService.openOverlayBroadcaster.next();

    });

    it('should set isOpened property to false whenever the service requests to close the overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);

      component.isOpened = true;
      overlayService.closeOverlayBroadcaster.subscribe(() => {
        expect(component.isOpened).toBeFalsy();
        done();
      });

      overlayService.closeOverlayBroadcaster.next();

    });

    it('should toggle isOpened property whenever the service requests to toggle the overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);

      component.isOpened = true;
      overlayService.toggleOverlayBroadcaster.subscribe(() => {
        expect(component.isOpened).toBeFalsy();
        done();
      });

      overlayService.toggleOverlayBroadcaster.next();

    });

  });

  describe('ngOnInit', () => {

    it('should subscribe to open requests from the service', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.openOverlayBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should subscribe to close requests from the service', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.closeOverlayBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should subscribe to toggle visibility requests from the service', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.toggleOverlayBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('ngOnDestroy', () => {

    it('should unsubscribe from all broadcasters subscriptions', done => {
      const spy = spyOn(component.broadcastersSubscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('broadcastClickOnOverlay', () => {
    
    it('should broadcast a click on the overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.clickOnOverlayBroadcaster, 'next');

      component.broadcastClickOnOverlay();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });
});
