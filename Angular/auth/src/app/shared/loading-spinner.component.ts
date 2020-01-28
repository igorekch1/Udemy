import { Component, OnInit } from "@angular/core";

@Component({
  selector: "loading-spinner",
  template: `
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  styleUrls: ["./loading-spinner.component.css"]
})
export class LoadingSpinnerComponent {}
