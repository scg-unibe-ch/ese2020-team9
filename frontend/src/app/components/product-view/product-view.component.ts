import { Component, OnInit } from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  productList: ProductItem[];

  id: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  getAllCategory(){
    this.productService.getAllCategory(this.id).subscribe((data: ProductItem []) => {
      this.productList = data;
    });
  }
}
