import { Injectable } from '@angular/core';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [
    { id: "1", name: 'Dishes', isCompleted: false },
    { id: "2", name: 'Washes', isCompleted: true },
    { id: "3", name: 'Shopping', isCompleted: false },
];

@Injectable()
export class TodoService {

    getTodos(): Promise<Todo[]> {
        return Promise.resolve(TODOS);
    }
}