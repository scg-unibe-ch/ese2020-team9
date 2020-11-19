import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {CategoryList} from "../../../mock-category-list";

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

  clearName(){
    return this.name = '';
  }

}
