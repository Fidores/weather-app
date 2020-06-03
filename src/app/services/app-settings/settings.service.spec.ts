import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../../environments/environment';
import { AccountService } from './../account/account.service';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let httpController: HttpTestingController;
  let service: SettingsService;
  let dummySettings: any;
  let accountServiceMock: Partial<AccountService>;

  beforeEach(() => {
    accountServiceMock = {
      user: new BehaviorSubject<null>(null),
      isLoggedIn: false,
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AccountService, useValue: accountServiceMock }],
    });
    httpController = TestBed.get(HttpTestingController);
    service = TestBed.get(SettingsService);
    dummySettings = {
      lang: 'pl',
      units: 'metric',
    };
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should call server to get settings', done => {
      service['init']().subscribe(settings => {
        expect(settings).toEqual(dummySettings);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}users/me/settings`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummySettings);
    });

    it('should broadcast new settings', done => {
      const spy = spyOn(service['_settings'], 'next');

      service['init']().subscribe(() => {
        expect(spy).toHaveBeenCalledWith(dummySettings);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}users/me/settings`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummySettings);
    });
  });

  describe('changeSettings', () => {
    it('should call server to get settings', done => {
      dummySettings.lang = 'eng';
      service.changeSettings(dummySettings).subscribe(settings => {
        expect(settings).toEqual(dummySettings);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}users/me/settings`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(dummySettings);
    });

    it('should broadcast settings', done => {
      const spy = spyOn(service['_settings'], 'next');

      service.changeSettings(dummySettings).subscribe(() => {
        expect(spy).toHaveBeenCalledWith(dummySettings);
        done();
      });

      const req = httpController.expectOne(
        `${environment.API.origin}users/me/settings`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(dummySettings);
    });
  });
});
