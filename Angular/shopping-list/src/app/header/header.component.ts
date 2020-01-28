import { Component, Output, EventEmitter } from "@angular/core";
import { DataStorage } from "src/shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class Header {
  constructor(private dataStorage: DataStorage) {}

  saveData() {
    this.dataStorage.saveData();
  }

  fetchData() {
    this.dataStorage.fetchData().subscribe();
  }
}
