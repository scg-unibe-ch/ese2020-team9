import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryList} from "../../../mock-category-list";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

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

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.queryParamMap.get('c');
    this.name = this.route.snapshot.queryParamMap.get('n');
    /*
    this.route.queryParams.subscribe(params => {
      this.category = params['c'];
      this.name = params['n'];*/
      this.navigateTo();
    }

  clear(){
    this.category = '';
    this.location = '';
    this.priceMin = '';
    this.priceMax = '';
    this.delivery = '';
    this.router.navigate(['/search'])
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
}
