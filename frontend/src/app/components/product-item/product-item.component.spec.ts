import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItem } from '../../models/product-item.model';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.productItem = {
      productCategory: 'Test',
      productDelivery: false,
      productDescription: 'This is only a test item',
      productId: 1,
      productLocation: '3000',
      productPrice: 6000,
      productName: 'Test',
      uploadDate: null,
      sellDate: null,
      isApproved: false,
      isAvailable: false,
      isRentable: false,
      isService: false,
      userId: 1,
      picture: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
