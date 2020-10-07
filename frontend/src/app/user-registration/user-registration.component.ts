import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userName = '';
  password = '';
  userMail = '';
  firstName = '';
  lastName = '';
  gender = '';
  telephoneNumber = '';
  adressStreet = '';
  adressPin = '';
  adressCity = '';
  adressCountry = '';

  test: boolean;
  userId = '';
  registeredIn = false;
  userToken: string;
  admin: boolean;

  userAuth = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkRegistrationStatus()
  }

  checkRegistrationStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');

    // Set boolean whether a user is registered or not
    this.registeredIn = !!(this.userToken);
  }

  //refresh browser window
  refresh(): void {
    window.location.reload();
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
        adressStreet: this.adressStreet,
        adressPin: this.adressPin,
        adressCity: this.adressCity,
        adressCountry: this.adressCountry,


      }).subscribe((res: any) => {
          // Set user data in local storage
           localStorage.setItem('userToken', res.token);
           localStorage.setItem('userId', res.userId);
           localStorage.setItem('userName', res.userName);
           localStorage.setItem('admin', res.admin);
           }, (error: any) => {
            this.userAuth = 'Your Registration is invalid!';
      });
    }

  registrationComplete():boolean{
    if (this.userId ===''){
       return false
       } else {return true}
  }

  evaluate(o):boolean{
    if (o.length > 0) return true
    else return false
  }

  emailFormat(e):boolean{
  if (e.includes('@')) return true
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



  //make register button visible
  allFieldsAreFilled():boolean{
    let un = this.evaluate(this.userName);
    let fn = this.evaluate(this.firstName);
    let ln = this.evaluate(this.lastName);
    let pw1 = this.passwordLength(this.password);
    let pw2 = this.passwordHasNumber(this.password);
    let pw3 = this.passwordHasNumber(this.password);
    let pw4 = this.passwordContainsMixedLetters(this.password);
    let pw5 = this.passwordContainsSpecialChar(this.password);
    if (un&&fn&&ln&&pw1&&pw2&&pw3&&pw4&&pw5){ return true}
    else {
      return false
    }
  }

}
