import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductItem } from "../../models/product-item.model";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';


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
  image: any;

  constructor(private sanitizer : DomSanitizer, private userService: UserService, private productService: ProductService, private changeDetection: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }


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
      for (let productItem of this.productList){
                      productItem.picture = [];
                      this.productService.getPhotoIds(productItem.productId).subscribe((photoId: any[]) => {

                        for(let id of photoId){
                           this.productService.getPhoto(id.imageId).subscribe((blob: any) => {

                                 //console.log(blob)

                                 let objectURL = URL.createObjectURL(blob);
                                 this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
                                 //console.log(this.image,"img")
                                 productItem.picture.push(this.image);
                                 //console.log(productItem.picture, "objectURL");


                          });
                        }

                      });

                    }

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
