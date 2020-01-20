import { Component } from "@angular/core";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent {
  serverId: number = 1;
  status: string = "Running on port 3030";

  constructor() {
    this.status = Math.random() > 0.5 ? "online" : "offline";
  }

  getColor() {
    return this.status === "online" ? "green" : "red";
  }

  getStatus() {
    return this.status;
  }
}
