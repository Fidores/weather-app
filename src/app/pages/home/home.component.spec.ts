import { IconComponent } from './../../ui-components/icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './../../ui-components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCityCardComponent } from './../../ui-components/add-city-card/add-city-card.component';
import { WeatherCardComponent } from './../../ui-components/weather-card/weather-card.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        WeatherCardComponent,
        AddCityCardComponent,
        LoaderComponent,
        IconComponent,
      ],
      imports: [
        SwiperModule,
        RouterModule.forRoot([]),
        FontAwesomeModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
