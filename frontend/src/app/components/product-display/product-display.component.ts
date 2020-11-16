import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Search} from "../../models/search.model";
import { switchMap } from "rxjs/operators";
import {any} from "codelyzer/util/function";
import { CategoryList } from "../../mock-category-list";

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  name: string;
  category: string;
  location: string;
  priceMin: string;
  priceMax: string;
  delivery: string;
  available: string;
  test: any;

  productList: ProductItem[];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['n'];
      this.test = params['c'];
      this.location = params['l'];
      this.priceMin = params['min'];
      this.priceMax = params['max'];
      this.delivery = params['d'];
      this.available = params['a'];
      if(params["c"]){
        this.category = this.test;
      }
      this.searchProduct();
    });
  }

  searchProduct(){
    this.httpClient.post(environment.endpointURL + 'products/search/', {
      name: this.name,
      category: this.category,
      location: this.location,
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      delivery: this.delivery,
    }).subscribe((data: ProductItem[]) => {
      this.productList = data;
    }, (error: any) => {
      return 'Could not Search';
    });
  }
/*
  searchProduct(event){
    this.httpClient.post(environment.endpointURL + 'products/search/', {
      name: event.name,
      location: event.location,
      priceMin: event.priceMin,
      priceMax: event.priceMax,
      delivery: event.delivery,
      available: event.available,
    }).subscribe((data: ProductItem[]) => {
      this.productList = data;
    }, (error: any) => {
      return 'Could not Search';
    });
  }*/
}
