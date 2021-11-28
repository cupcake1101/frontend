import { AddBugComponent } from './../add-bug/add-bug.component';
import { IssuesService } from './../issues.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues=[]
  role=['ProjectManager','TestEngineer']

  constructor(private router:Router, 
    private issuesService:IssuesService) { }


  ngOnInit(): void {
    this.loadIssues()

  } 

  loadIssues()
  {
    //console.log('in init ')
    this.issuesService
    .getBugs()
    .subscribe((response: { [x: string]: any; })=>
    {
      if(response['status']=='success')
      {
        this.issues=response['data']
        console.log(this.issues)
      }
      else
      {
        console.log(response['error'])
      }
    })

  }
 
  onEdit(bug: { [x: string]: any; }){
    this.router.navigate(['/add-bug'],{queryParams:{id:bug['id']}})
  }
  
  onAddBug(){
    this.router.navigate(['/add-bug'])

  }

  getBug(){
    this.issuesService.getBugDetail(sessionStorage['id'])
    .subscribe((response: { [x: string]: any; })=>{
      const person=response['data']
      this.role=person['role']
    }
      )

  }

}
 