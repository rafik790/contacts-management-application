import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounce, map, switchMap, timer } from 'rxjs';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  subjectMain = new Subject<any>();
  searchFieldValueOutputDelay: number = 1;
  public dataListObs: Observable<ContactModel[]>;
  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.initializeFetch();
    setTimeout(() => {
      this.fetchData();
    }, 200);
  }

  initializeFetch() {
    this.dataListObs = this.subjectMain.pipe(
      debounce(() => timer(this.searchFieldValueOutputDelay)),
      switchMap((dataFilter: any) => {
        return this.contactService.getContactList().pipe((
          map((resp: any) => {
            return resp;
          })
        ))
      })
    );
  }

  fetchData() {
    let dataFilter={

    }
    this.subjectMain.next(dataFilter);
  }

  onEditUser(contact:ContactModel){

  }
  onDeleteUser(contact: ContactModel) {

  }

}
