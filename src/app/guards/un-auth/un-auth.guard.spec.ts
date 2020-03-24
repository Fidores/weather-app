import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { UnAuthGuard } from './un-auth.guard';
import { AccountService } from 'src/app/services/account/account.service';

class MockRouter implements Partial<Router> {
  navigate = path => Promise.resolve(true);
}

class MockAccountService implements Partial<AccountService> { 
  get isLoggedIn() { return false }
}

describe('UnAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnAuthGuard,
        { provide: AccountService, useClass: MockAccountService },
        { provide: Router, useClass: MockRouter }
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    });
  });

  it('should prevent unauthenticated users from accesssing the route', inject([UnAuthGuard],
  (guard: UnAuthGuard) => {
    const state: any = { url: '' };

    expect(guard.canActivate(null, state)).toBeFalsy();
  }));

  it('should redirect user to login component', inject([UnAuthGuard, Router], 
  (guard: UnAuthGuard, router: Router) => {
    const spy = spyOn(router, 'navigate'); 
    const state: any = { url: '' };

    guard.canActivate(null, state);
  
    expect(spy).toHaveBeenCalledWith(['/login']);
  }));
});
