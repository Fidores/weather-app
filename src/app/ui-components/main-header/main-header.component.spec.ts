import { OverlayService } from './../../services/overlay/overlay.service';
import { SideMenuService } from './../../services/side-menu/side-menu.service';
import { MainHeaderService } from './../../services/main-header/main-header.service';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderComponent } from './main-header.component';

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHeaderComponent ],
      imports: [
        FontAwesomeModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should subscribe to change title requests', done => {
      const service: MainHeaderService = fixture.debugElement.injector.get(MainHeaderService);
      const spy = spyOn(service.changeTitleBroadcaster, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('toggleMenu', () => {

    it('should toggle menu', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(SideMenuService);
      const spy = spyOn(sideMenuService, 'toggleMenu');

      component.openMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should toggle menu', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService, 'openOverlay');

      component.openMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });
});
