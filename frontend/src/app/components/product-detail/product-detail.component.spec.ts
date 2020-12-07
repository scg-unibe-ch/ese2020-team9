import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { Overlay } from '@angular/cdk/overlay';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const stubActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '1';
        }
      }
    }
  };

  const spyRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ProductDetailComponent ],
      providers: [ ChangeDetectorRef, MatSnackBar, Overlay, UserService, ProductService, HttpTestingController,
       {provide: Router, useValue: spyRouter}, {provide: ActivatedRoute, useValue: stubActivatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
