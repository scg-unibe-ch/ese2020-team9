import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean;
  isUserAdmin: boolean;
  isUserName: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.userService.isUserAdmin.subscribe(value => {
      this.isUserAdmin = value;
    });

    this.userService.isUserName.subscribe(value => {
      this.isUserName = value;
    })

  }
}
