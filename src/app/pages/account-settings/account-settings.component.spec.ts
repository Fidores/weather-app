import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { User } from './../../models/User';
import { AccountService } from './../../services/account/account.service';
import { AccountSettingsComponent } from './account-settings.component';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let injector: Injector;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingsComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateUser', () => {
    it('should be called after submit event is fired on form', done => {
      const spy = spyOn(component, 'updateUser');
      const de = fixture.debugElement.query(By.css('form'));
      const el: HTMLElement = de.nativeElement;

      el.dispatchEvent(new Event('submit'));

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should call service to update user data on the server', done => {
      const accountService: AccountService = injector.get(AccountService);
      const spy = spyOn(accountService, 'updateUser').and.returnValue(
        of({} as User)
      );

      component.updateUser();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should call callback method after successful update', done => {
      const user: User = { name: 'name' } as User;
      const spy = spyOn(component as any, 'onSuccessfulUpdate');
      const accountService: AccountService = injector.get(AccountService);
      spyOn(accountService, 'updateUser').and.returnValue(of(user));

      component.updateUser();

      expect(spy).toHaveBeenCalledWith(user);
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
    it('set user property with user data from service', done => {
      const user = { name: 'name' } as User;
      const accountService: AccountService = injector.get(AccountService);
      spyOnProperty(accountService, 'user').and.returnValue(of(user));

      component.ngOnInit();
      accountService.user.subscribe(() => {
        expect(component.user.name).toEqual(user.name);
        done();
      });
    });
  });

  describe('onSuccessfulUpdate', () => {
    it('should display a notification about successfully update', done => {
      const toastrService: ToastrService = injector.get(ToastrService);
      const spy = spyOn(toastrService, 'success');

      component['onSuccessfulUpdate'](null);

      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
