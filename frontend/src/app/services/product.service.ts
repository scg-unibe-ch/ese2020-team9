import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductList } from "../models/product-list.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductList(){
    return this.httpClient.get<ProductList>(environment.endpointURL + 'product');
  }
}
