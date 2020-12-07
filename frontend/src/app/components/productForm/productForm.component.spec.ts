import { Location } from '@angular/common';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './productForm.component';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  const stubActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '0';
        }
      }
    }
  };

  const spyRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, TextFieldModule],
      declarations: [ ProductFormComponent ],
      providers: [ HttpTestingController, MatSnackBar, Overlay, {provide: Router, useValue: spyRouter},
      {provide: ActivatedRoute, useValue: stubActivatedRoute}, UserService, ProductService,
      Location]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if add or edit mode', () => {
      expect(component.add).toBe(true);
  });

  it('should recognise if required fields are filled', () => {
    let a = "";
    expect(component.allFilled(a,a,a)).toBe(true);
    a = "a";
    expect(component.allFilled(a,a,a)).toBe(false);

  });

  it('should recognise empty fields', () => {
      let a = "";
      expect(component.empty(a)).toBe(true);
      a = "a";
      expect(component.empty(a)).toBe(false);

  });

 it('should recognise if step one is complete', () => {
     component.productName = "";
     component.productDescription = "";
     component.productPrice = undefined;
     component.productCategory = "";
     expect(component.stepOneComplete(component.productName, component.productDescription, component.productPrice, component.productCategory)).toBe(false);
     component.productName = "a";
     component.productDescription = "a";
     component.productPrice = 1;
     component.productCategory = "a";
     expect(component.stepOneComplete(component.productName, component.productDescription, component.productPrice, component.productCategory)).toBe(true);
 });

 it('should recognise if step two is complete', () => {
       component.productLocation = "";
       expect(component.stepTwoComplete(component.productLocation)).toBe(false);

       component.productLocation = "a";
       expect(component.stepTwoComplete(component.productLocation)).toBe(true);


   });


});
