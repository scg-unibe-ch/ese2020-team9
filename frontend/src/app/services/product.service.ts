import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ProductItem } from "../models/product-item.model";
import {Observable} from "rxjs";
import {Search} from "../models/search.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  /** post requests **/
  //should be used in productForm
  addProduct(product: ProductItem): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'products/',   product);
  }

  //should be used in productDisplay
  searchProduct(search: Search): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'products/search/', search);
  }

  /** put requests **/
  approveProduct(product: ProductItem): Observable<ProductItem> {
    return this.httpClient.put<ProductItem>(environment.endpointURL + 'products/approve/' + product.productId, product);
  }

  //should be used in productForm
  editProduct(product: ProductItem): Observable<ProductItem> {
    return this.httpClient.put<ProductItem>(environment.endpointURL + 'products/' + product.productId, product);
  }
  /** delete requests **/
  deleteProduct(product: ProductItem): Observable<ProductItem> {
    return this.httpClient.delete<ProductItem>(environment.endpointURL + 'products/' + product.productId);
  }

  /** get requests **/
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

  //get all Products from the same user
  getUserProduct(userId: number) {
    return this.httpClient.get(environment.endpointURL + 'products/user/' + userId);
  }

  //get products a user bought
  getBoughtProducts(userId: number) {
    return this.httpClient.get(environment.endpointURL + 'transaction/buy/  ' + userId);
  }

 //get products a user sold
  getSoldProducts(userId: number) {
   return this.httpClient.get(environment.endpointURL + 'transaction/sell/' + userId);
 }


  //
  buyProduct(productId: number) {
    return this.httpClient.get(environment.endpointURL + 'products/' + productId);
  }

  getPhotoIds(productId: number){
      return this.httpClient.get(environment.endpointURL + 'products/images/getIds/' + productId);
  }

  getPhoto(photoId: number){
      return this.httpClient.get(environment.endpointURL + 'products/images/getById/' + photoId,{responseType:"blob"});
  }
}
