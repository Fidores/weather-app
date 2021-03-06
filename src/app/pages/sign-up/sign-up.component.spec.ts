import { AppError } from './../../common/errors/appError';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { Conflict } from './../../common/errors/conflict';
import { User, UserPayload } from './../../models/User';
import { AccountService } from './../../services/account/account.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signUp', () => {
    it('should call service to sign up an user', done => {
      const accountService: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      const spy = spyOn(accountService, 'signUp').and.returnValue(
        of({} as User)
      );
      const user: Partial<UserPayload> = {
        name: 'aaaaaa',
        email: 'asdasd@asd.pl',
        password: 'asdasdsad',
      };

      component.signUpForm.patchValue(user);
      component.signUp();

      expect(spy).toHaveBeenCalledWith(user);
      done();
    });
  });

  describe('onSuccessfulSignUp', () => {
    it('should redirect user to page saved in session storage', done => {
      const accountService: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      const router: Router = fixture.debugElement.injector.get(Router);
      spyOn(accountService, 'signUp').and.returnValue(of({} as User));
      const spy = spyOn(router, 'navigate').and.returnValue(
        Promise.resolve(null)
      );
      const route = ['/page'];

      sessionStorage.setItem('redirectTo', route[0]);
      component.signUp();

      expect(spy).toHaveBeenCalledWith(route);
      done();
    });
  });

  describe('onUnsuccessfulSignUp', () => {
    it('should display that email is already taken on Conflict error', done => {
      const toastr: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const accountService: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      const spy = spyOn(toastr, 'error');
      spyOn(accountService, 'signUp').and.returnValue(
        throwError(new Conflict())
      );

      component.signUp();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should rethrow an unexpected error', done => {
      const error = new AppError();

      expect(() => component['onUnsuccessfulSignUp'](error)).toThrow(error);
      done();
    });
  });

  describe('removeRedirectRoute', () => {
    it('should remove redirect route if the next route isn`t login route', done => {
      sessionStorage.setItem('redirectTo', '/settings');

      component['removeRedirectRoute']({ url: '/' } as any);

      expect(sessionStorage.getItem('redirectRoute')).toBeFalsy();

      done();
    });

    it('should leave redirectRoute if the next route is login route', done => {
      sessionStorage.setItem('redirectTo', '/settings');

      component['removeRedirectRoute']({ url: '/login' } as any);

      expect(sessionStorage.getItem('redirectTo')).toBeTruthy();

      done();
    });
  });
});
