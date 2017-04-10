import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  viewingFeed: Tweet[] = [];

  loaded: boolean = false;


  ngOnInit() {
    this.loadUsers();
  }

  constructor(private UserService: UserService) {
  }

  postTweet(tweetMessage: string) {
    if (tweetMessage == '') return;
    console.log("tweetmessage: " + tweetMessage);
    this.UserService.postTweet(this.viewingUser.id, tweetMessage).subscribe(r => this.loadTweets());
  }

  loadUsers() {
    this.UserService.getAll()
      .subscribe(u => {
        this.userList = u;
        this.viewingUser = this.userList[getRandomInt(0, this.userList.length - 1)];
        this.loadTweets();
      });
  }

  loadTweets() {
    if (this.viewingUser != null) {
      this.UserService.getTweets(this.viewingUser.id).subscribe(t => {
        this.viewingTweets = t;
        this.loadFeed();
      });
    }
  }

  loadFeed() {
    if (this.viewingUser != null) {
      this.UserService.getFeed(this.viewingUser.id).subscribe(t => {
        this.viewingFeed = t;
        this.loaded = true;
      });
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}