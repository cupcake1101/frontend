import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  personEmail=''
  password=''

  constructor( 
    private toastr:ToastrService,
    private router: Router,
    private loginService : LoginService) { }

  ngOnInit(): void {
    
  }
  onLogin() { 

    if(this.personEmail.length==0){
      this.toastr.error('Please enter Email')
    }
    else if(this.password.length==0){
      this.toastr.error('Please enter password')
    }
    else{
      this.loginService
      .login(this.personEmail, this.password)
      .subscribe((response: { [x: string]: any; }) => {
        console.log(response)
        if (response['status'] == 'success') {
          const data = response['data']
          console.log(data)

          // cache the user info
          
          sessionStorage['personName'] = data['personName']
          //sessionStorage['personId']=data['personId']
          //sessionStorage['id']=data['id']
          sessionStorage['id']=data['personId']
          sessionStorage['role']=data['role']
          console.log(sessionStorage)

          
          
          this.toastr.success(`Welcome ${data['personName']}`)

          //goto dashboard
          this.router.navigate(['/dashboard'])
        } else {
          this.toastr.error('Invalid Email ID  or Password ')
        }     
      })
      // //hardcoded
      // sessionStorage['personName'] = 'Himani'
      // this.router.navigate(['/dashboard'])

    }







    
    }

    onSignup(){
      this.router.navigate(['/signup'])
    }

  }
 

  


