import { Component, Input } from '@angular/core';
import { Todo } from './models/todo';

@Component({
    selector: 'todo-edit',
    template: `<fieldset>
    <h2>Details</h2>
    <div>
      id: {{item.id}}
      <input [(ngModel)]="item.name" placeholder="name" />
      <label>completed: </label>
      <input type="checkbox" [(ngModel)]="item.isCompleted" />
    </div>
    <input type="button" (click)="cancel(item)" value="Cancel" />
    <input type="button" (click)="save(item)" value="Save" />
  </fieldset>`
})

export class TodoEditComponent {
    @Input() item: Todo;
    @Input() cancel: Function;
    @Input() save: Function;
}