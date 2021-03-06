import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  haveAccount:boolean = true;
  emailIsUsed:boolean = false;
  invalidLogin:boolean = false;

  signUpForm: FormGroup;
  signInForm: FormGroup;

  showModal: boolean = false;
  modalContent: string = "";

  constructor(
    private router: Router,
    private auth: AuthService) {
    
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w\.]+@\w+\.[a-z\.]{2,6}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[\w\!\?]{6,20}$/)]),
      repassword: new FormControl('', [Validators.required, Validators.pattern(/^[\w\!\?]{6,20}$/)])
    });

    this.signInForm = new FormGroup({
      logEmail: new FormControl('', Validators.required),
      logPassword: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    if(window.localStorage.getItem("todo-userID")){
      this.router.navigate(["todos"]);
    }
  }

  switchForm(){
    this.haveAccount = !this.haveAccount;
  }

  signUp(){
    const regData = this.signUpForm.value;

    if(regData.password !== regData.repassword){
      //set modal:
      this.showModal = true;
      this.modalContent = "Passwords are not the same!";
    } else {
      this.auth.signUp(regData.email, regData.password)
        .then(()=>{
          this.signUpForm.reset();
          this.switchForm();
        })
        .catch(err=>{
          if(err.code=="auth/email-already-in-use"){ 
            this.emailIsUsed = true;
          } else {
            console.error(err)
          }
        })
    }
  }

  signIn(){
    const loginData = this.signInForm.value;
    
    this.auth.signIn(loginData.logEmail, loginData.logPassword)
      .then(()=>{
        console.log("login is successfully...");
        this.auth.setLocaleStorage();
        this.signInForm.reset();
        this.router.navigate(["todos"]);
      })
      .catch((err)=>{
        this.invalidLogin = true;
        console.log(err.code);
      })
  }

  resetPassword(){
    let useremail = prompt("Enter your email:")
    this.auth.getNewPassword(useremail);
  }

  close(){
    this.showModal = false;
  }
}
