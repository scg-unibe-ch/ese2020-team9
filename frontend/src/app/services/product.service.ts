import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }


  /** Product List Requests   **/
  //get all Products
  getAll(){
    return this.httpClient.get(environment.endpointURL + 'products');
  }

  //get all Products that are approved
  getAllApproved(){
    return this.httpClient.get(environment.endpointURL + 'products/approved');
  }


  //get all not Products that are not approved
  getAllUnapproved() {
    return this.httpClient.get(environment.endpointURL + 'products/unapproved');
  }


  //get all Products from a Category
  getAllCategory(category: string) {
    return this.httpClient.get(environment.endpointURL + 'products/category/'+ category);
  }

  //get a specific Products
  getProduct(productId: number) {
    return this.httpClient.get(environment.endpointURL + 'products/' + productId);
  }

  //get all Products from the same user -> not implemented
  getUserProduct(userId: number) {
    return this.httpClient.get(environment.endpointURL + 'products/user/' + userId);
  }


}
