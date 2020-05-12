import { Conflict } from './../../common/errors/conflict';
import { City } from './../../models/City';
import { of, throwError } from 'rxjs';
import { CitiesService } from './../../services/cities/cities.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { LoaderComponent } from './../../ui-components/loader/loader.component';
import { AddCityComponent } from './add-city.component';
import { Injector } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BadRequest } from 'src/app/common/errors/badRequest';

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

    it('should navigate to home page after successful operation', done => {
      const cities: City[] = [{ name: 'london' }] as any;
      const citiesService: CitiesService = injector.get(CitiesService);
      const router: Router = injector.get(Router);
      const spy = spyOn(router, 'navigate');
      spyOn(citiesService, 'saveCity').and.returnValue(of(cities));

      component.addCity(1);
      citiesService.saveCity(1).subscribe(() => {
        expect(spy).toHaveBeenCalledWith(['/']);
        done();
      });
    });

    it('should display notification if city was already saved', done => {
      const citiesService: CitiesService = injector.get(CitiesService);
      const toastrService: ToastrService = injector.get(ToastrService);
      spyOn(citiesService, 'saveCity').and.returnValue(
        throwError(new Conflict())
      );
      const spy = spyOn(toastrService, 'error');

      component.addCity(1);
      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should display notification if limit is used up', done => {
      const citiesService: CitiesService = injector.get(CitiesService);
      const toastrService: ToastrService = injector.get(ToastrService);
      spyOn(citiesService, 'saveCity').and.returnValue(
        throwError(new BadRequest())
      );
      const spy = spyOn(toastrService, 'error');

      component.addCity(1);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
