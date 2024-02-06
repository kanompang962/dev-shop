import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private _currentTitle = new BehaviorSubject<any>(null);
  stateTitle$ = this._currentTitle.asObservable();

  setTitle(newState: any) {
    this._currentTitle.next(newState);
  }
}
