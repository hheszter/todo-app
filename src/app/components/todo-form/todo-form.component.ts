import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;

  userID: string = "00nHuJ0QTLMyrqqCeaensTP2rFj1";

  constructor(private db: DatabaseService) {
    this.todoForm = new FormGroup({
      todo: new FormControl('', [Validators.required, Validators.pattern(/^[\w@!,;:\-\?\.() áéíóöőúüűÁÉÍÓÖŐÚÜŰ]{2,50}$/)])
    })
  }

  ngOnInit(): void {

  }

  saveTodo() {
    const todo = this.todoForm.value;
    todo.date = new Date();
    todo.isNew = true;
    todo.isDone = false;
    todo.userID = this.userID;

    this.db.saveTodo(todo)
      .then((data) => {
        console.log("saved " + data.id);
        this.todoForm.reset();
      })
      .catch(err => console.error(err))
  }
}
