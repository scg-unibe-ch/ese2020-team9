import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment} from "../../environments/environment";
import { User } from "../models/user.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userToken: string;
  userName: string;
  isLoggedIn = false;
  isAdmin: any;
  userId: any;
  users: User[] ;

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsAdmin());
  public isUserName: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUserName());

  constructor(private httpClient: HttpClient) { }

  login(userLogin: string, password: string){
    return this.httpClient.post(environment.endpointURL + 'user/login', {
      userLogin, password
    }).pipe();
  }

  logout(){
    localStorage.clear();
  }

  //registration is currently handled in registration Component
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
    this.userToken = localStorage.getItem('userToken');
    return !!(this.userToken);
  }

  getIsAdmin(){
    this.isAdmin = localStorage.getItem('admin');
    if (this.isAdmin === true){
      return true;
    }
    return false;
  }

  getUserName(){
    return this.userName = localStorage.getItem('userName');
  }

  getUserId(){
    return this.userId = localStorage.getItem('userId');
  }

  getUserList(){
    this.httpClient.get(environment.endpointURL + 'user').subscribe((instances: any) => {
      this.users = instances.map((instance: any) => new User(instance.userId, instance.userName, instance.admin ));
    });
    return this.users;
  }

  getToken(){
      return this.userToken = localStorage.getItem('userToken');
    }

}
