import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductItem } from "../../models/product-item.model";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-other-user-dashboard',
  templateUrl: './other-user-dashboard.component.html',
  styleUrls: ['./other-user-dashboard.component.css']
})
export class OtherUserDashboardComponent implements OnInit {
  userId: any;
  userName: any;
  addressPin = '';
  addressCity = '';
  addressCountry = '';

  productList: ProductItem [];
  isUserLoggedIn: boolean;
  id: any;

  constructor(private userService: UserService,
              private productService: ProductService,
              private changeDetection: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.getSeller();

    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.getProductList();
  }



  getProductList(){
    this.productService.getUserProduct(this.id).subscribe((data: ProductItem []) => {
      this.productList = data;
    });
  }


  getSeller(){
    this.userService.getUser(this.id).subscribe((instances: any) => {
          this.userId = instances.userId;
          this.userName = instances.userName;
          this.addressPin = instances.addressPin;
          this.addressCity = instances.addressCity;
          this.addressCountry = instances.addressCountry;

      },(error: any) => {

    });
  }

  trackByFn(index, item){
    return item.id;
  }

}
