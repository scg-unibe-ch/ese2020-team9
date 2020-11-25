import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {CategoryList} from "../../mock-category-list";
import {Subscription} from "rxjs";

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
  delivery = '';
  isRentable ='';
  isService = '';

  // mock category list
  categories = CategoryList;

  //hide Filter option
  clickFilter: boolean = false;

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

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
}

