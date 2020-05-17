import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrentWeather } from './../../models/CurrentWeather';
import { Forecast } from './../../models/Forecast';
import { WeatherService } from './../../services/weather/weather.service';
import { IconComponent } from './../../ui-components/icon/icon.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './../../ui-components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmallWeatherCardComponent } from './../../ui-components/small-weather-card/small-weather-card.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';

import { WeatherDetailsComponent } from './weather-details.component';
import { of } from 'rxjs';
import { Injector } from '@angular/core';

describe('WeatherDetailsComponent', () => {
  let component: WeatherDetailsComponent;
  let fixture: ComponentFixture<WeatherDetailsComponent>;
  let injector: Injector;

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
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailsComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call service to get forecast for five days', done => {
      const weatherService: WeatherService = fixture.debugElement.injector.get(
        WeatherService
      );
      const route: ActivatedRoute = fixture.debugElement.injector.get(
        ActivatedRoute
      );
      const spy = spyOn(weatherService, 'fiveDaysForecast').and.returnValue(
        of({} as Forecast)
      );

      route.snapshot.params.id = 'id';
      component.ngOnInit();

      expect(spy).toHaveBeenCalledWith('id');
      done();
    });

    it('should set forecast property with data returned from server', done => {
      const weatherService: WeatherService = fixture.debugElement.injector.get(
        WeatherService
      );
      spyOn(weatherService, 'fiveDaysForecast').and.returnValue(
        of(({ temp: 2 } as unknown) as Forecast)
      );

      component.ngOnInit();

      weatherService.fiveDaysForecast(null).subscribe(() => {
        expect(component.forecast['temp']).toBe(2);
        done();
      });
    });

    it('should call service to get current weather', done => {
      const weatherService: WeatherService = injector.get(WeatherService);
      const spy = spyOn(weatherService, 'currentWeather').and.returnValue(
        of({} as CurrentWeather[])
      );
      const route: ActivatedRoute = injector.get(ActivatedRoute);

      route.snapshot.params.id = 'id';
      component.ngOnInit();

      expect(spy).toHaveBeenCalledWith('id');

      done();
    });

    it('should set forecast property with data returned from server', done => {
      const weatherService: WeatherService = fixture.debugElement.injector.get(
        WeatherService
      );
      spyOn(weatherService, 'currentWeather').and.returnValue(
        of(([{ temp: 2 }] as unknown) as CurrentWeather[])
      );

      component.ngOnInit();

      weatherService.fiveDaysForecast(null).subscribe(() => {
        expect(component.currentWeather['temp']).toBe(2);
        done();
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from every subscription', done => {
      const spy = spyOn(component.subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('isNightTimeIcon', () => {
    it('should return true if icon name ends with n', () => {
      const result = component.isNightTimeIcon('03n');

      expect(result).toBeTruthy();
    });

    it('should return false if icon name doesn`t end with n', () => {
      const result = component.isNightTimeIcon('03d');

      expect(result).toBeFalsy();
    });
  });
});
