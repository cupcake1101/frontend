import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService 
{
  
  url='http://localhost:7070/projects'

  constructor(private httpClient:HttpClient,
    private activatedRoute: ActivatedRoute) { }



  getProjects(){

    return this.httpClient.get(this.url)//httpop

  }



  getProjectsDetails(projectId: string) {
    console.log(projectId)
    return this.httpClient.get(this.url+ "/" +projectId)
  }

 
   updateProject(projectId:number,projectName:string,startDate:string,targetEndDate:string,actualEndDate:string,createdBy:string,
                  createdOn:string,modifiedBy:string,modifiedOn:string) {
    const body={
      projectId:projectId,
      projectName:projectName,
      createdOn:createdOn,
      startDate:startDate,
      targetEndDate:targetEndDate,
      actualEndDate:actualEndDate,
      createdBy:createdBy,
      modifiedBy:modifiedBy,
      modifiedOn:modifiedOn
  
  }
  console.log(body)
  return this.httpClient.put(this.url+"/"+projectId,body)
}

insertProject(projectName:string,startDate:string,targetEndDate:string,actualEndDate:string,createdBy:string,createdOn:string,modifiedBy:string,modifiedOn:string){
  
   const body={
    projectName:projectName,
    createdOn:createdOn,
    startDate:startDate,
    targetEndDate:targetEndDate,
    actualEndDate:actualEndDate,
    createdBy:createdBy,
    modifiedBy:modifiedBy,
    modifiedOn:modifiedOn

  }

  return this.httpClient.post(this.url+"/",body)
}

deleteProject(projectId:any)
{
  //const projectId = this.activatedRoute.snapshot.queryParams['id']
  console.log("in delete project"+projectId)
  return this.httpClient.delete(this.url+"/"+projectId)
}

}

   