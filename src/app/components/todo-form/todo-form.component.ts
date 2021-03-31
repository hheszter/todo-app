import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;
  
  constructor() {
    this.todoForm = new FormGroup({
      todo: new FormControl('', [Validators.required, Validators.pattern(/^[\w@!,;:-\?\. áéíóöőúüűÁÉÍÓÖŐÚÜŰ]{2,50}$/)])
    })
   }

  ngOnInit(): void {
   
  }

  saveTodo(){
    const todo = this.todoForm.value;

    console.log(todo);
  }

}
