import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../models/user.model";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  userName :any;
  userId: any;
  users: User[] ;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
  }


  getUserList(){
    this.httpClient.get(environment.endpointURL + 'user').subscribe((instances: any) => {
      this.users = instances.map((instance: any) => new User(instance.userId, instance.userName ));
    });
  }

}
