import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.css']
})
export class PasswordForgottenComponent implements OnInit {

  password: string = '';
  confPassword: string = '';
  code: any;

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('id');
  }

  resetPassword(password: string){
    this.userService.resetPassword(password, this.code).subscribe((res: any) => {
    let action = "X";
    this.openSnackBar(res.message, action);
    }, (error: any) => {
    let action = "X";
    this.openSnackBar(error.message, action);
    });
  }


  empty(input):boolean{
    return (input === '');
  }

  passwordLength(pw):boolean{
    return (pw.length >= 7);
  }

  // password contains Number
  passwordHasNumber(pw):boolean{
    let numberOfElements = 0;
    numberOfElements = /.*[0-9].*/.test(pw) ? ++numberOfElements : numberOfElements;
    if (numberOfElements >= 1) return true;
    else return false
  }

  // password contains Mixed Letters
  passwordContainsMixedLetters(pw):boolean{
    let numberOfElementsLow = 0;
    numberOfElementsLow = /.*[a-z].*/.test(pw) ? ++numberOfElementsLow : numberOfElementsLow;      // Lowercase letters
    let numberOfElementsUp = 0;
    numberOfElementsUp = /.*[A-Z].*/.test(pw) ? ++numberOfElementsUp : numberOfElementsUp;      // Uppercase letters
    if (numberOfElementsLow > 0 && numberOfElementsUp > 0) return true;
    else return false
  }

  //password contains Special Chars
  passwordContainsSpecialChar(pw):boolean{
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return (format.test(pw));
  }

  confirmPassword(cpw):boolean{
    if (this.password == cpw)
      return (this.password == cpw);
  }

  validatePassword() {
    let pw1 = this.passwordLength(this.password);
    let pw2 = this.passwordHasNumber(this.password);
    let pw3 = this.passwordHasNumber(this.password);
    let pw4 = this.passwordContainsMixedLetters(this.password);
    let pw5 = this.passwordContainsSpecialChar(this.password);
    let cpw = this.confirmPassword(this.confPassword);
    return (cpw && pw1 && pw2 && pw3 && pw4 && pw5);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000
    });
  }
}
