import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginStatus: boolean;

  constructor(private auth: AuthService) {
    this.loginStatus = window.localStorage.getItem("todo-userID") ? true : false;
   }

  ngOnInit(): void {
    this.auth.loginStatusChanged.subscribe(
      ()=>{
        this.loginStatus = window.localStorage.getItem("todo-userID") ? true : false;},
      (err:any)=>{console.log(err)}
    )
   }

  logout() {
    this.auth.signOut()
      .then(()=>{
        console.log("logged out...");
        this.loginStatus = false;
      })
      .catch(err=>console.error(err))
  }

}