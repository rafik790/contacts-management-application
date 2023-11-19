import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _toastrBS = new BehaviorSubject<any>({});
  showToastr = this._toastrBS.asObservable();

  constructor() { }

  success(message: string): void {
    const toasterData = {
      text: message,
      toastrClass: 'toaster-success',
      iconClass: 'fa-check',
      timeout: 5000
    };

    this._toastrBS.next(toasterData);
  }

  warning(message: string): void {
    const toasterData = {
      text: message,
      toastrClass: 'toaster-warning',
      iconClass: 'fa-triangle-exclamation'
    };
    this._toastrBS.next(toasterData);
  }

  error(message: string): void {
    const toasterData = {
      text: message,
      toastrClass: 'toaster-error',
      iconClass: 'fa-circle-xmark'
    };
    this._toastrBS.next(toasterData);
  }
}
