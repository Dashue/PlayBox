import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {
    twoTodos = [];
    constructor(private todoService: TodoService) {
    }

    ngOnInit(): void {
        var i = 0;
        this.todoService.getTodos().then(items => {

            items.forEach(element => {
                if (i < 2) {
                    this.twoTodos.push(element);
                    i++;
                }
            });

            console.log(this.twoTodos)
        })
    }
}