import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Conflict } from './../../common/errors/conflict';
import { User, UserPayload } from './../../models/User';
import { of, Subject, throwError } from 'rxjs';
import { AccountService } from './../../services/account/account.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
        RouterModule.forRoot([]),
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
  });
});
