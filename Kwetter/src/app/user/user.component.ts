import { Component } from '@angular/core';
import { UserService } from "app/user.service";
import { User } from "app/user";

@Component({
  selector: 'app-root',
  templateUrl: '../app.component.html',
  styleUrls: ['../app.component.css'],
  providers: [UserService]
})
export class AppComponent {

  userList: User[] = [];

  constructor(private UserService: UserService) {
  }

  loadUsers() {
    this.UserService.getAll()
      .subscribe(u => this.userList = u);
  }
}
