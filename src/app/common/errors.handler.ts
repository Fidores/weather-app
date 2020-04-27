import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private readonly notifications: ToastrService) {}

  handleError(error: any): void {
    this.notifications.error(
      'Błąd aplikacji',
      'Napotkano niespodziewany błąd !'
    );
    console.error(error);
  }
}
