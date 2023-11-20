import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddEditComponent } from './contact-add-edit.component';

describe('ContactAddEditComponent', () => {
  let component: ContactAddEditComponent;
  let fixture: ComponentFixture<ContactAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAddEditComponent]
    });
    fixture = TestBed.createComponent(ContactAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
