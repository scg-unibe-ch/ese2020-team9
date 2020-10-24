import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {


 admin: any;
 userName :any;
 userId: any;
 users: User[] ;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  getUserList(){
    this.httpClient.get(environment.endpointURL + 'user').subscribe((instances: any) => {
        this.users = instances.map((instance: any) => new User(instance.userId, instance.userName, instance.admin));
    });
  }

    // user - DELETE
    onUserDelete(user: User): void{
      this.httpClient.delete(environment.endpointURL + 'user/' + user.userId).subscribe(() => {
        this.users.splice(this.users.indexOf(user), 1);
      });
    }

     // user - UPDATE (upgrade to admin)
  onUserUpdate(user: User): void{
    this.httpClient.put(environment.endpointURL + 'user/makeAdmin/' + user.userId, {
      admin: user.admin,
    }).subscribe();
  }

}
