import { Component, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Router} from "@angular/router";
import { UserService} from "../../../services/user.service";
import { ProductService} from "../../../services/product.service";
import { ActivatedRoute} from "@angular/router";
import { MatSnackBar} from '@angular/material/snack-bar';
import { Location } from "@angular/common";
import { NewTransaction, Transaction} from "../../../models/transaction.model";
import { TransactionService} from "../../../services/transaction.service";
import { MatTabsModule} from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  productId: number;
  productName = '';
  productDescription = '';
  productImage = '';
  productPrice = '';
  productCategory = '';
  productLocation = '';
  productDelivery = '';
  uploadDate= '';
  sellDate = '';
  isApproved = '';
  isService = '';
  isRentable = '';
  isAvailable = '';
  userId = '';
  userReview = '';

  sellerId: any;
  sellerName = '';
  sellerAddressPin = '';
  sellerAddressCity = '';
  sellerAddressCountry = '';

  buyerId: any;
  buyerName = '';
  buyerAddressPin = '';
  buyerAddressCity = '';
  buyerAddressCountry = '';
  buyerAddressStreet = '';
  buyerWallet: any;
  buyerLastName = '';
  buyerFirstName = '';

  otherAddressPin = '';
  otherAddressCity = '';
  otherAddressCountry = '';
  otherAddressStreet = '';

  deliveryPin: any;
  deliveryStreet = '';
  deliveryCity = '';
  deliveryCountry = '';

  id: any;
  isUserLoggedIn: boolean;
  transaction: NewTransaction;


  picture: any;
  image: any;

  constructor(private location: Location,
              private transactionService: TransactionService,
              private sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar,
              private httpClient: HttpClient,
              private router: Router,
              private userService: UserService,
              private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buyerId = this.userService.getUserId();
    this.getBuyer();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct();
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });

  }

  getBuyer(){this.userService.getUser(this.buyerId).subscribe((instances: any) => {
         //this.sellerId = instances.userId;
         this.buyerName = instances.userName;
         this.buyerFirstName = instances.firstName;
         this.buyerLastName = instances.lastName;
         this.buyerAddressPin = instances.addressPin;
         this.buyerAddressStreet = instances.addressStreet;
         this.buyerAddressCity = instances.addressCity;
         this.buyerAddressCountry = instances.addressCountry;
         this.buyerWallet = instances.wallet;

       },(error: any) => {
         let action = "X";
         let message = "There is no corresponding Seller!";
         this.openSnackBar(message, action);
     });
   }

  getProduct(){
    this.productService.getProduct(this.id).subscribe((instances: any) => {
          this.productId = instances.productId;
          this.productName = instances.productName;
          this.productDescription = instances.productDescription;
          this.productImage = instances.productImage;
          this.productPrice = instances.productPrice;
          this.productCategory = instances.productCategory;
          this.productLocation = instances.productLocation;
          this.productDelivery = instances.productDelivery;
          this.uploadDate = instances.uploadDate;
          this.sellDate = instances.sellDate;
          this.isApproved = instances.isApproved;
          this.isService = instances.isService;
          this.isRentable = instances.isRentable;
          this.isAvailable = instances.isAvailable;
          this.sellerId = instances.userId;

          this.picture = [];
                    this.productService.getPhotoIds(this.productId).subscribe((photoId: any[]) => {

                      for(let id of photoId){
                         this.productService.getPhoto(id.imageId).subscribe((blob: any) => {

                               console.log(blob)

                               let objectURL = URL.createObjectURL(blob);
                               this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
                               console.log(this.image,"img");
                               this.picture.push(this.image);
                               console.log(this.picture, "objectURL");


                        });
                      }

                    });
          //this.userReview = instances.userReview;
          //this.changeDetection.detectChanges();
          this.getSeller(this.sellerId);

      },(error: any) => {
      let action = "X";
      let message = "There is no corresponding Product!";
      this.openSnackBar(message, action);
    });
  }

  getSeller(sellerId: number){
    this.userService.getUser(this.sellerId).subscribe((instances: any) => {
          //this.sellerId = instances.userId;
          this.sellerName = instances.userName;
          this.sellerAddressPin = instances.addressPin;
          this.sellerAddressCity = instances.addressCity;
          this.sellerAddressCountry = instances.addressCountry;

      },(error: any) => {
      let action = "X";
      let message = "There is no corresponding Seller!";
      this.openSnackBar(message, action);
    });
  }

  //Initializes a new transaction
  buyProduct(): void {
    if(this.buyerAddressPin !== '' && this.otherAddressPin == '') {
      this.deliveryPin = this.buyerAddressPin;
    } else {
      this.deliveryPin = this.otherAddressPin;}

    if(this.buyerAddressStreet !== '' && this.otherAddressStreet == '') {
      this.deliveryStreet = this.buyerAddressStreet;
    } else {
      this.deliveryStreet = this.otherAddressStreet;
    }

    if(this.buyerAddressCity !== '' && this.otherAddressCity == '') {
      this.deliveryCity = this.buyerAddressCity;
    } else {
      this.deliveryCity = this.otherAddressCity;
    }

    if(this.buyerAddressCountry !== '' && this.otherAddressCountry == '') {
      this.deliveryCountry = this.buyerAddressCountry;
    } else {
      this.deliveryCountry = this.otherAddressCountry;
    }

    this.transaction = {
      productId: this.productId,
      userId: this.sellerId,
      buyerId: this.buyerId,
      deliveryFirstName: this.buyerFirstName,
      deliveryLastName: this.buyerLastName,
      deliveryPin: this.deliveryPin,
      deliveryStreet: this.deliveryStreet,
      deliveryCity: this.deliveryCity,
      deliveryCountry: this.deliveryCountry,
    };

    this.transactionService.buyProduct(this.transaction).subscribe((res: any) => {




      //navigates to productItem
      this.router.navigate(['/user']);
      let message = "Seller has been contacted. " + res.message;
      let action = "X";
      this.openSnackBar(message, action);

    }, (error: any) => {
      let message = "An error has occurred!";
      let action = "X";
      this.openSnackBar(message, action);
    });

  }

  // check if all address fields are filled
  empty(a, b, c, d):boolean {
    return (a === '' || b === '' || c === '' || d === '');
  }

 /*
  checkCountryCode(c:string):boolean{
    let check = "CH";
    return (c==check);
  }*/

  checkCash(){
    return (this.buyerWallet < this.productPrice);
  }

  //Initializes a new transaction
  otherAddressBuyProduct(): void {
    this.httpClient.post(environment.endpointURL + 'transaction/', {
      //transactionId : this.transactionId,
      productId: this.productId,
      userId: this.sellerId,
      buyerId: this.buyerId,
      //transactionStatus: this.transactionStatus,
      deliveryFirstName: this.buyerFirstName,
      deliveryLastName: this.buyerLastName,

      deliveryStreet: this.otherAddressStreet,
      deliveryPin: this.otherAddressPin,
      deliveryCity: this.otherAddressCity,
      deliveryCountry: this.otherAddressCountry,
    }).subscribe((res: any) => {

      //navigates to productItem
      this.router.navigate(['/user']);
      let message = "Seller has been contacted, please await approval of buy request"
      let action = "OK";
      this.openSnackBar(message, action);

    }, (error: any) => {
      let message = "An Error occurred!";
      let action = "OK";
      this.openSnackBar(message, action);
    });

  }

  requestCity(){
      let params = {
            codes: this.otherAddressPin,
            country: "CH",
            apikey: '4bc7d070-229b-11eb-8bf2-6be81465cc4d'
      };
      if (this.otherAddressPin.length == 4){this.httpClient.get('http://localhost:4200/api/v1/search', {params}).subscribe((res: any) => {
          if (res != null) {
              this.otherAddressCity = res.results[this.otherAddressPin][0].city;
              console.log(res.results[this.otherAddressPin][0].city)
          }

        }, (error: any) => {
              this.otherAddressCity = "";
        });
      }
    }



  openSnackBar(message: string, action: string) {
          this._snackBar.open(message, action, {
            duration: 3000
          });
  }

  goBack(): void {
    this.location.back();
  }
}
