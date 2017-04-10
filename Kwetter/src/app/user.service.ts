import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { User } from "app/user";
import { Tweet } from "app/tweet";

@Injectable()
export class UserService {
  private baseUrl: string = 'http://localhost:40629/MavenProject-web/api';
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

  getAll(): Observable<User[]> {
    let users$ = this.http
      .get(`${this.baseUrl}/users`, { headers: this.getHeaders() })
      .map(mapUsers);
    console.log("ALL USERS: " + users$);
    return users$;
  }

  getTweets(id: number): Observable<Tweet[]> {
    let tweets$ = this.http
      .get(`${this.baseUrl}/users/` + id + `/tweets`, { headers: this.getHeaders() })
      .map(mapTweets);
    console.log("TWEETS: " + tweets$);
    return tweets$;
  }

  getFeed(id: number): Observable<Tweet[]> {
    let tweets$ = this.http
      .get(`${this.baseUrl}/users/` + id + `/feed`, { headers: this.getHeaders() })
      .map(mapTweets);
    console.log("FEED: " + tweets$);
    return tweets$;
  }

  postTweet(posterId: number, message: string): Observable<boolean> {
    console.log(posterId + " " + message);
    return this.http.post(`${this.baseUrl}/tweets`, { "posterId": posterId, "message": message }, { headers: this.getPostHeaders() }).map(r => {
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
  console.log('Parsed entity:', User);
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
  console.log('Parsed entity:', Tweet);
  return Tweet;
}