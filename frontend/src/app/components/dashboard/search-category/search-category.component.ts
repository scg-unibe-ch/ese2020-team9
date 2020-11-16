import { Component, OnInit } from '@angular/core';
import { CategoryList } from "../../../mock-category-list";

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {

  categories = CategoryList;

  constructor() {
  }

  ngOnInit(): void {
  }

}
