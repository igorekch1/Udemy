import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [
    `
      h3 {
        color: #21c0c0;
      }
    `
  ]
})
export class AppComponent {
  name = "";
}
