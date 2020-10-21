import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment} from "../../environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userToken: string;
  userName: string;
  isAdmin: any;

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  login(userLogin: string, password: string){
    return this.httpClient.post(environment.endpointURL + 'user/login', {
      userLogin, password
    }).pipe();
  }

  logout(){
    localStorage.clear();
  }

  /*registration(userName: string, password: string, userMail: string, firstName: string, lastName: string, gender,
               telephoneNumber: string, addressStreet: string, addressPin: string, addressCity: string, addressCountry: string){
    return this.httpClient.post(environment.endpointURL + 'user/register', {
      userName,
      password,
      userMail,
      firstName,
      lastName,
      gender,
      telephoneNumber,
      addressStreet,
      addressPin,
      addressCity,
      addressCountry,
    }).pipe()
  }*/

  getIsLoggedIn(){
    this.userToken = localStorage.getItem('token');
    if((!!(this.userToken))=== true){
      return true
    } else {
      return false
    }
  }

  getIsAdmin(){
    return this.isAdmin = localStorage.getItem('admin');
  }

  getUserName(){
    return this.userName = localStorage.getItem('userName');
  }

  getUserList(){
    return this.httpClient.get<User[]>(environment.endpointURL + 'user');
  }
}
