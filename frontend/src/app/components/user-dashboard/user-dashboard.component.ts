import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userId: any;
  userName: string;
  productList: ProductItem[];
  userFirstName: string;
  userLastName: string;
  userAddressPin: any;
  userAddressStreet: string;
  userAddressCity: string;
  userAddressCountry: string;
  userWallet: number;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.getUser();
    this.getProductUser();
    this.userService.actualWallet.subscribe(value => {
      this.userWallet = value;
    });
  }


  getUser(){
      this.userService.getUser(this.userId).subscribe((instances: any) => {
         //this.sellerId = instances.userId;
         this.userName = instances.userName;
         this.userFirstName = instances.firstName;
         this.userLastName = instances.lastName;
         this.userAddressPin = instances.addressPin;
         this.userAddressStreet = instances.addressStreet;
         this.userAddressCity = instances.addressCity;
         this.userAddressCountry = instances.addressCountry;
         this.userWallet = instances.wallet;
         //this.userService.actualWallet.next(instances.wallet);
        // this.userService.actualWallet.next(7);

       },(error: any) => {
         let action = "";
         let message = "There is no corresponding User!";
         this.openSnackBar(message, action);
     });
   }

  // products - get all products of user
  getProductUser(){
     this.productService.getUserProduct(this.userId).subscribe((data: ProductItem[]) => {
        this.productList = data;
     });
  }

  deleteProduct(product: ProductItem): void {
    this.productService.deleteProduct(product).subscribe((res: any) => {
      //removes product from productList
      this.productList = this.productList.filter(item => item !== product);
      let message = "Product successfully deleted!";
      let action = "X";
      this.openSnackBar(message, action);
      }, (error: any) => {
      let message = "Can not delete this Product!";
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
