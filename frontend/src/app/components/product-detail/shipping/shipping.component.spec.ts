import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { UserService } from './../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingComponent } from './shipping.component';
import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef } from '@angular/core';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

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
      declarations: [ ShippingComponent ],
      providers: [ MatSnackBar, Overlay, HttpTestingController, UserService, ProductService, ChangeDetectorRef,
       {provide: Router, useValue: spyRouter}, {provide: ActivatedRoute, useValue: stubActivatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
