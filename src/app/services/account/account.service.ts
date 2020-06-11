import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { UpdateUser, User, UserPayload } from './../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private readonly http: HttpClient) {}

  private readonly env = environment;
  private readonly _user: BehaviorSubject<User | null> = new BehaviorSubject(
    null
  );

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(
        `${this.env.API.origin}auth/`,
        { email, password },
        { observe: 'response' }
      )
      .pipe(tap(res => this.performLogin(res)))
      .pipe(map(res => res.body));
  }

  logout(): void {
    localStorage.removeItem(this.env.API.authTokenHeaderName);
    this._user.next(null);
  }

  updateUser(user: UpdateUser): Observable<User> {
    return this.http
      .patch<User>(`${this.env.API.origin}users/me`, user)
      .pipe(tap(user => this._user.next(user)));
  }

  signUp(user: UserPayload): Observable<User> {
    return this.http
      .post<User>(`${this.env.API.origin}users/`, user, { observe: 'response' })
      .pipe(
        tap(res => this.performLogin(res)),
        map(res => res.body)
      );
  }

  getAuthToken(): string {
    return localStorage.getItem(this.env.API.authTokenHeaderName);
  }

  /**
   * Loads user data and informs the app about it. This is only for initialization of the app.
   */

  init(): Observable<User> {
    return this.http.get<User>(`${this.env.API.origin}users/me`).pipe(
      tap(user => {
        console.log(user);
        return this._user.next(user);
      })
    );
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
    return this._user.pipe(
      map(user => {
        return { ...user };
      })
    );
  }
}
