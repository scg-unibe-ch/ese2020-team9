import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Search} from "../../models/search.model";
import { switchMap } from "rxjs/operators";
import {any} from "codelyzer/util/function";
import { CategoryList } from "../../category-list";

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  name= '';
  category= '';
  location= '';
  priceMin: any = '';
  priceMax: any = '';
  delivery: any = '';
  available = true;
  isService: any = '';
  isRentable: any = '';

  search: Search;
  productList: ProductItem[];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['n'];
      this.category = params['c'];
      this.location = params['l'];
      this.priceMin = params['min'];
      this.priceMax = params['max'];
      this.delivery = params['d'];
      this.isRentable = params['r'];
      this.isService = params['s'];
      this.searchProduct();
    });
  }

  searchProduct(){
    this.search = {
      name: this.name,
      category: this.category,
      location: this.location,
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      delivery: this.delivery,
      available: this.available,
      isRentable: this.isRentable,
      isService: this.isService,
    };

    this.productService.searchProduct(this.search).subscribe((data: ProductItem[]) => {
      this.productList = data;
    }, (error: any) => {
      return 'An error occurred!';
    });
  }
}
