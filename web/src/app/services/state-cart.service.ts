import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateCartService {

  private _currentState = new BehaviorSubject<any>(null);
  currentState$ = this._currentState.asObservable();

  updateState(newState: any) {
    this._currentState.next(newState);
    console.log(this._currentState.value)
  }
}
