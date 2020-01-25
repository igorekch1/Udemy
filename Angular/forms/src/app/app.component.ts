import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("form", { static: true }) signupForm: NgForm;
  defaultQuestion = "pet";
  genders = ["male", "female"];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    gender: ""
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = "Superuser";

    // !st approach
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName
    //   }
    // });

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  resetForm() {
    this.signupForm.form.reset();
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    this.user.username = this.signupForm.value.userData.username;
    // ....
  }
}
