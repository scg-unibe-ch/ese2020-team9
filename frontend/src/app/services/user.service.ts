import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { environment} from "../../environments/environment";
import {EditUser, RegisterUser, User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userToken: string;
  userName: string;
  userId: any;
  userWallet: any;
  users: User[] ;
  userHighscore: number;


  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) { }

  /** get requests **/
  getUser(id: number){
    return this.httpClient.get(environment.endpointURL + 'user/' + id);
  }

  getUserList(){
    return this.httpClient.get(environment.endpointURL + 'user');
  }

  /** post requests **/
  registration(user: RegisterUser): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'user/register', user);
  }

  login(userLogin: string, password: string): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'user/login', {
      userLogin, password
    });
  }

  editUser(user: EditUser): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'user/edit/', user);
  }

  passwordForgotten(userEmail: string): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'user/passwordForgotten', {userEmail});
  }

  resetPassword(password: string, token): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(environment.endpointURL + 'user/restorePassword', {password}, { headers: headers });
  }

  getGameHighscoreTopList(): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'user/highscores/game');
  }

  getOverallHighscoreTopList(): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'user/highscores/overall');
  }

  saveHighscore(highscore: number): Observable<any> {
    return this.httpClient.put(environment.endpointURL + 'user/updateGameScore/' + this.getUserId()
       +  '/' + highscore, {});
  }

  /** delete request **/
  deleteUser(user: User): Observable<User> {
    return this.httpClient.delete<User>(environment.endpointURL + 'user/' + user.userId);
  }

  /** put request **/
  upgradeUser(userId: number, admin: boolean) {
    return this.httpClient.put(environment.endpointURL + 'user/makeAdmin/' + userId, admin);
  }

  /** Functions to get specific user attributes from local storage **/

  logout(){
    localStorage.clear();
  }

  getToken(){
    return this.userToken = localStorage.getItem('userToken');
  }

  getUserName(){
    return this.userName = localStorage.getItem('userName');
  }

  getUserId(){
    return this.userId = localStorage.getItem('userId');
  }

  getUserWallet(){
    return this.userWallet = localStorage.getItem('userWallet');
  }

  getUserHighscore(): number {
    return this.userHighscore = Number.parseInt(localStorage.getItem('userHighscore'), 10);
  }

}
