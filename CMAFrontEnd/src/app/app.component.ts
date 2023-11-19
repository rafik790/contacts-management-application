import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToasterService } from './services/toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'toastrAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000)',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000)',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  title = 'CMAFrontEnd';

  private toasterSubscription: Subscription;
  toasterData: any = {};
  private timeoutID: any = undefined;
  constructor(private toaster: ToasterService) {


  }
  ngOnInit(): void {
    this.toasterSubscription = this.toaster.showToastr.subscribe(
      (toastrData: any) => {

        this.toasterData = toastrData;
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
          this.timeoutID = undefined;
        };

        this.timeoutID = setTimeout(() => {
          this.toasterData = {};
        }, 1000);


      });
  }


  ngOnDestroy(): void {
    this.toasterSubscription.unsubscribe();
  }

  closeAction(toastrAction: any) {
    this.toasterData = toastrAction;
  }
}
