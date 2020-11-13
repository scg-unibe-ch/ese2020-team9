import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {
  constructor() { }

  categories =  [
    {value: '', viewValue: 'None'},
    {value: 'AntiquesAndArt', viewValue: 'Antiques & Art'},
    {value: 'BabyAndChild', viewValue: 'Baby & Child'},
  ];

  ngOnInit(): void {
  }

}
