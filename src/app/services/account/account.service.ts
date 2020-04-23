import { Unauthorized } from './../../common/errors/unauthorized';
import { AppError } from './../../common/errors/appError';
import { BadRequest } from './../../common/errors/badRequest';
import { City } from './../../models/City';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { User, UpdateUser } from './../../models/User';
import { handleError } from 'src/app/common/errors/handleError';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private readonly http: HttpClient
  ) { }

  private readonly env = environment;
  private readonly _user: BehaviorSubject<User | null> = new BehaviorSubject(null);

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.env.API.origin}auth/`, { email, password }, { observe: 'response' })
      .pipe(tap(res => this.performLogin(res)))
      .pipe(map(res => res.body))
      .pipe(catchError(handleError));
  }

  logout(): void {
    localStorage.removeItem(this.env.API.authTokenHeaderName);
    this._user.next(null);
  }

  updateUser(user: UpdateUser): Observable<User> {
    return this.http.patch<User>(`${ this.env.API.origin }users/me`, user)
      .pipe(tap(user => this._user.next(user)), catchError(handleError));
  }

  /**
   * Loads user data and informs the app about it. This is only for initialization of the app.
   */

  loadUser(): Observable<User> {
    return this.http.get<User>(`${ this.env.API.origin }users/me`)
      .pipe(tap(user => this._user.next(user)), catchError(handleError));
  }

  getAuthToken(): string {
    return localStorage.getItem(this.env.API.authTokenHeaderName);
  }

  private performLogin(res: HttpResponse<User>): void {
    const token: string = res.headers.get(this.env.API.authTokenHeaderName);
    this.saveToken(token);
    this._user.next(res.body);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.env.API.authTokenHeaderName, token);
  }
  
  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.env.API.authTokenHeaderName);
  }

  get userSnapshot(): User {
    return this._user.value;
  }

  get user(): Observable<User> {
    return this._user.pipe(map(user => { return { ...user } }));
  }

}
