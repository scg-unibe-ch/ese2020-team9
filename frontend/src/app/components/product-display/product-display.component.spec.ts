import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayComponent } from './product-display.component';
import { of, scheduled } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';

describe('ProductDisplayComponent', () => {
  let component: ProductDisplayComponent;
  let fixture: ComponentFixture<ProductDisplayComponent>;

  const stubActivatedRoute = {
    queryParams: of({
      n: '',
      c: '',
      l: '',
      min: '',
      max: '',
      d: '',
    })
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'] );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ProductDisplayComponent ],
      providers: [ HttpTestingController, {provide: ActivatedRoute, useValue: stubActivatedRoute},
       {provide: Router, useValue: routerSpy}, MatSnackBar, Overlay ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
