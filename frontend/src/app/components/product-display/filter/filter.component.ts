import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryList} from "../../../mock-category-list";
import {MatSelect} from "@angular/material/select";
import {MatSliderModule} from '@angular/material/slider';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {from} from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @ViewChild(MatSelect)
  matSelect: MatSelect;

  name = '';
  location = '';
  priceMin = '';
  priceMax = '';
  delivery = '';
  category = '';

  // mock category list
  categories = CategoryList;

  //hide Filter option
  clickFilter: boolean = false;

  distance: number;
  addressPin: any;
  value: string;
  addressCity: string;
  pinList: any;

  constructor(private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.value = "0";
    this.category = this.route.snapshot.queryParamMap.get('c');
    this.name = this.route.snapshot.queryParamMap.get('n');
    /*
    this.route.queryParams.subscribe(params => {
      this.category = params['c'];
      this.name = params['n'];*/
      this.navigateTo();
  }

  ngAfterViewInit() {
    this.matSelect.openedChange.subscribe(opened => {
      if (opened) {
        this.matSelect.panel.nativeElement.addEventListener('mouseleave', () => {
          this.matSelect.close();
        })
      }
    })
  }

  clearLocation(){
    this.location = '';
    this.navigateTo();
  }

  clearMinPrice(){
    this.priceMin = '';
    this.navigateTo();
  }

  clearMaxPrice(){
    this.priceMax = '';
    this.navigateTo();
  }

  clearAll(){
    this.category = '';
    this.location = '';
    this.priceMin = '';
    this.priceMax = '';
    this.delivery = '';
    this.navigateTo();
  }

  navigateTo(){
      this.router.navigate(['/search'], {
        queryParams: {
          n: this.name,
          c: this.category,
          l: this.location,
          min: this.priceMin,
          max: this.priceMax,
          d: this.delivery,
        }
      })
    }

   formatLabel(value: number) {
        return value  + 'km';
      }



  //gets Pins within a certain radius
  getPinsInRadius(addressPin: string){
        console.log(this.addressPin, "getPinsInRadius")

        if (this.addressPin == null){
            let message = "Please enter a zipcode";
            let action = "Ok";
            this.openSnackBar(message, action);
            return;
        }
        if (this.value == "0"){
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
              console.log (res.results.length)
              console.log(res.results, "getPinsInRadius")
              this.pinList = res.results

              for (let i = 0; i < res.results.length; i++) {

                console.log ("Result" + i + "   " + res.results[i].code + "   " + res.results[i].city) + res.results[i].distance + " km  " ;
              }


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

