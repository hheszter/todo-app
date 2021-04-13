import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;

  showModal: boolean = false;
  modalContent: string = "";

  @Input() userID: any;
  @Input() todoList: any;

  constructor(private db: DatabaseService) {
    this.todoForm = new FormGroup({
      todo: new FormControl('', [Validators.required, Validators.pattern(/^[\w@!,;:\-\?\.\/() áéíóöőúüűÁÉÍÓÖŐÚÜŰ]{2,50}$/)])
    })
  }

  ngOnInit(): void {

  }

  saveTodo() {
    const todo = this.todoForm.value;

    if (!this.checkTodo(todo.todo)) {
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

  checkTodo(content: string) {
    let isSame = false;
    this.todoList.map((item: any) => {
      if (item.todo === content) {
        //set modal:
        this.showModal = true;
        this.modalContent = "This task is already been saved!";
        isSame = true;
      }
    });
    return isSame
  }

  close() {
    this.showModal = false;
  }
}
