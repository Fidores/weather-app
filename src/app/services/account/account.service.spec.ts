import { HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from './../../../environments/environment';
import { User } from './../../models/User';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let httpController: HttpTestingController;
  let service: AccountService;
  let dummyUser: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpController = TestBed.get(HttpTestingController);
    service = TestBed.get(AccountService);
    dummyUser = {
      name: 'John',
      email: 'john.smith@gmail.com',
    };
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call server to get auth token', done => {
      service.login(null, null).subscribe(user => {
        expect(user).toEqual(dummyUser);
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}auth/`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyUser);
    });

    it('should call performLogin method', done => {
      const spy = spyOn(service as any, 'performLogin');

      service.login(null, null).subscribe(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}auth/`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyUser);
    });
  });

  describe('logOut', () => {
    it('should remove auth token from local storage', done => {
      const spy = spyOn(window.localStorage, 'removeItem');

      service.logout();

      expect(spy).toHaveBeenCalledWith(environment.API.authTokenHeaderName);
      done();
    });

    it('should broadcast null value', done => {
      const spy = spyOn(service['_user'], 'next');

      service.logout();

      expect(spy).toHaveBeenCalledWith(null);
      done();
    });
  });

  describe('updateUser', () => {
    it('should call server to update user', done => {
      dummyUser.name = 'some name';
      service.updateUser(dummyUser).subscribe(user => {
        expect(user).toEqual(dummyUser);
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}users/me`);
      expect(req.request.method).toBe('PATCH');
      req.flush(dummyUser);
    });

    it('should broadcast newly created user', done => {
      const spy = spyOn(service['_user'], 'next');
      service.updateUser(dummyUser).subscribe(user => {
        expect(spy).toHaveBeenCalledWith(user);
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}users/me`);
      expect(req.request.method).toBe('PATCH');
      req.flush(dummyUser);
    });
  });

  describe('signUp', () => {
    it('should call server to sign up user', done => {
      service.signUp(dummyUser).subscribe(user => {
        expect(user).toEqual(dummyUser);
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}users/`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyUser);
    });

    it('should call performLogin() method', done => {
      const spy = spyOn(service as any, 'performLogin');

      service.signUp(dummyUser).subscribe(user => {
        expect(spy).toHaveBeenCalled();
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}users/`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyUser);
    });
  });

  describe('loadUser', () => {
    it('should call server to get user data', done => {
      service['init']().subscribe(user => {
        expect(user).toEqual(dummyUser);
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}users/me`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUser);
    });

    it('should broadcast user data', done => {
      const spy = spyOn(service['_user'], 'next');
      service['init']().subscribe(user => {
        expect(spy).toHaveBeenCalledWith(user);
        done();
      });

      const req = httpController.expectOne(`${environment.API.origin}users/me`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUser);
    });
  });

  describe('getAuthToken', () => {
    it('should retrieve auth token from local storage', done => {
      localStorage.setItem(environment.API.authTokenHeaderName, 'token');

      const token = service.getAuthToken();

      expect(token).toBe('token');
      done();
    });
  });

  describe('performLogin', () => {
    it('should call saveToken() method', () => {
      const spy = spyOn(service as any, 'saveToken');
      const res = new HttpResponse<User>({ body: dummyUser });

      res.headers.set(environment.API.authTokenHeaderName, 'token');
      service['performLogin'](res);

      expect(spy).toHaveBeenCalledWith(
        res.headers.get(environment.API.authTokenHeaderName)
      );
    });

    it('should broadcast user data', () => {
      const spy = spyOn(service['_user'], 'next');

      service['performLogin'](
        new HttpResponse<User>({ body: dummyUser })
      );

      expect(spy).toHaveBeenCalledWith(dummyUser);
    });
  });

  describe('saveToken', () => {
    it('should save token in local storage', () => {
      service['saveToken']('token');

      const token = localStorage.getItem(environment.API.authTokenHeaderName);

      expect(token).toBe('token');
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if there is a token in localStorage', () => {
      localStorage.setItem(environment.API.authTokenHeaderName, 'token');

      expect(service.isLoggedIn).toBeTruthy();
    });

    it('should return true if there is a token in localStorage', () => {
      localStorage.removeItem(environment.API.authTokenHeaderName);

      expect(service.isLoggedIn).toBeFalsy();
    });
  });

  describe('userSnapshot', () => {
    it('should return the value of _user SubjectBehavior', () => {
      service['_user'].next(dummyUser);

      expect(service.userSnapshot).toEqual(dummyUser);
    });
  });

  describe('user', () => {
    it('should return Observable of user', done => {
      service['_user'].next(dummyUser);

      service.user.subscribe(user => {
        expect(user).toEqual(dummyUser);
        done();
      });
    });
  });
});
