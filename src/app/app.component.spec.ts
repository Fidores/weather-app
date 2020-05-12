import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppSettings } from './models/AppSettings';
import { User } from './models/User';
import { of, BehaviorSubject } from 'rxjs';
import { SettingsService } from './services/app-settings/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AccountService } from './services/account/account.service';
import { MainHeaderComponent } from './ui-components/main-header/main-header.component';
import { OverlayComponent } from './ui-components/overlay/overlay.component';
import { SideMenuComponent } from './ui-components/side-menu/side-menu.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let injector: Injector;
  let settingsServiceMock: SettingsServiceMock;
  beforeEach(async(() => {
    settingsServiceMock = new SettingsServiceMock();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        AppComponent,
        MainHeaderComponent,
        OverlayComponent,
        SideMenuComponent,
      ],
      providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    injector = fixture.debugElement.injector;
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call service to initialize user if user is logged in', done => {
      const accountService: AccountService = injector.get(AccountService);
      const spy = spyOn(accountService, 'loadUser').and.returnValue(
        of({ name: 'name' } as User)
      );
      localStorage.setItem('X-AUTH-TOKEN', 'd');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});

class SettingsServiceMock implements Partial<SettingsService> {
  _settings: BehaviorSubject<AppSettings> = new BehaviorSubject({
    lang: 'pl',
  } as AppSettings);

  init(): import('rxjs').Observable<
    import('./models/AppSettings').AppSettings
  > {
    return of({ lang: 'pl' } as any);
  }

  changeSettings(
    newSettings: import('./models/AppSettings').AppSettings
  ): import('rxjs').Observable<import('./models/AppSettings').AppSettings> {
    return of(newSettings);
  }

  get settings(): import('rxjs').BehaviorSubject<
    import('./models/AppSettings').AppSettings
  > {
    return this._settings;
  }
}
