import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ProductItem} from "../../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../services/product.service";
import {environment} from "../../../../environments/environment";
import {Transaction} from "../../../models/transaction.model";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-soldproducts',
  templateUrl: './soldproducts.component.html',
  styleUrls: ['./soldproducts.component.css']
})
export class SoldproductsComponent implements OnInit {

    userId: any;
    userName: string;
    transactionId: number;

    transactionList: Transaction[];

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
      this.userId = this.userService.getUserId();
      this.getSoldProducts();

  }


  //
  getSoldProducts(){

     this.productService.getSoldProducts(this.userId).subscribe((data: Transaction[]) => {
        this.transactionList = data;
     });
  }


  sell(transactionId: number){
   this.httpClient.put(environment.endpointURL + 'transaction/confirm/' + transactionId, {}).subscribe((res: any) => {

        //navigates to productItem
        let message = "You sold the product"
        let action = "OK";
        this.openSnackBar(message, action);
        this.getSoldProducts();

      }, (error: any) => {
        let message = "The Buyer does not have enough money";
        let action = "OK";
        this.openSnackBar(message, action);
      });
    }

   decline(transactionId: number){
      this.httpClient.put(environment.endpointURL + 'transaction/decline/' + transactionId, {}).subscribe((res: any) => {

           //navigates to productItem
           let message = "You declined the transaction"
           let action = "OK";
           this.openSnackBar(message, action);

         }, (error: any) => {
           let message = "Error";
           let action = "OK";
           this.openSnackBar(message, action);
         });

       }


  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
      }


}
