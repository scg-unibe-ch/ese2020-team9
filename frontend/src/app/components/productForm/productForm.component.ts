import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {ProductItem} from "../../models/product-item.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import {environment} from "../../../environments/environment";
import { ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Location} from "@angular/common";
import { Observable } from 'rxjs';

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
  selectedFiles: FileList;
  progressInfos = [];
  fileInfos: Observable<any>;

  selectedFile: File;

  imageSelected: boolean;
  imageName: string;
  fileName: string;

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

      },(error: any) => {
      this.userAuth = 'There is no corresponding Product!';
    });
  }

  addProduct(): void {
    this.httpClient.post(environment.endpointURL + 'products/', {
      productName: this.productName,
      productDescription: this.productDescription,
      productImage: this.productImage,
      productPrice: this.productPrice,
      productCategory: this.productCategory,
      productLocation: this.productLocation,
      productDelivery: this.productDelivery,
      uploadDate:    new Date(),
      sellDate: '',
      isApproved: false,
      isService: this.isService,
      isRentable: this.isRentable,
      isAvailable: true,
      userId: this.userId,
      userReview: this.userReview,

    }).subscribe((res: any) => {

      //navigates to dashboard
      this.router.navigate(['/user']);
       let action = "";
       this.openSnackBar(res.message, action);
    }, (error: any) => {
        let action = "";
        this.openSnackBar(error.message, action);

    });
  }

  editProduct(): void {
    this.httpClient.put(environment.endpointURL + 'products/' + this.productId, {
      productName: this.productName,
      productDescription: this.productDescription,
      productImage: this.productImage,
      productPrice: this.productPrice,
      productCategory: this.productCategory,
      productLocation: this.productLocation,
      productDelivery: this.productDelivery,
      uploadDate: this.uploadDate,
      sellDate: this.sellDate,
      isApproved: false,
      isService: this.isService,
      isRentable: this.isRentable,
      isAvailable: this.isAvailable,
      userId: this.userId,
      userReview: this.userReview,

    }).subscribe((res: any) => {

      //navigates to productItem
      this.router.navigate(['/user']);
      let action = "";
      this.openSnackBar(res.message, action);

    }, (error: any) => {
      let message = "Your Product Information is invalid!";
      let action = "";
      this.openSnackBar(message, action);
    });

  }

  //check if field is empty
  empty(input):boolean{
    if (input === "") return true;
    else return false
  }

  allFieldsAreFilled():boolean{
    return true;
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
      this.imageName =event.target.files[0].name;
  }





  selectFiles(event) {
    this.progressInfos = [];
    this.imageSelected = true;
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
              this.getName(i, this.selectedFiles[i]);
            }
  }

  getName(idx, file){
      this.progressInfos[idx] = { fileName: file.name };
  }

  onUpload() {
        for (let i = 0; i < this.selectedFiles.length; i++) {
              //
          }
    }


}
