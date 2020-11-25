import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../pages/contact/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactdataService {

  apiURL = '/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }


  contactForm(formdata: Contact) {
    this.http.post<Contact>(this.apiURL+'/api/contact', formdata, this.httpOptions).pipe(
    );
  }
}
