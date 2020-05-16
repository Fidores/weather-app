import { transformObjectToParams } from './../../helpers/objectToHttpParams';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of, empty } from 'rxjs';
import { AppSettings } from 'src/app/models/AppSettings';
import { environment } from 'src/environments/environment';

import { SettingsService } from './../app-settings/settings.service';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let settingsServiceMock: SettingsServiceMock;
  let service: WeatherService;
  let http: HttpTestingController;
  let dummyCurrentWeather: any = [{ city: 'london' }];
  let dummyForecast: any = {
    city: 'london',
  };

  beforeEach(() => {
    settingsServiceMock = new SettingsServiceMock();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
    });

    service = TestBed.get(WeatherService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentWeather', () => {
    it('should call server to get current weather in a city', done => {
      const settingsService: SettingsService = TestBed.get(SettingsService);
      const id = '1';
      spyOnProperty(settingsService, 'settings').and.returnValue(of({}));
      service.currentWeather(id).subscribe(weather => {
        expect(weather).toEqual(dummyCurrentWeather);
        done();
      });

      const req = http.expectOne(
        `${environment.API.origin}forecast/current/${id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyCurrentWeather);
    });
  });
});

class SettingsServiceMock implements Partial<SettingsService> {
  _settings: BehaviorSubject<AppSettings> = new BehaviorSubject({
    lang: 'pl',
  } as AppSettings);

  init(): Observable<AppSettings> {
    return of({ lang: 'pl' } as any);
  }

  changeSettings(newSettings: AppSettings): Observable<AppSettings> {
    return of(newSettings as any);
  }

  get settings(): BehaviorSubject<AppSettings> {
    return this._settings;
  }
}
