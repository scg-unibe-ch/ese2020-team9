import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ProductItem} from "../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userId: any;
  userName: string;

  category = 'food';
  productId = 4;

  productList: ProductItem[];
  productItem: ProductItem[];
  productLIstCategory: ProductItem[];

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.userName = this.userService.getUserName();
    this.getProductList();

  }

  // products - GET
  getProductList(){
    this.productService.getAll().subscribe((data: ProductItem[]) => {
      this.productList = data;
    });
  }

  /*
    getProductUser(){
     this.productService.getAllProductUser().subscribe((data: ProductItem[]) => {
        this.productList = data;
      });
    }*/


  getProductId(){
    this.productService.getProduct(this.productId).subscribe((data: ProductItem[]) => {
      this.productItem = data;
    });
  }
  getAllCategory(){
    this.productService.getAllCategory(this.category).subscribe((data: ProductItem[]) => {
      this.productLIstCategory = data;
    });
  }
}
