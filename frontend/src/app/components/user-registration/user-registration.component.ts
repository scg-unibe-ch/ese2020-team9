import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

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
  telephoneNumber = '';
  addressStreet = '';
  addressPin = '';
  addressCity = '';
  addressCountry = '';

  test: boolean;
  userId = '';
  userToken: string;
  admin: boolean;
  isUserLoggedIn: boolean;

  edit: boolean
  id: any;
  userAuth = '';

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService, private route: ActivatedRoute, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    })

    this.userId = this.userService.getUserId();
        this.id = this.route.snapshot.paramMap.get('id');

        if(this.id==='0'){
          this.edit = false;
        } else{
          this.edit=true;
          //this.getUserById();
        }
  }

  registration(): void {
      this.httpClient.post(environment.endpointURL + 'user/register', {
        userName: this.userName,
        password: this.password,
        userMail: this.userMail,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        telephoneNumber: this.telephoneNumber,
        addressStreet: this.addressStreet,
        addressPin: this.addressPin,
        addressCity: this.addressCity,
        addressCountry: this.addressCountry,


      }).subscribe((res: any) => {
          // Set user data in local storage
           localStorage.setItem('userToken', res.token);
           localStorage.setItem('userId', res.userId);
           localStorage.setItem('userName', res.userName);
           localStorage.setItem('admin', res.admin);
            this.userId = res.userId;
            //updates isUserLoggedIn value
            this.userService.isUserLoggedIn.next(true);
            //get User Name
            this.userService.isUserName.next(res.userName);
            //update isUserAdmin value
            this.userService.isUserAdmin.next(res.admin);
            //navigates to dashboard
            this.router.navigate(['/home'])
           }, (res: any) => {
            this.userAuth = 'This Username or Email Address is already taken';
      });
    }

  registrationComplete():boolean{
    if (this.userId ===''){
       return false
       } else {return true}
  }

  evaluate(o):boolean{
    if (o.length > 0) return true;
    else return false
  }

  emailFormat(e):boolean{
  if (e.includes('@')) return true;
      else return false
      }

  //check if field is empty
  empty(o):boolean{
      if (o === "") return true;
      else return false
    }

  //password is at least 7 characters
  passwordLength(pw):boolean{
      if (pw.length >= 7) return true;
      else return false
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

      if(format.test(pw)){
        return true;
      } else {
        return false;
      }

  }

  confirmPassword(cpw):boolean{
       if(this.password == cpw){
         return true;
       } else {
         return false;
       }
   }

  //make register button visible
  allFieldsAreFilled():boolean{
    let un = this.evaluate(this.userName);
    let fn = this.evaluate(this.firstName);
    let ln = this.evaluate(this.lastName);
    let em = this.emailFormat(this.userMail);
    let cpw = this.evaluate(this.confPassword);
    let pw1 = this.passwordLength(this.password);
    let pw2 = this.passwordHasNumber(this.password);
    let pw3 = this.passwordHasNumber(this.password);
    let pw4 = this.passwordContainsMixedLetters(this.password);
    let pw5 = this.passwordContainsSpecialChar(this.password);
    if (un&&fn&&ln&&em&&cpw&&pw1&&pw2&&pw3&&pw4&&pw5){ return true}
    else {
      return false
    }
  }

  getUserById(){
      this.userService.getUserById(this.id).subscribe((instances: any) => {
            this.userMail = instances.userMail;
            this.password = instances.password;
            this.userName = instances.userName;
            this.firstName = instances.firstName;
            this.lastName = instances.lastName;
            this.gender = instances.gender;
            this.telephoneNumber = instances.telephoneNumber;
            this.addressStreet = instances.addressStreet;
            this.addressPin = instances.addressPin;
            this.addressCity = instances.addressCity;
            this.addressCountry = instances.addressCountry;

            this.changeDetection.detectChanges();

        },(error: any) => {
        this.userAuth = 'There is no corresponding User!';
      });
    }

  openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

}
