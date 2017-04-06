
// Define which component should be loaded based on the current URL
import { UserComponent } from "app/user/user.component";
import { Routes } from "@angular/router";
import { TestComponent } from "app/test/test.component";

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'test', component: TestComponent }
];
