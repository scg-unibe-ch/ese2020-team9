import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from './../../../services/product.service';
import { UserService } from './../../../services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldproductsComponent } from './soldproducts.component';
import { Overlay } from '@angular/cdk/overlay';

describe('SoldproductsComponent', () => {
  let component: SoldproductsComponent;
  let fixture: ComponentFixture<SoldproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SoldproductsComponent ],
      providers: [HttpTestingController, UserService, ProductService, MatSnackBar, Overlay]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
