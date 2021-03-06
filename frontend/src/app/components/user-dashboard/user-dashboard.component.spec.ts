import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { Overlay } from '@angular/cdk/overlay';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  const spyRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

  const stubActivatedRoute = {
    snapshot: {
      paramMap: {
        get(selector: string): string {
          return '2';
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ UserDashboardComponent ],
      providers: [ MatSnackBar, HttpTestingController, {provide: Router, useValue: spyRouter}, UserService, ProductService, Overlay,
        {provide: ActivatedRoute, useValue: stubActivatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
