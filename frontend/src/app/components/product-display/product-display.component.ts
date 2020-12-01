import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Search} from "../../models/search.model";
import { DomSanitizer } from '@angular/platform-browser';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  name= '';
  category= '';
  location: any= [];
  priceMin: any = '';
  priceMax: any = '';
  delivery: any = '';
  available = true;
  isService: any = '';
  isRentable: any = '';

  distance: string;
  addressPin: any;
  value: string;
  addressCity: string;
  pinList: any;

  search: Search;
  productList: ProductItem[];
  image: any;


  constructor(private _snackBar: MatSnackBar, private productService: ProductService, private sanitizer : DomSanitizer, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['n'];
      this.category = params['c'];
      //this.location = params['l'];
      this.priceMin = params['min'];
      this.priceMax = params['max'];
      this.delivery = params['d'];
      this.isRentable = params['r'];
      this.isService = params['s'];
      this.addressPin = params['p'];
      this.value = params['v'];
      if(this.addressPin){
        console.log(this.addressPin);
        console.log(this.value);
        this.getPinsInRadius(this.addressPin, this.value);
      } else {
        this.location = params['l'];
        this.searchProduct();
      }
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
      for (let productItem of this.productList){
                      productItem.picture = [];
                      this.productService.getPhotoIds(productItem.productId).subscribe((photoId: any[]) => {

                        for(let id of photoId){
                           this.productService.getPhoto(id.imageId).subscribe((blob: any) => {

                                 //console.log(blob)

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
      return 'Could not Search';
    });
  }

  //gets Pins within a certain radius
  getPinsInRadius(addressPin: string, value:string){
    if (addressPin == null){
      let message = "Please enter a zipcode";
      let action = "Ok";
      this.openSnackBar(message, action);
      return;
    }
    if (value == "0"){
      let message = "Radius can not be Zero.";
      let action = "";
      this.openSnackBar(message, action);
      return;
    }
    let params = {
      code: this.addressPin,
      radius: this.value,
      country: "CH",
      apikey: '4bc7d070-229b-11eb-8bf2-6be81465cc4d'
    };
    if (this.addressPin.length == 4){this.httpClient.get('http://localhost:4200/api/v1/radius', {params}).subscribe((res: any) => {
      //this.location = res.results;

     for (let i = 0; i < res.results.length; i++) {
       this.location[i] = res.results[i].code;
       /*console.log ("Result" + i + "   " + res.results[i].code + "   " + res.results[i].city + "   " + res.results[i].distance + " km  " );*/
     }
     this.location = location;
     console.log(this.location);
      this.searchProduct();
    }, (error: any) => {
    });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
