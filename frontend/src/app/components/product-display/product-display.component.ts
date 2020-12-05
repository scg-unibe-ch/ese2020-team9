import {Component, OnInit} from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Search} from "../../models/search.model";
import { DomSanitizer } from '@angular/platform-browser';
import {MatSnackBar} from "@angular/material/snack-bar";
import {newArray} from "@angular/compiler/src/util";


@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  name: string;
  category: string;
  location: string[];
  priceMin: number;
  priceMax: number;
  delivery: any;
  available = true;
  isService: any;
  isRentable: any;
  zipCode: string;
  radius: string;

  search: Search;
  productList: ProductItem[];
  image: any;



  constructor(private _snackBar: MatSnackBar, private productService: ProductService, private sanitizer : DomSanitizer, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['n'];
      this.category = params['c'];
      this.priceMin = params['min'];
      this.priceMax = params['max'];
      this.zipCode = params['z'];
      this.radius = params['v'];

      if(params['d'] === 'true') {
        this.delivery = true;
      } else if(params['d'] === 'false'){
        this.delivery = false;
      } else { this.delivery = '';
      }
      if(params['r'] === 'true') {
        this.isRentable = true;
      } else if(params['r'] === 'false'){
        this.isRentable = false;
      } else { this.isRentable = '';
      }
      if(params['s'] === 'true') {
        this.isService = true;
      } else if(params['s'] === 'false'){
        this.isService = false;
      } else { this.isService = '';
      }

      if(this.zipCode == ''){
        this.location = [];
        this.searchProduct();
      } else {
       this.checkLocation();
      }
    });
  }

  checkLocation(){
    if(this.radius === '0'){
        this.location = newArray(1).fill(this.zipCode);
        this.searchProduct();
    } else {
      this.getPinsInRadius(this.zipCode, this.radius);
    }
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

      for (let productItem of this.productList){
        productItem.picture = [];
        this.productService.getPhotoIds(productItem.productId).subscribe((photoId: any[]) => {
          for(let id of photoId){
            this.productService.getPhoto(id.imageId).subscribe((blob: any) => {
              let objectURL = URL.createObjectURL(blob);
              this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
              //console.log(this.image,"img")
              productItem.picture.push(this.image);
              //console.log(productItem.picture, "objectURL");
            });
          }
        });
      }
    }, (error: any) => {
      let message = "An error has occurred while you where searching!";
      let action = "X";
      this.openSnackBar(message, action);
    });
  }

  //gets Pins within a certain radius
  getPinsInRadius(zipCode: string, radius: string){
    let params = {
      code: zipCode,
      radius: radius,
      country: "CH",
      apikey: '4bc7d070-229b-11eb-8bf2-6be81465cc4d'
    };
    if (zipCode.length == 4){this.httpClient.get('http://localhost:4200/api/v1/radius', {params}).subscribe((res: any) => {
      this.location = newArray(res.results.length);
      for (let i = 0; i < res.results.length; i++) {
        this.location[i] = res.results[i].code;
      }
      this.searchProduct();
    }, (error: any) => {
      let message = "We could not find any cities in this radius";
      let action = "X";
      this.openSnackBar(message, action);
      console.log(this.location);
      this.searchProduct();
    });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000
    });
  }
}
