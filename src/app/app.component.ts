import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'bts';

  constructor(private router:Router,
              private toastr:ToastrService){}

  onLogout(){
    sessionStorage.removeItem('personName')
    this.router.navigate(['/login'])
    this.toastr.success('Successfully Logged Out!!!')
  }


// onLogin(){
//   this.router.navigate(['/login'])
// }

// onSignUp(){
//   this.router.navigate(['/signup'])
// }

}
