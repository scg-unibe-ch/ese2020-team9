import { HttpClient, HttpHandler } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { ProductService } from './../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';
import { Overlay } from '@angular/cdk/overlay';
import { Observable, of } from 'rxjs';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  const stubUserService = {
    getToken(): string {
      return 'oo7';
    },
    getUserList(): Observable<any> {
      return of([{
        userName: 'Billy'
      },
      {
        userName: 'Bobby'
      }]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ AdminPanelComponent ],
      providers: [ MatSnackBar, HttpTestingController, ProductService,
        UserService, Overlay ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('', () => {});
});
