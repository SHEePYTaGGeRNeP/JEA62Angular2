import { Component } from '@angular/core';
import { UserService } from "app/user.service";
import { User } from "app/user";

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
  providers: [UserService]
})
export class UserComponent {

  userList: User[] = [];

  constructor(private UserService: UserService) {
  }

  loadUsers() {
    this.UserService.getAll()
      .subscribe(u => this.userList = u);
  }
}
