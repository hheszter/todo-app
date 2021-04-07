import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: Array<any> = [];
  userID: any;

  databaseSubscription: Subscription | undefined;

  envelope = faEnvelope;
  envelopeOpen = faEnvelopeOpen;
  trash = faTrashAlt;
  check = faCheck;
  list = faList;

  constructor(private db: DatabaseService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getTodosFromDatabase();
    this.userID = this.getUserId();
    this.auth.loginStatusChanged.subscribe(
      ()=>{
        this.userID = this.getUserId();
      },
      (err:any)=>{console.log(err)}
    )
  }

  ngOnDestroy(): void {
    this.databaseSubscription?.unsubscribe();
  }

  getTodosFromDatabase() {
    // >>> using valueChanges():
    this.databaseSubscription = this.db.getTodos().subscribe(
      (doc: any) => {
        this.todoList = [];
        doc.forEach((data: any) => {
          // show only the user's todo's:
          if (data.userID) {
            if (data.userID === this.userID) {
              this.todoList.push(data)
            }
          }
        });
        // sorting by date:
        this.todoList.sort((a, b) => a.date - b.date);
      },
      (err) => { console.error(err) },
      () => {
        // console.log(this.todoList);
        this.databaseSubscription?.unsubscribe();
      }
    )
  }

  deleteTodo(id: string) {
    this.db.deleteTodo(id)
      .then(() => {
        console.log(id + " deleted");
        this.getTodosFromDatabase();
      })
      .catch(err => console.error(err))
  }

  doneTodo(id: string) {
    // console.log(id);
    this.db.getTodoById(id).subscribe(
      (data: any) => {
        const todo = data.data();

        todo.isDone = !todo.isDone;
        todo.isNew = false;

        this.updateTodo(id, todo);
      }
    )
  }

  newTodo(id: string) {
    this.db.getTodoById(id).subscribe(
      (data: any) => {
        const todo = data.data();

        todo.isNew = !todo.isNew;
        todo.isDone = false;

        this.updateTodo(id, todo);
      }
    )
  }

  updateTodo(id: string, newData: any) {
    this.db.updateTodo(id, newData)
      .then(() => console.log("updated..."))
      .catch((err) => console.error(err))
  }

  getUserId(){
    return window.localStorage.getItem("todo-userID")
  }

}
