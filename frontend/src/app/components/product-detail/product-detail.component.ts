import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import {environment} from "../../../environments/environment";
import { ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

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
  userId = '';
  userReview = '';
  userAuth = '';


  userName = '';
  addressPin = '';
  addressCity = '';
  addressCountry = '';

  product: ProductItem;
  id: any;
  view: boolean;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService,private productService: ProductService, private route: ActivatedRoute, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.id = this.route.snapshot.paramMap.get('id');
     if(this.id==='0'){
          this.view = true;
        } else{
          this.view=false;
          this.getProduct();
        }

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
          this.userId = instances.userId;
          this.userReview = instances.userReview;
          //this.changeDetection.detectChanges();

      },(error: any) => {
      let message = "There is no corresponding Product!"
      let action = "OK"
      this.openSnackBar(message, action);
      //this.userAuth = 'There is no corresponding Product!';
    });
  }



  getSeller(){
    this.productService.getProduct(this.id).subscribe((instances: any) => {
          this.userId = instances.userId;
          this.userName = instances.userName;
          this.addressPin = instances.addressPin;
          this.addressCity = instances.addressCity;
          this.addressCountry = instances.addressCountry;



      },(error: any) => {
      let message = "There is no corresponding User!"
      let action = "OK"
      this.openSnackBar(message, action);
    });
  }

  buyProduct(){
    let message = "Buying not implemented yet"
    let action = "OK"
    this.openSnackBar(message, action);

  }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
      }



}
