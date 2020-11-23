import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  name = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.queryParamMap.get('n');
  }
  clearName(){
    this.name = '';
    this.router.navigate(['/input'], {
      queryParams: {
        n: this.name,
      }
    })
  }
}
