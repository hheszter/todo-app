import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  saveTodo(todo:any){
    return this.firestore.collection("todos").add(todo)
  }

  getTodos(userId:string = ""){
    return this.firestore.collection("todos").valueChanges({idField: "id"}) //Observable

    // return this.firestore.collection("todos").ref.where("userID", "==", userId).orderBy("date").get(); //Promise

    // return this.firestore.collection("todos").get() //Observalble;
  }

  getTodoById(id:string){
    return this.firestore.collection("todos").doc(id).get()
  }

  deleteTodo(id:string){
    return this.firestore.collection("todos").doc(id).delete()
  }

  updateTodo(id:string, newTodo:any){
    return this.firestore.collection("todos").doc(id).set(newTodo)
  }
}
