import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userId: any;
  isLoggedIn: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.isLoggedIn = this.userService.getIsLoggedIn();
  }
}
