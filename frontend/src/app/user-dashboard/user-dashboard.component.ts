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

  productList: ProductItem[];

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.userName = this.userService.getUserName();
    this.getProductUser();

  }

  // products - GET
  getProductUser(){
     this.productService.getUserProduct(this.userId).subscribe((data: ProductItem[]) => {
        this.productList = data;
      });
    }
}
