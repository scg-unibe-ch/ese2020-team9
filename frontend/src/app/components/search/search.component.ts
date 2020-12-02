import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {CategoryList} from "../../category-list";
import {Subscription} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {MatSliderModule} from '@angular/material/slider';
import { HostListener } from '@angular/core';

export enum KEY_CODE {
  ENTER = 'Enter',
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild(MatSelect)
  matSelect: MatSelect;

  name = '';
  location = '';
  category = '';
  priceMin = '';
  priceMax = '';
  delivery: any = '';
  isRentable: any = '';
  isService: any = '';

  // mock category list
  categories = CategoryList;

  //hide Filter option
  clickFilter: boolean = false;

  subscription: Subscription;

  distance: string;
  addressPin: any;
  value: string;
  addressCity: string;
  pinList: any;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.queryParamMap.get('c');
    this.name = this.route.snapshot.queryParamMap.get('n');
    this.navigateTo();
  }

  ngAfterViewInit() {
    this.subscription = this.matSelect.openedChange.subscribe(opened => {
      if (opened) {
        this.matSelect.panel.nativeElement.addEventListener('mouseleave', () => {
          this.matSelect.close();
        })
      }
    })
  }

  ngOnDestroy(){
  this.subscription.unsubscribe();
  }

  clearFilter(){
    this.category = '';
    this.location = '';
    this.priceMin = '';
    this.priceMax = '';
    this.delivery = '';
    this.isRentable = '';
    this.isService = '';
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
        r: this.isRentable,
        s: this.isService,
      }
    })
  }

  selection = [
    {value: 'true', name: 'possible'},
    {value: 'false', name: 'not possible'},
    {value: '', name: 'does not matter'},
  ];
  selection2 = [
    {value: 'true', name: 'Service'},
    {value: 'false', name: 'Product'},
    {value: '', name: 'does not matter'},
  ];

  showDelivery(value){
    if(value == 'true'){
      this.delivery = true;
      this.navigateTo();
    } else if(value == 'false') {
      this.delivery = false;
      this.navigateTo();
    } else  if (value == '')
      this.delivery = null;
    this.navigateTo();
  }

  showRenatble(value){
    if(value == 'true'){
      this.isRentable = true;
      this.navigateTo();
    } else if(value == 'false') {
      this.isRentable = false;
      this.navigateTo();
    } else  if (value == '')
      this.isRentable = null;
    this.navigateTo();
  }

  showService(value){
    if(value == 'true'){
      this.isService = true;
      this.navigateTo();
    } else if(value == 'false') {
      this.isService = false;
      this.navigateTo();
    } else  if (value == '')
      this.isService = null;
    this.navigateTo();
  }

  openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000
        });
  }

 formatLabel(value: number) {
        return value  + 'km';
      }

  //gets Pins within a certain radius
    getPinsInRadius(addressPin: string){
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
                console.log(res.results, "getPinsInRadius");
                this.pinList = res.results;
                let queryParam = []
                for (let i = 0; i < res.results.length; i++) {

                  console.log ("Result" + i + "   " + res.results[i].code + "   " + res.results[i].city + "   " + res.results[i].distance + " km  " );
                }
                console.log(this.pinList, "pinList");

            }, (error: any) => {
            });
          }
    }



  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      //console.log(event);
      if (event.key === KEY_CODE.ENTER) {
        this.navigateTo();
      }

    }
}


