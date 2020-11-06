import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userId: any;
  userName: string;
  productList: ProductItem[];

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.userName = this.userService.getUserName();
    this.getProductUser();

  }

  // products - get all products of user
  getProductUser(){
     this.productService.getUserProduct(this.userId).subscribe((data: ProductItem[]) => {
        this.productList = data;
     });
  }

  deleteProduct(productId: number){
    this.httpClient.delete(environment.endpointURL + 'products/' + productId,{}).subscribe((res: any)
    => {

          //navigates to productItem
          this.router.navigate(['/user'])
          let message = "Product deleted"
          let action = "Ok"
          this.openSnackBar(message, action);
        }, (error: any) => {
          let message = "Can not delete this Product"
          let action = ""
          this.openSnackBar(message, action);
          //this.userAuth = 'Your Product Information is invalid!';
        });
  }

  trackByFn(index, item){
    return item.id;
  }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
      }

}
