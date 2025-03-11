import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginModel: any = {};

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.authService.getSample().subscribe(res=>{
      console.log(res);
    })
  }

  loginSubmit() {
    
    this.authService.login(this.loginModel)
      .subscribe((res: any) => {
        this.router.navigateByUrl('/home');
      }, (error:any) => {
        alert("Unauthorized To Login");
      })
    
  }

}
