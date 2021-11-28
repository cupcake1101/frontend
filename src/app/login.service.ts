import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate{

  //url of login api
  url='http://localhost:7070/people'
  
 

  constructor(private router:Router,
    private httpClient:HttpClient) { }

    login(personEmail:string,password:string){
      const body={
        personEmail:personEmail,
        password:password
      }
      return this.httpClient.post(this.url+'/login',body)
  
    }

    signup(personName: string,role: string,personEmail: string,password: string){
      const body={
        personName:personName,
        role:role,
        personEmail:personEmail,
        password:password        
      
      }
      return this.httpClient.post(this.url,body)
    
    }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    if (sessionStorage['personName']) {
      // user is already logged in
      return true;
    }
      else{
        this.router.navigate(['/login'])
      return false;

      }
    }
}
 