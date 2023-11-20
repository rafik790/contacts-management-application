import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css']
})
export class ContactAddEditComponent implements OnInit {
  _refresh = new BehaviorSubject<any>({});
  @Output() refreshParent = this._refresh.asObservable();

  @Input() public contactData: ContactModel;
  @Input() public title: string;
  public contactForm: FormGroup;
  private contactID: number;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private toaster: ToasterService) {

    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get id() { return this.contactForm.get("id"); }
  get firstName() { return this.contactForm.get("firstName"); }
  get lastName() { return this.contactForm.get("lastName"); }
  get email() { return this.contactForm.get("email"); }

  ngOnInit(): void {
    console.log("contactData::",this.contactData);

    if (this.contactData) {
      this.contactID = this.contactData.id
      this.firstName?.setValue(this.contactData.firstName);
      this.lastName?.setValue(this.contactData.lastName);
      this.email?.setValue(this.contactData.email);
    }
  }
  onSaveContact() {
    if (this.contactForm.invalid) {
      return;
    }
    let payload = this.contactForm.value;
    console.log(payload);

    if (this.contactData) {
      this.editContact(payload);
    } else {
      this.addContact(payload);
    }
  }

  addContact(payload: any) {
    this.contactService.addNewContact(payload).subscribe({
      next: (resp: any) => {
        this._refresh.next(resp);
        this.activeModal.close('Override click');
        this.toaster.success(resp.message);
      },
      error: (error: any) => {
        this._refresh.next(error.error);
        this.toaster.error(error.error.message);
      }
    })
  }

  editContact(payload: any) {
    this.contactService.updateContact(this.contactID, payload).subscribe({
      next: (resp: any) => {
        this._refresh.next(resp);
        this.activeModal.close('Override click');
        this.toaster.success(resp.message);
      },
      error: (error: any) => {
        this._refresh.next(error.error);
        this.toaster.error(error.error.message);
      }
    });
  }

}
