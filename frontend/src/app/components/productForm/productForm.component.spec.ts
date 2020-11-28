import { Location } from '@angular/common';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './productform.component';
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
          return '1';
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
});
