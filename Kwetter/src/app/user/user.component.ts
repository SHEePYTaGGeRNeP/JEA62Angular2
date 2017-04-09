import { Component } from '@angular/core';
import { UserService } from "app/user.service";
import { User } from "app/user";
import { Tweet } from "app/tweet";

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
  providers: [UserService]
})
export class UserComponent {

  userList: User[] = [];

  viewingUser: User;
  viewingTweets: Tweet[] = [];

  constructor(private UserService: UserService) {
  }

  loadUsers() {
    this.UserService.getAll()
      .subscribe(u => {
        this.userList = u;
        this.viewingUser = this.userList[0];
      });
  }

  loadTweets() {
    if (this.viewingUser != null) {
      this.UserService.getTweets(this.viewingUser.id).subscribe(t => {
        this.viewingTweets = t;
      })
    }
  }
}
