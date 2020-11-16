import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductItem } from "../../models/product-item.model";
import { ProductService } from "../../services/product.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList: ProductItem [];
  isUserLoggedIn: boolean;

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });

    this.getProductList();
  }

  getProductList(){
    this.productService.getAllApproved().subscribe((data: ProductItem []) => {
      this.productList = data;
    });
  }
}
