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

    sellerName: string;
    sellerFirstName: string;
    sellerLastName: string;
    id: number;


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


  getSeller(id:number){
      console.log(this.id);
      this.userService.getUser(this.id).subscribe((instances: any) => {
         //this.sellerId = instances.userId;
         this.sellerName = instances.userName;
         this.sellerFirstName = instances.firstName;
         this.sellerLastName = instances.lastName;


       },(error: any) => {
         let action = "";
         let message = "There is no corresponding User!";
         this.openSnackBar(message, action);
     });
   }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
  }


}
