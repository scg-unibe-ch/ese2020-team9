import { ProductItem } from './product-item.model';

export class ProductList {

  constructor(
    public listId: number,
    public name: string,
    public productItems: ProductItem[]
  ) {}
}
