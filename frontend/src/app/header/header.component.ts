import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean;
  //isAdmin: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    //this.getIsAdmin();

  }

  /*getIsAdmin(){
    this.isAdmin = this.userService.getIsAdmin();
  }*/

}
