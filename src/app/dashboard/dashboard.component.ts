//import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  s=[];
  element=[];
  
  severity=[];

  // element=[
  //    {name :"Trivial",value:1},
  //     // {name :"Minor",value:8000},
  //     {name :"Major",value:2},
  //     {name :"Critical",value:2},
  //     {name :"Blocker",value:4}
  //   ]; 

  constructor(private router:Router, 
    private issuesService:IssuesService) { }

  ngOnInit(): void {
    //console.log('in init')
    
    //get response
    this.issuesService.getSeverity().subscribe((response: { [x: string]: any; })=>
    {
      // if(response['status']=='success')
      // { 
        this.s=response['data']
       //console.log(this.s)

       //converting array to json object
       var severity: { name: never; value:never; }[] = [];
        let data = this.s;
        //console.log(this.s)
        data.forEach(function(item) {
          severity.push({
                "name": item[0],
                "value": item[1]
          });
        });

        //copy the json object
        this.element=JSON.parse(JSON.stringify(severity))
        //console.log(this.element)

      });

     
      
    }
  


  

  // severity=[
  //   {name :"Trivial",value:10000},
  //   {name :"Minor",value:8000},
  //   {name :"Major",value:6000},
  //   {name :"Critical",value:4000},
  //   {name :"Blocker",value:1000}
  // ]; 

  
}



