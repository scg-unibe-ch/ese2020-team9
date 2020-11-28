import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../../models/product-item.model';
import { User} from "../../models/user.model";
import { ProductService } from "../../services/product.service";
import { UserService } from "../../services/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private productService: ProductService, private userService: UserService) {}

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
    this.productService.getAllUnapproved().subscribe((data: ProductItem [] ) => {
      this.productList = data;
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
          duration: 3000
        });
      }
}
