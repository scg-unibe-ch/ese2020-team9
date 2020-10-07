import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

 admin: any;
 userId: any;

  constructor() { }

  ngOnInit(): void {
    this.checkAdminStatus();
  }


  checkAdminStatus(): void{
    this.admin = window.localStorage.getItem('admin') === "true";
  }


  getUserID(){
    this.userId = localStorage.getItem('userId');
  }

}
