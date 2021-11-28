import { IssuesService } from './issues.service';
import { ProjectsService } from './projects.service';
import { PeopleService } from './people.service';
import { LoginService } from './login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { IssuesComponent } from './issues/issues.component';
import { PeopleComponent } from './people/people.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AddBugComponent } from './add-bug/add-bug.component';
import { LogoutComponent } from './logout/logout.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AssignmentComponent } from './assignment/assignment.component';


//all services and components are added
//starting point 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ProjectsComponent,
    IssuesComponent,
    PeopleComponent,
    LoginComponent,
    SignupComponent,
    CreateProjectComponent,
    AddBugComponent,
    LogoutComponent,
    AssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [
    LoginService,
    PeopleService,
    ProjectsService,
    IssuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
