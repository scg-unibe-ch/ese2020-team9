import { NewTransaction, Transaction } from './../models/transaction.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully buyProduct', () => {
    const mockTransaction: NewTransaction = {
      productId: 1,
      userId: 7,
      buyerId: 2,
      deliveryCity: 'Bern',
      deliveryCountry: 'CH',
      deliveryFirstName: 'Jeff',
      deliveryLastName: 'Dunham (dootcooom)',
      deliveryPin: '7775',
      deliveryStreet: 'Peanut'
    };
    const response = {
      message: 'Successfully bought product'
    };
    service.buyProduct(mockTransaction).subscribe((res: any) => {
      expect(res.message).toEqual('Successfully bought product');
    });
    const req = httpMock.expectOne('http://localhost:3000/transaction/');
    expect(req.request.method).toEqual('POST');
    req.flush(response);
  });

  it('should successfully sellProduct', () => {
    const mockTransaction: Transaction = {
      productId: 1,
      userId: 7,
      buyerId: 2,
      deliveryCity: 'Bern',
      deliveryCountry: 'CH',
      deliveryFirstName: 'Jeff',
      deliveryLastName: 'Dunham (dootcooom)',
      deliveryPin: 7775,
      deliveryStreet: 'Peanut',
      transactionId: 1,
      transactionStatus: 1,
      seller: 'Achmed',
      buyer: 'Walter',
      product: 'José Jalapeno'
    };
    const response = {
      transactionStatus: 2
    };
    service.sellProduct(mockTransaction).subscribe((res: any) => {
      expect(res.transactionStatus).toEqual(2);
    });
    const req = httpMock.expectOne('http://localhost:3000/transaction/confirm/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(response);
  });

  it('should successfully decline Product', () => {
    const mockTransaction: Transaction = {
      productId: 1,
      userId: 7,
      buyerId: 2,
      deliveryCity: 'Bern',
      deliveryCountry: 'CH',
      deliveryFirstName: 'Jeff',
      deliveryLastName: 'Dunham (dootcooom)',
      deliveryPin: 7775,
      deliveryStreet: 'Peanut',
      transactionId: 1,
      transactionStatus: 1,
      seller: 'Achmed',
      buyer: 'Walter',
      product: 'José Jalapeno'
    };
    const response = {
      transactionStatus: 0
    };
    service.declineProduct(mockTransaction).subscribe((res: any) => {
      expect(res.transactionStatus).toEqual(0);
    });
    const req = httpMock.expectOne('http://localhost:3000/transaction/decline/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(response);
  });

});
