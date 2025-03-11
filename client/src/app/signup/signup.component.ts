import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupModel: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signupSubmit() {

    this.authService.signup(this.signupModel)
      .subscribe(res => {
        console.log(res);
        alert("Signup Successfully!");
      })
    
  }

}
