import { of } from 'rxjs';
import { environment } from './../../../environments/environment';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CitiesService } from './cities.service';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpController: HttpTestingController;
  let dummyCities: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(CitiesService);
    httpController = TestBed.get(HttpTestingController);
    dummyCities = [
      { name: 'London', id: 0 },
      { name: 'New York', id: 1 },
      { name: 'Alaska', id: 2 },
    ];
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findCity', () => {
    it('should return observable of empty array if empty string is passed', done => {
      service.findCity('').subscribe(cities => {
        expect(cities.length).toBe(0);
        done();
      });
    });

    it('should call server to get queried cities', done => {
      service.findCity('london').subscribe(cities => {
        expect(cities).toEqual(dummyCities);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}cities?cityName=london`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyCities);
    });
  });

  describe('saveCity', () => {
    it('should call server to save city with given id', done => {
      const cityId = 1;
      service.saveCity(cityId).subscribe(cities => {
        expect(cities).toEqual(dummyCities);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}users/me/saved-cities/`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body.id).toBe(cityId);
      req.flush(dummyCities);
    });
  });

  describe('deleteCity', () => {
    it('should call server to delete saved city with given id', done => {
      const cityId = 1;
      service.deleteCity(cityId).subscribe(cities => {
        expect(cities).toEqual(dummyCities);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}users/me/saved-cities/${cityId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyCities);
    });
  });

  describe('getCitiesIds', () => {
    it('should call getCities() method', done => {
      const spy = spyOn(service, 'getCities').and.returnValue(of(dummyCities));

      service.getCitiesIds().subscribe(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });
    });

    it('should return ids of saved cities', done => {
      spyOn(service, 'getCities').and.returnValue(of(dummyCities));

      service.getCitiesIds().subscribe(ids => {
        const dummyIds = dummyCities.map(city => city.id);
        expect(ids).toEqual(dummyIds);
        done();
      });
    });
  });

  describe('getCities', () => {
    it('should call server to get saved cities', done => {
      service.getCities().subscribe(cities => {
        expect(cities).toEqual(dummyCities);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}users/me/saved-cities/`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyCities);
    });
  });
});
