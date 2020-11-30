import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import { Location } from "@angular/common";
import {EditUser, RegisterUser, User} from "../../models/user.model";
import {_isNumberValue} from "@angular/cdk/coercion";


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userName = '';
  password = '';
  confPassword = '';
  userMail = '';
  firstName = '';
  lastName = '';
  gender = '';
  phoneNumber = '';
  addressStreet = '';
  addressPin = '';
  addressCity = '';
  addressCountry = '';

  test: boolean;
  userId = '';
  userToken: string;
  admin: boolean;
  isUserLoggedIn: boolean;
  edit: boolean;
  id: any;
  message ='';
  action = '';

  user: User;
  editedUser: EditUser;
  registerUser: RegisterUser;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
      this.userId = this.userService.getUserId();
      this.id = this.route.snapshot.paramMap.get('id');

      //check which button to show
      if(this.id === '0'){
        this.edit = false;
      } else{
        this.edit = true;
        this.getUser();
      }
    }

  registration(): void {
    this.registerUser = {
      userName: this.userName,
      password: this.password,
      userMail: this.userMail,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      phoneNumber: Number(this.phoneNumber),
      addressStreet: this.addressStreet,
      addressPin: this.addressPin,
      addressCity: this.addressCity,
      addressCountry: this.addressCountry,
    };
      this.userService.registration(this.registerUser).subscribe((res: any) => {
        // Set user data in local storage
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('admin', res.admin);
        localStorage.setItem('userWallet', res.wallet);
        //updates isUserLoggedIn value
        this.userService.isUserLoggedIn.next(true);
        //get User Name
        this.userService.isUserName.next(res.userName);
        //update isUserAdmin value
        this.userService.isUserAdmin.next(res.admin);
        //navigates to dashboard
        this.router.navigate(['/home']);

        let message = "Registration was successful!";
        let action = "Welcome";
        this.openSnackBar(message, action);
        }, (error: any) => {

        // can't access backend message
        let message = "Registration was not successful!";
        let action = "X";
        this.openSnackBar(message, action);
      });
  }

  getUser(){
    this.userService.getUser(this.id).subscribe((instances: any) => {
      this.userMail = instances.userMail;
      this.password = instances.password;
      this.userName = instances.userName;
      this.firstName = instances.firstName;
      this.lastName = instances.lastName;
      this.gender = instances.gender;
      this.phoneNumber = instances.phoneNumber;
      this.addressStreet = instances.addressStreet;
      this.addressPin = instances.addressPin;
      this.addressCity = instances.addressCity;
      this.addressCountry = instances.addressCountry;

    },(error: any) => {
      let action = "";
      this.openSnackBar(error.message, action);
    });
  }

  editUser(){
    this.editedUser = {
      userId: Number(this.userId),
      userName: this.userName,
      userMail: this.userMail,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      phoneNumber: Number(this.phoneNumber),
      addressStreet: this.addressStreet,
      addressPin: this.addressPin,
      addressCity: this.addressCity,
      addressCountry: this.addressCountry,
    };

    this.userService.editUser(this.editedUser).subscribe((res: any) => {
      //check if user name changed and subscribe to it
      this.userService.isUserName.next(res.userName);
      //set new user name into local storage
      localStorage.setItem('userName', res.userName);
      let message = "You successfully updated your profile!";
      let action = "X";
      this.openSnackBar(message, action);
    }, (error: any) => {
      let message = "Your profile update is invalid!";
      let action = "X";
      this.openSnackBar(message, action);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  goBack(): void {
    this.location.back();
  }


  /** registration checks **/
  registrationComplete():boolean{
    return (this.userId !=='');
  }

  evaluate(o):boolean{
    return (o.length > 0);
  }

  validateEmail(email) {
   const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return regularExpression.test(String(email).toLowerCase());
  }

  empty(o):boolean{
      return (o === "");
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

  //make register button visible
  allFieldsAreFilled():boolean{
    if (this.stepOneComplete() && this.stepTwoComplete()){ return true}
    else {
      return false
    }
  }

  checkCountryCode(c:string):boolean{
    let check = "CH";
    return (c==check);
  }

  // check if field is number
  checkNumber(input):boolean{
    return (_isNumberValue(input));
  }

  requestCity(){
    let params = {
          codes: this.addressPin,
          country: "CH",
          apikey: '4bc7d070-229b-11eb-8bf2-6be81465cc4d'
    };
    if (this.addressPin.length == 4){this.httpClient.get('http://localhost:4200/api/v1/search', {params}).subscribe((res: any) => {
        if (res != null) {
            this.addressCity = res.results[this.addressPin][0].city;
            console.log(res.results[this.addressPin][0].city)
        }

      }, (error: any) => {
            this.addressCity = "";
      });
    }
  }

  stepOneComplete(){
    let em = this.validateEmail(this.userMail);
    let un = this.evaluate(this.userName);
    let pw1 = this.passwordLength(this.password);
    let pw2 = this.passwordHasNumber(this.password);
    let pw3 = this.passwordHasNumber(this.password);
    let pw4 = this.passwordContainsMixedLetters(this.password);
    let pw5 = this.passwordContainsSpecialChar(this.password);
    let cpw = this.confirmPassword(this.confPassword);
    if (em && un && cpw && pw1 && pw2 && pw3 && pw4 && pw5){ return true}
    else {
      return false
    }
  }

  stepTwoComplete(){
    let fn = this.evaluate(this.firstName);
    let ln = this.evaluate(this.lastName);
    if (fn && ln){ return true}
    else {
      return false
    }
  }


 }
