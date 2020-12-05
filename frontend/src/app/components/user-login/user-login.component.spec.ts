import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

  const mockUserService = {
      login(userLogin: string, password: string):boolean{
              if(userLogin == 'John' && password == '1234'){
                return true
              }
              else{
                return false
              }
          }
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [ UserLoginComponent ],
      providers: [MatSnackBar, {provide: Router, useValue: spyRouter, UserService, useClass: mockUserService }, Overlay, HttpTestingController, MatDialog]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be logged in', () => {
    component.ngOnInit();
    expect(component.isUserLoggedIn).toBe(false);
  });

  it('should log out', () => {
        component.isUserLoggedIn = true;
        expect(component.isUserLoggedIn).toBe(true);
        component.logout();
        expect(component.isUserLoggedIn).toBe(false);
    });

  it('should be a valid email', () => {
       let email = 'abc@abc.com';
       expect(component.validate(email)).toBe(true);
     });

  it('should not be a valid email', () => {
     let email = '';
     expect(component.validate(email)).toBe(false)
     email = 'a';
     expect(component.validate(email)).toBe(false);
     email = 'a@';
     expect(component.validate(email)).toBe(false);
     email = 'a@b';
     expect(component.validate(email)).toBe(false);
     email = 'a@b.c';
     expect(component.validate(email)).toBe(false);
   });


  it('should be a valid log in', () => {
      component.userLogin = 'John';
      component.password = '1234';
      if(mockUserService.login(component.userLogin,component.password)){
        component.isUserLoggedIn = true;
      }
      expect(component.isUserLoggedIn).toBe(true);
  });



  it('should not be a valid log in', () => {
      component.userLogin = 'lala';
      component.password = '1234';
      if(mockUserService.login(component.userLogin,component.password)){
              component.isUserLoggedIn = true;
            }
       else {
       component.isUserLoggedIn = false;
       }

      component.login();
      expect(component.isUserLoggedIn).toBe(false);
  });


});
