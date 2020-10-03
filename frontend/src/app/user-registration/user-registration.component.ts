import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userName = '';
  password = '';
  email = '';
  firstName = '';
  lastName = '';
  gender = '';
  telephoneNumber = '';
  address = '';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  registration(): void {
      this.httpClient.post(environment.endpointURL + 'user/registration', {
        userName: this.userName,
        password: this.password,

      }).subscribe((res: any) => {

      });
    }



}
