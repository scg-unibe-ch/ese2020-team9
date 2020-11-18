import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryList} from "../../../mock-category-list";
import {MatSelect} from "@angular/material/select";

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
}
