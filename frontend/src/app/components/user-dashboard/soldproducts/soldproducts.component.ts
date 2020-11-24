import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../services/product.service";
import {Transaction} from "../../../models/transaction.model";
import {MatSnackBar} from '@angular/material/snack-bar';
import {TransactionService} from "../../../services/transaction.service";


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

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private userService: UserService, private productService: ProductService, private transactionService: TransactionService) { }

  ngOnInit(): void {
      this.userId = this.userService.getUserId();
      this.getSoldProducts();
  }

  getSoldProducts(){
     this.productService.getSoldProducts(this.userId).subscribe((data: Transaction[]) => {
        this.transactionList = data;
     });
  }

  sellProduct(transaction: Transaction){
   this.transactionService.sellProduct(transaction).subscribe((res: any) => {
        //navigates to productItem
        let message = "You sold the product!";
        let action = "X";
        this.openSnackBar(message, action);
        this.getSoldProducts();

      }, (error: any) => {
        let message = "The Buyer does not have enough money!";
        let action = "X";
        this.openSnackBar(message, action);
      });
    }

   declineProduct(transaction: Transaction): void {
     this.transactionService.declineProduct(transaction).subscribe((res: any) => {
           //navigates to productItem
           let message = "You declined the transaction!";
           let action = "X";
           this.openSnackBar(message, action);

         }, (error: any) => {
           let message = "Error";
           let action = "X";
           this.openSnackBar(message, action);
         });

       }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
      }


}
