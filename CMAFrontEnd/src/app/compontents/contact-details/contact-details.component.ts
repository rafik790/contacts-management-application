import { Component, Input, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  ngOnInit(): void {
    
  }
  @Input() contactData: ContactModel
}
