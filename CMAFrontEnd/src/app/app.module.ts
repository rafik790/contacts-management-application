import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactAddEditComponent } from './components/contact-add-edit/contact-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomHttpInterceptor } from './interceptors/custom-http.interceptor';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactAddEditComponent,
    ConfirmPopupComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { };


