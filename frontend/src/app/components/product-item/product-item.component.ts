import { Component, OnInit, Input } from '@angular/core';
import {ProductItem} from '../../models/product-item.model';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  productItem: ProductItem ; 



  constructor() { }

  ngOnInit(): void {
  }

}
