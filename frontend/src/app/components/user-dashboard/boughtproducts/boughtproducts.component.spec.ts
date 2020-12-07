import { ProductService } from './../../../services/product.service';
import { UserService } from './../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtproductsComponent } from './boughtproducts.component';
import { Overlay } from '@angular/cdk/overlay';

describe('BoughtproductsComponent', () => {
  let component: BoughtproductsComponent;
  let fixture: ComponentFixture<BoughtproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ BoughtproductsComponent ],
      providers: [ MatSnackBar, Overlay, HttpTestingController, UserService, ProductService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughtproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
