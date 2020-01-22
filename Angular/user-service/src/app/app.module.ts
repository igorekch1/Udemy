import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UsersComponent } from "./users/users.component";
import { UserService } from "./services/user.service";
import { LoggingService } from "./services/logging.service";

@NgModule({
  declarations: [AppComponent, UsersComponent],
  imports: [BrowserModule],
  providers: [UserService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
