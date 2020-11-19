import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductItem } from '../../models/product-item.model';
import { User } from "../../models/user.model";
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

  onUserDelete(user: User): void{
    this.httpClient.delete(environment.endpointURL + 'user/' + user.userId).subscribe(() => {
      this.userList.splice(this.userList.indexOf(user), 1); //delete one user
    });
  }

  // user - UPDATE (upgrade to admin)
  onUserUpdate(user: User): void{
    this.httpClient.put(environment.endpointURL + 'user/makeAdmin/' + user.userId, {
      admin: user.admin,
    }).subscribe();
  }

  // products - get all Unapproved ProductItems
  getProductList(){
    this.productService.getAllUnapproved().subscribe((data: ProductItem [] ) => {
      this.productList = data;
    });
  }

  approveProduct(productId: number){
   this.httpClient.put(environment.endpointURL + 'products/approve/' + productId,{

    }).subscribe((res: any)  => {
            this.getProductList();
             let message = "Product approved";
             let action = "Ok";
             this.openSnackBar(message, action);
           }, (error: any) => {
             let message = "Can not delete this Product";
             let action = "";
             this.openSnackBar(message, action);
           });
  }

  deleteProduct(){
   this.productService.deleteProduct(this.productId).subscribe((res: any)  => {
          this.getProductList();
          let message = "Product deleted"
          let action = "Ok"
          this.openSnackBar(message, action);
        }, (error: any) => {
          let message = "Can not delete this Product"
          let action = ""
          this.openSnackBar(message, action);
        });
  }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
      }
}
