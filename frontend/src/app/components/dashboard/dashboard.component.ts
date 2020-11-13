import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductItem } from "../../models/product-item.model";
import { ProductService } from "../../services/product.service";
import {environment} from "../../../environments/environment";
import {Search} from "../../models/search.model";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList: ProductItem [];
  searchList: ProductItem[];
  isUserLoggedIn: boolean;

  constructor(private httpClient: HttpClient, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.getProductList();
  }

  searchProduct(event){
    this.httpClient.post(environment.endpointURL + 'products/search/', {
      name: event.name,
      location: event.location,
      priceMin: event.priceMin,
      priceMax: event.priceMax,
      delivery: event.delivery,
      available: event.available,
    }).subscribe((data: ProductItem[]) => {
      this.searchList = data;
      console.log('Hello')
    }, (error: any) => {
      return 'Could not Search';
    });
  }

  getProductList(){
    this.productService.getAllApproved().subscribe((data: ProductItem []) => {
      this.productList = data;
    });
  }
}
