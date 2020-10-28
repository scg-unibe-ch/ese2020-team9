import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductItem } from '../models/product-item.model';
import { User } from '../models/user.model';
import { ProductService } from "../services/product.service";
import {UserService} from "../services/user.service";
import { AuthInterceptor } from '../auth/auth.interceptor';



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
 users: User[] ;
 productList: ProductItem[];

  constructor(private httpClient: HttpClient, private productService: ProductService, private userService: UserService) {}

  ngOnInit(): void {
    this.getProductList();
    this.userToken = this.userService.getToken()
    //console.log(this.userToken)

  }

  getUserList(){
    this.httpClient.get(environment.endpointURL + 'user').subscribe((instances: any) => {
        this.users = instances.map((instance: any) => new User(instance.userId, instance.userName, instance.admin));
    });
  }

  // user - DELETE
  onUserDelete(user: User): void{
    this.httpClient.delete(environment.endpointURL + 'user/' + user.userId).subscribe(() => {
      this.users.splice(this.users.indexOf(user), 1);
    });
  }

     // user - UPDATE (upgrade to admin)
  onUserUpdate(user: User): void{
    this.httpClient.put(environment.endpointURL + 'user/makeAdmin/' + user.userId, {
      admin: user.admin,
    }).subscribe();
  }

  // products - GET
  getProductList(){
    this.productService.getAllUnapproved().subscribe((data: ProductItem [] ) => {
      this.productList = data;
    });
  }

  // product approve
  approveProduct(productId: number){
   this.httpClient.put(environment.endpointURL + 'products/approve/' + 4,{

    }).subscribe();
  }

  // product delete
  deleteProduct(productId: number){
   this.httpClient.delete(environment.endpointURL + 'products/' + productId,{}).subscribe();
  }



  // products - PUT

}
