import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnDestroy{
  @Input() toasterData: any;
  
  @Output() closeAction = new EventEmitter<any>();
  setOpacity: number = 1;
  private toasterTimeout: any;
  constructor() { }

  closeToaster(): void {
    this.toasterTimeout = setTimeout(() => {
      this.closeAction.emit({});
    }, 1000);
  }

  ngOnDestroy(): void{
    clearTimeout(this.toasterTimeout);
  }
}
