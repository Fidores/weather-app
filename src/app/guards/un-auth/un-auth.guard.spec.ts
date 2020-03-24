import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { UnAuthGuard } from './un-auth.guard';

describe('UnAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnAuthGuard],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    });
  });

  it('should ...', inject([UnAuthGuard], (guard: UnAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
