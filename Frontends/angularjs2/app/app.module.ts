import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo.component';
import { TodoEditComponent } from './todo-edit.component';
import { CompletedComponent } from './completed.component';
import { DashboardComponent } from './dashboard.component';

import { TodoService } from './services/todo.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'todos',
                component: TodoComponent
            },
            {
                path: 'completed',
                component: CompletedComponent
            }
        ])
    ],
    declarations: [
        AppComponent,
        TodoComponent,
        TodoEditComponent,
        CompletedComponent,
        DashboardComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        TodoService

    ]
})


export class AppModule { }