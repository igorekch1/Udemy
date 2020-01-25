import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUserNames = ["Chris", "Anna"];

  ngOnInit() {
    // Initialize form
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl("Default username", [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails.bind(this)
        )
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([])
    });

    this.signupForm.statusChanges.subscribe(value => {
      console.log(value);
    });

    // this.signupForm.setValue({
    //   userData: {
    //     username: "Test",
    //     email: 'email
    //     ....
    //   }
    // })

    this.signupForm.patchValue({
      userData: {
        username: "Adam"
      }
    });
  }

  addHobby() {
    (<FormArray>this.signupForm.get("hobbies")).push(
      new FormControl(null, Validators.required)
    );
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1)
      return {
        nameIsForbidden: true
      };

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });

    return promise;
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
