import { Component, OnInit } from '@angular/core';

import { TodoService } from './services/todo.service';
import { Todo } from './models/Todo';

@Component({
    selector: "completed",
    template: `
     <ul class="todolist">
       <li *ngFor="let todo of todos">
         <div>
           {{todo.name}} 
           <input type="checkbox" disabled [attr.checked]="todo.isCompleted ? true : null" />
        </div>
      </li>
    </ul>
`
})

export class CompletedComponent implements OnInit {
    todos: Todo[];

    constructor(private todoService: TodoService) {
    }

    ngOnInit(): void {
        var items = [];

        this.todoService.getTodos().then(todos => {

            todos.forEach(x => {
                if (x.isCompleted) {
                    items.push(x);
                }
            });
        });

        this.todos = items;
    }
}