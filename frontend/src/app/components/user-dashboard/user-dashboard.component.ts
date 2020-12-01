import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

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

  image: any;

  constructor(private sanitizer : DomSanitizer, private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.getUser();
    this.getProductUser();
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

       },(error: any) => {
         let action = "X";
         this.openSnackBar(error.message, action);
     });
   }

  // products - get all products of user
  getProductUser(){
     this.productService.getUserProduct(this.userId).subscribe((data: ProductItem[]) => {
        this.productList = data;
        for (let productItem of this.productList){
                productItem.picture = [];
                this.productService.getPhotoIds(productItem.productId).subscribe((photoId: any[]) => {

                  for(let id of photoId){
                     this.productService.getPhoto(id.imageId).subscribe((blob: any) => {

                           //console.log(blob)

                           let objectURL = URL.createObjectURL(blob);
                           this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
                           //console.log(this.image,"img")
                           productItem.picture.push(this.image);
                           //console.log(productItem.picture, "objectURL");


                    });
                  }

                });

              }
     });
  }

  deleteProduct(product: ProductItem): void {
    this.productService.deleteProduct(product).subscribe((res: any) => {
      //removes product from productList
      this.productList = this.productList.filter(item => item !== product);
      let action = "X";
      this.openSnackBar(res.message, action);
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
