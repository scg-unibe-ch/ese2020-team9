import {Component, NgZone, OnInit} from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import { ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Location} from "@angular/common";
import {CategoryList} from "../../category-list";
import {_isNumberValue} from "@angular/cdk/coercion";
import { Observable } from 'rxjs';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-productForm',
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.css']
})
export class ProductFormComponent implements OnInit {

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
  userAuth = '';

  product: ProductItem;
  id: any;
  add: boolean;
  categories = CategoryList;

  imageSelected: boolean;
  imageName: string;
  selectedFile: File;
  editId: number;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService, private _ngZone: NgZone, private productService: ProductService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

    this.userId = this.userService.getUserId();
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id==='0'){
      this.add = true;
    } else{
      this.add=false;
      this.getProduct();
    }
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
          this.userId = instances.userId;
          this.userReview = instances.userReview;

          //this.changeDetection.detectChanges();
          this.editId = instances.productId;

      },(error: any) => {
      this.userAuth = 'There is no corresponding Product!';
    });
  }

  addProduct(): void {
    this.product = {
      productId: 0,
      productName: this.productName,
      productDescription: this.productDescription,
      //productImage: this.productImage,
      productPrice: this.productPrice,
      productCategory: this.productCategory,
      productLocation: this.productLocation,
      productDelivery: Boolean(this.productDelivery),
      uploadDate: new Date(),
      sellDate: null,
      isApproved: false,
      isService: Boolean(this.isService),
      isRentable: Boolean(this.isRentable),
      isAvailable: true,
      userId: parseFloat(this.userId),
      userReview: this.userReview,
    };

    this.productService.addProduct(this.product).subscribe((res: any) => {
      //navigates back to user dashboard
      this.goBack();
      let action = "X";
      this.openSnackBar(res.message, action);
    }).subscribe((res: any) => {
       this.editId = res.productId
       //console.log(this.editId)


    }, (error: any) => {
      let message = "Can not add this product!";
      let action = "X";
      this.openSnackBar(message, action);
    });
  }

  editProduct(): void {
    this.product = {
      productId: this.productId,
      productName: this.productName,
      productDescription: this.productDescription,
      //productImage: this.productImage,
      productPrice: Number(this.productPrice),
      productCategory: this.productCategory,
      productLocation: this.productLocation,
      productDelivery: Boolean(this.productDelivery),
      uploadDate: new Date(),
      sellDate: null,
      isApproved: false,
      isService: Boolean(this.isService),
      isRentable: Boolean(this.isRentable),
      isAvailable: true,
      userId: Number(this.userId),
      //userReview: this.userReview,
    };
    this.productService.editProduct(this.product).subscribe((res: any) => {
      //navigates back to user dashboard
      this.goBack();
      let message = "Product successfully edited!";
      let action = "";
      this.openSnackBar(message, action);

    }).subscribe((res: any) => {

      //navigates to productItem
      this.router.navigate(['/user']);
      let action = "Ok";
      let message = "Success";
      this.openSnackBar(message, action);

    }, (error: any) => {
      let message = "Your Product Information is invalid!";
      let action = "X";
      this.openSnackBar(message, action);
    });
  }

  // check if all required fields are filled
  allFilled(a, b, c):boolean {
    return (a === '' || b === '' || c === '');
  }

  empty(input){
    return (input === '');
  }

  // check if field is number
  checkNumber(input):boolean{
   return (!_isNumberValue(input));
  }

  openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 3000
      });
    }

  goBack(): void {
    this.location.back();
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    this.imageSelected = true;
    this.imageName = event.target.files[0].name


  }


 onUpload() {
   const uploadData = new FormData();
   console.log(this.editId)
   uploadData.append('image', this.selectedFile, this.selectedFile.name);
   this.httpClient.post(environment.endpointURL + 'products/images/upload/'+ this.editId, uploadData, {
     reportProgress: true,
     observe: 'events'
   })
     .subscribe(event => {
       console.log(event); // handle event here
     });
 }


  stepOneComplete(){

    if (true){ return true}
        else {
          return false
        }
  }

  stepTwoComplete(){

      if (true){ return true}
          else {
            return false
          }
    }


}
