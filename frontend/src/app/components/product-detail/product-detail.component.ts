import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Location } from "@angular/common";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  productName = '';
  productDescription = '';
  productImage = '';
  productPrice = '';
  productCategory = '';
  productLocation = '';
  productDelivery = '';
  uploadDate= '';
  sellDate = '';
  isApproved = '';
  isService = '';
  isRentable = '';
  isAvailable = '';

  userReview = '';
  userWallet: any;
  userLoggedIn: boolean;


  sellerId: any;
  sellerName = '';
  addressPin = '';
  addressCity = '';
  addressCountry = '';

  product: ProductItem;
  id: any;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService,private productService: ProductService, private route: ActivatedRoute, private changeDetection: ChangeDetectorRef, private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userWallet = this.userService.getUserWallet();
    this.userService.isUserLoggedIn.subscribe(value => {
      this.userLoggedIn = value;
    });
    this.getProduct();
    //this.userId = this.userService.getUserId();
  }

  getProduct(){
    this.productService.getProduct(this.id).subscribe((instances: any) => {
          this.productId = instances.productId;
          this.productName = instances.productName;
          this.productDescription = instances.productDescription;
          this.productImage = instances.productImage;
          this.productPrice = instances.productPrice;
          this.productCategory = instances.productCategory;
          this.productLocation = instances.productLocation;
          this.productDelivery = instances.productDelivery;
          this.uploadDate = instances.uploadDate;
          this.sellDate = instances.sellDate;
          this.isApproved = instances.isApproved;
          this.isService = instances.isService;
          this.isRentable = instances.isRentable;
          this.isAvailable = instances.isAvailable;
          this.sellerId = instances.userId;
          this.userReview = instances.userReview;

          this.getSeller(this.sellerId);
      console.log(this.isAvailable);
      },(error: any) => {
        let message = "There is no corresponding Product!";
        let action = "OK";
        this.openSnackBar(message, action);
    });
  }



  getSeller(sellerId: number){
    this.userService.getUser(this.sellerId).subscribe((instances: any) => {
          //this.sellerId = instances.userId;
          this.sellerName = instances.userName;
          this.addressPin = instances.addressPin;
          this.addressCity = instances.addressCity;
          this.addressCountry = instances.addressCountry;

      },(error: any) => {
      let action = "";
      let message = "There is no corresponding Seller!";
      this.openSnackBar(message, action);
    });
  }

  // Check to make sure User has enough Cash to buy product
 checkCash(){
    return (this.userWallet < this.productPrice);
  }


  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
      }
  goBack(): void {
    this.location.back();
  }


}
