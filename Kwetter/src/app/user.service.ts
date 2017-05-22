import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { User } from "app/user";
import { Tweet } from "app/tweet";

@Injectable()
export class UserService {
  private baseUrl: string = 'http://localhost:8080/MavenProject-web/api';
  private baseUrlMicro: string = 'http://localhost:37762/api/Tweets';

  constructor(private http: Http) { }

  private getHeaders() {
    let headers = new Headers()
    headers.append('Accept', 'application/json');
    return headers;
  }

  private getPostHeaders() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getAllUsers(): Observable<User[]> {
    let users$ = this.http
      .get(`${this.baseUrl}/users`, { headers: this.getHeaders() })
      .map(mapUsers);
    return users$;
  }


  getUser(id: number): Observable<User> {
    let user$ = this.http
      .get(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() })
      .map(mapUser);
    console.log("CURRENT USERS: " + user$);
    return user$;
  }

  getTweets(id: number): Observable<Tweet[]> {
    console.log("mapping normal tweets");
    let tweets$ = this.http
      .get(`${this.baseUrl}/users/` + id + `/tweets`, { headers: this.getHeaders() })
      .map(mapTweets);
    
    // DOESNT GET CALLED
    console.log("mapping micro tweets " + `${this.baseUrlMicro}/By/`  + id);
    let tweets2$ = this.http
      .get(`${this.baseUrlMicro}/by/` + id, { headers: this.getHeaders() })
      .map(mapTweets);
    
    console.log("MICRO TWEETS: ");
    console.log(tweets2$);
    tweets$ = tweets$.concat(tweets2$);
    console.log("MERGED: " + tweets$);
    return tweets$;
  }

  getFeed(id: number): Observable<Tweet[]> {
    let tweets$ = this.http
      .get(`${this.baseUrl}/users/` + id + `/feed`, { headers: this.getHeaders() })
      .map(mapTweets);
    return tweets$;
  }

  postTweet(posterId: number, message: string): Observable<boolean> {
    console.log(posterId + " " + message);
    return this.http.post(`${this.baseUrl}/tweets`, { "posterId": posterId, "message": message }, { headers: this.getPostHeaders() }).map(r => {
      console.log(r);
      return true;
    });
  }

  likeTweet(tweetId: number, value: number): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/tweets/${tweetId}/rate/${value}`, { headers: this.getPostHeaders() }).map(r => {
      console.log(r);
      return true;
    });
  }

  followUser(thisUser: number, userToFollow: number): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/users/${thisUser}/follow/${userToFollow}`, { headers: this.getPostHeaders() }).map(r => {
      console.log(r);
      return true;
    });
  }





}
function mapUsers(response: Response): User[] {
  // extracts a list of entities from the Response
  return response.json().map(toUser);
}


function mapTweets(response: Response): Tweet[] {
  // extracts a list of entities from the Response
  console.log(response);
  return response.json().map(toTweet);
}

function mapUser(response: Response): User {
  // extracts one entity from the response
  return toUser(response.json());
}

function toUser(data: any): User {
  // converts JSON data to specifeid entity
  let User = <User>({
    id: data.id,
    username: data.username,
    bio: data.bio,
    location: data.location,
    website: data.website,
    followers: data.followers,
    following: data.following
  });
  console.log('Parsed user:', User);
  return User;
}


function toTweet(data: any): Tweet {
  // converts JSON data to specifeid entity
  let Tweet = <Tweet>({
    id: data.id,
    message: data.message,
    poster: data.poster,
    rating: data.rating,
    taggedUsers: data.taggedUsers,
    tags: data.tags,
    tweetDate: data.tweetdate
  });
  console.log('Parsed tweet:', Tweet);
  return Tweet;
}