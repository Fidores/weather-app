import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { OverlayService } from './../../services/overlay/overlay.service';
import { SideMenuService } from './../../services/side-menu/side-menu.service';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderComponent } from './main-header.component';

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainHeaderComponent],
      imports: [
        FontAwesomeModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openMenu', () => {
    it('should open the side menu', done => {
      const sideMenuService: SideMenuService = fixture.debugElement.injector.get(
        SideMenuService
      );
      const spy = spyOn(sideMenuService, 'openMenu');

      component.openMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should open the overlay', done => {
      const overlayService: OverlayService = fixture.debugElement.injector.get(
        OverlayService
      );
      const spy = spyOn(overlayService, 'openOverlay');

      component.openMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
