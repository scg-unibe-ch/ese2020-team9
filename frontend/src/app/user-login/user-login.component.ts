import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLogin = '';
  password = '';

  userToken: string;
  userName: string;
  admin: boolean;

  //loggedIn = false;

  userAuth = '';
  secureEndpointResponse = '';
  isUserLoggedIn: boolean;
  isUserAdmin: boolean;

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    //this.checkoutStatus();
  }

  //replaced this function by subscribing to isUserLoggedIn Observable, don't know if better approach!
/*checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userLogin = localStorage.getItem('userLogin');
    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }*/

  login(): void {
    this.userService.login(this.userLogin, this.password).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('admin', res.user.admin);
      localStorage.setItem('userId', res.user.userId);
      //updates isUserLoggedIn value
      this.userService.isUserLoggedIn.next(true);
      //update isUserAdmin value
      this.userService.isUserAdmin.next(res.user.admin);
      //navigates to dashboard
      this.router.navigate(['/home']);
      //this.checkUserStatus();
      }, (error: any) => {
        this.userAuth = 'Your Username/Email and/or Password is wrong, try again!';
      });
  }

  logout(): void {
    this.userService.logout();
    //updates isUserLoggedIn value
    this.userService.isUserLoggedIn.next(false);
    //navigates to dashboard
    this.router.navigate(['/home']);
    //this.checkUserStatus();
  }



  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }
}
