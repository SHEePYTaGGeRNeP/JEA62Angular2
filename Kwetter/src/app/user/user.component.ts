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

  likeTweet(tweetId: number, value: number) {
    console.log("liking tweet: " + tweetId);
    this.UserService.likeTweet(tweetId, value).subscribe(r => this.loadFeed());
  }

  followUser(thisUser: number, userToFollow: number) {
    console.log(thisUser + " following: " + userToFollow);
    this.UserService.followUser(thisUser, userToFollow).subscribe(r => {
      this.reloadCurrentUser();
      this.loadFeed();
    });
  }

  addFollowButton(id: number): boolean {
    console.log("- - - - - - - addbutton: " + id);
    let result: boolean = true;
    this.viewingUser.following.forEach((fol) => {  // foreach statement
      console.log(fol);
      console.log("compare " + fol.id + " == " + id);
      if (fol.id == id) {
        console.log('set to  false');
        result = false;
      }
    });

    // for (let fol of this.viewingUser.following) {
    //   console.log(fol);
    //   //console.log("following me " + fol.username);
    //   if (fol.id = id) {
    //     //console.log("return false for " + fol.username);
    //     return false;
    //   }
    // }
    console.log("return " + result);
    return result;
  }

  loadUsers() {
    this.UserService.getAllUsers()
      .subscribe(u => {
        this.userList = u;
        this.viewingUser = this.userList[getRandomInt(0, this.userList.length - 1)];
        this.loadTweets();
      });
  }

  reloadCurrentUser() {
    this.UserService.getUser(this.viewingUser.id)
      .subscribe(u => {
        this.viewingUser = u;
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