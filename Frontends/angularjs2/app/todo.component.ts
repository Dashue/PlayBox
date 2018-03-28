import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo';

import { TodoService } from './services/todo.service'
import { UUID } from './services/uuid.service';

@Component({
  selector: 'todos',
  template: `
  <input type="button" (click)="newTodo()" value="New" />
  <div *ngIf="selectedTodo">
    <todo-edit [(item)]="selectedTodo" [cancel]="cancelEdit" [save]="saveEdit"></todo-edit>
  </div>
  <ul class="todolist">
    <li *ngFor="let todo of todos" (click)="onSelect(todo)" [class.selected]="todo === selectedTodo">
      <div>
        {{todo.name}} 
        <input type="checkbox" disabled [attr.checked]="todo.isCompleted ? true : null" />
      </div>
    </li>
  </ul>
  `,
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .todolist {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 20em;
  }
  .todolist li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .todolist li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .todolist li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .todolist .text {
    position: relative;
    top: -3px;
  }
  .todolist .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`],
  providers: [
    UUID
  ]
})

export class TodoComponent implements OnInit {
  selectedTodo: Todo;
  backup = {};
  todos: Todo[];
  
  constructor(
    private todoService: TodoService,
    private guidGenerator: UUID) {
  }

  ngOnInit(): void {
    this.cancelEdit = this.cancelEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)

    this.todoService.getTodos()
      .then(todos => this.todos = todos);
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
    Object.assign(this.backup, todo);
  }

  cancelEdit(): void {
    Object.assign(this.selectedTodo, this.backup)
    this.selectedTodo = null;
  }

  newTodo(): void {
    this.selectedTodo = {
      id: undefined,
      name: '',
      isCompleted: false
    }
  }

  saveEdit(): void {

    if (this.selectedTodo.id) {
      //Put selectedTodo
    }
    else {
      this.selectedTodo.id = this.guidGenerator.generate();
      this.todos.push(this.selectedTodo);
      // Post selectedTodo 
    }

    this.selectedTodo = null;
  }
}