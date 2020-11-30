import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../services/product.service";
import {Transaction} from "../../../models/transaction.model";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-boughtproducts',
  templateUrl: './boughtproducts.component.html',
  styleUrls: ['./boughtproducts.component.css']
})
export class BoughtproductsComponent implements OnInit {

    userId: any;
    userName: string;
    transactionList: Transaction[];

    sellerId:number;
    sellerName: string;
    sellerFirstName: string;
    sellerLastName: string;
    productName: string;
    buyerName: string;
    id: number;

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
      this.userId = this.userService.getUserId();
      this.getBoughtProducts();
      this.onCreate.emit();
  }


  // products - get all products of user
  getBoughtProducts(){
     this.productService.getBoughtProducts(this.userId).subscribe((data: Transaction[]) => {
        this.transactionList = data;

     });
  }




  getSeller(id:number){
      this.userService.getUser(id).subscribe((instances: any) => {
         this.sellerId = instances.userId;
         this.sellerName = instances.userName;
         this.sellerFirstName = instances.firstName;
         this.sellerLastName = instances.lastName;
       },(error: any) => {
     });
   }

   getBuyer(uid:number){
         this.userService.getUser(uid).subscribe((instances: any) => {
            //this.sellerId = instances.userId;
            this.buyerName = instances.userName;
          },(error: any) => {
         });
      }


  getProduct(pid:number){
    this.productService.getProduct(pid).subscribe((instances: any) => {
          this.productName = instances.productName;
      },(error: any) => {
    });
  }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
  }

}
