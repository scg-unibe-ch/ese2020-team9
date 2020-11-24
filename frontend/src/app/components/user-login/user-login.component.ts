import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLogin = '';
  password = '';

  userAuth = '';
  isUserLoggedIn: boolean;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }

  login(): void {
    this.userService.login(this.userLogin, this.password).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('admin', res.user.admin);
      localStorage.setItem('userId', res.user.userId);
      localStorage.setItem('userWallet', res.user.wallet);
      //updates isUserLoggedIn value
      this.userService.isUserLoggedIn.next(true);
      //get User Name
      this.userService.isUserName.next(res.user.userName);
      //update isUserAdmin value
      this.userService.isUserAdmin.next(res.user.admin);
      //navigates to dashboard
      this.router.navigate(['/home']);
      }, (error: any) => {
        //let message = "Your Username/Email and/or Password is wrong, try again!"
        let action = "Retry"
        this.openSnackBar(error.error.message, action);
        //this.userAuth = 'Your Username/Email and/or Password is wrong, try again!';
      });
  }

  logout(): void {
    this.userService.logout();
    //updates isUserLoggedIn value
    this.userService.isUserLoggedIn.next(false);
    //update isUserAdmin value
    this.userService.isUserAdmin.next(false);
    //navigates to dashboard
    this.router.navigate(['/home']);
  }

  openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 3000
      });
    }

}
