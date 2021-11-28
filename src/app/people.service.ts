
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

url='http://localhost:7070/people'
  

  constructor(private httpClient:HttpClient) { }
  
  
  getPeople(){
    return this.httpClient.get(this.url)
  }

  getPersonDetail(personId:number){
    return this.httpClient.get(this.url+"/"+personId)
  }

  getProjectById(id: number){
    const url1='http://localhost:7070/projects'
    return this.httpClient.get(url1+"/"+id)

  }

  getProjectName(){
    const url3='http://localhost:7070/projects'
    return this.httpClient.get(url3) 
  }

  updatePerson(personId:number,personName:string,personEmail:string,role:string,assignedProjects:number){
    const body={
      personName:personName,
      personEmail:personEmail,
      role:role,
      assignedProjects:assignedProjects
    }
    return this.httpClient.put(this.url+'/'+personId,body);

  }


}
   