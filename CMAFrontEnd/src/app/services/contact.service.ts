import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  getContactList(pageNumber:number,pageSize:number,searchTerm:string){
    let url:string =`${environment.API}/contacts?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`;
    return this.http.get<any>(url);
  }
  addNewContact(payload: any) {
    let url: string =  `${environment.API}/contacts`;
    return this.http.post<any>(url,JSON.stringify(payload));
  }
  
  updateContact(contactID:number,payload: any) {
    let url: string =  `${environment.API}/contacts/${contactID}`;
    return this.http.put<any>(url,JSON.stringify(payload));
  }

  deleteContact(contactID:any) {
    let url: string =  `${environment.API}/contacts/${contactID}`;
    return this.http.delete<any>(url);
  }

}
