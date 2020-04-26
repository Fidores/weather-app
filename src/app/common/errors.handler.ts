import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    alert('Napotkano niespodziewany błąd !');
    console.log(error);
  }
}
