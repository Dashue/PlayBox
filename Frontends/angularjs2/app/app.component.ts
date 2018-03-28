import { Component } from '@angular/core';

@Component({
    selector: "my-app",
    template: `
      <h1>{{title}}</h1>
      <nav>
        <a routerLink="/dashboard">Home</a>
        <a routerLink="/todos">Todo List</a>
        <a routerLink="/completed">Completed</a>
      </nav>
      <hr/>
      <br/>
      <div>
        <router-outlet></router-outlet>
      </div>
    `
})

export class AppComponent {
    title = "Todo List";
}