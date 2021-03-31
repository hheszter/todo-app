import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  haveAccount:boolean = true;

  signUpForm: FormGroup;
  signInForm: FormGroup;

  constructor(private router: Router) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w\.]+@\w+\.[a-z\.]{2,5}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[\w\!\?:]{6,20}$/)]),
      repassword: new FormControl('', [Validators.required, Validators.pattern(/^[\w\!\?:]{6,20}$/)])
    });

    this.signInForm = new FormGroup({
      logEmail: new FormControl('', Validators.required),
      logPassword: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    
  }

  switchForm(){
    this.haveAccount = !this.haveAccount;
  }

  signUp(){
    const regData = this.signUpForm.value;
    console.log(regData);

    this.switchForm();
  }

  signIn(){
    console.log("login is successfully...");

    this.router.navigate(["todos"]);

  }


}
