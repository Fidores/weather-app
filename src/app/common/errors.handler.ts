import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(error: any): void {
    this.notifications.error(
      'Błąd aplikacji',
      'Napotkano niespodziewany błąd !'
    );
    console.error(error);
  }

  get notifications(): ToastrService {
    return this.injector.get(ToastrService);
  }
}
