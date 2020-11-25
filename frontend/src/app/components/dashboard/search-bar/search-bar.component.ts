import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {CategoryList} from "../../../mock-category-list";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @ViewChild(MatSelect)
  matSelect: MatSelect;

  categories = CategoryList;
  name = '';
  subscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
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
}
