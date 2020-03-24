import { User } from './../../models/User';
import { of, throwError } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {

    it('should log in the user with password and email', done => {
      const accountService: AccountService = fixture.debugElement.injector.get(AccountService);
      const user: any = { 
        password: 'password',
        email: 'email@domain.com'
      }
      const spy = spyOn(accountService, 'login').and.returnValue(of(user));

      component.user = user;
      component.onSubmit();

      expect(spy).toHaveBeenCalledWith(user.email, user.password);
      done();
    });

    it('should call onSuccessfulLogin method after successful login', done => {
      const accountService: AccountService = fixture.debugElement.injector.get(AccountService);
      const user: any = { 
        password: 'password',
        email: 'email@domain.com'
      }
      spyOn(accountService, 'login').and.returnValue(of(user));
      const spy = spyOn((component as any), 'onSuccessfulLogin');

      component.user = user;
      component.onSubmit();

      expect(spy).toHaveBeenCalled();
      done();
    });

    it('should call onUnsuccessfulLogin method after unsuccessful login', done => {
      const accountService: AccountService = fixture.debugElement.injector.get(AccountService);
      const spy = spyOn((component as any), 'onUnsuccessfulLogin');
      spyOn(accountService, 'login').and.returnValue(throwError('error'));

      component.onSubmit();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('onSuccessfulLogin', () => {

    it('should set error to false', done => {
      component.error = true;

      component['onSuccessfulLogin']({} as User);

      expect(component.error).toBeFalsy();
      done();
    });

    it('should navigate to home page if no redirect url is available', done => {
      const router: Router = fixture.debugElement.injector.get(Router);
      const spy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      sessionStorage.removeItem('redirectTo');
      component['onSuccessfulLogin']({} as User);

      expect(spy).toHaveBeenCalledWith(['/']);
      done();
    });

    it('should navigate to redirect url if it is set', done => {
      const router: Router = fixture.debugElement.injector.get(Router);
      const spy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
      const redirectUrl = ['/url'];

      sessionStorage.setItem('redirectTo', redirectUrl[0]);
      component['onSuccessfulLogin']({} as User);

      expect(spy).toHaveBeenCalledWith(redirectUrl);
      done();
    });

    it('should remove redirect url after navigation', done => {
      const router: Router = fixture.debugElement.injector.get(Router);
      spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      sessionStorage.setItem('redirectTo', 'url');
      component['onSuccessfulLogin']({} as User);

      router.navigate(['']).then(() => {
        const redirectUrl = sessionStorage.getItem('redirectTo');
        expect(redirectUrl).toBeFalsy();
        done();
      });
    });

  });
});
