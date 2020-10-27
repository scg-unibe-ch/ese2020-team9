import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stor';

  constructor() {}

  ngOnInit(): void {

  }

  // TodoList - READ inside ngOnInit
  /* this.httpClient.get(environment.endpointURL + 'todolist').subscribe((instances: any) => {
    this.todoLists = instances.map((instance: any) => {
      const todoItems = instance.todoItems.map((item: any) => new TodoItem(item.todoItemId, item.todoListId, item.name, item.done));
      return new TodoList(instance.todoListId, instance.name, todoItems);
    });
  });*/

  /* // TodoList - CREATE
    onListCreate(): void {
    this.httpClient.post(environment.endpointURL + 'todolist', {
      name: this.newTodoListName
    }).subscribe((instance: any) => {
      this.todoLists.push(new TodoList(instance.todoListId, instance.name, []));
      this.newTodoListName = '';
    });
    }*/
}
