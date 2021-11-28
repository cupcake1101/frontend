import { EmailService } from './../email.service';
import { IssuesService } from './../issues.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {
  body=''
  proj=0
  prs=0
  issueName=''
  issueDescription=''
  createdBy=`${sessionStorage['personName']}`
  createdOn='' 
  priority=''
  severity=''
  status='' 
  projects=null
   assignedTo=null

  issue=null
  //projects=null
  
  pid={}
  projid={}
  
  projName=null
  perName=null
  

  //private projectIDs=[1,2,3,4]
  
  

  constructor(private router:Router,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,
    private IssuesService:IssuesService,
    private EmailService:EmailService) { }

    ngOnInit(): void {
      
      this.getProjectid()
      this.getPersonid()
      this.getProjectName()
      this.getPersonName()
      
      

      const issueId = this.activatedRoute.snapshot.queryParams['id']
      //console.log(issue)
      if (issueId){
        //edit bug
        // console.log(issueId)
        this.IssuesService
        .getBugDetail(issueId)
        .subscribe((response: { [x: string]: any; }) => {
          // console.log(response)
          if (response['status'] == 'success'){
           
            this.issue=response['data']
            
            const issues = response['data']        
              this.issueName =issues['issueName']
              this.issueDescription=issues['issueDescription']
              this.createdBy =issues['createdBy']
              this.createdOn=issues['createdOn']
              this.priority=issues['priority']
              this.severity=issues['severity']
              this.status=issues['status']
              this.proj=issues['projects']['projectId']
              this.prs=issues['people']['personId']
              //this.proj=issues['projName']['projectName']
              //this.prs=issues['people']['personId']

              // console.log(this.proj)
              // console.log(this.prs)
              
            
          }
        })
      }
  }

  onCancel(){
    this.router.navigate(['/issues'])
  }


 
  onUpdate() {

    if (this.issue==null) {
      // insert(add issue)
       this.IssuesService
        .insertIssue(this.issueName,this.issueDescription,this.createdBy,this.createdOn,
          this.priority,this.severity,this.status,this.proj,this.prs)
        .subscribe((response: { [x: string]: any; }) => {
          //console.log(response)
          if (response['status'] == 'success') {
            this.EmailService.sendEmail(this.prs)
            .subscribe((response: { [x: string]: any; }) => {
              if(response['status'] == 'success') {
              console.log('Email sent')
              }
            })
            this.router.navigate(['/issues'])
            console.log(this.prs)
            this.toastr.success('Bug Added Successfully')
          }
          
        })

        //sending mail to respective person
       //console.log('sending mail')
        //this.EmailService.sendEmail(this.prs)
    } 
    

    // edit(update issue)
    if(this.issue!=null)
    { 
      //console.log(this.issueName)
     
      const issueId=this.activatedRoute.snapshot.queryParams['id']
      //console.log(issueId)

      this.IssuesService
        .updateIssue(issueId,this.issueName,this.issueDescription,this.createdBy,this.createdOn,
        this.priority,this.severity,this.status,this.proj,this.prs)
        .subscribe((response: { [x: string]: any; }) => {
          if (response['status'] == 'success') {
            this.EmailService.sendEmail(this.prs)
            .subscribe((response: { [x: string]: any; }) => {
              if(response['status'] == 'success') {
              console.log('Email sent')
              }
            })
           // console.log(response)
            this.router.navigate(['/issues'])
           
            
            this.toastr.success('Bug Details Updated')
          }
      })
     
    }
}

getPersonid(){
  this.IssuesService.getPersonid().subscribe((response: { [x: string]: any; }) =>{
    if (response['status'] == 'success') {
      this.assignedTo=response['data']
     // console.log(this.assignedTo);
    }
  })
}

 


getProjectid(){
  this.IssuesService.getProjectId().subscribe((response: { [x: string]: any; }) =>{
    if (response['status'] == 'success') {
      //console.log(response);       
       this.projects=response['data']

    }
  })
}


getProjectName(){
  this.IssuesService.getProjectName().subscribe((response:{[x:string]:any; })=>{
    if(response['status']=='success'){
      this.projName=response['data']
      //console.log(this.projName)
    }
  })
}


getPersonName(){
  this.IssuesService.getPersonName().subscribe((response:{[x:string]:any; })=>{
    if(response['status']=='success'){
      this.perName=response['data']
      //console.log(this.perName)
    }
  })
}



// getBody(){
//   this.EmailService.sendEmail(this.prs).subscribe((response:{[x:string]:any;})=>{
//     this.body=response['data']
//   })
// }



}


 