import { ErrorHandler } from '@angular/core';

export class ErrorsHandler implements ErrorHandler {

    handleError(error: any): void {

        alert('Napotkano niespodziewany błąd !');
        console.log(error);

    }

}