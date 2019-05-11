import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  registerForm = this.fb.group({
    email: ["", Validators.required],
    username: ["", Validators.required],
    displayname: [""],
    password: ["", Validators.required]
  });

  onSubmit(): void {
    const { email, username, password } = this.registerForm.value;
    this.authService
      .createAccount(username, email, password)
      .toPromise()
      .then(success => {
        console.log(success);
      });
  }
}
