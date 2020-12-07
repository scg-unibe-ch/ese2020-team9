import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean;
  isUserAdmin: boolean;
  isUserName: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.userService.isUserAdmin.subscribe(value => {
      this.isUserAdmin = value;
    });

    this.userService.isUserName.subscribe(value => {
      this.isUserName = value;
    });
  }

  logout(): void {
    this.userService.logout();
    //updates isUserLoggedIn value
    this.userService.isUserLoggedIn.next(false);
    //update isUserAdmin value
    this.userService.isUserAdmin.next(false);
    //navigates to dashboard
    this.router.navigate(['/login']);
  }

  public getUserId(): any {
    return localStorage.getItem('userId');
  }
}
