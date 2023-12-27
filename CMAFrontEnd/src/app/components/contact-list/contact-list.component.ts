import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, debounce, map, switchMap, timer } from 'rxjs';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ContactAddEditComponent } from '../contact-add-edit/contact-add-edit.component';
import { ConfirmPopupService } from 'src/app/services/confirm-popup.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactDetailsComponent } from 'src/app/compontents/contact-details/contact-details.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @ViewChild("childDetails", { read: ViewContainerRef }) childDetails: ViewContainerRef;

  subjectMain = new Subject<any>();
  searchFieldValueOutputDelay: number = 1;
  dataListObs: Observable<ContactModel[]>;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class',
  };

  public pageSize = 5;
  public currentPageNumber: number = 1;
  public totalNumberOfrecords: number = -1;
  searchForm: FormGroup;
  private lastSelectedID: number = 0;
  constructor(private contactService: ContactService,
    private modalService: NgbModal,
    private confirmPopup: ConfirmPopupService,
    private toaster: ToasterService,
    private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTxt: [''],
    });
  }

  ngOnInit(): void {

    this.initializeFetch();
    setTimeout(() => {
      this.fetchData(1, false, '');
    }, 200);
  }

  initializeFetch() {
    this.dataListObs = this.subjectMain.pipe(
      debounce(() => timer(this.searchFieldValueOutputDelay)),
      switchMap((dataFilter: any) => {
        return this.contactService.getContactList(dataFilter.pageNumber, dataFilter.pageSize, dataFilter.searchTerm).pipe((
          map((resp: any) => {
            this.totalNumberOfrecords = resp.data.hitCount;
            this.currentPageNumber = dataFilter.pageNumber;
            return resp.data.contacts
          })
        ))
      })
    );
  }

  fetchData(pageNumber: number, debounceNeeded: boolean, searchPattern: string,) {
    if(this.lastSelectedID>0){
      let lstRow = document.getElementById(`row_${this.lastSelectedID}`) as HTMLElement;
      lstRow.classList.remove("table-active");
      this.lastSelectedID=0;
      this.childDetails.clear();
    }
   

    
    let dataFilter = {
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      searchTerm: encodeURIComponent(searchPattern),
    };

    if (debounceNeeded) {
      this.searchFieldValueOutputDelay = 500;
    } else {
      this.searchFieldValueOutputDelay = 5;
    }
    this.subjectMain.next(dataFilter);
  }

  onAddNewContact() {
    this.ngbModalOptions.windowClass = 'big-size-popup';
    const modalRef = this.modalService.open(ContactAddEditComponent, this.ngbModalOptions);
    modalRef.componentInstance.contactData = null;
    modalRef.componentInstance.title = "Add Contact";
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.fetchData(1, false, '');
    });
  }

  onEditContact(event: Event, contact: ContactModel) {
    event.stopPropagation();
    this.ngbModalOptions.windowClass = 'big-size-popup';
    const modalRef = this.modalService.open(ContactAddEditComponent, this.ngbModalOptions);
    modalRef.componentInstance.contactData = contact;
    modalRef.componentInstance.title = "Edit Contact";
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      let searchTxt = this.searchForm.value.searchTxt.trim();
      this.fetchData(this.currentPageNumber, false, searchTxt);
    });
  }
  onDeleteContact(event: Event, contact: ContactModel) {
    event.stopPropagation();
    let options = {
      title: `Are you sure, you want to <b>delete</b> the contact?`
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callDeleteuser(contact.id);
      }
    });
  }

  callDeleteuser(contactID: number) {
    this.contactService.deleteContact(contactID).subscribe({
      next: (resp: any) => {
        this.fetchData(1, false, '');
        this.toaster.success(resp.message);
      },
      error: (error: any) => {
        this.toaster.error(error.error.message);
      }
    });
  }

  getPageData(pageNumber: number) {
   
    let searchTxt = this.searchForm.value.searchTxt.trim();
    this.fetchData(pageNumber, false, searchTxt);
  }

  onSearch(event: Event) {
    let searchTxt = this.searchForm.value.searchTxt.trim();
    if (!(searchTxt.length == 0 || searchTxt.length >= 3)) {
      return;
    }
    this.fetchData(1, true, searchTxt);
  }


  onViewDetails(contact: ContactModel) {
    if (this.lastSelectedID != 0 && this.lastSelectedID != contact.id) {
      let lstRow = document.getElementById(`row_${this.lastSelectedID}`) as HTMLElement;
      lstRow.classList.remove("table-active");
    }

    let row = document.getElementById(`row_${contact.id}`) as HTMLElement;
    let isRowAlreadySelected = false;
    row.classList.forEach((emelemnt: any) => {
      if (emelemnt == "table-active") {
        isRowAlreadySelected = true;
      }
    });

    this.lastSelectedID = contact.id;
    console.log("isRowAlreadySelected::", isRowAlreadySelected);
    this.childDetails.clear();
    if (!isRowAlreadySelected) {
      row.classList.add("table-active");
      const comRef = this.childDetails.createComponent(ContactDetailsComponent);
      comRef.instance.contactData = contact;
    } else {
      row.classList.remove("table-active");
    }

  }

}
