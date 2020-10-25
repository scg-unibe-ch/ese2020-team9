import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {
  productId = '';
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
  userName = '';
  userReview = '';
  userAuth = '';

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  addProduct(): void {
        this.httpClient.post(environment.endpointURL + 'user/register', {
          //productId: this.productId,
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

              //navigates to dashboard
              this.router.navigate(['/home'])
             }, (error: any) => {
              this.userAuth = 'Your Product Information is invalid!';
        });
      }

   //check if field is empty
    empty(input):boolean{
        if (input === "") return true;
        else return false
      }
}
