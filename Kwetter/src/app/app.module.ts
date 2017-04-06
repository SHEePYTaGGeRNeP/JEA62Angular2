import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from "app/user/user.component";
import { routes } from "app/app.routes";
//import { AnotherComponent  } from './Another.component';
//import { routes } from './app.routes';
//import { TweeterService } from "app/tweeter.service";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [UserComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
