import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from "app/user";

@Injectable()
export class UserService {
  private baseUrl: string = 'http://localhost:40629/MavenProject-web/api';

  constructor(private http: Http) { }

  private getHeaders() {
    let headers = new Headers()
    headers.append('Accept', 'application/json');
    return headers;
  }

  getAll(): Observable<User[]> {
    let users$ = this.http
      .get(`${this.baseUrl}/users`, { headers: this.getHeaders() })
      .map(mapUsers);
    return users$;
  }
}

function mapUsers(response: Response): User[] {
  // extracts a list of entities from the Response
  return response.json().results.map(toUser);
}

function mapUser(response: Response): User {
  // extracts one entity from the response
  return toUser(response.json());
}

function toUser(data: any): User {
  // converts JSON data to specifeid entity
  let User = <User>({
    username: data.username
  });
  console.log('Parsed entity:', User);
  return User;
}
