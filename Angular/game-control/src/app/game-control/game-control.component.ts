import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"]
})
export class GameControlComponent implements OnInit {
  @Output() intervalFired = new EventEmitter<number>();
  interaval: any;
  count: number = 0;

  constructor() {}

  ngOnInit() {}

  start() {
    this.interaval = setInterval(() => {
      this.intervalFired.emit(this.count++);
    }, 1000);
  }

  stop() {
    clearInterval(this.interaval);
  }
}
