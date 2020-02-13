import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainHeaderService {

  constructor() {  }

  readonly changeTitleBroadcaster: Subject<string> = new Subject();

  setTitle(title: string): void {
    this.changeTitleBroadcaster.next(title);
  }

}
