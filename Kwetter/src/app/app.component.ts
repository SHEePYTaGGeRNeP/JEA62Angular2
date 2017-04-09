import { Component } from '@angular/core';
import { User } from "app/user";
import { UserService } from "app/user.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'app works!'
}
