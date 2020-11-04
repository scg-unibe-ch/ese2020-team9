import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductItem } from "../../models/product-item.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input()
  productItem: ProductItem = new ProductItem(null, '', '', null, null, '', '', null, null, null, null, null, null, null, null, '');

  @Output()
  update = new EventEmitter<ProductItem>();

  @Output()
  delete = new EventEmitter<ProductItem>();



  constructor() { }

  ngOnInit(): void {
  }

 onItemUpdate(): void {
    // Emits event to parent component that TodoItem got updated
    this.update.emit(this.productItem);
  }

  onItemDelete(): void {
    // Emits event to parent component that TodoItem got deleted
    this.delete.emit(this.productItem);
  }

}
