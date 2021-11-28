import { LoginService } from './login.service';
import { AddBugComponent } from './add-bug/add-bug.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { IssuesComponent } from './issues/issues.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { LogoutComponent } from './logout/logout.component';
import { AssignmentComponent } from './assignment/assignment.component';

//this part takes care of all routes
//Note :::whenever you add new component do not forget to add routes here 
const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[LoginService]},
  {path:'projects',component:ProjectsComponent,canActivate:[LoginService]},
  {path:'issues',component:IssuesComponent,canActivate:[LoginService]},
  {path:'people',component:PeopleComponent,canActivate:[LoginService]},
  //{path:'logout',component:LogoutComponent,canActivate:[LoginService]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'create-project',component:CreateProjectComponent,canActivate:[LoginService]},
  {path:'add-bug',component:AddBugComponent,canActivate:[LoginService]},
  {path:'assignment',component:AssignmentComponent,canActivate:[LoginService]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
