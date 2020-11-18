import {Component, OnInit, ViewChild} from '@angular/core';
import { CategoryList } from "../../../mock-category-list";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {

  @ViewChild(MatSelect)
  matSelect: MatSelect;

  categories = CategoryList;

  constructor() {
  }

  ngOnInit(): void {
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


}
