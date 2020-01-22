import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable({ providedIn: "root" })
export class UserService {
  users = [
    {
      name: "Ihor",
      status: "active"
    },
    {
      name: "Max",
      status: "active"
    },
    {
      name: "Peter",
      status: "inactive"
    },
    {
      name: "Tom",
      status: "inactive"
    },
    {
      name: "John",
      status: "inactive"
    }
  ];

  constructor(private loggingService: LoggingService) {}

  setToActive(id: number) {
    this.users[id].status = "active";
    this.loggingService.log(this.users[id].name, "active");
  }

  setToInActive(id: number) {
    this.users[id].status = "inactive";
    this.loggingService.log(this.users[id].name, "inactive");
  }
}
