import { Component, OnInit } from '@angular/core';
import { MOCKPRODUCTLIST } from "../mock-products";
import { FlexLayoutModule } from "@angular/flex-layout";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //newTodoListName = '';
  //todoLists: TodoList[] = [];
  // gets Array of Mock Products from mock-products.ts

  mockProductList = MOCKPRODUCTLIST;
  isUserLoggedIn: boolean;

  constructor(private userService: UserService) { }

  /* // TodoList - CREATE
onListCreate(): void {
 this.httpClient.post(environment.endpointURL + 'todolist', {
   name: this.newTodoListName
 }).subscribe((instance: any) => {
   this.todoLists.push(new TodoList(instance.todoListId, instance.name, []));
   this.newTodoListName = '';
 });
}*/

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    })


    // TodoList - READ
    /* this.httpClient.get(environment.endpointURL + 'todolist').subscribe((instances: any) => {
      this.todoLists = instances.map((instance: any) => {
        const todoItems = instance.todoItems.map((item: any) => new TodoItem(item.todoItemId, item.todoListId, item.name, item.done));

        return new TodoList(instance.todoListId, instance.name, todoItems);
      });
    });*/
  }

  // TodoList - UPDATE
  /*onListUpdate(todoList: TodoList): void {
    this.httpClient.put(environment.endpointURL + 'todolist/' + todoList.listId, {
      name: todoList.name,
    }).subscribe();
  }

  // TodoList - DELETE
  onListDelete(todoList: TodoList): void {
    this.httpClient.delete(environment.endpointURL + 'todolist/' + todoList.listId).subscribe(() => {
      this.todoLists.splice(this.todoLists.indexOf(todoList), 1);
    });
  }*/

}
