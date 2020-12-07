import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../../models/product-item.model';
import { User} from "../../models/user.model";
import { ProductService } from "../../services/product.service";
import { UserService } from "../../services/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

 admin: any;
 userName :any;
 userId: any;
 userToken: string;
 productId: any;
 userList: User[] ;
 productList: ProductItem[];
 image: any;


  constructor(private sanitizer : DomSanitizer, private _snackBar: MatSnackBar, private httpClient: HttpClient, private productService: ProductService, private userService: UserService) {}

  ngOnInit(): void {
    this.getProductList();
    this.getUserList();
    this.userToken = this.userService.getToken();

  }
  getUserList(){
    this.userService.getUserList().subscribe((data: User [] ) => {
      this.userList = data;
    });
  }

  // user - delete user
  deleteUser(user: User): void{
    this.userService.deleteUser(user).subscribe((res: any) => {
      this.userList.splice(this.userList.indexOf(user), 1);//delete one user
      let action = "X";
      this.openSnackBar(res.message, action);
    }, (error => {
      let action = "X";
      this.openSnackBar(error.message, action);
    }));
  }

  // user - upgrade to admin
  upgradeUser(user: User): void{
    this.userService.upgradeUser(user.userId, user.admin).subscribe((res: any)  => {
      // updates admin value for user
      let message = "User has been successfully upgraded to admin!";
      let action = "X";
      this.openSnackBar(message, action);
      }, (error: any) => {
      let action = "X";
      this.openSnackBar(error.message, action);
    });
  }

  // products - get all Unapproved ProductItems
  getProductList(){
    this.productService.getAllUnapproved().subscribe((data: ProductItem []) => {
      this.productList = data;
      for (let productItem of this.productList){
        productItem.picture = [];
        this.productService.getPhotoIds(productItem.productId).subscribe((photoId: any[]) => {

          for(let id of photoId){
             this.productService.getPhoto(id.imageId).subscribe((blob: any) => {


                   let objectURL = URL.createObjectURL(blob);
                   this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
                   productItem.picture.push(this.image);


            });
          }

        });

      }
    });
  }

  approveProduct(product: ProductItem){
    this.productService.approveProduct(product).subscribe((res: any)  => {
      //removes product from productList
      this.productList = this.productList.filter(item => item !== product);
      let action = "X";
      this.openSnackBar(res.message, action);
    }, (error: any) => {
      let action = "X";
      this.openSnackBar(error.message, action);
    });
  }

  deleteProduct(product: ProductItem): void {
    this.productService.deleteProduct(product).subscribe((res: any)  => {
      //removes product from productList
      this.productList = this.productList.filter(item => item !== product);
      let action = "X";
      this.openSnackBar(res.message, action);
    }, (error: any) => {
      let message = "Can not delete this product!";
      let action = "X";
      this.openSnackBar(message, action);
    });
  }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 6000
        });
      }
}
