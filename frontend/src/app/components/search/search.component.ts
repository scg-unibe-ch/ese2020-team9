import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {CategoryList} from "../../category-list";
import {Subscription} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {MatSliderModule} from '@angular/material/slider';

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
        p: this.addressPin,
        v: this.value,
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
}


