import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ProductItem} from "../../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../services/product.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-boughtproducts',
  templateUrl: './boughtproducts.component.html',
  styleUrls: ['./boughtproducts.component.css']
})
export class BoughtproductsComponent implements OnInit {

    userId: any;
    userName: string;
    productList: ProductItem[];

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
      this.userId = this.userService.getUserId();
      this.getProductUser();

  }


  // products - get all products of user
  getProductUser(){
     this.productService.getUserProduct(this.userId).subscribe((data: ProductItem[]) => {
        this.productList = data;
     });
  }


}
