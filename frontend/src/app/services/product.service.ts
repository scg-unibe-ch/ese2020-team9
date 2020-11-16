import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ProductItem} from "../models/product-item.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  //get all Products
  getAll(){
    return this.httpClient.get(environment.endpointURL + 'products');
  }

  //get all Products that are approved
  getAllApproved(){
    return this.httpClient.get(environment.endpointURL + 'products/approved');
  }


  //get all Products that are not approved
  getAllUnapproved() {
    return this.httpClient.get(environment.endpointURL + 'products/unapproved');
  }


  //get all Products from a Category
  getAllCategory(category: string) {
    return this.httpClient.get(environment.endpointURL + 'products/category/'+ category);
  }

  //get a specific Product
  getProduct(productId: number) {
    return this.httpClient.get(environment.endpointURL + 'products/' + productId);
  }

  //get all Products from the same user -> not implemented
  getUserProduct(userId: number) {
    return this.httpClient.get(environment.endpointURL + 'products/user/' + userId);
  }

  //get all Products from the same user -> not implemented
  buyProduct(productId: number) {
    return this.httpClient.get(environment.endpointURL + 'products/buy/' + productId);
  }

}
