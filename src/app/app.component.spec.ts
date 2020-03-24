import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideMenuComponent } from './ui-components/side-menu/side-menu.component';
import { OverlayComponent } from './ui-components/overlay/overlay.component';
import { MainHeaderComponent } from './ui-components/main-header/main-header.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CitiesService } from './services/cities/cities.service';

class MockCitiesService implements Partial<CitiesService> {
  getCities = () => of([]);
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        RouterModule.forRoot([]),
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        MainHeaderComponent,
        OverlayComponent,
        SideMenuComponent
      ],
      providers: [
        { provide: CitiesService, useClass: MockCitiesService }
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
