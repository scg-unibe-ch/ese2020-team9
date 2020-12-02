import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {CategoryList} from "../../../category-list";
import {Subscription} from "rxjs";
import { HostListener } from '@angular/core';
import { Router } from "@angular/router";

export enum KEY_CODE {
  ENTER = 'Enter',
}

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

  constructor(private router: Router) {
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




  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      //console.log(event);
      if (event.key === KEY_CODE.ENTER) {

          this.router.navigate(['/s'],{queryParams: {n: this.name}});


      }

    }
}
