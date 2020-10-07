import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  userToke: string;
  statusLoggedIn = false;

  constructor() { }

  ngOnInit(): void {
    this.checkStatus()
  }

  checkStatus(): void {
    // Get user data from local storage
    this.userToke = localStorage.getItem('userToken');

    // Set boolean whether a user is logged or not
    this.statusLoggedIn = !!(this.userToke);
  }

  buyProduct(){
  }

}
