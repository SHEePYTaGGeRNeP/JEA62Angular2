import { Routes } from '@angular/router';
import { UserComponent } from "app/user/user.component";

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: 'user', component: UserComponent }
];
