import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';
import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef } from '@angular/core';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

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
      declarations: [ UserRegistrationComponent, ],
      providers: [ UserService, MatSnackBar, {provide: Router, useValue: spyRouter},
        {provide: ActivatedRoute, useValue: stubActivatedRoute},
        HttpTestingController, Overlay, ChangeDetectorRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
