import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { User } from './../../models/User';

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
    return this.http.post<User>(`${this.env.weatherAPI.origin}auth/`, { email, password }, { observe: 'response' })
      .pipe(tap(res => this.performLogin(res)))
      .pipe(map(res => res.body));
  }

  logout(): void {
    localStorage.removeItem('X-AUTH-TOKEN');
  }

  /**
   * Loads user data and informs app about it. This is only for initialization of the app.
   */

  loadUser(): Observable<User> {
    return this.http.get<User>(`${ this.env.weatherAPI.origin }users/me`)
      .pipe(tap(user => this._user.next(user)));
  }

  getAuthToken(): string {
    return localStorage.getItem('X-AUTH-TOKEN');
  }

  private performLogin(res: HttpResponse<User>): void {
    const token: string = res.headers.get('X-AUTH-TOKEN');
    this.saveToken(token);
    this._user.next(res.body);
  }

  private saveToken(token: string): void {
    localStorage.setItem('X-AUTH-TOKEN', token);
  }
  
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('X-AUTH-TOKEN');
  }

  get userSnapshot(): User {
    return this._user.value;
  }

  get user(): Observable<User> {
    return this._user.pipe(map(user => { return { ...user } }));
  }

}
