import { User } from './../../models/User';
import { of } from 'rxjs';
import { AccountService } from './../../services/account/account.service';
import { HttpClientModule } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';

import { AccountSettingsComponent } from './account-settings.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Injector } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let injector: Injector;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingsComponent],
      imports: [FormsModule, HttpClientModule, ToastrModule.forRoot()],
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
});
