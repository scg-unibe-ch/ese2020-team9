import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userId: any;
  isLoggedIn: boolean;
  userName: string;
  isAdmin: boolean;

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.isLoggedIn = this.userService.getIsLoggedIn();
    this.isAdmin = this.userService.getIsAdmin();
    this.userName = this.userService.getUserName();

  }
}
