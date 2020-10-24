import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductList } from '../models/product-list.model';
import { ProductItem } from '../models/product-item.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  userToken: string;

  @Input()
  productList: ProductList = new ProductList(null, '', []);

  @Output()
  update = new EventEmitter<ProductList>();

  @Output()
  delete = new EventEmitter<ProductList>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

   /*todo
   different get methods by service
   get products by user
   get products by category
   get products not approved yet
   etc

   buy
   edit
   delete
   approve
   */

  onListUpdate(): void {
    // Emits event to parent component that TodoList got updated
    this.update.emit(this.productList);
  }

  onListDelete(): void {
    // Emits event to parent component that TodoList got updated
    this.delete.emit(this.productList);
  }

  // ProductItem - CREATE
  onProductItemCreate(): void {
  /*
    this.httpClient.post(environment.endpointURL + 'todoitem', {
      name: this.newTodoItemName,
      done: false,
      todoListId: this.todoList.listId
    }).subscribe((item: any) => {
      this.todoList.todoItems.push(new TodoItem(item.todoItemId, item.todoListId, item.name, item.done));
      this.newTodoItemName = '';
    });
  */
  }

  // ProductItem - READ
  // Not required since all ProductItems of a ProductList are provided with the list itself

  // ProductItem - UPDATE
  onProductItemUpdate(productItem: ProductItem): void{
    /*
    this.httpClient.put(environment.endpointURL + 'todoitem/' + todoItem.itemId, {
      name: todoItem.name,
      done: todoItem.done,
      todoListId: todoItem.listId
    }).subscribe();
    */
  }

  // ProductItem - DELETE
  onProductItemDelete(productItem: ProductItem): void{
  /*
    this.httpClient.delete(environment.endpointURL + 'todoitem/' + todoItem.itemId).subscribe(() => {
      this.todoList.todoItems.splice(this.todoList.todoItems.indexOf(todoItem), 1);
    });
  }
  */
  }


}
