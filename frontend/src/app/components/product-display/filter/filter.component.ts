import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryList} from "../../../mock-category-list";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  location = '';
  priceMin = '';
  priceMax = '';
  delivery = '';
  available = '';
  category = '';

  // mock category list
  categories = CategoryList;

  //hide Filter option
  clickFilter: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  /*
  getSearchInput(){
    this.search = new Search(
      this.name,
      this.location,
      this.priceMin,
      this.priceMax,
      this.delivery,
      this.available,
      this.category,
    );
    this.searchInput.emit(this.search);
  }*/

/*
  searchProduct(){
    this.httpClient.post(environment.endpointURL + 'products/search/', {
      category: this.category,
      location: this.location,
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      delivery: this.delivery,
      available: this.available,
    }).subscribe((data: ProductItem[]) => {
      this.productList = data;
    }, (error: any) => {
      return 'Could not Search';
    });
  }*/

  clear(){
    this.router.navigate(['/search'])
  }
  navigateTo(){
    this.router.navigate(['/search'], {queryParams: {
        c: this.category,
        l: this.location,
        min: this.priceMin,
        max: this.priceMax,
        d: this.delivery,
        a: this.available
    }})
  }

}
