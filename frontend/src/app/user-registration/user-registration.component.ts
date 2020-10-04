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
  email = '';
  firstName = '';
  lastName = '';
  gender = '';
  telephoneNumber = '';
  street = '';
  zipCode = '';
  city = '';
  country = '';


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  registration(): void {
      this.httpClient.post(environment.endpointURL + 'user/registration', {
        userName: this.userName,
        password: this.password,

      }).subscribe((res: any) => {

      });
    }


  evaluate(userName):boolean{
    if (userName.length > 0) return true
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

  // Numbers
  passwordHasNumber(pw):boolean{
      let numberOfElements = 0;
      numberOfElements = /.*[0-9].*/.test(pw) ? ++numberOfElements : numberOfElements;
      if (numberOfElements >= 1) return true;
      else return false
  }

  //
  passwordContainsMixedLetters(pw):boolean{
        let numberOfElementsLow = 0;
        numberOfElementsLow = /.*[a-z].*/.test(pw) ? ++numberOfElementsLow : numberOfElementsLow;      // Lowercase letters
         let numberOfElementsUp = 0;
        numberOfElementsUp = /.*[A-Z].*/.test(pw) ? ++numberOfElementsUp : numberOfElementsUp;      // Uppercase letters
        if (numberOfElementsLow > 0 && numberOfElementsUp > 0) return true;
           else return false
   }
  // Special Chars
  passwordContainsSpecialChar(pw):boolean{

      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if(format.test(pw)){
        return true;
      } else {
        return false;
      }

  }

  lala(){
    return true
  }

  //make register button visible
  allFieldsAreFilled():boolean{
    var x = true
    if (x){ return true}
    else {
      return false
    }
  }

}
