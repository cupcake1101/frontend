import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  

  url='http://localhost:7070/issues'
   
 
  constructor(private httpClient:HttpClient) { }

  getBugs(){
    return this.httpClient.get(this.url)

  } 

  getSeverity(){
    const url1='http://localhost:7070/issues/severity'
    return this.httpClient.get(url1)
  }
 
  getBugDetail(issueId: number){
    return this.httpClient.get(this.url+"/"+issueId) 

  }
  getProjectId(){

  const url1='http://localhost:7070/projects/id'
    
    return this.httpClient.get(url1)

  }

  getPersonid(){
    const url2='http://localhost:7070/people/id'
    
    return this.httpClient.get(url2)
  }

  getProjectName(){
    const url3='http://localhost:7070/projects'
    return this.httpClient.get(url3) 
  }

  getPersonName(){
    const url4='http://localhost:7070/people'
    return this.httpClient.get(url4)
  }


 
  updateIssue(issueId:number,issueName:string,issueDescription:string,createdBy:string,createdOn:string,
    priority:string,severity:string,status:string,projectId:number,personId:number) {
const body={
  issueName:issueName,
  issueDescription:issueDescription,
  createdBy:createdBy,
  createdOn:createdOn,
  priority:priority,
  severity:severity,
  status:status,
  people:{ 
    personId:personId }, 
  
  projects:{
    projectId:projectId }

}
console.log(body)
return this.httpClient.put(this.url+"/"+issueId,body)
}

// insertIssue(issueName:string,issueDescription:string,createdBy:string,createdOn:string,
//   priority:string,severity:string,status:string,projectId:number,personId:number){
  insertIssue(issueName:string,issueDescription:string,createdBy:string,createdOn:string,
  priority:string,severity:string,status:string,projectId:number,personId:number){

const body={
issueName:issueName,
issueDescription:issueDescription,
status:status,
priority:priority,
severity:severity,
//createdBy:`${sessionStorage['personName']}`,
createdBy:createdBy,
people:{ 
  personId:personId },
projects:{
  projectId:projectId }

}
 
return this.httpClient.post(this.url+"/",body)

}





}
