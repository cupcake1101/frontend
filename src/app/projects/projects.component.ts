import { PeopleService } from './../people.service';
import { ProjectsService } from './../projects.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit { 
  isRole=false;
  projects=[]
  //role='ProjectManager'
  role=''
  
  
  
  constructor(private router:Router, 
    private toastr:ToastrService,
    private activatedRoute: ActivatedRoute,
    private projectsService:ProjectsService,
    private peopleservice:PeopleService,
    private httpClient:HttpClient) { }

  ngOnInit(): void {
    console.log(sessionStorage['role'])
    this.loadProjects();


    if(sessionStorage['role']=='ProjectManager'){
      this.isRole=true;
    }
      
  }


  loadProjects()
  {
    this.projectsService
    .getProjects()
    .subscribe((response: { [x: string]: any; })=>
    {
      if(response['status']=='success')
      {
        this.projects=response['data']
      }
      else
      {
        console.log(response['error'])
      }
    })

  }

  onEdit(project: { [x: string]: any; }){
    console.log(this.projects)
    this.router.navigate(['/create-project'],{queryParams:{id:project['projectId']}})
  }

  onCreateProject(){
    this.router.navigate(['/create-project'])
  }
 
  onDelete(project: { [x: string]: any; }){
    console.log(project['projectId'])
    //const projectId = this.activatedRoute.snapshot.queryParams['id']
    this.projectsService
    .deleteProject(project['projectId'])
    .subscribe((response: { [x: string]: any; })=>{
      if(response['status']=='success'){
        this.toastr.success('Project Deleted')
        this.loadProjects()
      }else{
        console.log('Project Not Deleted') 
      }
     })


    }
  }
//   getPerson(){
//     this.peopleservice.getPersonDetail(sessionStorage['id'])
//     .subscribe((response: { [x: string]: any; })=>{
//       const person=response['data']
//       this.role=person['role']
//     }
//       )

//   }

// }
 

