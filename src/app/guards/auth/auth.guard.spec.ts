import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { AccountService } from './../../services/account/account.service';
import { AuthGuard } from './auth.guard';

class MockAccountService implements Partial<AccountService> {
  get isLoggedIn() {
    return true;
  }
}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AccountService, useClass: MockAccountService },
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('should prevent authenticated users from accessing the route', inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      expect(guard.canActivate(null, null)).toBeFalsy();
    }
  ));
});
