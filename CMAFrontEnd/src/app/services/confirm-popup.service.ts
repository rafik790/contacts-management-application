import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPopupComponent } from '../components/confirm-popup/confirm-popup.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPopupService {
  modalRef: NgbModalRef;
  constructor(private modalService: NgbModal) { }
  confirm(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let ngbModalOptions: NgbModalOptions = {
        keyboard: false,
        centered: true,
        windowClass: 'md-class'
      };
      
      this.modalRef = this.modalService.open(ConfirmPopupComponent, ngbModalOptions);
      this.modalRef.componentInstance.title = options.title;
      this.modalRef.componentInstance.onClose.subscribe((result: boolean) => {
        resolve(result);
      });

    });

  }
}
