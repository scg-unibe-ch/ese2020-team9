import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  email: string = '';

  constructor(private _snackBar: MatSnackBar,  public dialogRef: MatDialogRef<DialogBodyComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(this.email);
  }

  submitDialog(){
    this.dialogRef.close(this.email);
  }

  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  empty(email): boolean{
    return (email === '');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
