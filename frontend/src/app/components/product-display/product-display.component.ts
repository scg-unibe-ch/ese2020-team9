import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  name= '';
  category= '';
  location= '';
  priceMin= '';
  priceMax= '';
  delivery= '';

  productList: ProductItem[];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['n'];
      this.category = params['c'];
      this.location = params['l'];
      this.priceMin = params['min'];
      this.priceMax = params['max'];
      this.delivery = params['d'];
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
      if(data.length === 0){
        let message = "There is no such product available!";
        let action = "X";
        this.openSnackBar(message, action);
      }
    }, () => {
      let message = "Your search has been unsuccessful. Try again!";
      let action = "X";
      this.openSnackBar(message, action);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
