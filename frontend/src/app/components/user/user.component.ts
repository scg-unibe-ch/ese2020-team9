import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input()
  user: User = new User(null, null, false);

  @Output()
  update = new EventEmitter<User>();


  @Output()
  delete = new EventEmitter<User>();

  onUserUpdate(): void {
    // Emits event to parent component that User got updated
    this.update.emit(this.user);
  }

  onUserDelete(): void {
    // Emits event to parent component that User got deleted
    this.delete.emit(this.user);
  }





}
