import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UserComponent } from "app/user/user.component";
import { routes } from "app/app.routes";
import { AppComponent } from "app/app.component";
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [UserComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
