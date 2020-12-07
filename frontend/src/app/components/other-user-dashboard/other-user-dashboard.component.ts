import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductItem } from "../../models/product-item.model";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LeaderBoardScore } from "../../models/leaderboardscore.model";


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
  userScore: number;
  numberOne: boolean;
  numberTwo: boolean;
  numberThree: boolean;

  leaderBoardOverAll: LeaderBoardScore[];

  productList: ProductItem [];
  isUserLoggedIn: boolean;
  id: any;
  image: any;

  constructor(private httpClient: HttpClient, private sanitizer : DomSanitizer, private userService: UserService, private productService: ProductService, private changeDetection: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }


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


                                 let objectURL = URL.createObjectURL(blob);
                                 this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
                                 productItem.picture.push(this.image);


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
          this.userScore = instances.gameScore;
          this.compareScore();
      },(error: any) => {

    });
  }

  compareScore(){
     
      this.httpClient.get(environment.endpointURL + 'user/highscores/overall' ,{}).subscribe((data: LeaderBoardScore[]) => {
        this.leaderBoardOverAll = data;
        if(this.leaderBoardOverAll[0].userId == this.userId){
          this.numberOne = true;
        } else if(this.leaderBoardOverAll[1].userId == this.userId){
         this.numberTwo = true;
       } else if(this.leaderBoardOverAll[2].userId == this.userId){
         this.numberThree = true;
       } else{
        }
       });
    }

  trackByFn(index, item){
    return item.id;
  }

}
