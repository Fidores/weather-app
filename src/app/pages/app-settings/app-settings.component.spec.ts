import { SettingsService } from './../../services/app-settings/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingsComponent } from './app-settings.component';
import { SelectComponent } from 'src/app/ui-components/select/select.component';
import { of } from 'rxjs';

describe('AppSettingsComponent', () => {
  let component: AppSettingsComponent;
  let fixture: ComponentFixture<AppSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AppSettingsComponent,
        SelectComponent
      ],
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        NgScrollbarModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeSettings', () => {

    it('should call service to change settings', done => {
      const settingsService: SettingsService = fixture.debugElement.injector.get(SettingsService);
      const spy = spyOn(settingsService, 'changeSettings').and.returnValue(of({} as any));

      component.changeSettings();

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

  describe('ngOnInit', () => {

    it('should subscribe to settings changes', done => {
      const settingsService: SettingsService = fixture.debugElement.injector.get(SettingsService);
      const spy = spyOn(settingsService.settings, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should subscribe to value changes in form', done => {
      const spy = spyOn(component.settingsForm.valueChanges, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should patch form after settings have been changed without emitting events', done => {
      const spy = spyOn(component.settingsForm, 'patchValue');
      const settingsService: SettingsService = fixture.debugElement.injector.get(SettingsService);

      component.ngOnInit();
      settingsService.settings.subscribe((appSettings) => {
        expect(spy).toHaveBeenCalledWith(appSettings, { emitEvent: false });
        done();
      });
      settingsService.settings.next({} as any);
    });

  });
});
