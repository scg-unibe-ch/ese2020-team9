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

  public isUserLoggedIn: BehaviorSubject<boolean>;
  public isUserAdmin: BehaviorSubject<boolean>;
  public isUserName: BehaviorSubject<string>;

  constructor(private httpClient: HttpClient) {

      this.userToken = localStorage.getItem('userToken');
      this.userId = localStorage.getItem('userId');
      this.userName = localStorage.getItem('userName');
      this.userWallet = localStorage.getItem('userWallet');

      const admin = localStorage.getItem('admin');

      this.isUserLoggedIn = new BehaviorSubject<boolean>(this.userToken !== null );
      this.isUserAdmin = new BehaviorSubject<boolean>(admin === 'true');
      this.isUserName = new BehaviorSubject<string>(this.userName);

      }

  /** get requests **/
  getUser(id: number) {
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
    this.clearAttributes();
  }

  getToken(){
    return this.userToken;
  }

  getUserName(){
    return this.userName;
  }

  getUserId(){
    return localStorage.userId;
  }

  getUserWallet(){
    return this.userWallet;
  }

  getUserHighscore(): number {
    return this.userHighscore = Number.parseInt(localStorage.getItem('userHighscore'), 10);
  }

  private clearAttributes(): void {
    this.userHighscore = null;
    this.userId = null;
    this.userName = null;
    this.userToken = null;
    this.userWallet = null;
    this.isUserName.next(null);
  }

}
