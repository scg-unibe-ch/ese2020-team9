import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {CategoryList} from "../../category-list";
import {Subscription} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {_isNumberValue} from "@angular/cdk/coercion";
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

  name: string = '';
  category: string = null;
  priceMin: string = null;
  priceMax: string = null;
  delivery: boolean = null;
  isRentable: boolean = null;
  isService: boolean = null;
  zipCode: string = '';
  radius: number = 0;

  // mock category list
  categories = CategoryList;

  //hide Filter option
  clickFilter: boolean = false;

  subscription: Subscription;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.queryParamMap.get('c');
    this.name = this.route.snapshot.queryParamMap.get('n');
    this.zipCode = this.route.snapshot.queryParamMap.get('z');
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
    this.category = null;
    this.zipCode = '';
    this.priceMin = null;
    this.priceMax = null;
    this.delivery = null;
    this.isRentable = null;
    this.isService= null;
    this.radius = 0;
    this.navigateTo();
  }

  navigateTo(){
    this.router.navigate(['/search'], {
      queryParams: {
        n: this.name,
        c: this.category,
        min: this.priceMin,
        max: this.priceMax,
        d: this.delivery,
        r: this.isRentable,
        s: this.isService,
        z: this.zipCode,
        v: this.radius,
      }
    })
  }

  selection = [
    {value: true, name: 'true'},
    {value: false, name: 'false'},
    {value: null, name: 'all'},
  ];
  selection2 = [
    {value: true, name: 'Service'},
    {value: false, name: 'Product'},
    {value: null, name: 'Services & Products'},
  ];

  showDelivery(value){
    if(value == true){
      this.delivery = true;
      this.navigateTo();
    } else if(value == false) {
      this.delivery = false;
      this.navigateTo();
    } else  if (value == null)
      this.delivery = null;
    this.navigateTo();
  }

  showRenatble(value){
    if(value == true){
      this.isRentable = true;
      this.navigateTo();
    } else if(value == false) {
      this.isRentable = false;
      this.navigateTo();
    } else  if (value == null)
      this.isRentable = null;
    this.navigateTo();
  }

  showService(value){
    if(value == true){
      this.isService = true;
      this.navigateTo();
    } else if(value == false) {
      this.isService = false;
      this.navigateTo();
    } else  if (value == null)
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

  checkNumber(input):boolean{
    return (_isNumberValue(input));
  }

  empty(input): boolean{
    return (input === '');
  }

  checkPrice(input){
    if(_isNumberValue(input)) {
      this.navigateTo();
    }
  }

  checkZip(input){
    if (input.length === 4 && _isNumberValue(input)){
      this.navigateTo();
    }
  }

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if (event.key === KEY_CODE.ENTER) {
        this.navigateTo();
      }

    }
}


