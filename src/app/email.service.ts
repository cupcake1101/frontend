import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url='http://localhost:7070/people/email'

  constructor(private httpClient:HttpClient) { }

  sendEmail(personId:number){
    const body={
      
    }
    return this.httpClient.put(this.url+'/'+personId,body)

  }

} 
