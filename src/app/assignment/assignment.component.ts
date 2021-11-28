import { PeopleService } from './../people.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  personName=''
  personEmail=''
  role=''
  assignedProjects=0


// pName=''
// pEmail=''
// role=''
// proj=0
person=null
projName=null

  constructor(private router:Router,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,
    private PeopleService:PeopleService) { } 

  ngOnInit(): void {
    this.getProjectName()

    // this.PeopleService.getProjectName().subscribe((response: { [x: string]: any; }) => {
    //   console.log(response)
    // })

    //console.log('in assignment')

    const personid=this.activatedRoute.snapshot.queryParams['id']
    console.log(personid)
    if(personid)
    {
      
      this.PeopleService.getPersonDetail(personid)
      .subscribe((response: { [x: string]: any; }) => {
        if(response['status']=='success'){
          console.log(response)
          this.person=response['data']
          const p=response['data']
          this.personName=p['personName']
          this.personEmail=p['personEmail']
          this.role=p['role']
          this.assignedProjects=p['assignedProjects']

        }
      })
    }
  }

  onCancel(){
    this.router.navigate(['/people']) 
  }

  onUpdate(){
    console.log('in update')
    if(this.person!=null)
    { 
      //console.log(this.pName)
     
      const personId=this.activatedRoute.snapshot.queryParams['id']
      console.log(personId)

      this.PeopleService
        .updatePerson(personId,this.personName,this.personEmail,this.role,this.assignedProjects)
        .subscribe((response: { [x: string]: any; }) => {
         // console.log(response)
          
            console.log(response)
            this.router.navigate(['/people'])
            this.toastr.success('Updated')
          
      })
     
    }
  }

  getProjectName(){
    this.PeopleService.getProjectName().subscribe((response:{[x:string]:any; })=>{
      if(response['status']=='success'){
        this.projName=response['data']
        //console.log(this.projName)
      }
    })
  }


}
