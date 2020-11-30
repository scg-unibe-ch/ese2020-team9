import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductItem } from "../../models/product-item.model";
import { ProductService } from "../../services/product.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList: ProductItem [];
  isUserLoggedIn: boolean;
  image: any;

  constructor(private sanitizer : DomSanitizer, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });

    this.getProductList();
  }

  getProductList(){
    this.productService.getAllApproved().subscribe((data: ProductItem []) => {
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



}
