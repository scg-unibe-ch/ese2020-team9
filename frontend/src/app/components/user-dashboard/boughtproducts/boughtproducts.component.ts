import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ProductItem} from "../../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../services/product.service";
import {environment} from "../../../../environments/environment";
import {Transaction} from "../../../models/transaction.model";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-boughtproducts',
  templateUrl: './boughtproducts.component.html',
  styleUrls: ['./boughtproducts.component.css']
})
export class BoughtproductsComponent implements OnInit {

    userId: any;
    userName: string;
    transactionList: Transaction[];

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
      this.userId = this.userService.getUserId();
      this.getBoughtProducts();

  }


  // products - get all products of user
  getBoughtProducts(){
     this.productService.getBoughtProducts(this.userId).subscribe((data: Transaction[]) => {
        this.transactionList = data;
     });
  }


}
