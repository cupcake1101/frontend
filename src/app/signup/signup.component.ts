import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent implements OnInit {
  personName=''
  role=''
  personEmail=''
  password=''

  constructor(private router:Router,
    private toastr:ToastrService,
    private loginService:LoginService) { }

  ngOnInit(): void { 
  }

  onSignup(){
    console.log(this.personName,this.role,this.personEmail,this.password)
    this.loginService
        .signup(this.personName,this.role,this.personEmail,this.password)
        .subscribe((response: { [x: string]: any; }) => {
          console.log(response)
          if (response['status'] == 'success') {
            console.log(response)
            this.router.navigate(['/login'])
            this.toastr.success('User registered successfully')
          }
          else{
            this.toastr.info('Please enter all fields')
          }
          })
  }
  
}

