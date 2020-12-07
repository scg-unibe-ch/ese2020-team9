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
import { environment } from "../../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

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
  productPrice: number;
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

  picture: any = [];
  image: any;

  constructor(private sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar,
              private httpClient: HttpClient,
              private router: Router,
              private userService: UserService,
              private _ngZone: NgZone,
              private productService: ProductService,
              private route: ActivatedRoute,
              private location: Location) { }

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
          this.picture = [];
            this.productService.getPhotoIds(this.productId).subscribe((photoId: any[]) => {

              for(let id of photoId){
                 this.productService.getPhoto(id.imageId).subscribe((blob: any) => {


                       let objectURL = URL.createObjectURL(blob);
                       this.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
                       this.picture.push(this.image);


                     });
              }

          });

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
    };

    this.productService.addProduct(this.product).subscribe((res: any) => {
      this.editId = res.productId

    }, (error: any) => {
      let message = "Can not add this product!";
      let action = "X";
      this.openSnackBar(message, action);
    });
  }

  editProduct(): void {
    this.product = {
      productId: this.editId,
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


      this.router.navigate(['/user']);
      let action = "X";
      let message = "Success";
      this.openSnackBar(message, action);

    }, (error: any) => {
      let message = "Your product information is invalid!";
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

   uploadData.append('image', this.selectedFile, this.selectedFile.name);
   this.httpClient.post(environment.endpointURL + 'products/images/upload/'+ this.editId, uploadData, {
     reportProgress: true,
     observe: 'events'
   })
     .subscribe(event => {
       let message = "Upload done!";
       let action = "X";
       this.openSnackBar(message, action);
     }, (error: any) => {
            let message = "Something went wrong!";
            let action = "X";
            this.openSnackBar(message, action);
          });
 }


  stepOneComplete(productName, productDescription, productPrice, productCategory):boolean {
    let n = this.productName;
    let d = this.productDescription;
    let p = this.productPrice;
    let c = this.productCategory;

    return !(n === '' || d === '' || p === undefined || c === '')
  }

  stepTwoComplete(productLocation){
      let z = this.productLocation;
      return !(z === '')
    }


}
