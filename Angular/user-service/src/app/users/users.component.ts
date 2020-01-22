import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: { name: string; status: string }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.users;
  }

  setToActive(index: number) {
    this.userService.setToActive(index);
  }

  setToInactive(index: number) {
    this.userService.setToInActive(index);
  }
}
