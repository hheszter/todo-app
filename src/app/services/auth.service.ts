import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatusChanged: any = new Subject<any>();

  constructor(private auth: AngularFireAuth) { }

  signUp(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  signIn(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut(){
    window.localStorage.removeItem("todo-userID");
    this.loginStatusChanged.next(false)
    return this.auth.signOut()
  }

  setLocaleStorage(){
    this.auth.currentUser
      .then(user => {
        if(user?.uid){
          window.localStorage.setItem("todo-userID", user?.uid);
          this.loginStatusChanged.next(true)
        } 
      })
      .catch(err=>{
        console.error(err)
      })
  }
}
