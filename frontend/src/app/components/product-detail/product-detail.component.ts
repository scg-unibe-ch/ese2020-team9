import {Component, OnInit} from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';


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
  sellerId: any;
  sellerName = '';
  addressPin = '';
  addressCity = '';
  addressCountry = '';

  product: ProductItem;
  id: any;
  isUserLoggedIn: boolean;
  userName: string;


  picture: any = [];
  image: any;

  constructor(private location: Location,
              private sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar,
              private userService: UserService,
              private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userWallet = this.userService.getUserWallet();
    this.userName = this.userService.getUserName();
    this.getProduct();
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }

  getProduct(){
    this.productService.getProduct(this.id).subscribe((instances: any) => {
          this.productId = instances.productId;
          this.productName = instances.productName;
          this.productDescription = instances.productDescription;
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


          this.picture = [];
          this.productService.getPhotoIds(this.productId).subscribe((photoId: any[]) => {

            for(let id of photoId){
               this.productService.getPhoto(id.imageId).subscribe((blob: any) => {


                     let objectURL = URL.createObjectURL(blob);
                     this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
                     this.picture.push(this.image);


              });
            }

          });


          this.getSeller(this.sellerId);

      },(error: any) => {
        let message = "There is no corresponding product!";
        let action = "X";
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
      let action = "X";
      let message = "There is no corresponding seller!";
      this.openSnackBar(message, action);
    });
  }

  // Check to make sure User has enough Cash to buy product
 checkCash(){
   return (this.userWallet < this.productPrice);
  }

  checkUser(){
    return (this.sellerName === this.userName);
  }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 6000
        });
      }

  goBack(): void {
    this.location.back();
  }
}
