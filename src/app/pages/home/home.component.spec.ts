import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { of } from 'rxjs';
import { CitiesService } from 'src/app/services/cities/cities.service';

import { CurrentWeather } from './../../models/CurrentWeather';
import { AccountService } from './../../services/account/account.service';
import { WeatherService } from './../../services/weather/weather.service';
import { AddCityCardComponent } from './../../ui-components/add-city-card/add-city-card.component';
import { IconComponent } from './../../ui-components/icon/icon.component';
import { LoaderComponent } from './../../ui-components/loader/loader.component';
import { WeatherCardComponent } from './../../ui-components/weather-card/weather-card.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector: Injector;

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
    injector = fixture.debugElement.injector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call service to get cities ids', (done: DoneFn) => {
      const citiesService: CitiesService = injector.get(CitiesService);
      const spy = spyOn(citiesService, 'getCitiesIds').and.returnValue(of([]));
      const accountService: AccountService = injector.get(AccountService);
      spyOnProperty(accountService, 'isLoggedIn').and.returnValue(true);

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should call service to get current weather', done => {
      const weatherService: WeatherService = injector.get(WeatherService);
      const spy = spyOn(weatherService, 'currentWeather').and.returnValue(
        of([])
      );
      const citiesService: CitiesService = injector.get(CitiesService);
      spyOn(citiesService, 'getCitiesIds').and.returnValue(of([1, 2, 3]));
      const accountService: AccountService = injector.get(AccountService);
      spyOnProperty(accountService, 'isLoggedIn').and.returnValue(true);

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should set cities property with data returned from the server', done => {
      const weather = ([{ name: 'test' }] as unknown) as CurrentWeather[];
      const weatherService: WeatherService = injector.get(WeatherService);
      const citiesService: CitiesService = injector.get(CitiesService);
      const accountService: AccountService = injector.get(AccountService);

      spyOn(weatherService, 'currentWeather').and.returnValue(of(weather));
      spyOn(citiesService, 'getCitiesIds').and.returnValue(of([1, 2, 3]));
      spyOnProperty(accountService, 'isLoggedIn').and.returnValue(true);

      component.ngOnInit();
      citiesService.getCitiesIds().subscribe(cities => {
        expect(component.cities).toEqual(weather);
        done();
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', done => {
      const spy = spyOn(component.subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
