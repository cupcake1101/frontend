import { ProjectsService } from './../projects.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

 
  name:any
  
  project_id:{[key:string]:any[]}={}

  projectName=''
  createdBy=''
  createdOn=''
  startDate=''
  targetEndDate=''
  actualEndDate=''
  modifiedBy=''
  modifiedOn=''
  //project:any
  project=null
  
  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    private projectsService:ProjectsService,
    private toastr:ToastrService) { }


  ngOnInit(): void {
    const projectId = this.activatedRoute.snapshot.queryParams['id']
    console.log(projectId)
    this.name=sessionStorage.getItem('personName');
    console.log(this.name)
    if (projectId){
     
      //edit project
      console.log(projectId)
      this.projectsService
      .getProjectsDetails(projectId)
      .subscribe((response: { [x: string]: any; }) => {
        console.log(response)
        if (response['status'] == 'success'){
          this.project = response['data']
          const projects=response['data']
         
           
           console.log(this.project)       
            this.projectName =projects['projectName']
            this.createdBy =projects['createdBy']
            this.startDate =projects['startDate']
            this.targetEndDate =projects['targetEndDate']
            this.actualEndDate=projects['actualEndDate']
            //this.modifiedBy=sessionStorage.getItem('personName')
            this.modifiedBy=`${sessionStorage['personName']}`
            this.modifiedOn=projects['modifiedOn']
        }
      })
    }
  }

  



  onCancel(){
    this.router.navigate(['/projects'])
  }




  onUpdate() {
    // insert(add project)
    if (this.project==null) {
          
      this.projectsService
        .insertProject(this.projectName,this.startDate,this.targetEndDate,this.actualEndDate,this.createdBy,this.createdOn,this.modifiedBy,this.modifiedOn)
        .subscribe((response: { [x: string]: any; }) => {
          console.log(response)
          if (response['status'] == 'success') {
            this.router.navigate(['/projects'])
            this.toastr.success('Project Added Successfully ')
          }
        })
    } 

    // edit(update project)
    if(this.project!=null)
    { 
      //console.log(this.projectName)
      const projectId = this.activatedRoute.snapshot.queryParams['id']
      
      this.projectsService
        .updateProject(projectId,this.projectName,this.startDate,this.targetEndDate,this.actualEndDate,this.createdBy,
                        this.createdOn,this.modifiedBy,this.modifiedOn)
        .subscribe((response: { [x: string]: any; }) => {
          if (response['status'] == 'success') {
            this.router.navigate(['/projects'])
            this.toastr.success('Project Details Updated')
          }
      })
     
    }
}


}

