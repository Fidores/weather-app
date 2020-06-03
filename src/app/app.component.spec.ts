import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MainHeaderComponent } from './ui-components/main-header/main-header.component';
import { OverlayComponent } from './ui-components/overlay/overlay.component';
import { SideMenuComponent } from './ui-components/side-menu/side-menu.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let injector: Injector;
  beforeEach(async(() => {
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
});
