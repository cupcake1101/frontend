import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  isRole=false;
  people=[]
  projName=null

  constructor(private router:Router, 
    private peopleservice:PeopleService) { }

  ngOnInit(): void {
    //console.log('in init')
    this.loadPeople()
    this.getProjectName() 
    if(sessionStorage['role']=='ProjectManager'){
      this.isRole=true;
    }

  }
 
 
 
  
  loadPeople()
  {
    this.peopleservice
    .getPeople()
    .subscribe((response: { [x: string]: any; })=>
    {
      console.log(response)
      if(response['status']=='success')
      {
        this.people=response['data']
      }
      else
      {
        console.log(response['error'])
      }
    })
 
  }

  getProjectName(){
    this.peopleservice.getProjectName().subscribe((response:{[x:string]:any; })=>{
      if(response['status']=='success'){
        this.projName=response['data']
        //console.log(this.projName) 
      }
    })
  } 

  getProject(){

  }

  onEdit(person: { [x: string]: any; }){
    console.log('in edit')
    console.log(person)
    this.router.navigate(['/assignment'],{queryParams:{id:person['personId']}})
  }


}  

