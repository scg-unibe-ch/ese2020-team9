import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  isAdmin: any;
  userId: any;

  constructor() { }

  ngOnInit(): void {
    this.checkAdminStatus();
  }


  checkAdminStatus(): void {
    this.isAdmin = localStorage.getItem('isAdmin');
  }


  getUserID(){
    this.userId = localStorage.getItem('userId');
  }

}
