import { AppError } from './../../common/errors/appError';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { BadRequest } from 'src/app/common/errors/badRequest';

import { Conflict } from './../../common/errors/conflict';
import { City } from './../../models/City';
import { CitiesService } from './../../services/cities/cities.service';
import { LoaderComponent } from './../../ui-components/loader/loader.component';
import { AddCityComponent } from './add-city.component';

describe('AddCityComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;
  let injector: Injector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCityComponent, LoaderComponent],
      imports: [
        NgScrollbarModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInputChange', () => {
    let eventMock: any;

    beforeEach(() => (eventMock = { target: { value: 'value' } } as any));

    it('should set isLoading property to true', done => {
      component.isLoading = false;

      component['onInputChange'](eventMock);

      expect(component.isLoading).toBeTruthy();
      done();
    });

    it('should call searchForCity() method', done => {
      const spy = spyOn(component, 'searchForCity');

      component['onInputChange'](eventMock);

      expect(spy).toHaveBeenCalled();
      done();
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

  describe('searchForCity', () => {
    it('should call server to query cities', done => {
      const citiesService: CitiesService = injector.get(CitiesService);
      const spy = spyOn(citiesService, 'findCity').and.returnValue(of([]));
      const cityName = 'London';

      component.searchForCity(cityName);

      expect(spy).toHaveBeenCalledWith(cityName);
      done();
    });

    it('should set queriedCities property with data returned from the server', done => {
      const citiesService: CitiesService = injector.get(CitiesService);
      const cityName = 'London' as any;
      spyOn(citiesService, 'findCity').and.returnValue(of([cityName]));

      component.searchForCity('');
      citiesService.findCity(cityName).subscribe(() => {
        expect(component.queriedCities).toEqual([cityName]);
        done();
      });
    });

    it('should set isLoading to false', done => {
      const citiesService: CitiesService = injector.get(CitiesService);
      const cityName = 'London' as any;
      spyOn(citiesService, 'findCity').and.returnValue(of([cityName]));

      component.isLoading = true;
      component.searchForCity('');
      citiesService.findCity(cityName).subscribe(() => {
        expect(component.isLoading).toBe(false);
        done();
      });
    });
  });

  describe('addCity', () => {
    it('should call service to save city', done => {
      const cities: City[] = [{ name: 'london' }] as any;
      const citiesService: CitiesService = injector.get(CitiesService);
      const spy = spyOn(citiesService, 'saveCity').and.returnValue(of(cities));

      component.addCity(1);

      expect(spy).toHaveBeenCalledWith(1);
      done();
    });
  });

  describe('onSuccessfulCityAdd', () => {
    it('should navigate to home page after successful operation', done => {
      const router: Router = injector.get(Router);
      const spy = spyOn(router, 'navigate');

      component['onSuccessfulCityAdd']();

      expect(spy).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  describe('onUnsuccessfulCityAdd', () => {
    it('should display notification if city was already saved', done => {
      const toastr: ToastrService = TestBed.get(ToastrService);
      const spy = spyOn(toastr, 'error');

      component['onUnsuccessfulCityAdd'](new Conflict());

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should display notification if limit is used up', done => {
      const toastr: ToastrService = TestBed.get(ToastrService);
      const spy = spyOn(toastr, 'error');

      component['onUnsuccessfulCityAdd'](new BadRequest());

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should rethrow an unexpected error', done => {
      const error = new AppError();

      expect(() => component['onUnsuccessfulCityAdd'](error)).toThrow(error);
      done();
    });
  });
});
