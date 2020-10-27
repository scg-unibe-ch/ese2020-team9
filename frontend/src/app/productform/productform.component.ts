import {Component, NgZone, OnInit} from '@angular/core';
import {ProductItem} from "../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {ProductService} from "../services/product.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {

  isLoggedIn = '';
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
  userId = '';
  //userName = '';
  userReview = '';
  userAuth = '';

  product: ProductItem [];

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService, private _ngZone: NgZone, private productService: ProductService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    //this.isLoggedIn = this.userService.getIsLoggedIn();
    //this.userName = this.userService.getUserName();
  }
  addProduct(): void {
    this.httpClient.post(environment.endpointURL + 'products/', {
      productName: this.productName,
      productDescription: this.productDescription,
      productImage: this.productImage,
      productPrice: this.productPrice,
      productCategory: this.productCategory,
      productLocation: this.productLocation,
      productDelivery: this.productDelivery,
      uploadDate:    new Date(),
      sellDate: '',
      isApproved: false,
      isService: this.isService,
      isRentable: this.isRentable,
      isAvailable: true,
      userId: this.userId,
      //userReview: this.userReview,



    }).subscribe((res: any) => {

      //navigates to dashboard
      this.router.navigate(['/user'])
    }, (error: any) => {
      this.userAuth = 'Your Product could not be added!';
    });
  }

  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe((data: ProductItem[]) => {
      this.product = data;
    }, (error: any) => {
      this.userAuth = 'There is no corresponding Product!';
    });
  }


  editProduct(): void {
    this.httpClient.put(environment.endpointURL + '/productId', {
      productName: this.productName,
      productDescription: this.productDescription,
      productImage: this.productImage,
      productPrice: this.productPrice,
      productCategory: this.productCategory,
      productLocation: this.productLocation,
      productDelivery: this.productDelivery,
      uploadDate: this.uploadDate,
      sellDate: this.sellDate,
      isApproved: this.isApproved,
      isService: this.isService,
      isRentable: this.isRentable,
      isAvailable: this.isAvailable,
      userId: this.userId,
      //userReview: this.userReview,

    }).subscribe((res: any) => {

      //navigates to productItem
      //this.router.navigate(['/'])
    }, (error: any) => {
      this.userAuth = 'Your Product Information is invalid!';
    });

  }

  //check if field is empty
  empty(input):boolean{
    if (input === "") return true;
    else return false
  }

  allFieldsAreFilled():boolean{
    return true;
  }
}
