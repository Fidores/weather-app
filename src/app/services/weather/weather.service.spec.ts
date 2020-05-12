import { SettingsService } from './../app-settings/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { BehaviorSubject, of } from 'rxjs';
import { AppSettings } from 'src/app/models/AppSettings';

describe('WeatherService', () => {
  let settingsServiceMock: SettingsServiceMock;
  beforeEach(() => {
    settingsServiceMock = new SettingsServiceMock();
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: SettingsService, useValue: settingsServiceMock }],
    });
  });

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });
});

class SettingsServiceMock implements Partial<SettingsService> {
  _settings: BehaviorSubject<AppSettings> = new BehaviorSubject({
    lang: 'pl',
  } as AppSettings);

  init(): import('rxjs').Observable<
    import('../../models/AppSettings').AppSettings
  > {
    return of({ lang: 'pl' } as any);
  }

  changeSettings(
    newSettings: import('../../models/AppSettings').AppSettings
  ): import('rxjs').Observable<import('../../models/AppSettings').AppSettings> {
    return of(newSettings as any);
  }

  get settings(): import('rxjs').BehaviorSubject<
    import('../../models/AppSettings').AppSettings
  > {
    return this._settings;
  }
}
