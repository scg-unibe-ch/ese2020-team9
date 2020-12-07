import { ProductItem } from './../models/product-item.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Search } from '../models/search.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the product with set id successfully', () => {
    const mockProduct = {
      productId: 1,
      productName: 'Test Smarties'
    };
    service.getProduct(1).subscribe((product: any) => {
      expect(product.productId).toEqual(1);
      expect(product.productName).toEqual('Test Smarties');
    });
    const request = httpMock.expectOne('http://localhost:3000/products/1');
    expect(request.request.method).toEqual('GET');
    request.flush(mockProduct);
  });

  it('should add the product successfully', () => {
    const mockProduct: ProductItem = {
      productId: 1,
      productName: 'Test Smarties',
      productDescription: 'Taste some of the testing smarties, those are really good!',
      productCategory: 'Test stuff',
      productDelivery: false,
      productLocation: '3550',
      productPrice: 20,
      uploadDate: Date.prototype,
      sellDate: null,
      userId: 2,
      isApproved: false,
      isAvailable: true,
      isRentable: false,
      isService: false
    };
    const response = {
      message: 'Successfully added product'
    };
    service.addProduct(mockProduct).subscribe((res: any) => {
      expect(res.message).toEqual('Successfully added product');
    });
    const request = httpMock.expectOne('http://localhost:3000/products/');
    expect(request.request.method).toEqual('POST');
    request.flush(response);
  });

  it('should search a product successfully', () => {
    const mockProduct: ProductItem = {
      productId: 1,
      productName: 'Test Smarties',
      productDescription: 'Taste some of the testing smarties, those are really good!',
      productCategory: 'Test stuff',
      productDelivery: false,
      productLocation: '3550',
      productPrice: 20,
      uploadDate: Date.prototype,
      sellDate: null,
      userId: 2,
      isApproved: false,
      isAvailable: true,
      isRentable: false,
      isService: false
    };
    const stubSearch: Search = {
        name: 'Test Smarties'
    };
    service.searchProduct(stubSearch).subscribe((res: any) => {
      expect(res.productId).toEqual(1);
      expect(res.productPrice).toEqual(20);
    });
    const request = httpMock.expectOne('http://localhost:3000/products/search/');
    expect(request.request.method).toEqual('POST');
    request.flush(mockProduct);
  });

  it('should approve a product successfully', () => {
    const mockProduct: ProductItem = {
      productId: 1,
      productName: 'Test Smarties',
      productDescription: 'Taste some of the testing smarties, those are really good!',
      productCategory: 'Test stuff',
      productDelivery: false,
      productLocation: '3550',
      productPrice: 20,
      uploadDate: Date.prototype,
      sellDate: null,
      userId: 2,
      isApproved: false,
      isAvailable: true,
      isRentable: false,
      isService: false
    };
    const mockProductRes: ProductItem = {
      productId: 1,
      productName: 'Test Smarties',
      productDescription: 'Taste some of the testing smarties, those are really good!',
      productCategory: 'Test stuff',
      productDelivery: false,
      productLocation: '3550',
      productPrice: 20,
      uploadDate: Date.prototype,
      sellDate: null,
      userId: 2,
      isApproved: true,
      isAvailable: true,
      isRentable: false,
      isService: false
    };
    service.approveProduct(mockProduct).subscribe((res: any) => {
      expect(res.productId).toEqual(1);
      expect(res.productPrice).toEqual(20);
      expect(res.isApproved).toEqual(true);
    });
    const request = httpMock.expectOne('http://localhost:3000/products/approve/1');
    expect(request.request.method).toEqual('PUT');
    request.flush(mockProductRes);
  });

});
