import { IconComponent } from './../../ui-components/icon/icon.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './../../ui-components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmallWeatherCardComponent } from './../../ui-components/small-weather-card/small-weather-card.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsComponent } from './weather-details.component';

describe('WeatherDetailsComponent', () => {
  let component: WeatherDetailsComponent;
  let fixture: ComponentFixture<WeatherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherDetailsComponent,
        SmallWeatherCardComponent,
        LoaderComponent,
        IconComponent,
      ],
      imports: [
        SwiperModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
