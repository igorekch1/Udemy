import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./user/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  isActivated = false;
  private activateSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activateSub = this.userService.activatedEmitter.subscribe(
      (data: boolean) => {
        this.isActivated = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.activateSub.unsubscribe();
  }
}
