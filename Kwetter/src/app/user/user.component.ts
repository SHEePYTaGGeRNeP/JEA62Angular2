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

  tweetForm: FormGroup;
  ngOnInit() {
    this.loadUsers();
  }

  constructor(private UserService: UserService) {
    // this.tweetForm = new FormGroup({
    //   tweet: new FormControl('', [Validators.required]) // initial value
    // });
  }


  postTweet(tweetMessage : string) {
    console.log("tweetmessage: "+ tweetMessage);
    this.UserService.postTweet(this.viewingUser.id, tweetMessage).subscribe(r => this.loadTweets());
  }


  loadUsers() {
    this.UserService.getAll()
      .subscribe(u => {
        this.userList = u;
        this.viewingUser = this.userList[0];
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
