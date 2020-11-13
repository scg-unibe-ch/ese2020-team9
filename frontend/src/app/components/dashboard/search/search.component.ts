import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Search } from "../../../models/search.model";
import { Category } from "../../../models/category";
import {environment} from "../../../../environments/environment";
import {ProductItem} from "../../../models/product-item.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()
  searchInput= new EventEmitter<Search>();

  name = '';
  location = '';
  priceMin = '';
  priceMax = '';
  delivery = '';
  available = '';
  category = '';

  clickFilter: boolean = false;
  search: Search;
  searchList: ProductItem[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getSearchInput(){
    this.httpClient.post(environment.endpointURL + 'products/search/', {
      name: this.name,
      location: this.location,
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      delivery: this.delivery,
      available: this.available,
    }).subscribe((data: ProductItem[]) => {
      this.searchList = data;
      console.log('Hello')
    }, (error: any) => {
      return 'Could not Search';
    });
  }

  /*getSearchInput(){
    this.search = new Search(
      this.name,
      this.location,
      Number(this.priceMin),
      Number(this.priceMax),
      Boolean(this.delivery),
      Boolean(this.available),
      this.category,
    );
    this.searchInput.emit(this.search);
  }*/

  categories: Category[] = [
    {value: '', viewValue: 'None'},
    {value: 'AntiquesAndArt', viewValue: 'Antiques & Art'},
    {value: 'BabyAndChild', viewValue: 'Baby & Child'}
  ];
}
