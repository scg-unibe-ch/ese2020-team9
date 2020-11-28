import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserDashboardComponent } from './other-user-dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';

describe('OtherUserDashboardComponent', () => {
  let component: OtherUserDashboardComponent;
  let fixture: ComponentFixture<OtherUserDashboardComponent>;

  const stubActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '1';
        }
      }
    }
  };

  const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ OtherUserDashboardComponent ],
      providers: [UserService, ProductService, HttpTestingController, { provide: ActivatedRoute, useValue: stubActivatedRoute},
        {provide: Router, useValue: spyRouter}, ChangeDetectorRef ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
