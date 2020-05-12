import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
