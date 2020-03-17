import { environment } from './../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { tap, mapTo, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private readonly http: HttpClient
  ) { }

  private readonly env = environment;
  private readonly _user = new BehaviorSubject(null);

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.env.weatherAPI.origin}auth/`, { email, password }, {observe: 'response'})
      .pipe(tap((res: HttpResponse<any>) => this.performLogin(res)))
      .pipe(map(res => res.body));
  }

  private performLogin(res: HttpResponse<any>) {
    const token: string = res.headers.get('X-AUTH-TOKEN');
    this.saveToken(token);
    this.user.next(res.body);
  }

  private saveToken(token: string) {
    localStorage.setItem('X-AUTH-TOKEN', token);
  }
  
  get isLoggedIn(): boolean {
    return !!this._user.value;
  }

  get userSnapshot() {
    return this._user.value;
  }

  get user() {
    return this._user;
  }

}
