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

  it('should check if field is empty', () => {
        let toBeTested = "";
        expect(component.evaluate(toBeTested)).toBe(false);
        toBeTested = "a";
        expect(component.evaluate(toBeTested)).toBe(true);

      });

  it('should not be a valid email', () => {
         let email = '';
         expect(component.validateEmail(email)).toBe(false)
         email = 'a';
         expect(component.validateEmail(email)).toBe(false);
         email = 'a@';
         expect(component.validateEmail(email)).toBe(false);
         email = 'a@b';
         expect(component.validateEmail(email)).toBe(false);
         email = 'a@b.c';
         expect(component.validateEmail(email)).toBe(false);

      });

  it('should be a valid email', () => {
         let email = 'abc@abc.com';
         expect(component.validateEmail(email)).toBe(true);
       });

  it('should make sure passwordLength > 7', () => {
           let pw = '123456';
           expect(component.passwordLength(pw)).toBe(false);
           pw = '1234567'
           expect(component.passwordLength(pw)).toBe(true);

         });

  it('should make sure the password has a number in it', () => {
            let pw = '';
            expect(component.passwordHasNumber(pw)).toBe(false);
            pw = 'a';
            expect(component.passwordHasNumber(pw)).toBe(false);
            pw = '!';
            expect(component.passwordHasNumber(pw)).toBe(false);
            pw = '1';
            expect(component.passwordHasNumber(pw)).toBe(true);
           });

  it('should make sure the password has a mixed Letters in it', () => {
              let pw = '';
              expect(component.passwordContainsMixedLetters(pw)).toBe(false);
              pw = 'a';
              expect(component.passwordContainsMixedLetters(pw)).toBe(false);
              pw = 'a!';
              expect(component.passwordContainsMixedLetters(pw)).toBe(false);
              pw = 'a1';
              expect(component.passwordContainsMixedLetters(pw)).toBe(false);
              pw = 'a1!';
              expect(component.passwordContainsMixedLetters(pw)).toBe(false);
              pw = 'aB';
              expect(component.passwordContainsMixedLetters(pw)).toBe(true);
             });

  it('should make sure the password has a special characters in it', () => {
                let pw = '';
                expect(component.passwordContainsSpecialChar(pw)).toBe(false);
                pw = 'a';
                expect(component.passwordContainsSpecialChar(pw)).toBe(false);
                pw = 'a1';
                expect(component.passwordContainsSpecialChar(pw)).toBe(false);
                pw = 'aB';
                expect(component.passwordContainsSpecialChar(pw)).toBe(false);
                pw = 'a!';
                expect(component.passwordContainsSpecialChar(pw)).toBe(true);
               });

  it('should make sure the passwords match', () => {
            component.password = '1234'
            let test = 'x';
            expect(component.confirmPassword(test)).toBe(false);
            test = '1234';
            expect(component.confirmPassword(test)).toBe(true);

           });




});
